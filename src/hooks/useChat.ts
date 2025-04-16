
import { useState } from "react";
import { toast } from "sonner";
import { Message, MessageType } from "@/types/chat";

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    type: MessageType.ASSISTANT,
    content: "Hello! I'm Beatriz, your virtual caregiver assistant. How can I help you with dementia care today?",
    timestamp: new Date().toISOString(),
  }
];

const DEMO_RESPONSES: { [key: string]: string } = {
  "sundown": "Sundowning can be challenging. Try maintaining a consistent daily routine, increasing lighting before sunset, and reducing noise and stimulation in the evening. Playing calming music and creating a comfortable environment can also help reduce agitation.",
  "communication": "When communicating with someone with dementia, speak clearly and slowly, use simple sentences, maintain eye contact, and minimize distractions. Be patient and give them time to process information and respond.",
  "activities": "Engaging activities for people with dementia could include music therapy, gentle exercise, looking at family photos, simple arts and crafts, or sensory activities like gardening or baking. Focus on activities that connect with their past interests and abilities.",
  "caregiver": "Self-care is crucial for caregivers. Try to schedule regular breaks, join a support group, ask for help from family and friends, and consider respite care options. Remember that taking care of yourself improves your ability to care for your loved one.",
  "default": "I understand caring for someone with dementia can be challenging. Could you provide more details about your specific concern so I can offer more tailored guidance?"
};

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const generateDemoResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes("sundown")) {
      return DEMO_RESPONSES.sundown;
    } else if (lowerInput.includes("talk") || lowerInput.includes("communicat")) {
      return DEMO_RESPONSES.communication;
    } else if (lowerInput.includes("activit") || lowerInput.includes("engage")) {
      return DEMO_RESPONSES.activities;
    } else if (lowerInput.includes("tired") || lowerInput.includes("stress") || lowerInput.includes("self") || lowerInput.includes("myself")) {
      return DEMO_RESPONSES.caregiver;
    } else {
      return DEMO_RESPONSES.default;
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      type: MessageType.USER,
      content: inputValue,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    
    setTimeout(() => {
      const response = generateDemoResponse(inputValue);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: MessageType.ASSISTANT,
        content: response,
        timestamp: new Date().toISOString(),
      };
      
      setIsTyping(false);
      setMessages(prev => [...prev, assistantMessage]);
      simulateVoicePlayback(response);
    }, 1500);
  };

  const handleStartListening = () => {
    setIsListening(true);
    toast.info("Listening...");
    
    setTimeout(() => {
      setIsListening(false);
      toast.success("Voice captured!");
      
      setInputValue("How can I help my mom with sundowning?");
      
      setTimeout(() => {
        handleSendMessage();
      }, 500);
    }, 2000);
  };

  const simulateVoicePlayback = (text: string) => {
    setIsPlaying(true);
    toast.info("Playing voice response...");
    
    const duration = Math.min(Math.max(text.length * 50, 2000), 8000);
    
    setTimeout(() => {
      setIsPlaying(false);
    }, duration);
  };

  return {
    messages,
    inputValue,
    isListening,
    isTyping,
    isPlaying,
    setInputValue,
    handleSendMessage,
    handleStartListening,
  };
};
