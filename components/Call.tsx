"use client";
import Loader from '../components/Loader'
import AgoraRTC, {
  AgoraRTCProvider,
  LocalVideoTrack,
  RemoteUser,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRTCClient,
  useRemoteAudioTracks,
  useRemoteUsers,
} from "agora-rtc-react";
import Image from "next/image";

import React from "react";
function Call(props: { appId: string; channelName: string }) {
  const client = useRTCClient(
    AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })
  );

  return (
    <AgoraRTCProvider client={client}>
      <Videos channelName={props.channelName} AppID={props.appId} />
    </AgoraRTCProvider>
  );
}

function Videos(props: { channelName: string; AppID: string }) {
  const { AppID, channelName } = props;
  const { isLoading: isLoadingMic, localMicrophoneTrack } =
    useLocalMicrophoneTrack();
  const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();
  const remoteUsers = useRemoteUsers();
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);

  usePublish([localMicrophoneTrack, localCameraTrack]);
  useJoin({
    appid: AppID,
    channel: channelName,
    token: null,
  });

  audioTracks.map((track) => track.play());
  const deviceLoading = isLoadingMic || isLoadingCam;
  if (deviceLoading)
    return (
      <div className="flex flex-col items-center pt-40">
        <Loader />
      </div>
    );
  return (
        <div className="relative flex h-screen w-screen flex-1 justify-between p-1">
          <div className="min-h-full min-w-full rounded-xl ">
          {remoteUsers.length?remoteUsers.map((user) => (
             <RemoteUser user={remoteUsers[0]} />
          )):<Loader />}
          </div>
          <div className="absolute bottom-2.5 right-2.5 z-10 h-40 w-60 ">
            <LocalVideoTrack
                track={localCameraTrack}
                play={true}
                className="rounded-xl"
              />
          </div>
      </div>
  );
}

export default Call;
