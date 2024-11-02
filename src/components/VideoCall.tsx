import React, { useEffect } from 'react';
import { createClient, createMicrophoneAndCameraTracks } from 'agora-rtc-react';
import { useCallStore } from '../store/useCallStore';
import { VideoGrid } from './VideoGrid';
import { Controls } from './Controls';

const appId = "669d4f76495441069143f8d898916e7f";
const useClient = createClient({ codec: "vp8", mode: "rtc" });
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

export const VideoCall = () => {
  const { channelName, isAudioOnly, users, addUser, removeUser } = useCallStore();
  const [start, setStart] = React.useState(false);
  const [audioEnabled, setAudioEnabled] = React.useState(true);
  const [videoEnabled, setVideoEnabled] = React.useState(!isAudioOnly);
  
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  useEffect(() => {
    let init = async (name: string) => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === "video") {
          addUser(user.uid.toString());
        }
        if (mediaType === "audio") {
          user.audioTrack?.play();
        }
      });

      client.on("user-unpublished", (user, mediaType) => {
        if (mediaType === "video") {
          removeUser(user.uid.toString());
        }
        if (mediaType === "audio") {
          user.audioTrack?.stop();
        }
      });

      client.on("user-left", (user) => {
        removeUser(user.uid.toString());
      });

      try {
        await client.join(appId, name, null, null);
        if (tracks) {
          await client.publish(tracks);
          setStart(true);
        }
        addUser(client.uid.toString());
      } catch (error) {
        console.log("error", error);
      }
    };

    if (ready && tracks) {
      init(channelName);
    }
  }, [channelName, client, ready, tracks]);

  const toggleAudio = async () => {
    if (tracks?.[0]) {
      await tracks[0].setEnabled(!audioEnabled);
      setAudioEnabled(!audioEnabled);
    }
  };

  const toggleVideo = async () => {
    if (tracks?.[1]) {
      await tracks[1].setEnabled(!videoEnabled);
      setVideoEnabled(!videoEnabled);
    }
  };

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    tracks?.[0].close();
    tracks?.[1].close();
    setStart(false);
    window.location.href = '/';
  };

  const localVideo = start && tracks && (
    <div className="relative rounded-xl overflow-hidden aspect-video bg-gray-800/50 backdrop-blur-sm shadow-lg">
      <div className="absolute inset-0">
        <video
          className="w-full h-full object-cover"
          ref={(ref) => {
            if (ref) ref.srcObject = tracks[1].mediaStream;
          }}
          autoPlay
        />
      </div>
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg px-3 py-2">
          <p className="text-sm font-medium text-white/90">You</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      <VideoGrid localVideo={localVideo} />
      <Controls
        onToggleAudio={toggleAudio}
        onToggleVideo={toggleVideo}
        onLeaveCall={leaveChannel}
        audioEnabled={audioEnabled}
        videoEnabled={videoEnabled}
      />
    </div>
  );
};