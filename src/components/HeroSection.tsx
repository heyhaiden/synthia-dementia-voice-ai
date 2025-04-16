
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onStartDemo: () => void;
  showDemo: boolean;
}

export const HeroSection = ({ onStartDemo, showDemo }: HeroSectionProps) => {
  return (
    <header className="relative bg-white">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-transparent" />
      <div className="relative container mx-auto px-4 py-24 md:py-32">
        <div className="flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="flex-1 text-center md:text-left max-w-2xl mx-auto md:mx-0">
            <div className="mb-8 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-black/5">
              <div className="h-8 w-8 rounded-full bg-black p-0.5">
                <img 
                  src="/lovable-uploads/5b3a563c-5a26-45e4-b15b-7dec2aca195e.png" 
                  alt="Beatriz Avatar" 
                  className="h-full w-full object-cover rounded-full"
                />
              </div>
              <p className="text-sm font-medium text-gray-600">Introducing Beatriz</p>
            </div>
            
            {!showDemo && (
              <>
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
              </>
            )}
          </div>
          
          {showDemo && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-black/5 backdrop-blur-sm rounded-full px-6 py-3">
                <span className="text-gray-900 mr-3 font-medium">Voice Active</span>
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-600"></span>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
