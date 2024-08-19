import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Image, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { getTracksByCategory } from '../utils/supabaseUtils';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

export default function CategoryTracksScreen({ route, navigation }) {
  const { categoryId, categoryName } = route.params;
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    fetchTracks();
  }, []);

  const fetchTracks = async () => {
    try {
      const tracksData = await getTracksByCategory(categoryId);
      setTracks(tracksData);
    } catch (error) {
      console.error('Error fetching tracks:', error);
    }
  };

  const renderTrackItem = ({ item }) => (
    <TouchableOpacity
      style={styles.trackItem}
      onPress={() => navigation.navigate('TrackPlayer', { trackId: item.id })}
    >
      <LinearGradient
        colors={['#1E1C20', '#1D1C20']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.trackGradient}
      >
        <Image
          source={{ uri: item.image_url || 'https://nsdr.b-cdn.net/replicate-prediction-e42jnrh92nrg80chan99dz03a4.jpg' }}
          style={styles.trackImage}
        />
        <View style={styles.trackInfo}>
          <Text style={styles.trackTitle}>{item.title}</Text>
          <Text style={styles.trackCategory}>{categoryName}</Text>
          <Text style={styles.trackDuration}>NSDR · {item.duration} mins</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#121212', '#1a202c']} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="chevron-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.title}>{categoryName} Tracks</Text>
        </View>
        <FlatList
          data={tracks}
          renderItem={renderTrackItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
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
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontFamily: 'HankenGrotesk-Bold',
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  list: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  trackItem: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: '#2f2e31',
  },
  trackGradient: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  trackImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 15,
  },
  trackInfo: {
    flex: 1,
  },
  trackTitle: {
    fontFamily: 'HankenGrotesk-SemiBold',
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  trackCategory: {
    fontFamily: 'HankenGrotesk-Medium',
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  trackDuration: {
    fontFamily: 'HankenGrotesk-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
});