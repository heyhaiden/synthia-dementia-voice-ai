
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-beatriz text-white p-4">
        <div className="container mx-auto">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-white p-0.5 mr-3">
              <img 
                src="/lovable-uploads/5b3a563c-5a26-45e4-b15b-7dec2aca195e.png" 
                alt="Beatriz Avatar" 
                className="h-full w-full object-cover rounded-full"
              />
            </div>
            <h1 className="text-xl font-bold">Beatriz</h1>
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-bold text-beatriz-dark mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">
            Oops! The page you're looking for cannot be found.
          </p>
          <Button asChild className="bg-beatriz hover:bg-beatriz-dark">
            <a href="/">Return to Home</a>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
