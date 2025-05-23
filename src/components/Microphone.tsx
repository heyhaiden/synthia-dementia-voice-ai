import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
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
  onRecordingStateChange?: (isRecording: boolean) => void;
  disabled?: boolean;
}

export const Microphone = ({ 
  onTranscription, 
  onRecordingStateChange,
  disabled = false 
}: MicrophoneProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const finalTranscriptRef = useRef<string>("");
  const isUpdatingRef = useRef(false);

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (recognitionRef.current) {
        stopSpeechRecognition(recognitionRef.current);
      }
    };
  }, []);

  const updateRecordingState = (recording: boolean) => {
    // Prevent duplicate state updates
    if (isUpdatingRef.current || recording === isRecording) {
      return;
    }

    isUpdatingRef.current = true;
    try {
      setIsRecording(recording);
      onRecordingStateChange?.(recording);
    } finally {
      isUpdatingRef.current = false;
    }
  };

  const startRecording = async () => {
    if (isRecording || isUpdatingRef.current) return;

    try {
      // Reset transcripts
      finalTranscriptRef.current = "";

      // Start Web Speech API recognition
      const recognition = startSpeechRecognition(
        // Interim results callback
        (text) => {
          const currentText = (finalTranscriptRef.current + " " + text).trim();
          onTranscription(currentText);
        },
        // Final results callback
        (text) => {
          finalTranscriptRef.current = (finalTranscriptRef.current + " " + text).trim();
          onTranscription(finalTranscriptRef.current);
        },
        // Error callback
        (error) => {
          console.error("Speech recognition error:", error);
          updateRecordingState(false);
        }
      );

      if (recognition) {
        recognitionRef.current = recognition;
        updateRecordingState(true);

        // Set up end handler
        recognition.onend = () => {
          if (recognitionRef.current === recognition) {
            updateRecordingState(false);
          }
        };
      }
    } catch (error) {
      console.error("Error starting speech recognition:", error);
      updateRecordingState(false);
    }
  };

  const stopRecording = () => {
    if (!isRecording || isUpdatingRef.current) return;

    if (recognitionRef.current) {
      // Ensure final transcript is sent
      if (finalTranscriptRef.current.trim()) {
        onTranscription(finalTranscriptRef.current.trim());
      }
      
      // Stop recognition and update state
      stopSpeechRecognition(recognitionRef.current);
      recognitionRef.current = null;
      updateRecordingState(false);
    }
  };

  const toggleRecording = () => {
    if (isUpdatingRef.current) return;
    
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <Button
      variant={isRecording ? "default" : "outline"}
      size="icon"
      onClick={toggleRecording}
      disabled={disabled}
      className={`relative transition-all duration-200 ${
        isRecording 
          ? "bg-blue-500 hover:bg-blue-600 text-white scale-110" 
          : "hover:bg-blue-50 hover:text-blue-600"
      }`}
    >
      <Mic className={`h-5 w-5 transition-transform duration-200 ${isRecording ? "scale-110" : ""}`} />
    </Button>
  );
}; 