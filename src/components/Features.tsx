import { Brain, Mic, Volume2, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";

export const Features = () => {
  const features = [
    {
      title: "Advanced Speech Recognition",
      description: "Natural language processing that understands context and nuance.",
      icon: Mic
    },
    {
      title: "AI-Powered Conversations",
      description: "Contextually aware responses powered by advanced language models.",
      icon: Brain
    },
    {
      title: "Natural Voice Synthesis",
      description: "Human-like voice responses that feel natural and engaging.",
      icon: Volume2
    },
    {
      title: "Healthcare Knowledge",
      description: "Comprehensive medical knowledge base for accurate support.",
      icon: BookOpen
    }
  ];

  return (
    <div className="py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 tracking-tight mb-6">
            Intelligence meets empathy
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Synthia combines cutting-edge AI with healthcare expertise to provide 
            compassionate and reliable caregiver support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 border-0 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="bg-black/5 rounded-2xl w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-gray-900" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>

        <div className="mt-32">
          <Card className="p-12 rounded-3xl bg-gradient-to-b from-gray-50 to-white border-0 shadow-2xl">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-2/3">
                <h3 className="text-3xl md:text-4xl font-semibold mb-6 text-gray-900 tracking-tight">
                  Specialized in Dementia Care
                </h3>
                <p className="text-xl mb-8 text-gray-500">
                  Get expert guidance on managing daily challenges, communication strategies, 
                  and maintaining quality of life for both caregivers and patients.
                </p>
                <ul className="space-y-4">
                  {[
                    "24/7 availability",
                    "Evidence-based guidance",
                    "Personalized support",
                    "Continuous learning"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <span className="bg-black/5 rounded-full p-1 mr-3">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:w-1/3">
                <Card className="rounded-2xl overflow-hidden shadow-xl border-0">
                  <div className="bg-gray-900 p-6">
                    <p className="text-gray-400 mb-2">Example Conversation</p>
                    <p className="text-white font-medium">"How can I help with sundowning?"</p>
                  </div>
                  <div className="p-6 bg-white">
                    <p className="font-medium text-gray-900 mb-4">Synthia suggests:</p>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                        Maintain consistent routines
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                        Adjust lighting gradually
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                        Create a calming environment
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                        Minimize evening activities
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                        Track and adapt strategies
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
