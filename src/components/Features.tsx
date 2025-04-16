
import { Brain, Mic, Volume2, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";

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
      icon: Volume2
    },
    {
      title: "Healthcare Knowledge Base",
      description: "Trained on expert healthcare content to provide reliable caregiver support.",
      icon: BookOpen
    }
  ];

  return (
    <div className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-beatriz to-beatriz-dark bg-clip-text text-transparent">
          How Beatriz Works
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Our voice-first AI assistant combines cutting-edge technologies to provide 
          natural and helpful caregiver support.
        </p>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-none bg-white/50 backdrop-blur-sm"
            >
              <div className="bg-gradient-to-br from-beatriz/10 to-beatriz-accent/10 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
                <feature.icon className="w-8 h-8 text-beatriz" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>

        <div className="mt-32">
          <Card className="bg-gradient-to-br from-beatriz-light to-white p-12 border-none shadow-xl">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-2/3">
                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                  Specialized in Dementia Care Support
                </h3>
                <p className="text-xl mb-8 text-gray-600">
                  Beatriz is specially trained to assist caregivers of people with dementia, 
                  providing practical advice on daily challenges like sundowning, 
                  communication strategies, and maintaining quality of life.
                </p>
                <ul className="space-y-4">
                  {["24/7 availability", "Evidence-based guidance", "Personalized support", "No judgement or fatigue"].map((item, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <span className="bg-gradient-to-br from-beatriz to-beatriz-accent rounded-full p-1 mr-3">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:w-1/3">
                <Card className="bg-white shadow-2xl border-none">
                  <div className="bg-gradient-to-r from-beatriz to-beatriz-dark p-6 rounded-t-lg">
                    <p className="font-medium text-white mb-2">Example Question:</p>
                    <p className="italic text-white/90">"How can I help my mom with sundowning?"</p>
                  </div>
                  <div className="p-6 bg-gray-50 rounded-b-lg">
                    <p className="font-medium text-gray-900 mb-4">Beatriz might suggest:</p>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-beatriz-accent"></span>
                        Maintain a consistent daily routine
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-beatriz-accent"></span>
                        Increase lighting before sunset
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-beatriz-accent"></span>
                        Reduce noise and stimulation
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-beatriz-accent"></span>
                        Play calming music
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-beatriz-accent"></span>
                        Create a safe, comfortable environment
                      </li>
                    </ul>
                  </div>
                </Card>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
