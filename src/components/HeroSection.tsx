import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface HeroSectionProps {
  onStartDemo: () => void;
  showDemo: boolean;
}

export const HeroSection = ({ onStartDemo, showDemo }: HeroSectionProps) => {
  return (
    <header className="relative bg-white mt-16"> {/* Added top margin */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-transparent" />
      <div className="relative container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-8">
          {showDemo ? (
            <div className="w-full flex items-center justify-between">
              <Button 
                variant="outline" 
                onClick={() => window.location.href = '/'}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
              <h1 className="text-2xl font-semibold text-gray-900">
                Chat with Beatriz
              </h1>
              <Button variant="outline">
                Contact Support
              </Button>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-center justify-between w-full gap-16">
              <div className="flex-1 text-center md:text-left max-w-2xl mx-auto md:mx-0">
                <div className="mb-8 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-black/5">
                  <div className="h-8 w-8 rounded-full bg-black p-0.5">
                    <img 
                      src="/lovable-uploads/193f56c2-01c0-492f-a435-4eb3950c0277.png" 
                      alt="Beatriz Avatar" 
                      className="h-full w-full object-cover rounded-full"
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-600">Introducing Beatriz</p>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-semibold text-gray-900 tracking-tight mb-6 leading-[1.1]">
                  The future of healthcare assistance
                </h1>
                <p className="text-xl md:text-2xl text-gray-500 mb-10 leading-relaxed max-w-xl">
                  Experience personalized caregiver support through natural voice conversations 
                  with our AI-powered assistant.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Button 
                    onClick={onStartDemo} 
                    size="lg"
                    className="bg-gray-900 hover:bg-gray-800 text-white text-lg px-8 h-14 rounded-full"
                  >
                    Try Beatriz
                  </Button>
                  <Button 
                    variant="outline"
                    size="lg"
                    className="border-gray-200 text-gray-900 hover:bg-gray-50 text-lg px-8 h-14 rounded-full"
                  >
                    Watch the demo
                  </Button>
                </div>
              </div>
              
              {/* New placeholder image section */}
              <div className="hidden md:block flex-1">
                <img 
                  src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81" 
                  alt="Healthcare technology" 
                  className="w-full max-w-md h-auto object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
