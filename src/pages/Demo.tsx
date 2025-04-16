
import { ChatInterface } from "@/components/ChatInterface";
import { HeroSection } from "@/components/HeroSection";

const Demo = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <HeroSection onStartDemo={() => {}} showDemo={true} />
      
      <main className="container mx-auto px-4 py-12">
        <ChatInterface />
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

export default Demo;
