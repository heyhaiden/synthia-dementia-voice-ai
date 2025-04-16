
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onStartDemo: () => void;
  showDemo: boolean;
}

export const HeroSection = ({ onStartDemo, showDemo }: HeroSectionProps) => {
  return (
    <header className="bg-gradient-to-br from-beatriz to-beatriz-dark text-white">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-6 md:mb-0">
            <div className="h-14 w-14 md:h-20 md:w-20 rounded-full bg-white p-1 mr-4">
              <img 
                src="/lovable-uploads/5b3a563c-5a26-45e4-b15b-7dec2aca195e.png" 
                alt="Beatriz Avatar" 
                className="h-full w-full object-cover rounded-full"
              />
            </div>
            <div>
              <h1 className="text-2xl md:text-4xl font-bold">Beatriz</h1>
              <p className="text-sm md:text-base mt-1">Virtual Caregiver Assistant</p>
            </div>
          </div>
          
          <div className="flex space-x-4">
            {!showDemo ? (
              <Button 
                onClick={onStartDemo} 
                className="bg-beatriz-accent text-beatriz-dark hover:bg-opacity-90 transition-all"
              >
                Try Beatriz Now
              </Button>
            ) : (
              <div className="flex items-center bg-beatriz-accent/20 rounded-lg px-4 py-2">
                <span className="mr-2">Voice Active</span>
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-beatriz-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-beatriz-accent"></span>
                </span>
              </div>
            )}
          </div>
        </div>
        
        {!showDemo && (
          <div className="mt-12 md:mt-20 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Your AI Healthcare Companion</h2>
            <p className="text-lg md:text-xl mb-8">
              Get expert caregiver support through natural voice conversations with Beatriz, 
              your 24/7 virtual assistant trained on healthcare knowledge.
            </p>
            <Button 
              onClick={onStartDemo} 
              size="lg" 
              className="bg-white text-beatriz-dark hover:bg-beatriz-light hover:text-beatriz transition-all"
            >
              Start Conversation
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};
