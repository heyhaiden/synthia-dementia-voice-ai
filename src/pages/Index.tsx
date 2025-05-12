import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Features } from "@/components/Features";
import { HeroSection } from "@/components/HeroSection";
import { toast } from "sonner";

const Index = () => {
  const [showDemo] = useState(false);
  const navigate = useNavigate();
  
  const handleStartDemo = () => {
    navigate("/demo");
    toast.success("Demo mode activated. Try speaking to Synthia!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <HeroSection onStartDemo={handleStartDemo} showDemo={showDemo} />
      
      <main className="flex-1">
        <Features />
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
