/**
 * Language model service using OpenAI's API
 */
import { Message, MessageType } from "@/types/chat";

interface KnowledgeBase {
  modules: {
    [key: string]: {
      content: string;
      topics: string[];
    };
  };
  questions: {
    [stage: string]: {
      softSkills: string[];
      hardSkills: string[];
    };
  };
}

// Import markdown files
const modulesContent = await import('../../knowledge_docs/anonymized-alzheimers-modules.md?raw');
const questionsContent = await import('../../knowledge_docs/anonymized-dementia-care-questions.md?raw');

// Conversation state management
interface ConversationState {
  hasCheckedSentiment: boolean;
  currentStage: 'early' | 'mid' | 'late' | null;
  currentModule: number | null;
  questionsAsked: Set<string>;
}

/**
 * Gets the next appropriate question based on conversation state
 */
const getNextQuestion = (state: ConversationState, knowledgeBase: KnowledgeBase): string => {
  // If we haven't checked sentiment yet, use a general question
  if (!state.hasCheckedSentiment) {
    return "How are you feeling today? I'd like to understand your current state of mind before we dive into the learning materials.";
  }

  // If we haven't determined the stage yet, ask about it
  if (!state.currentStage) {
    return "Which stage of dementia care would you like to focus on today: early, mid, or late stage?";
  }

  // Get questions for the current stage
  const stageQuestions = knowledgeBase.questions[state.currentStage];
  
  // Find an unasked question
  const unaskedSoftSkills = stageQuestions.softSkills.filter(q => !state.questionsAsked.has(q));
  const unaskedHardSkills = stageQuestions.hardSkills.filter(q => !state.questionsAsked.has(q));
  
  // Prioritize soft skills questions
  if (unaskedSoftSkills.length > 0) {
    const question = unaskedSoftSkills[0];
    state.questionsAsked.add(question);
    return question;
  }
  
  if (unaskedHardSkills.length > 0) {
    const question = unaskedHardSkills[0];
    state.questionsAsked.add(question);
    return question;
  }

  // If we've asked all questions, suggest moving to the next module
  if (state.currentModule === null) {
    state.currentModule = 1;
  } else if (state.currentModule < 3) {
    state.currentModule++;
  } else {
    return "We've completed all the learning materials. Would you like to review any specific topics or discuss something else?";
  }

  // Get module content
  const moduleContent = knowledgeBase.modules[state.currentStage]?.content;
  if (moduleContent) {
    return `Let's move on to Module ${state.currentModule}. ${moduleContent.split('\n')[0]}`;
  }

  return "I'm not sure what to ask next. Would you like to discuss something specific?";
};

/**
 * Reads and parses the knowledge base from markdown files
 */
const loadKnowledgeBase = async (): Promise<KnowledgeBase> => {
  const knowledgeBase: KnowledgeBase = {
    modules: {},
    questions: {}
  };

  try {
    // Parse modules content
    const moduleSections = modulesContent.default.split(/Module \d+:/);
    moduleSections.forEach((section: string, index: number) => {
      if (section.trim()) {
        const stage = index === 1 ? 'early' : index === 2 ? 'mid' : 'late';
        knowledgeBase.modules[stage] = {
          content: section.trim(),
          topics: extractTopics(section)
        };
      }
    });
    
    // Parse questions content
    const stages = ['early', 'mid', 'late'];
    stages.forEach(stage => {
      const stageRegex = new RegExp(`## ${stage.charAt(0).toUpperCase() + stage.slice(1)} Stage Questions`);
      const stageSection = questionsContent.default.split(stageRegex)[1]?.split('##')[0] || '';
      
      knowledgeBase.questions[stage] = {
        softSkills: extractQuestions(stageSection, 'Soft Skills'),
        hardSkills: extractQuestions(stageSection, 'Hard Skills')
      };
    });

    return knowledgeBase;
  } catch (error) {
    console.error('Error loading knowledge base:', error);
    throw new Error('Failed to load knowledge base');
  }
};

/**
 * Extracts topics from a module section
 */
const extractTopics = (content: string): string[] => {
  const topics: string[] = [];
  const lines = content.split('\n');
  
  for (const line of lines) {
    if (line.startsWith('- ')) {
      topics.push(line.substring(2).trim());
    }
  }
  
  return topics;
};

/**
 * Extracts questions from a section
 */
const extractQuestions = (content: string, section: string): string[] => {
  const questions: string[] = [];
  const sectionRegex = new RegExp(`### ${section}:([\\s\\S]*?)(?=###|$)`);
  const match = content.match(sectionRegex);
  
  if (match) {
    const lines = match[1].split('\n');
    for (const line of lines) {
      if (line.startsWith('- ')) {
        questions.push(line.substring(2).trim());
      }
    }
  }
  
  return questions;
};

interface OpenAIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

/**
 * Sends a message to the OpenAI API and gets a response
 * @param messages The conversation history
 * @param systemPrompt The system prompt to set context for the AI
 * @returns Promise resolving to the AI's response
 */
export const processMessage = async (
  messages: Message[],
  systemPrompt: string = `You are a compassionate AI assistant focused on supporting dementia caregivers. Your primary goals are:
1. First, check in with the caregiver about their emotional state and well-being
2. Guide them through a structured learning experience about dementia care
3. Use the provided question bank to facilitate meaningful discussions
4. Present learning modules in a logical sequence
5. Maintain a supportive and empathetic tone throughout
6. Keep responses concise and focused on one topic at a time
7. Always acknowledge the caregiver's feelings and experiences
8. End each response with a relevant follow-up question to encourage continued engagement

When starting a new conversation:
1. Begin with a warm, empathetic greeting
2. Acknowledge the challenging nature of caregiving
3. Express genuine interest in their well-being
4. Create a safe space for them to share their feelings
5. Set expectations about the learning journey ahead

IMPORTANT: Keep all responses under 2 sentences. Be direct and concise while maintaining empathy.`
): Promise<Message> => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  // For development, return mock results if no API key is available
  if (!apiKey) {
    console.log("Dev mode: Using mock language model response");
    return mockProcessMessage(messages, systemPrompt);
  }

  try {
    // Convert messages to OpenAI format
    const openaiMessages: OpenAIMessage[] = [
      { role: "system", content: systemPrompt },
      ...messages
        .filter(m => m.type !== MessageType.SYSTEM)
        .map(m => ({
          role: m.type === MessageType.USER ? "user" : "assistant" as "user" | "assistant",
          content: m.content
        }))
    ];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: openaiMessages,
        temperature: 0.7,
        max_tokens: 100, // Reduced for more concise responses
        presence_penalty: 0.6, // Encourage more focused responses
        frequency_penalty: 0.3, // Slightly reduce repetition
        top_p: 0.9 // Slightly more focused sampling
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Language model API error:", error);
      throw new Error(`Language model error: ${error.error?.message || "Unknown error"}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    return {
      id: Date.now().toString(),
      type: MessageType.ASSISTANT,
      content,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error("Failed to process message:", error);
    throw new Error("Failed to get a response. Please try again.");
  }
};

/**
 * Mock implementation for development purposes
 */
const mockProcessMessage = async (
  messages: Message[],
  systemPrompt: string
): Promise<Message> => {
  console.log("Processing message with mock language model...");
  
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Get the last user message
  const lastUserMessage = [...messages].reverse().find(msg => msg.type === MessageType.USER);
  
  if (!lastUserMessage) {
    return {
      id: Date.now().toString(),
      type: MessageType.ASSISTANT,
      content: "Hi! I'm Synthia, your dementia care companion. Before we dive into learning resources, I'd like to know: how are you feeling today?",
      timestamp: new Date().toISOString()
    };
  }
  
  try {
    // Load knowledge base
    const knowledgeBase = await loadKnowledgeBase();
    
    // Determine current stage from previous messages
    let currentStage: 'early' | 'mid' | 'late' | null = null;
    const previousMessages = messages.slice(0, -1);
    for (const msg of previousMessages) {
      if (msg.type === MessageType.USER) {
        if (msg.content.toLowerCase().includes("early")) {
          currentStage = "early";
          break;
        } else if (msg.content.toLowerCase().includes("mid")) {
          currentStage = "mid";
          break;
        } else if (msg.content.toLowerCase().includes("late")) {
          currentStage = "late";
          break;
        }
      }
    }

    // Calculate current step (1-5) based on message count
    const currentStep = Math.min(Math.ceil(messages.length / 2), 5);
    
    // Get appropriate response based on current step
    let response = "";
    
    switch (currentStep) {
      case 1: // Initial feeling check
        response = "Thank you for sharing. Let's focus on a specific stage of dementia care. Would you like to learn about early, mid, or late stage care?";
        break;
        
      case 2: // Stage selection confirmation and first question
        if (!currentStage) {
          response = "Please choose a stage: early, mid, or late stage dementia care.";
        } else {
          const stageQuestions = knowledgeBase.questions[currentStage];
          response = `Great choice! Let's focus on ${currentStage} stage care. ${stageQuestions.softSkills[0]}`;
        }
        break;
        
      case 3: // Second question
        if (!currentStage) {
          response = "Please choose a stage: early, mid, or late stage dementia care.";
        } else {
          const stageQuestions = knowledgeBase.questions[currentStage];
          response = stageQuestions.hardSkills[0];
        }
        break;
        
      case 4: // Module introduction
        if (!currentStage) {
          response = "Please choose a stage: early, mid, or late stage dementia care.";
        } else {
          const moduleContent = knowledgeBase.modules[currentStage]?.content;
          const firstLine = moduleContent?.split('\n')[0] || '';
          response = `Let's dive into some key learning materials for ${currentStage} stage care. ${firstLine}`;
        }
        break;
        
      case 5: // Conclusion and call to action
        if (!currentStage) {
          response = "Please choose a stage: early, mid, or late stage dementia care.";
        } else {
          const moduleContent = knowledgeBase.modules[currentStage]?.content;
          const keyPoints = moduleContent?.split('\n')
            .filter((line: string) => line.startsWith('- '))
            .slice(0, 2) || [];
          response = `Thank you for exploring ${currentStage} stage dementia care with me. Here are two key takeaways: ${keyPoints.join(' ')} To continue your learning journey and access our full library of resources, request access at getsynthia.ai.`;
        }
        break;
    }
    
    return {
      id: Date.now().toString(),
      type: MessageType.ASSISTANT,
      content: response,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error("Error in mock message processing:", error);
    return {
      id: Date.now().toString(),
      type: MessageType.ASSISTANT,
      content: "I apologize, but I'm having trouble accessing the knowledge base right now. Please try again later.",
      timestamp: new Date().toISOString()
    };
  }
};
