import { useState } from "react";
// import { toast } from "sonner";  // Commented out to prevent toasts
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

// Maximum number of user messages allowed in the demo
const MAX_USER_MESSAGES = 5;

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userMessageCount, setUserMessageCount] = useState(0);
  const [isDemoEnded, setIsDemoEnded] = useState(false);

  const isMessageLimitReached = userMessageCount >= MAX_USER_MESSAGES;

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isMessageLimitReached || isDemoEnded) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      type: MessageType.USER,
      content: inputValue,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    
    const newUserMessageCount = userMessageCount + 1;
    setUserMessageCount(newUserMessageCount);
    
    try {
      // If this is the last allowed message, ask for a closing message
      let messagesToSend = [...messages, userMessage];
      let currentSystemPrompt;
      
      if (newUserMessageCount >= MAX_USER_MESSAGES) {
        // Add system message to prompt the AI to wrap up the conversation
        currentSystemPrompt = `As a sophisticated AI, your primary role is to embody the essence, personality, backstory, and motivations of Beatriz, an older woman living with progressive Alzheimers disease. This is the final message in our conversation. Please provide a warm, contextually relevant goodbye that acknowledges what we've discussed, written in the first person as Beatriz. Keep it to two sentences.`;
      }
      
      // Send to language model to get response
      const assistantMessage = await processMessage(messagesToSend, currentSystemPrompt);
      
      setIsTyping(false);
      setMessages(prev => [...prev, assistantMessage]);
      
      // Generate voice response if text-to-speech is available
      if (assistantMessage.content) {
        handleTextToSpeech(assistantMessage.content);
      }
      
      // If we've reached the message limit, mark the demo as ended
      if (newUserMessageCount >= MAX_USER_MESSAGES) {
        setTimeout(() => {
          setIsDemoEnded(true);
          // Commented out toast to disable popup
          // toast.info("This demo is limited to 5 messages. Thank you for trying the experience!");
        }, 1000);
      }
    } catch (error) {
      setIsTyping(false);
      // Commented out toast to disable popup
      // toast.error("Failed to get a response. Please try again.");
      console.error("Error processing message:", error);
    }
  };

  const handleStartListening = async () => {
    if (isMessageLimitReached || isDemoEnded) {
      // Commented out toast to disable popup
      // toast.info("This demo is limited to 5 messages. Thank you for trying the experience!");
      return;
    }
    
    setIsListening(true);
    // Commented out toast to disable popup
    // toast.info("Listening...");
    
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
          // Commented out toast to disable popup
          // toast.info("Processing your voice...");
          const text = await speechToText(audioBlob);
          
          if (text) {
            // Commented out toast to disable popup
            // toast.success("Voice captured!");
            setInputValue(text);
            
            // Automatically send message after a short delay
            setTimeout(() => {
              handleSendMessage();
            }, 500);
          } else {
            // Commented out toast to disable popup
            // toast.error("Could not recognize speech. Please try again.");
          }
        } catch (error) {
          // Commented out toast to disable popup
          // toast.error("Failed to process audio. Please try again.");
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
      // Commented out toast to disable popup
      // toast.error("Could not access microphone. Please check permissions.");
      console.error("Microphone access error:", error);
    }
  };

  const handleTextToSpeech = async (text: string) => {
    try {
      setIsPlaying(true);
      // Commented out toast to disable popup
      // toast.info("Generating voice response...");
      
      // Convert text to speech
      const audioUrl = await textToSpeech(text, {
        voiceId: import.meta.env.VITE_ELEVENLABS_VOICE_ID, // Use environment variable
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
          // Commented out toast to disable popup
          // toast.error("Failed to play audio response.");
          // Revoke the object URL to free up memory
          URL.revokeObjectURL(audioUrl);
        };
        
        await audio.play();
        // Commented out toast to disable popup
        // toast.success("Playing voice response...");
      } else {
        // For mock implementation, simulate playback
        simulateVoicePlayback(text);
      }
    } catch (error) {
      setIsPlaying(false);
      // Commented out toast to disable popup
      // toast.error("Failed to generate or play voice response.");
      console.error("Text-to-speech error:", error);
    }
  };

  const simulateVoicePlayback = (text: string) => {
    // toast.info("Playing voice response...");
    
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
    isMessageLimitReached,
    isDemoEnded,
    setInputValue,
    handleSendMessage,
    handleStartListening,
  };
};
