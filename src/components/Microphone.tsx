import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import { startSpeechRecognition, stopSpeechRecognition } from "@/services/speech-to-text";

// Add type definitions for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

interface MicrophoneProps {
  onTranscription: (text: string) => void;
  disabled?: boolean;
}

export const Microphone = ({ onTranscription, disabled = false }: MicrophoneProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const finalTranscriptRef = useRef<string>("");

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (recognitionRef.current) {
        stopSpeechRecognition(recognitionRef.current);
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      // Reset transcripts
      finalTranscriptRef.current = "";

      // Start Web Speech API recognition
      const recognition = startSpeechRecognition(
        // Interim results callback
        (text) => {
          // Update input with interim results
          onTranscription(finalTranscriptRef.current + " " + text);
        },
        // Final results callback
        (text) => {
          finalTranscriptRef.current += " " + text;
          onTranscription(finalTranscriptRef.current);
        },
        // Error callback
        (error) => {
          console.error("Speech recognition error:", error);
          setIsRecording(false);
          setIsProcessing(false);
        }
      );

      if (recognition) {
        recognitionRef.current = recognition;
        setIsRecording(true);

        // Set up end handler
        recognition.onend = () => {
          if (isRecording) {
            const finalText = finalTranscriptRef.current.trim();
            if (finalText) {
              onTranscription(finalText);
            }
            setIsRecording(false);
          }
        };
      }
    } catch (error) {
      console.error("Error starting speech recognition:", error);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      setIsProcessing(true);
      
      // Get the final text
      const finalText = finalTranscriptRef.current.trim();
      
      stopSpeechRecognition(recognitionRef.current);
      recognitionRef.current = null;
      
      if (finalText) {
        onTranscription(finalText);
      }
      
      setIsRecording(false);
      setIsProcessing(false);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="icon"
        onClick={toggleRecording}
        disabled={disabled || isProcessing}
        className={`relative ${isRecording ? "bg-red-100 hover:bg-red-200" : ""}`}
      >
        {isRecording ? (
          <>
            <MicOff className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse" />
          </>
        ) : (
          <Mic className="h-5 w-5" />
        )}
      </Button>
      
      {isProcessing && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
          Processing...
        </div>
      )}
    </div>
  );
}; 