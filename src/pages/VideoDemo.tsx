import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const VideoDemo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
        <div className="flex-1 flex justify-center">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-black p-0.5">
              <img 
                src="/lovable-uploads/synthia_icon.png" 
                alt="Synthia Avatar" 
                className="h-full w-full object-cover rounded-full"
              />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">
              Watch Synthia in Action
            </h1>
          </div>
        </div>
        <div className="w-[100px]" /> {/* Spacer to balance the back button */}
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-200 flex flex-col items-center p-8">
          <div className="aspect-video w-full rounded-lg overflow-hidden shadow mb-6 bg-gray-100 border border-gray-200 flex items-center justify-center">
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, width: '100%' }}>
              <iframe 
                src="https://www.loom.com/embed/b0935f9d8f7b40518a36d53fe47cc6b8?sid=12c7bb68-3145-4aaf-a31c-bd6b72d20aa1&hide_owner=true&hide_title=true&hide_share=true&hide_embed=true&hide_comment=true&autoplay=false" 
                frameBorder="0" 
                allowFullScreen 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                title="Synthia Video Demo"
              />
            </div>
          </div>
          <p className="text-sm text-gray-600 text-center truncate w-full">
            See how Synthia helps healthcare professionals through natural voice conversations
          </p>
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

export default VideoDemo; 