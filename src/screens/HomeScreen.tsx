import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Image, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { getCategories } from '../utils/supabaseUtils';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => navigation.navigate('CategoryTracks', { categoryId: item.id, categoryName: item.name })}
    >
      <LinearGradient
        colors={['#1E1C20', '#1D1C20']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.categoryGradient}
      >
        <Image
          source={{ uri: item.image_url || 'https://nsdr.b-cdn.net/replicate-prediction-e42jnrh92nrg80chan99dz03a4.jpg' }}
          style={styles.categoryImage}
        />
        <View style={styles.categoryInfo}>
          <Text style={styles.categoryTitle}>{item.name}</Text>
          <Text style={styles.categoryDescription}>{item.description || 'Explore tracks in this category'}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#121212', '#1a202c']} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Explore tracks</Text>
        </View>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
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
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  title: {
    fontFamily: 'HankenGrotesk-Bold',
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  list: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  categoryItem: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: '#2f2e31',
  },
  categoryGradient: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  categoryImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 15,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    fontFamily: 'HankenGrotesk-SemiBold',
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  categoryDescription: {
    fontFamily: 'HankenGrotesk-Regular',
    fontSize: 14,
    color: '#9CA3AF',
  },
});