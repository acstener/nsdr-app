import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TrackPlayer, { useProgress, Event, State, useTrackPlayerEvents } from 'react-native-track-player';
import { getTrackById } from '../utils/supabaseUtils';
import { setupPlayer, addTrack } from '../trackPlayerService';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

export default function TrackPlayerScreen({ route, navigation }) {
  const { trackId } = route.params;
  const [track, setTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const progress = useProgress();

  const loadTrack = useCallback(async () => {
    try {
      await setupPlayer();
      const trackData = await getTrackById(trackId);
      setTrack(trackData);
      await addTrack(trackData);
    } catch (error) {
      console.error('Error loading track:', error);
    }
  }, [trackId]);

  useEffect(() => {
    loadTrack();
    return () => {
      TrackPlayer.pause();
    };
  }, [loadTrack]);

  useTrackPlayerEvents([Event.PlaybackState], async (event) => {
    setIsPlaying(event.state === State.Playing);
  });

  const togglePlayback = async () => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack !== null) {
      if (isPlaying) {
        await TrackPlayer.pause();
      } else {
        await TrackPlayer.play();
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <LinearGradient colors={['#121212', '#1a202c']} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="chevron-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Now Playing</Text>
        </View>
        <View style={styles.container}>
          <Image
            source={{ uri: track?.image_url }}
            style={styles.albumArt}
          />
          <Text style={styles.title}>{track?.title || 'Loading...'}</Text>
          <Slider
            style={styles.progressBar}
            value={progress.position}
            maximumValue={progress.duration}
            minimumValue={0}
            thumbTintColor="#FF7E1E"
            minimumTrackTintColor="#FF7E1E"
            maximumTrackTintColor="#9CA3AF"
            onSlidingComplete={async (value) => await TrackPlayer.seekTo(value)}
          />
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{formatTime(progress.position)}</Text>
            <Text style={styles.timeText}>{formatTime(progress.duration)}</Text>
          </View>
          <View style={styles.controls}>
            <TouchableOpacity style={styles.playPauseButton} onPress={togglePlayback}>
              <Icon
                name={isPlaying ? "pause" : "play"}
                size={32}
                color="#0f0c29"
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontFamily: 'HankenGrotesk-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  albumArt: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: 20,
    marginBottom: 30,
  },
  title: {
    fontFamily: 'HankenGrotesk-Bold',
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 30,
    textAlign: 'center',
  },
  progressBar: {
    width: '100%',
    height: 40,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  timeText: {
    fontFamily: 'HankenGrotesk-Regular',
    color: '#FFFFFF',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playPauseButton: {
    backgroundColor: '#FF7E1E',
    borderRadius: 30,
    padding: 10,
  },
});