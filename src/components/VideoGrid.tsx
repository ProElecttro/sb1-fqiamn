import React from 'react';
import { useCallStore } from '../store/useCallStore';
import { UserCircle2 } from 'lucide-react';

interface VideoGridProps {
  localVideo: React.ReactNode;
}

export const VideoGrid = ({ localVideo }: VideoGridProps) => {
  const { users } = useCallStore();
  const totalParticipants = users.length + 1;

  const gridConfig = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2',
    default: 'grid-cols-2 lg:grid-cols-3',
  };

  const gridClass = gridConfig[totalParticipants as keyof typeof gridConfig] || gridConfig.default;

  return (
    <div className={`grid ${gridClass} gap-4 p-4 h-[calc(100vh-6rem)]`}>
      {localVideo}
      {users.map((user) => (
        <div key={user} className="relative rounded-xl overflow-hidden aspect-video bg-gray-800/50 backdrop-blur-sm shadow-lg">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-gray-700/50 backdrop-blur-sm flex items-center justify-center">
              <UserCircle2 size={48} className="text-white/80" />
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg px-3 py-2">
              <p className="text-sm font-medium text-white/90">Participant {user.slice(0, 4)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};