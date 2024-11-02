import React from 'react';
import { Phone, PhoneOff, Mic, MicOff, Video, VideoOff, Users } from 'lucide-react';
import { useCallStore } from '../store/useCallStore';

interface ControlsProps {
  onToggleAudio: () => void;
  onToggleVideo: () => void;
  onLeaveCall: () => void;
  audioEnabled: boolean;
  videoEnabled: boolean;
}

export const Controls = ({
  onToggleAudio,
  onToggleVideo,
  onLeaveCall,
  audioEnabled,
  videoEnabled,
}: ControlsProps) => {
  const { users } = useCallStore();

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10">
      <div className="flex items-center gap-4 bg-gray-900/90 backdrop-blur-sm rounded-full p-4 shadow-lg">
        <div className="px-4 py-2 bg-gray-800/50 rounded-full flex items-center gap-2">
          <Users size={16} />
          <span className="text-sm font-medium">{users.length + 1}</span>
        </div>
        <button
          onClick={onToggleAudio}
          className={`p-4 rounded-full transition-all duration-200 ${
            audioEnabled ? 'bg-gray-800 hover:bg-gray-700' : 'bg-red-500 hover:bg-red-600'
          }`}
        >
          {audioEnabled ? <Mic size={24} /> : <MicOff size={24} />}
        </button>
        <button
          onClick={onToggleVideo}
          className={`p-4 rounded-full transition-all duration-200 ${
            videoEnabled ? 'bg-gray-800 hover:bg-gray-700' : 'bg-red-500 hover:bg-red-600'
          }`}
        >
          {videoEnabled ? <Video size={24} /> : <VideoOff size={24} />}
        </button>
        <button
          onClick={onLeaveCall}
          className="p-4 rounded-full bg-red-500 hover:bg-red-600 transition-all duration-200"
        >
          <PhoneOff size={24} />
        </button>
      </div>
    </div>
  );
};