
/**
 * Speech-to-text service using OpenAI Whisper API
 */

// Mock healthcare knowledge to help with response generation in dev mode
const HEALTHCARE_TOPICS = ["sundowning", "medication management", "communication", "activities", "caregiver stress"];

/**
 * Converts speech audio to text using OpenAI's Whisper API
 * @param audioBlob The audio blob to transcribe
 * @returns Promise resolving to the transcribed text
 */
export const speechToText = async (audioBlob: Blob): Promise<string> => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  // For development, return mock results if no API key is available
  if (!apiKey) {
    console.log("Dev mode: Using mock speech-to-text response");
    return mockSpeechToText(audioBlob);
  }
  
  try {
    const formData = new FormData();
    formData.append("file", audioBlob, "audio.webm");
    formData.append("model", "whisper-1");
    
    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`
      },
      body: formData
    });
    
    if (!response.ok) {
      const error = await response.json();
      console.error("Speech-to-text API error:", error);
      throw new Error(`Speech-to-text error: ${error.error?.message || "Unknown error"}`);
    }
    
    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("Failed to transcribe audio:", error);
    throw new Error("Failed to transcribe audio. Please try again.");
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
