# Synthia - AI-Powered Healthcare Assistant
![Synthia Hero](public/lovable-uploads/synthia_hero_screenshot.png)

## Overview

Synthia is a real-time voice AI assistant that combines OpenAI's Whisper for speech-to-text, ElevenLabs for text-to-speech, and GPT-4 for natural conversation. The platform delivers an empathetic and intelligent virtual assistant specifically trained for healthcare scenarios, with a focus on dementia care support.

## Demo

### Chat Interface
![Chat Interface](public/lovable-uploads/synthia_demo_screenshot.png)

### Video Playthrough
[Watch Demo Video](https://www.loom.com/share/b0935f9d8f7b40518a36d53fe47cc6b8?sid=020f482d-0a09-4e26-8a42-66f3eb6a1489)

## Technical Architecture

### AI & Voice Processing Stack
- **Language Model**: OpenAI GPT-4o-mini for contextual understanding and natural conversation
- **Speech-to-Text**: OpenAI Whisper API for accurate voice transcription
- **Text-to-Speech**: ElevenLabs API for natural, human-like voice synthesis
- **Audio Processing**: Web Audio API for real-time audio handling and playback

### Core AI Features
- Real-time voice recognition using OpenAI Whisper
- Natural voice synthesis powered by ElevenLabs
- Contextual AI responses using OpenAI GPT-4
- Seamless voice conversation pipeline
- Healthcare-specific conversation context

### Project Structure
```
src/
├── services/      # AI and voice processing integrations
│   ├── ai-services.ts    # OpenAI GPT-4 integration
│   ├── speech-to-text.ts # OpenAI Whisper integration
│   └── text-to-speech.ts # ElevenLabs integration
└── types/         # TypeScript type definitions
```

## Next Steps

### Immediate Priorities
1. Implement comprehensive error handling for AI service failures
2. Expand the healthcare knowledge base with domain-specific training
3. Optimize voice processing latency
4. Implement conversation history persistence
5. Add fallback mechanisms for API outages

### Future Enhancements
1. Multi-language support with Whisper's multilingual capabilities
2. Custom voice model training with ElevenLabs
3. Fine-tuned GPT models for healthcare-specific responses
4. Integration with healthcare APIs for real-time data
