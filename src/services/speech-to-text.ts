/**
 * Speech-to-text service using Web Speech API for real-time transcription
 */

interface TranscriptionResponse {
  text: string;
  error?: string;
}

// Mock healthcare knowledge to help with response generation in dev mode
const HEALTHCARE_TOPICS = ["sundowning", "medication management", "communication", "activities", "caregiver stress"];

/**
 * Creates a SpeechRecognition instance.
 * Falls back to webkitSpeechRecognition if necessary.
 */
export const createSpeechRecognition = (): SpeechRecognition | null => {
  if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
    console.error("Speech recognition not supported in this browser");
    return null;
  }

  const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
  return new SpeechRecognitionAPI();
};

/**
 * Starts real-time speech recognition
 * @param onInterimResult Callback for interim results
 * @param onFinalResult Callback for final result
 * @param onError Callback for errors
 * @returns The SpeechRecognition instance or null if not supported
 */
export const startSpeechRecognition = (
  onInterimResult: (text: string) => void,
  onFinalResult: (text: string) => void,
  onError?: (error: string) => void
): SpeechRecognition | null => {
  const recognition = createSpeechRecognition();
  
  if (!recognition) {
    if (onError) onError("Speech recognition not supported in this browser");
    return null;
  }
  
  // Configure the recognition
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';
  
  // Handle results
  recognition.onresult = (event) => {
    let interimTranscript = '';
    let finalTranscript = '';
    
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      
      if (event.results[i].isFinal) {
        finalTranscript += transcript;
      } else {
        interimTranscript += transcript;
      }
    }
    
    if (interimTranscript) {
      onInterimResult(interimTranscript);
    }
    
    if (finalTranscript) {
      onFinalResult(finalTranscript);
    }
  };
  
  // Handle errors
  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    if (onError) onError(event.error);
  };
  
  // Start recognition
  try {
    recognition.start();
  } catch (error) {
    console.error("Failed to start speech recognition:", error);
    if (onError) onError("Failed to start speech recognition");
    return null;
  }
  
  return recognition;
};

/**
 * Stops speech recognition
 * @param recognition The SpeechRecognition instance to stop
 */
export const stopSpeechRecognition = (recognition: SpeechRecognition | null): void => {
  if (recognition) {
    try {
      recognition.stop();
    } catch (error) {
      console.error("Error stopping speech recognition:", error);
    }
  }
};

/**
 * Legacy function to maintain compatibility with existing code
 * @param audioBlob The audio blob to transcribe
 * @returns Promise resolving to the transcribed text
 */
export const speechToText = async (audioBlob: Blob): Promise<string> => {
  console.log("Using fallback speechToText method - consider using real-time recognition instead");
  return mockSpeechToText(audioBlob);
};

/**
 * Legacy function to maintain compatibility with existing code
 * @param audioChunks Array of audio chunks to transcribe
 * @param onTranscription Callback for transcription updates
 */
export const streamToWhisper = async (
  audioChunks: Blob[],
  onTranscription: (text: string) => void
): Promise<void> => {
  console.log("Using fallback streamToWhisper method - consider using real-time recognition instead");
  return mockStreamToWhisper(audioChunks, onTranscription);
};

/**
 * Mock implementation for development purposes
 */
const mockSpeechToText = async (audioBlob: Blob): Promise<string> => {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return a random healthcare-related question
  const topics = [
    "How can I help my mom with sundowning?",
    "What are some tips for medication management?",
    "How do I communicate better with someone who has dementia?",
    "What activities are good for dementia patients?",
    "How can I deal with caregiver stress?"
  ];
  
  return topics[Math.floor(Math.random() * topics.length)];
};

/**
 * Mock implementation for streaming transcription
 */
const mockStreamToWhisper = async (
  audioChunks: Blob[],
  onTranscription: (text: string) => void
): Promise<void> => {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const mockText = "This is a mock transcription of your voice input.";
  onTranscription(mockText);
};
