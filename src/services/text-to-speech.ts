/**
 * Text-to-speech service using ElevenLabs API
 */

// Maximum characters per chunk for optimal processing
const CHUNK_SIZE = 200;

interface ElevenLabsOptions {
  voiceId: string;
  modelId?: string;
  stability?: number;
  similarityBoost?: number;
  style?: number;
  useSpeakerBoost?: boolean;
  outputFormat?: string;
  speed?: number;
}

// Split text into chunks for optimal processing
function chunkText(text: string, maxChunkSize: number = CHUNK_SIZE): string[] {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const chunks: string[] = [];
  let currentChunk = '';

  for (const sentence of sentences) {
    if (currentChunk.length + sentence.length <= maxChunkSize) {
      currentChunk += sentence;
    } else {
      if (currentChunk) chunks.push(currentChunk.trim());
      currentChunk = sentence;
    }
  }
  if (currentChunk) chunks.push(currentChunk.trim());
  return chunks;
}

/**
 * Stream text to speech using ElevenLabs API
 * @param text Text to convert to speech
 * @param options Voice options
 * @param onChunk Callback for each audio chunk
 * @returns Promise that resolves when streaming is complete
 */
export async function streamTextToSpeech(
  text: string,
  options: ElevenLabsOptions,
  onChunk: (chunk: Uint8Array) => void
): Promise<void> {
  const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;
  if (!apiKey) {
    throw new Error('ElevenLabs API key not found');
  }

  const chunks = chunkText(text);
  const baseUrl = 'https://api.elevenlabs.io/v1/text-to-speech';
  const voiceId = options.voiceId;

  for (const chunk of chunks) {
    const response = await fetch(`${baseUrl}/${voiceId}/stream`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': apiKey
      },
      body: JSON.stringify({
        text: chunk,
        model_id: options.modelId || 'eleven_multilingual_v2',
        voice_settings: {
          stability: options.stability || 0.3,
          similarity_boost: options.similarityBoost || 0.5,
          style: options.style || 0.0,
          use_speaker_boost: options.useSpeakerBoost || true
        }
      })
    });

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.statusText}`);
    }

    if (!response.body) {
      throw new Error('No response body available');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) {
        onChunk(value);
      }
    }
  }
}

/**
 * Convert text to speech using ElevenLabs API
 * @param text Text to convert to speech
 * @param options Voice options
 * @returns Promise that resolves to an AudioBuffer
 */
export async function textToSpeech(
  text: string,
  options: ElevenLabsOptions
): Promise<AudioBuffer> {
  const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;
  if (!apiKey) {
    throw new Error('ElevenLabs API key not found');
  }

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${options.voiceId}?output_format=mp3_44100_128`,
    {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': apiKey
      },
      body: JSON.stringify({
        text,
        model_id: options.modelId || 'eleven_multilingual_v2',
        voice_settings: {
          stability: options.stability || 0.3,
          similarity_boost: options.similarityBoost || 0.5,
          style: 0.0,
          use_speaker_boost: true,
          speaking_rate: options.speed || 1.0
        }
      })
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      `ElevenLabs API error: ${response.statusText}${
        errorData ? ` - ${JSON.stringify(errorData)}` : ''
      }`
    );
  }

  const audioData = await response.arrayBuffer();
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  return audioContext.decodeAudioData(audioData);
}

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
