import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const VideoDemo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
            Watch Beatriz in Action
          </h1>
          <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.loom.com/embed/YOUR_LOOM_VIDEO_ID"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          <p className="mt-6 text-gray-600 text-center">
            See how Beatriz helps healthcare professionals through natural voice conversations
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoDemo; 