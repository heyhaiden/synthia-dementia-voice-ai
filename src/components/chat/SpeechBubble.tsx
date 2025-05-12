import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SpeechBubbleProps {
  isSpeaking: boolean;
  className?: string;
}

export const SpeechBubble = ({ isSpeaking, className }: SpeechBubbleProps) => {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    if (!isSpeaking) return;

    const interval = setInterval(() => {
      setDots((prev) => (prev + 1) % 4);
    }, 500);

    return () => clearInterval(interval);
  }, [isSpeaking]);

  if (!isSpeaking) return null;

  return (
    <div className={cn(
      "flex justify-start items-center space-x-2",
      className
    )}>
      <div className="h-10 w-10 rounded-full bg-white p-0.5 mr-2 flex-shrink-0 shadow-sm border border-gray-200">
        <img 
          src="/lovable-uploads/synthia_icon.png" 
          alt="Synthia Avatar" 
          className="h-full w-full object-cover rounded-full"
        />
      </div>
      <div className="bg-gray-100 px-4 py-3 rounded-2xl relative">
        <div className="absolute -left-2 top-4 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-gray-100 border-b-8 border-b-transparent" />
        <div className="flex space-x-1">
          <span className="animate-bounce" style={{ animationDelay: "0ms" }}>•</span>
          <span className="animate-bounce" style={{ animationDelay: "150ms" }}>•</span>
          <span className="animate-bounce" style={{ animationDelay: "300ms" }}>•</span>
        </div>
      </div>
    </div>
  );
}; 