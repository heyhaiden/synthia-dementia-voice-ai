/**
 * Text-to-speech service using ElevenLabs API
 */

interface ElevenLabsOptions {
  voiceId: string;
  model?: string;
  stability?: number;
  similarityBoost?: number;
}

/**
 * Converts text to speech using ElevenLabs API
 * @param text The text to convert to speech
 * @param options Configuration for the ElevenLabs voice
 * @returns Promise resolving to the URL of the generated audio
 */
export const textToSpeech = async (
  text: string, 
  options: ElevenLabsOptions = {
    voiceId: import.meta.env.VITE_ELEVENLABS_VOICE_ID || "21m00Tcm4TlvDq8ikWAM", // Use env variable or default
    model: "eleven_monolingual_v1",
    stability: 0.5,
    similarityBoost: 0.75
  }
): Promise<string> => {
  const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;
  
  // For development, return mock results if no API key is available
  if (!apiKey) {
    console.log("Dev mode: Using mock text-to-speech response");
    return mockTextToSpeech(text, options.voiceId);
  }
  
  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${options.voiceId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": apiKey
        },
        body: JSON.stringify({
          text,
          model_id: options.model || "eleven_monolingual_v1",
          voice_settings: {
            stability: options.stability || 0.5,
            similarity_boost: options.similarityBoost || 0.75
          }
        })
      }
    );
    
    if (!response.ok) {
      const error = await response.text();
      console.error("Text-to-speech API error:", error);
      throw new Error(`Text-to-speech error: ${error || "Unknown error"}`);
    }
    
    // Get audio blob
    const audioBlob = await response.blob();
    
    // Create a URL for the audio blob
    const audioUrl = URL.createObjectURL(audioBlob);
    return audioUrl;
  } catch (error) {
    console.error("Failed to convert text to speech:", error);
    throw new Error("Failed to generate speech. Please try again.");
  }
};

/**
 * Mock implementation for development purposes
 */
const mockTextToSpeech = async (text: string, voiceId: string): Promise<string> => {
  console.log(`Converting text to speech using voice ID: ${voiceId}`);
  
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return a mock audio URL - in a real implementation, this would be a Blob URL
  return "mock-audio-url.mp3";
};
