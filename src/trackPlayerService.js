// src/trackPlayerService.js
import TrackPlayer, { Event } from 'react-native-track-player';

let isSetup = false;

export async function setupPlayer() {
  if (isSetup) return;

  try {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SEEK_TO,
      ],
    });
    isSetup = true;
  } catch (error) {
    console.error('Error setting up player:', error);
  }
}

export async function addTrack(track) {
  await TrackPlayer.reset();
  await TrackPlayer.add({
    id: track.id,
    url: track.audio_url,
    title: track.title,
    artist: 'NSDR',
  });
}

export async function playbackService() {
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
  TrackPlayer.addEventListener(Event.RemoteStop, () => TrackPlayer.stop());
}