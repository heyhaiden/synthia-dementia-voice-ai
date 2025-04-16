
import { Brain, Mic, VoiceNetwork, BookOpen } from "lucide-react";

export const Features = () => {
  const features = [
    {
      title: "Advanced Speech Recognition",
      description: "Beatriz understands natural speech with high accuracy, eliminating the need for typing.",
      icon: Mic
    },
    {
      title: "AI-Powered Conversations",
      description: "Powered by state-of-the-art language models to provide contextually relevant responses.",
      icon: Brain
    },
    {
      title: "Lifelike Voice Responses",
      description: "Natural-sounding voice responses that feel like talking to a real caregiver assistant.",
      icon: VoiceNetwork
    },
    {
      title: "Healthcare Knowledge Base",
      description: "Trained on expert healthcare content to provide reliable caregiver support.",
      icon: BookOpen
    }
  ];

  return (
    <div className="py-12">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-beatriz-dark">How Beatriz Works</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Our voice-first AI assistant combines cutting-edge technologies to provide 
          natural and helpful caregiver support.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
          >
            <div className="bg-beatriz/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <feature.icon className="w-8 h-8 text-beatriz" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-beatriz-dark">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-20 bg-beatriz-light rounded-2xl p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-8 md:mb-0 md:pr-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-beatriz-dark">
              Specialized in Dementia Care Support
            </h3>
            <p className="text-lg mb-6">
              Beatriz is specially trained to assist caregivers of people with dementia, 
              providing practical advice on daily challenges like sundowning, 
              communication strategies, and maintaining quality of life.
            </p>
            <ul className="space-y-2">
              {["24/7 availability", "Evidence-based guidance", "Personalized support", "No judgement or fatigue"].map((item, i) => (
                <li key={i} className="flex items-center">
                  <span className="bg-beatriz-accent rounded-full p-1 mr-3">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:w-1/3 bg-white p-5 rounded-xl shadow-lg">
            <div className="bg-beatriz rounded-lg p-4 text-white">
              <p className="font-medium">Example Question:</p>
              <p className="italic mt-2">"How can I help my mom with sundowning?"</p>
            </div>
            <div className="mt-4 bg-gray-50 rounded-lg p-4">
              <p className="font-medium text-beatriz-dark">Beatriz might suggest:</p>
              <ul className="mt-2 space-y-2 text-sm">
                <li>• Maintain a consistent daily routine</li>
                <li>• Increase lighting before sunset</li>
                <li>• Reduce noise and stimulation</li>
                <li>• Play calming music</li>
                <li>• Create a safe, comfortable environment</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
