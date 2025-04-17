/**
 * Text-to-speech service using ElevenLabs API
 */

interface ElevenLabsOptions {
  voiceId: string;
  model?: string;
  stability?: number;
  similarityBoost?: number;
}

// Maximum characters per chunk for optimal processing
const CHUNK_SIZE = 200;

/**
 * Splits text into chunks for parallel processing
 */
const chunkText = (text: string): string[] => {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const chunks: string[] = [];
  let currentChunk = '';

  for (const sentence of sentences) {
    if (currentChunk.length + sentence.length > CHUNK_SIZE) {
      if (currentChunk) chunks.push(currentChunk.trim());
      currentChunk = sentence;
    } else {
      currentChunk += sentence;
    }
  }
  
  if (currentChunk) chunks.push(currentChunk.trim());
  return chunks;
};

/**
 * Converts text to speech using ElevenLabs API
 * @param text The text to convert to speech
 * @param options Configuration for the ElevenLabs voice
 * @returns Promise resolving to the URL of the generated audio
 */
export const textToSpeech = async (
  text: string, 
  options: ElevenLabsOptions = {
    voiceId: import.meta.env.VITE_ELEVENLABS_VOICE_ID,
    model: "eleven_flash_2.5",
    stability: 0.4,
    similarityBoost: 0.75
  }
): Promise<string> => {
  const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;
  
  if (!apiKey) {
    console.error("ElevenLabs API key is not set in environment variables");
    throw new Error("API key is required for text-to-speech");
  }
  
  // For development, return mock results if no API key is available
  if (!apiKey) {
    console.log("Dev mode: Using mock text-to-speech response");
    return mockTextToSpeech(text, options.voiceId);
  }
  
  try {
    // Split text into chunks
    const chunks = chunkText(text);
    
    // Process chunks in parallel
    const audioPromises = chunks.map(chunk => 
      fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${options.voiceId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "xi-api-key": apiKey
          },
          body: JSON.stringify({
            text: chunk,
            model_id: options.model,
            voice_settings: {
              stability: options.stability,
              similarity_boost: options.similarityBoost
            }
          })
        }
      ).then(response => {
        if (!response.ok) {
          throw new Error(`Chunk processing failed: ${response.statusText}`);
        }
        return response.blob();
      })
    );
    
    // Wait for all chunks to be processed
    const audioBlobs = await Promise.all(audioPromises);
    
    // Combine all blobs into one
    const combinedBlob = new Blob(audioBlobs, { type: 'audio/mpeg' });
    return URL.createObjectURL(combinedBlob);
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
