
import { ChatInterface } from "@/components/ChatInterface";
import { HeroSection } from "@/components/HeroSection";

const Demo = () => {
  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      <HeroSection onStartDemo={() => {}} showDemo={true} />
      
      <main className="flex-1 container mx-auto px-4 py-4 overflow-hidden">
        <div className="w-full max-w-4xl mx-auto h-full flex items-center justify-center">
          <ChatInterface />
        </div>
      </main>
      
      <footer className="border-t border-gray-100 py-4 bg-white">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>© 2025 VoiceSpark AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Demo;
