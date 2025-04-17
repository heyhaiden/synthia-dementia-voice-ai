
/**
 * Speech-to-text service using Deepgram API with sentiment analysis
 */

// Mock healthcare knowledge to help with response generation in dev mode
const HEALTHCARE_TOPICS = ["sundowning", "medication management", "communication", "activities", "caregiver stress"];

// Interface for the sentiment analysis results
export interface SentimentAnalysis {
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
}

// Interface for the speech-to-text results including sentiment
export interface SpeechToTextResult {
  text: string;
  sentiment: SentimentAnalysis;
}

/**
 * Converts speech audio to text using Deepgram API and analyzes sentiment
 * @param audioBlob The audio blob to transcribe
 * @returns Promise resolving to the transcribed text and sentiment analysis
 */
export const speechToText = async (audioBlob: Blob): Promise<SpeechToTextResult> => {
  const apiKey = import.meta.env.VITE_DEEPGRAM_API_KEY;
  
  // For development, return mock results if no API key is available
  if (!apiKey) {
    console.log("Dev mode: Using mock speech-to-text response with sentiment");
    return mockSpeechToText(audioBlob);
  }
  
  try {
    // Prepare the audio data
    const arrayBuffer = await audioBlob.arrayBuffer();
    
    // Configure Deepgram API options for sentiment analysis
    const options = {
      punctuate: true,
      model: "nova-2",
      language: "en",
      detect_language: false,
      smart_format: true,
      diarize: false,
      utterances: false,
      sentiment: true  // Enable sentiment analysis
    };
    
    // Construct the URL with query parameters
    const queryParams = new URLSearchParams(options as any).toString();
    const url = `https://api.deepgram.com/v1/listen?${queryParams}`;
    
    // Send request to Deepgram API
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Token ${apiKey}`,
        "Content-Type": "audio/webm"
      },
      body: new Uint8Array(arrayBuffer)
    });
    
    if (!response.ok) {
      const error = await response.json();
      console.error("Speech-to-text API error:", error);
      throw new Error(`Speech-to-text error: ${error.error || "Unknown error"}`);
    }
    
    const data = await response.json();
    
    // Extract transcription and sentiment data
    const text = data.results?.channels[0]?.alternatives[0]?.transcript || "";
    
    // Extract sentiment data from the response
    const sentimentData = data.results?.channels[0]?.alternatives[0]?.sentiment || {};
    
    // Map Deepgram sentiment to our format
    let sentiment: SentimentAnalysis = {
      sentiment: 'neutral',
      score: 0
    };
    
    if (sentimentData && typeof sentimentData.sentiment === 'string') {
      sentiment = {
        sentiment: sentimentData.sentiment as 'positive' | 'negative' | 'neutral',
        score: sentimentData.score || 0
      };
    }
    
    console.log("Deepgram transcription:", text);
    console.log("Sentiment analysis:", sentiment);
    
    return {
      text,
      sentiment
    };
  } catch (error) {
    console.error("Failed to transcribe audio:", error);
    throw new Error("Failed to transcribe audio. Please try again.");
  }
};

/**
 * Mock implementation for development purposes with sentiment analysis
 */
const mockSpeechToText = async (audioBlob: Blob): Promise<SpeechToTextResult> => {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return a random healthcare-related question with mock sentiment
  const topics = [
    {
      text: "How can I help my mom with sundowning?",
      sentiment: { sentiment: 'neutral', score: 0.1 }
    },
    {
      text: "What are some tips for medication management?",
      sentiment: { sentiment: 'neutral', score: 0.2 }
    },
    {
      text: "I'm feeling really overwhelmed with all these caregiving responsibilities.",
      sentiment: { sentiment: 'negative', score: -0.7 }
    },
    {
      text: "We had a great day today, she remembered my name!",
      sentiment: { sentiment: 'positive', score: 0.8 }
    },
    {
      text: "How can I deal with caregiver stress?",
      sentiment: { sentiment: 'negative', score: -0.4 }
    }
  ];
  
  const randomResponse = topics[Math.floor(Math.random() * topics.length)];
  
  return {
    text: randomResponse.text,
    sentiment: randomResponse.sentiment as SentimentAnalysis
  };
};
