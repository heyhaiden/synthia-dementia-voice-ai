import { Send, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

interface ChatInputProps {
  inputValue: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onSwitchToVoice: () => void;
  isDisabled?: boolean;
}

export const ChatInput = ({ 
  inputValue, 
  onInputChange, 
  onSend,
  onSwitchToVoice,
  isDisabled = false
}: ChatInputProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="p-4 bg-white border-t border-gray-200"
    >
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onSwitchToVoice}
          className="text-gray-600 hover:text-gray-900 h-9 w-9"
        >
          <Mic className="h-4 w-4" />
        </Button>
        <Input
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder={isDisabled ? "Demo conversation limit reached" : "Type your message to Synthia..."}
          className="flex-1 h-9 text-sm"
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
          className="bg-blue-600 hover:bg-blue-700 h-9 w-9"
          size="icon"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
      {isDisabled && (
        <p className="mt-2 text-xs text-gray-500 text-center">
          This demo is limited to 5 messages. Thank you for trying the experience!
        </p>
      )}
    </motion.div>
  );
};
