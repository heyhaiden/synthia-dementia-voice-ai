import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import { Microphone } from "@/components/Microphone";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface VoiceInputProps {
  onTranscription: (text: string) => void;
  onSwitchToText: () => void;
  onSend: () => void;
  isDisabled?: boolean;
}

export const VoiceInput = ({
  onTranscription,
  onSwitchToText,
  onSend,
  isDisabled = false
}: VoiceInputProps) => {
  const [currentTranscript, setCurrentTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleTranscription = (text: string) => {
    const trimmedText = text.trim();
    setCurrentTranscript(trimmedText);
    onTranscription(trimmedText);
  };

  const handleRecordingStateChange = (recording: boolean) => {
    setIsRecording(recording);
    // When stopping recording and we have text, send the message
    if (!recording && currentTranscript.trim()) {
      onSend();
      // Clear transcripts after sending
      setCurrentTranscript("");
      onTranscription("");
    }
    // When starting a new recording, clear any previous text
    if (recording) {
      setCurrentTranscript("");
      onTranscription("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="p-4 bg-white border-t border-gray-200"
    >
      <div className="flex flex-col items-center space-y-3">
        <div className="w-full max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {isRecording && currentTranscript && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mb-3"
              >
                <div className="flex justify-start">
                  <div className="bg-blue-50 px-3 py-2 rounded-2xl max-w-[80%]">
                    <p className="text-gray-700 text-sm">{currentTranscript}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="flex flex-col items-center">
            <div className="relative">
              <Microphone
                onTranscription={handleTranscription}
                onRecordingStateChange={handleRecordingStateChange}
                disabled={isDisabled}
              />
              {isRecording && (
                <div 
                  className="absolute inset-0 rounded-full border-2 border-blue-500 animate-ping pointer-events-none"
                  style={{ margin: '-2px' }}
                />
              )}
            </div>
            
            <button
              onClick={onSwitchToText}
              className="mt-2 text-xs text-gray-500 hover:text-gray-700 transition-colors"
            >
              Can't speak now
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}; 