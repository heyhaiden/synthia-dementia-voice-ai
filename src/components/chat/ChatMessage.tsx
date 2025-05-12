import { MessageType } from "@/types/chat";
import { User } from "lucide-react";
import { SpeechBubble } from "./SpeechBubble";

interface ChatMessageProps {
  message: {
    id: string;
    type: MessageType;
    content: string;
    timestamp: string;
  };
  isSpeaking?: boolean;
}

export const ChatMessage = ({ message, isSpeaking = false }: ChatMessageProps) => {
  if (message.type === MessageType.ASSISTANT && isSpeaking) {
    return <SpeechBubble isSpeaking={true} />;
  }

  return (
    <div className={`flex ${message.type === MessageType.USER ? "justify-end" : "justify-start"}`}>
      {message.type === MessageType.ASSISTANT && (
        <div className="h-10 w-10 rounded-full bg-white p-0.5 mr-2 flex-shrink-0 shadow-sm border border-gray-200">
          <img 
            src="/lovable-uploads/synthia_icon.png" 
            alt="Synthia Avatar" 
            className="h-full w-full object-cover rounded-full"
          />
        </div>
      )}
      
      <div className={`max-w-[80%] px-4 py-3 rounded-2xl animate-in slide-in-from-bottom-2 duration-300 ${
        message.type === MessageType.USER 
          ? "bg-blue-500 text-white" 
          : "bg-gray-100 text-gray-800"
      }`}>
        <p>{message.content}</p>
      </div>
      
      {message.type === MessageType.USER && (
        <div className="h-8 w-8 rounded-full bg-blue-500 ml-2 flex-shrink-0 flex items-center justify-center shadow-sm">
          <User className="h-4 w-4 text-white" />
        </div>
      )}
    </div>
  );
};
