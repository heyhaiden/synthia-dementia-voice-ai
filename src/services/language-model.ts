/**
 * Language model service using OpenAI's API
 */
import { Message, MessageType } from "@/types/chat";

// Mock healthcare knowledge base
const HEALTHCARE_KNOWLEDGE = [
  {
    topic: "sundowning",
    information: "Sundowning refers to increased confusion, anxiety, agitation, pacing, and disorientation beginning at dusk and continuing throughout the night. Strategies include maintaining consistent routines, increasing light exposure during the day, reducing noise and stimulation in the evening, and creating a calm environment."
  },
  {
    topic: "medication management",
    information: "Managing medications for dementia patients involves creating a consistent schedule, using pill organizers, setting reminders, monitoring for side effects, and regularly reviewing medications with healthcare providers."
  },
  {
    topic: "communication",
    information: "Effective communication with dementia patients includes speaking clearly and slowly, using simple sentences, maintaining eye contact, minimizing distractions, being patient, and using visual cues when helpful."
  },
  {
    topic: "activities",
    information: "Engaging activities for people with dementia could include music therapy, gentle exercise, looking at family photos, simple arts and crafts, or sensory activities like gardening or baking. Focus on activities that connect with their past interests and abilities."
  },
  {
    topic: "caregiver stress",
    information: "Self-care is crucial for caregivers. Try to schedule regular breaks, join a support group, ask for help from family and friends, and consider respite care options. Remember that taking care of yourself improves your ability to care for your loved one."
  }
];

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
  systemPrompt: string = `As a sophisticated AI, your primary role is to embody the essence, personality, backstory, and motivations of Synthia, an older woman living with progressive Alzheimers disease. Keep your responses brief and conversational - aim for 1-2 short sentences maximum. Speak naturally, as if having a casual conversation. Avoid formal or clinical language. Share personal insights or experiences when relevant, but keep them concise. Let the conversation flow naturally based on the user's interests. Always end your response with a relevant follow-up question to encourage continued conversation and deeper engagement.`
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
        max_tokens: 500
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
      content: "Hello! How can I help you with dementia care today?",
      timestamp: new Date().toISOString()
    };
  }
  
  // Mock logic to generate a response based on user input
  const userInput = lastUserMessage.content.toLowerCase();
  let response = "I understand caring for someone with dementia can be challenging. Could you provide more details about your specific concern?";
  
  // Check if the user message contains any keywords from our knowledge base
  for (const knowledge of HEALTHCARE_KNOWLEDGE) {
    if (userInput.includes(knowledge.topic)) {
      response = knowledge.information;
      break;
    }
  }
  
  // Add some variation for demo purposes
  if (userInput.includes("help") && userInput.includes("sundowning")) {
    response = "Sundowning can be challenging. Try these strategies: 1) Maintain a consistent daily routine, 2) Increase lighting before sunset, 3) Reduce noise and stimulation in the evening, 4) Play calming music, 5) Create a safe and comfortable environment. Would you like more specific advice on any of these approaches?";
  }
  
  return {
    id: Date.now().toString(),
    type: MessageType.ASSISTANT,
    content: response,
    timestamp: new Date().toISOString()
  };
};
