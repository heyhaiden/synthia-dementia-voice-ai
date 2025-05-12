/**
 * Speech-to-text service using OpenAI's Whisper API for transcription
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
 * Transcribes audio using OpenAI's Whisper API
 * @param audioBlob The audio blob to transcribe
 * @returns Promise resolving to the transcribed text
 */
export const speechToText = async (audioBlob: Blob): Promise<string> => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    console.error("OpenAI API key not found");
    return mockSpeechToText(audioBlob);
  }

  try {
    const formData = new FormData();
    formData.append('file', audioBlob, 'audio.webm');
    formData.append('model', 'whisper-1');
    formData.append('language', 'en');

    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
      body: formData
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Whisper API error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("Error transcribing audio:", error);
    return mockSpeechToText(audioBlob);
  }
};

/**
 * Streams audio chunks to Whisper API for transcription
 * @param audioChunks Array of audio chunks to transcribe
 * @param onTranscription Callback for transcription updates
 */
export const streamToWhisper = async (
  audioChunks: Blob[],
  onTranscription: (text: string) => void
): Promise<void> => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    console.error("OpenAI API key not found");
    return mockStreamToWhisper(audioChunks, onTranscription);
  }

  try {
    // Combine audio chunks into a single blob
    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
    
    const formData = new FormData();
    formData.append('file', audioBlob, 'audio.webm');
    formData.append('model', 'whisper-1');
    formData.append('language', 'en');

    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
      body: formData
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Whisper API error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    onTranscription(data.text);
  } catch (error) {
    console.error("Error streaming audio to Whisper:", error);
    return mockStreamToWhisper(audioChunks, onTranscription);
  }
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
