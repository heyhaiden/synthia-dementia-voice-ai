import { useState, useRef, useEffect } from "react";
import { Mic, Volume2, User, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

const EXAMPLE_PROMPTS = [
  "How can I help someone with sundowning symptoms?",
  "What are good activities for dementia patients?",
  "How do I communicate better with someone who has dementia?",
  "What are some self-care tips for caregivers?"
];

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
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
  
  return (
    <div className="max-w-4xl mx-auto bg-beatriz-light rounded-2xl overflow-hidden shadow-xl border border-beatriz/20">
      <div className="bg-beatriz p-4 text-white flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-white p-0.5 mr-3">
            <img 
              src="/lovable-uploads/193f56c2-01c0-492f-a435-4eb3950c0277.png" 
              alt="Beatriz Avatar" 
              className="h-full w-full object-cover rounded-full"
            />
          </div>
          <div>
            <h2 className="font-semibold">Beatriz</h2>
            <p className="text-xs opacity-80">Virtual Caregiver Assistant</p>
          </div>
        </div>
        {isPlaying ? (
          <div className="flex items-center space-x-1">
            <div className="h-5 w-1 bg-white animate-pulse rounded-full"></div>
            <div className="h-7 w-1 bg-white animate-pulse rounded-full"></div>
            <div className="h-5 w-1 bg-white animate-pulse rounded-full"></div>
            <div className="h-3 w-1 bg-white animate-pulse rounded-full"></div>
          </div>
        ) : (
          <div className="flex items-center bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="text-white mr-3 text-sm font-medium">Voice Active</span>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4 h-[500px] overflow-y-auto bg-white">
        {messages.length === 1 && (
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Try asking about:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {EXAMPLE_PROMPTS.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="text-left h-auto py-2 px-3 text-sm"
                  onClick={() => {
                    setInputValue(prompt);
                    handleSendMessage();
                  }}
                >
                  {prompt}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === MessageType.USER ? "justify-end" : "justify-start"}`}
            >
              {message.type === MessageType.ASSISTANT && (
                <div className="h-8 w-8 rounded-full bg-white p-0.5 mr-2 flex-shrink-0 shadow-sm border border-gray-200">
                  <img 
                    src="/lovable-uploads/193f56c2-01c0-492f-a435-4eb3950c0277.png" 
                    alt="Beatriz Avatar" 
                    className="h-full w-full object-cover rounded-full"
                  />
                </div>
              )}
              
              <div className={`max-w-[80%] animate-fade-in ${
                message.type === MessageType.USER 
                  ? "chat-bubble chat-bubble-user" 
                  : "chat-bubble chat-bubble-assistant"
              }`}>
                <p>{message.content}</p>
              </div>
              
              {message.type === MessageType.USER && (
                <div className="h-8 w-8 rounded-full bg-beatriz ml-2 flex-shrink-0 flex items-center justify-center shadow-sm">
                  <User className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="h-8 w-8 rounded-full bg-white p-0.5 mr-2 flex-shrink-0 shadow-sm border border-gray-200">
                <img 
                  src="/lovable-uploads/193f56c2-01c0-492f-a435-4eb3950c0277.png" 
                  alt="Beatriz Avatar"
                  className="h-full w-full object-cover rounded-full"
                />
              </div>
              <div className="chat-bubble chat-bubble-assistant animate-fade-in">
                <div className="typing-indicator">
                  <span className="animate-wave-1"></span>
                  <span className="animate-wave-2"></span>
                  <span className="animate-wave-3"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message to Beatriz..."
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!inputValue.trim()}
            className="bg-beatriz hover:bg-beatriz-dark"
          >
            <Send className="h-5 w-5" />
          </Button>
          <Button
            variant={isListening ? "destructive" : "outline"}
            onClick={handleStartListening}
            className={isListening ? "animate-pulse" : ""}
          >
            <Mic className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="mt-3 text-xs text-center text-gray-500">
          <p>This is a demonstration. In a real implementation, Beatriz would use advanced speech recognition and AI language models.</p>
        </div>
      </div>
    </div>
  );
};
