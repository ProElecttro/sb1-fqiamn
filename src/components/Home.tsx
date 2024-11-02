import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCallStore } from '../store/useCallStore';
import { Video, Phone, Users } from 'lucide-react';

export const Home = () => {
  const navigate = useNavigate();
  const { setChannelName, setIsAudioOnly } = useCallStore();
  const [roomInput, setRoomInput] = React.useState('');

  const joinRoom = (isAudioOnly: boolean) => {
    if (roomInput) {
      setChannelName(roomInput);
      setIsAudioOnly(isAudioOnly);
      navigate('/call');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Modern Video Calling
          </h1>
          <p className="text-xl text-gray-300">Connect with anyone, anywhere, anytime</p>
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-2">
                <Video className="w-8 h-8 text-blue-400" />
              </div>
              <p className="text-sm text-gray-400">Video Calls</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-2">
                <Users className="w-8 h-8 text-purple-400" />
              </div>
              <p className="text-sm text-gray-400">Group Calls</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-500/10 rounded-2xl flex items-center justify-center mb-2">
                <Phone className="w-8 h-8 text-pink-400" />
              </div>
              <p className="text-sm text-gray-400">Voice Calls</p>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
          <div className="space-y-6">
            <div>
              <label htmlFor="room" className="block text-sm font-medium mb-2">
                Room Name
              </label>
              <input
                type="text"
                id="room"
                value={roomInput}
                onChange={(e) => setRoomInput(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                placeholder="Enter room name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => joinRoom(false)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all duration-200"
              >
                <Video size={20} />
                <span>Video Call</span>
              </button>
              <button
                onClick={() => joinRoom(true)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg transition-all duration-200"
              >
                <Phone size={20} />
                <span>Voice Call</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};