import { useState } from "react";
// import { toast } from "sonner";  // Commented out to prevent toasts
import { Message, MessageType } from "@/types/chat";
import { processMessage } from "@/services/ai-services";
import { textToSpeech } from "@/services/text-to-speech";

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    type: MessageType.ASSISTANT,
    content: "Hi! I'm Synthia, your dementia care companion. Before we dive into learning resources, I'd like to know: how are you feeling today?",
    timestamp: new Date().toISOString(),
  }
];

// Maximum number of user messages allowed in the demo
const MAX_USER_MESSAGES = 5;

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userMessageCount, setUserMessageCount] = useState(0);
  const [isDemoEnded, setIsDemoEnded] = useState(false);

  const isMessageLimitReached = userMessageCount >= MAX_USER_MESSAGES;

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isMessageLimitReached || isDemoEnded) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      type: MessageType.USER,
      content: inputValue,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    
    const newUserMessageCount = userMessageCount + 1;
    setUserMessageCount(newUserMessageCount);
    
    try {
      // If this is the last allowed message, ask for a closing message
      let messagesToSend = [...messages, userMessage];
      let currentSystemPrompt;
      
      if (newUserMessageCount >= MAX_USER_MESSAGES) {
        // Add system message to prompt the AI to wrap up the conversation
        currentSystemPrompt = `As a sophisticated AI, your primary role is to embody the essence, personality, backstory, and motivations of Synthia, an older woman living with progressive Alzheimers disease. This is the final message in our conversation. Please provide a warm, contextually relevant goodbye that acknowledges what we've discussed, written in the first person as Synthia. Keep it to two sentences.`;
      }
      
      // Send to language model to get response
      const assistantMessage = await processMessage(messagesToSend, currentSystemPrompt);
      
      setIsTyping(false);
      setMessages(prev => [...prev, assistantMessage]);
      setInputValue(""); // Clear input value after receiving response
      
      // Generate voice response if text-to-speech is available
      if (assistantMessage.content) {
        handleTextToSpeech(assistantMessage.content);
      }
      
      // If we've reached the message limit, mark the demo as ended
      if (newUserMessageCount >= MAX_USER_MESSAGES) {
        setTimeout(() => {
          setIsDemoEnded(true);
        }, 1000);
      }
    } catch (error) {
      setIsTyping(false);
      setInputValue(""); // Clear input value on error
      console.error("Error processing message:", error);
    }
  };

  const handleTextToSpeech = async (text: string) => {
    try {
      setIsPlaying(true);
      
      // Create audio context with optimized settings
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({
        latencyHint: 'interactive',
        sampleRate: 44100
      });
      
      // Get audio buffer from ElevenLabs with optimized settings
      const audioBuffer = await textToSpeech(text, {
        voiceId: import.meta.env.VITE_ELEVENLABS_VOICE_ID,
        modelId: "eleven_multilingual_v2",
        stability: 0.2, // Reduced for faster generation
        similarityBoost: 0.3, // Reduced for faster generation
        outputFormat: "mp3_44100_96", // Reduced bitrate for faster loading
        speed: 1.8 // Increased playback speed for faster conversation
      });

      // Create and play audio source with optimized settings
      const source = audioCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioCtx.destination);
      
      // Set up end handler
      source.onended = () => {
        setIsPlaying(false);
        audioCtx.close();
      };

      // Start playback immediately
      source.start(0);

    } catch (error) {
      console.error("Text-to-speech error:", error);
      setIsPlaying(false);
      // You might want to show an error message to the user here
    }
  };

  return {
    messages,
    inputValue,
    isTyping,
    isPlaying,
    isMessageLimitReached,
    isDemoEnded,
    setInputValue,
    handleSendMessage,
  };
};
