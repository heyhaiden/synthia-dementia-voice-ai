
import { useState, useRef, useEffect } from "react";
import { Mic, Volume2, User, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ChatInterface } from "@/components/ChatInterface";
import { Features } from "@/components/Features";
import { HeroSection } from "@/components/HeroSection";

const Index = () => {
  const [isListening, setIsListening] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  
  const handleStartDemo = () => {
    setShowDemo(true);
    toast.success("Demo mode activated. Try speaking to Beatriz!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with Logo and CTA */}
      <HeroSection onStartDemo={handleStartDemo} showDemo={showDemo} />
      
      {/* Main Content */}
      <main className="flex-1 container px-4 py-8 md:py-12 mx-auto">
        {showDemo ? (
          <ChatInterface />
        ) : (
          <Features />
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-beatriz-dark text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© 2025 VoiceSpark AI. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <a href="#" className="text-beatriz-accent hover:underline text-xs">Privacy Policy</a>
            <a href="#" className="text-beatriz-accent hover:underline text-xs">Terms of Service</a>
            <a href="#" className="text-beatriz-accent hover:underline text-xs">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
