import { useRef, useEffect, useState } from "react";
import { ChatHeader } from "./chat/ChatHeader";
import { ChatMessage } from "./chat/ChatMessage";
import { ChatInput } from "./chat/ChatInput";
import { VoiceInput } from "./chat/VoiceInput";
import { useChat } from "@/hooks/useChat";
import { AnimatePresence } from "framer-motion";

export const ChatInterface = () => {
  const { 
    messages, 
    inputValue, 
    isTyping, 
    isPlaying,
    isMessageLimitReached,
    isDemoEnded,
    setInputValue,
    handleSendMessage
  } = useChat();
  
  const [isVoiceMode, setIsVoiceMode] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isApiConnected = !!import.meta.env.VITE_ELEVENLABS_API_KEY;
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      handleSendMessage();
    }
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-200">
      <ChatHeader isPlaying={isPlaying} isApiConnected={isApiConnected} />
      
      <div className="p-5 h-[480px] overflow-y-auto bg-gray-50 flex flex-col">
        <div className="flex-1 space-y-5">
          {messages.map((message, index) => (
            <ChatMessage 
              key={message.id} 
              message={message}
              isSpeaking={isPlaying && index === messages.length - 1 && message.type === "assistant"}
            />
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
              <div className="bg-gray-100 px-4 py-2.5 rounded-2xl">
                <div className="typing-indicator">
                  <span className="animate-wave-1"></span>
                  <span className="animate-wave-2"></span>
                  <span className="animate-wave-3"></span>
                </div>
              </div>
            </div>
          )}
          
          {isDemoEnded && (
            <div className="text-center my-4 p-4 bg-blue-50 border border-blue-100 rounded-lg">
              <p className="text-sm text-blue-700">
                This demo is limited to 5 messages. Thank you for trying the experience!
              </p>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        {isVoiceMode ? (
          <VoiceInput
            key="voice-input"
            onTranscription={setInputValue}
            onSwitchToText={() => setIsVoiceMode(false)}
            onSend={handleSend}
            isDisabled={isMessageLimitReached || isDemoEnded}
          />
        ) : (
          <ChatInput
            key="text-input"
            inputValue={inputValue}
            onInputChange={setInputValue}
            onSend={handleSendMessage}
            onSwitchToVoice={() => setIsVoiceMode(true)}
            isDisabled={isMessageLimitReached || isDemoEnded}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
