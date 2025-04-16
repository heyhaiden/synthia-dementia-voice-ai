
export enum MessageType {
  USER = "user",
  ASSISTANT = "assistant",
  SYSTEM = "system"
}

export interface Message {
  id: string;
  type: MessageType;
  content: string;
  timestamp: string;
  audioUrl?: string;
}

export interface ElevenLabsVoiceConfig {
  voiceId: string;
  model: string;
  stability: number;
  similarityBoost: number;
}

export interface ChatConfig {
  apiKey?: string;
  voiceConfig?: ElevenLabsVoiceConfig;
  systemPrompt?: string;
}
