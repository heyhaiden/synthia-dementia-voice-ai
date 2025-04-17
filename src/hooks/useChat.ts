
import { useState } from "react";
import { toast } from "sonner";
import { Message, MessageType } from "@/types/chat";
import { speechToText, processMessage, textToSpeech } from "@/services/ai-services";

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    type: MessageType.ASSISTANT,
    content: "Hello! I'm Beatriz, your virtual caregiver assistant. How can I help you with dementia care today?",
    timestamp: new Date().toISOString(),
  }
];

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      type: MessageType.USER,
      content: inputValue,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    
    try {
      // Send to language model to get response
      const assistantMessage = await processMessage([...messages, userMessage]);
      
      setIsTyping(false);
      setMessages(prev => [...prev, assistantMessage]);
      
      // Generate voice response if text-to-speech is available
      if (assistantMessage.content) {
        handleTextToSpeech(assistantMessage.content);
      }
    } catch (error) {
      setIsTyping(false);
      toast.error("Failed to get a response. Please try again.");
      console.error("Error processing message:", error);
    }
  };

  const handleStartListening = async () => {
    setIsListening(true);
    toast.info("Listening...");
    
    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Create a MediaRecorder instance to record audio
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks: Blob[] = [];
      
      // Listen for dataavailable event, which is triggered when we stop recording
      mediaRecorder.addEventListener("dataavailable", (event) => {
        audioChunks.push(event.data);
      });
      
      // Listen for stop event, which is triggered when we stop recording
      mediaRecorder.addEventListener("stop", async () => {
        // Create audio blob from chunks
        const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
        
        try {
          // Convert speech to text
          toast.info("Processing your voice...");
          const text = await speechToText(audioBlob);
          
          if (text) {
            toast.success("Voice captured!");
            setInputValue(text);
            
            // Automatically send message after a short delay
            setTimeout(() => {
              handleSendMessage();
            }, 500);
          } else {
            toast.error("Could not recognize speech. Please try again.");
          }
        } catch (error) {
          toast.error("Failed to process audio. Please try again.");
          console.error("Speech-to-text error:", error);
        } finally {
          setIsListening(false);
          // Stop all tracks to release the microphone
          stream.getTracks().forEach(track => track.stop());
        }
      });
      
      // Start recording
      mediaRecorder.start();
      
      // Stop recording after 5 seconds
      setTimeout(() => {
        if (mediaRecorder.state !== "inactive") {
          mediaRecorder.stop();
        }
      }, 5000);
    } catch (error) {
      setIsListening(false);
      toast.error("Could not access microphone. Please check permissions.");
      console.error("Microphone access error:", error);
    }
  };

  const handleTextToSpeech = async (text: string) => {
    try {
      setIsPlaying(true);
      toast.info("Generating voice response...");
      
      // Convert text to speech
      const audioUrl = await textToSpeech(text, {
        voiceId: "21m00Tcm4TlvDq8ikWAM", // Default voice ID
      });
      
      // Play audio if a valid URL is returned
      if (audioUrl && audioUrl !== "mock-audio-url.mp3") {
        const audio = new Audio(audioUrl);
        
        audio.onended = () => {
          setIsPlaying(false);
          // Revoke the object URL to free up memory
          URL.revokeObjectURL(audioUrl);
        };
        
        audio.onerror = () => {
          setIsPlaying(false);
          toast.error("Failed to play audio response.");
          // Revoke the object URL to free up memory
          URL.revokeObjectURL(audioUrl);
        };
        
        await audio.play();
        toast.success("Playing voice response...");
      } else {
        // For mock implementation, simulate playback
        simulateVoicePlayback(text);
      }
    } catch (error) {
      setIsPlaying(false);
      toast.error("Failed to generate or play voice response.");
      console.error("Text-to-speech error:", error);
    }
  };

  const simulateVoicePlayback = (text: string) => {
    toast.info("Playing voice response...");
    
    // Calculate a reasonable duration based on text length
    const duration = Math.min(Math.max(text.length * 50, 2000), 8000);
    
    setTimeout(() => {
      setIsPlaying(false);
    }, duration);
  };

  return {
    messages,
    inputValue,
    isListening,
    isTyping,
    isPlaying,
    setInputValue,
    handleSendMessage,
    handleStartListening,
  };
};
