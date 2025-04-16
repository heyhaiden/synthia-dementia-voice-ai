
import { useState } from "react";
import { ChatInterface } from "@/components/ChatInterface";
import { Features } from "@/components/Features";
import { HeroSection } from "@/components/HeroSection";
import { toast } from "sonner";

const Index = () => {
  const [showDemo, setShowDemo] = useState(false);
  
  const handleStartDemo = () => {
    setShowDemo(true);
    toast.success("Demo mode activated. Try speaking to Beatriz!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <HeroSection onStartDemo={handleStartDemo} showDemo={showDemo} />
      
      <main className="flex-1">
        {showDemo ? (
          <div className="container mx-auto px-4 py-12">
            <ChatInterface />
          </div>
        ) : (
          <Features />
        )}
      </main>
      
      <footer className="border-t border-gray-100 py-8 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">© 2025 VoiceSpark AI. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-6">
            <a href="#" className="text-gray-500 hover:text-gray-900 text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-gray-900 text-sm">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-gray-900 text-sm">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
