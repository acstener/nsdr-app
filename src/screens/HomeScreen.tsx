import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Image, Dimensions, Modal } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { getCategories } from '../utils/supabaseUtils';
import { useAuth } from '../AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const { signOut, user } = useAuth();

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
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.accountButton}>
            <Icon name="person-circle-outline" size={30} color="#4FD1C5" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Account</Text>
              <Text style={styles.modalEmail}>{user?.email}</Text>
              <TouchableOpacity
                style={styles.signOutButton}
                onPress={() => {
                  signOut();
                  setModalVisible(false);
                }}
              >
                <Text style={styles.signOutText}>Sign Out</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Icon name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
    justifyContent: 'space-between',
    alignItems: 'center',
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
  accountButton: {
    padding: 5,
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#2D3748',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  modalTitle: {
    fontFamily: 'HankenGrotesk-Bold',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 15,
  },
  modalEmail: {
    fontFamily: 'HankenGrotesk-Regular',
    fontSize: 16,
    color: '#A0AEC0',
    marginBottom: 20,
  },
  signOutButton: {
    backgroundColor: '#4FD1C5',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: '100%',
    alignItems: 'center',
  },
  signOutText: {
    fontFamily: 'HankenGrotesk-SemiBold',
    color: '#2D3748',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    padding: 10,
  },
});