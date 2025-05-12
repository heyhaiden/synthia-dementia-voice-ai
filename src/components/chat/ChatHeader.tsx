interface ChatHeaderProps {
  isPlaying: boolean;
  isApiConnected?: boolean;
}

export const ChatHeader = ({ isPlaying, isApiConnected = false }: ChatHeaderProps) => {
  return (
    <div className="bg-blue-600 p-4 text-white flex items-center justify-between">
      <div className="flex items-center">
        <div className="h-10 w-10 rounded-full bg-white p-0.5 mr-3">
          <img 
            src="/lovable-uploads/synthia_icon.png" 
            alt="Synthia Avatar" 
            className="h-full w-full object-cover rounded-full"
          />
        </div>
        <div>
          <h2 className="font-semibold">Synthia</h2>
          <p className="text-xs opacity-80">Virtual Caregiver Assistant</p>
        </div>
      </div>
      {isPlaying ? (
        <div className="flex items-center space-x-1">
          <div className="h-5 w-1 bg-white animate-pulse rounded-full"></div>
          <div className="h-7 w-1 bg-white animate-pulse rounded-full"></div>
          <div className="h-5 w-1 bg-white animate-pulse rounded-full"></div>
          <div className="h-3 w-1 bg-white animate-pulse rounded-full"></div>
        </div>
      ) : (
        <div className={`flex items-center ${isApiConnected ? 'bg-green-500/20' : 'bg-black/20'} backdrop-blur-sm rounded-full px-4 py-2`}>
          <span className="text-white mr-3 text-sm font-medium">Voice Active</span>
          <span className="relative flex h-2.5 w-2.5">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isApiConnected ? 'bg-green-400' : 'bg-white'} opacity-75`}></span>
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isApiConnected ? 'bg-green-400' : 'bg-white'}`}></span>
          </span>
        </div>
      )}
    </div>
  );
};
