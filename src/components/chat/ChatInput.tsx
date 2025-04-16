
import { Mic, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  inputValue: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onStartListening: () => void;
  isListening: boolean;
}

export const ChatInput = ({ 
  inputValue, 
  onInputChange, 
  onSend, 
  onStartListening, 
  isListening 
}: ChatInputProps) => {
  return (
    <div className="p-6 bg-white border-t border-gray-200">
      <div className="flex items-center space-x-2">
        <Input
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Type your message to Beatriz..."
          className="flex-1"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSend();
            }
          }}
        />
        <Button 
          onClick={onSend} 
          disabled={!inputValue.trim()}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Send className="h-5 w-5" />
        </Button>
        <Button
          variant={isListening ? "destructive" : "outline"}
          onClick={onStartListening}
          className={isListening ? "animate-pulse" : ""}
        >
          <Mic className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
