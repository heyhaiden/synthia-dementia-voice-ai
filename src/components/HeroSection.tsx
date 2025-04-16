
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface HeroSectionProps {
  onStartDemo: () => void;
  showDemo: boolean;
}

export const HeroSection = ({ onStartDemo, showDemo }: HeroSectionProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleDemoClick = () => {
    if (location.pathname === "/") {
      navigate("/demo");
      onStartDemo();
    } else {
      navigate("/");
    }
  };

  return (
    <header className="relative bg-white border-b border-gray-100">
      <div className="relative container mx-auto px-4 py-4">
        <div className="flex flex-col items-center justify-center">
          {showDemo ? (
            <div className="w-full flex items-center">
              <Button 
                variant="ghost" 
                onClick={handleDemoClick}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
              <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-black p-0.5">
                    <img 
                      src="/lovable-uploads/193f56c2-01c0-492f-a435-4eb3950c0277.png" 
                      alt="Beatriz Avatar" 
                      className="h-full w-full object-cover rounded-full"
                    />
                  </div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    Chat with Beatriz
                  </h1>
                </div>
              </div>
              <div className="w-[100px]" /> {/* Spacer to balance the back button */}
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl gap-16">
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
                  The future of healthcare training
                </h1>
                <p className="text-xl md:text-2xl text-gray-500 mb-10 leading-relaxed max-w-xl mx-auto md:mx-0">
                  Experience personalized caregiver support through natural voice conversations 
                  with our conversational AI assistant.
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
              
              <div className="hidden md:block flex-1 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952" 
                  alt="Healthcare technology" 
                  className="w-full max-w-md h-[600px] object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

