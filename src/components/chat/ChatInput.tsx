
import { Mic, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  inputValue: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onStartListening: () => void;
  isListening: boolean;
  isDisabled?: boolean;
}

export const ChatInput = ({ 
  inputValue, 
  onInputChange, 
  onSend, 
  onStartListening, 
  isListening,
  isDisabled = false
}: ChatInputProps) => {
  return (
    <div className="p-6 bg-white border-t border-gray-200">
      <div className="flex items-center space-x-2">
        <Input
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder={isDisabled ? "Demo conversation limit reached" : "Type your message to Beatriz..."}
          className="flex-1"
          disabled={isDisabled}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isDisabled) {
              onSend();
            }
          }}
        />
        <Button 
          onClick={onSend} 
          disabled={isDisabled || !inputValue.trim()}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Send className="h-5 w-5" />
        </Button>
        <Button
          variant={isListening ? "destructive" : "outline"}
          onClick={onStartListening}
          disabled={isDisabled}
          className={isListening ? "animate-pulse" : ""}
        >
          <Mic className="h-5 w-5" />
        </Button>
      </div>
      {isDisabled && (
        <p className="mt-2 text-xs text-gray-500 text-center">
          This demo is limited to 5 messages. Thank you for trying the experience!
        </p>
      )}
    </div>
  );
};
