
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onStartDemo: () => void;
  showDemo: boolean;
}

export const HeroSection = ({ onStartDemo, showDemo }: HeroSectionProps) => {
  return (
    <header className="relative bg-gradient-to-br from-beatriz-dark to-beatriz overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:20px_20px]" />
      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center gap-4 mb-8 justify-center md:justify-start">
              <div className="h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-white/10 backdrop-blur-sm p-1 ring-1 ring-white/20">
                <img 
                  src="/lovable-uploads/5b3a563c-5a26-45e4-b15b-7dec2aca195e.png" 
                  alt="Beatriz Avatar" 
                  className="h-full w-full object-cover rounded-xl"
                />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">Beatriz</h1>
                <p className="text-white/80">Virtual Caregiver Assistant</p>
              </div>
            </div>
            
            {!showDemo && (
              <div className="max-w-2xl mx-auto md:mx-0">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  Your AI Healthcare Companion
                </h2>
                <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
                  Get expert caregiver support through natural voice conversations with Beatriz, 
                  your 24/7 virtual assistant trained on healthcare knowledge.
                </p>
                <div className="flex gap-4 justify-center md:justify-start">
                  <Button 
                    onClick={onStartDemo} 
                    size="lg"
                    className="bg-white text-beatriz-dark hover:bg-white/90 text-lg px-8"
                  >
                    Try Beatriz Now
                  </Button>
                  <Button 
                    variant="outline"
                    size="lg"
                    className="border-white/20 text-white hover:bg-white/10 text-lg px-8"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {showDemo && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <span className="text-white mr-3">Voice Active</span>
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-beatriz-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-beatriz-accent"></span>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
