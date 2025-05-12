import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface HeroSectionProps {
  showDemo: boolean;
}

export const HeroSection = ({ showDemo }: HeroSectionProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleDemoClick = () => {
    if (location.pathname === "/") {
      navigate("/demo");
    } else {
      navigate("/");
    }
  };

  return (
    <header className="relative bg-white">
      <div className="relative container mx-auto px-4 py-4">
        <div className={`flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${!showDemo ? 'min-h-[80vh] pt-24' : ''}`}>
          {showDemo ? (
            <div className="w-full flex items-center justify-center py-4 animate-fadeIn">
              <Button 
                variant="ghost" 
                onClick={handleDemoClick}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
              <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-3 animate-slideIn">
                  <div className="h-10 w-10 rounded-full bg-black p-0.5">
                    <img 
                      src="/lovable-uploads/synthia_icon.png" 
                      alt="Synthia Avatar" 
                      className="h-full w-full object-cover rounded-full"
                    />
                  </div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    Chat with Synthia
                  </h1>
                </div>
              </div>
              <div className="w-[100px]" /> {/* Spacer to balance the back button */}
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl gap-16 animate-fadeIn">
              <div className="flex-1 text-center md:text-left max-w-2xl mx-auto md:mx-0">
                <div className="mb-8 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-black/5 animate-slideIn">
                  <div className="h-10 w-10 rounded-full bg-black p-0.5">
                    <img 
                      src="/lovable-uploads/synthia_icon.png" 
                      alt="Synthia Avatar" 
                      className="h-full w-full object-cover rounded-full"
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-600">Introducing Synthia</p>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-semibold text-gray-900 tracking-tight mb-6 leading-[1.1] text-center md:text-left animate-slideIn">
                  The future of healthcare training
                </h1>
                <p className="text-xl md:text-2xl text-gray-500 mb-10 leading-relaxed max-w-xl mx-auto md:mx-0 text-center md:text-left animate-slideIn">
                  Experience personalized caregiver support through natural voice conversations 
                  with our conversational AI assistant.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-slideIn">
                  <Button 
                    onClick={handleDemoClick} 
                    size="lg"
                    className="bg-gray-900 hover:bg-gray-800 text-white text-lg px-8 h-14 rounded-full transition-all duration-200 hover:scale-105"
                  >
                    Try Synthia
                  </Button>
                  <Button 
                    variant="outline"
                    size="lg"
                    onClick={() => navigate("/video-demo")}
                    className="border-gray-200 text-gray-900 hover:bg-gray-50 text-lg px-8 h-14 rounded-full transition-all duration-200 hover:scale-105"
                  >
                    Watch the demo
                  </Button>
                </div>
              </div>
              
              <div className="hidden md:block flex-1 flex items-center justify-center animate-slideIn">
                <img 
                  src="/lovable-uploads/synthia_hero.png" 
                  alt="Healthcare AI Technology" 
                  className="w-full max-w-md h-[600px] object-cover rounded-lg shadow-lg ml-8 transition-all duration-500 hover:shadow-xl"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
