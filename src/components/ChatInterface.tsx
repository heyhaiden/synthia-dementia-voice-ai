
import { useRef, useEffect } from "react";
import { ChatHeader } from "./chat/ChatHeader";
import { ChatMessage } from "./chat/ChatMessage";
import { ChatInput } from "./chat/ChatInput";
import { useChat } from "@/hooks/useChat";

export const ChatInterface = () => {
  const { 
    messages, 
    inputValue, 
    isListening, 
    isTyping, 
    isPlaying,
    setInputValue,
    handleSendMessage,
    handleStartListening
  } = useChat();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  return (
    <div className="w-full bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-200">
      <ChatHeader isPlaying={isPlaying} />
      
      <div className="p-6 h-[600px] overflow-y-auto bg-gray-50 flex flex-col">
        <div className="flex-1 space-y-6">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
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
              <div className="bg-gray-100 px-4 py-3 rounded-2xl">
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
      
      <ChatInput
        inputValue={inputValue}
        onInputChange={setInputValue}
        onSend={handleSendMessage}
        onStartListening={handleStartListening}
        isListening={isListening}
      />
    </div>
  );
};
