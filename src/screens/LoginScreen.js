import React, { useState, useRef } from 'react';
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Text, 
  SafeAreaView, 
  Image,
  Animated,
  Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useAuth } from '../AuthContext';

const { width } = Dimensions.get('window');
const IMAGE_SIZE = width * 0.4;

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const { signIn, verifyOtp } = useAuth();

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleSendOtp = async () => {
    try {
      const { error } = await signIn(email);
      if (error) throw error;
      animateTransition();
    } catch (error) {
      alert(error.error_description || error.message);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const { error } = await verifyOtp(email, otp);
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    }
  };

  const animateTransition = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -50,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowOtpInput(true);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  return (
    <LinearGradient colors={['#121212', '#1a202c']} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Image 
            source={{ uri: 'https://nsdr.b-cdn.net/replicate-prediction-e42jnrh92nrg80chan99dz03a4.jpg' }}
            style={styles.logo}
          />
          <Text style={styles.title}>Welcome to NSDR</Text>
          <Animated.View style={[
            styles.inputContainer,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
          ]}>
            {!showOtpInput ? (
              <>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="#9CA3AF"
                  value={email}
                  onChangeText={setEmail}
                  style={styles.input}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
                <TouchableOpacity style={styles.button} onPress={handleSendOtp}>
                  <Text style={styles.buttonText}>Login or Signup via Email</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TextInput
                  placeholder="Enter OTP"
                  placeholderTextColor="#9CA3AF"
                  value={otp}
                  onChangeText={setOtp}
                  style={styles.input}
                  keyboardType="number-pad"
                />
                <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
                  <Text style={styles.buttonText}>Verify OTP</Text>
                </TouchableOpacity>
              </>
            )}
          </Animated.View>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / 2,
    marginBottom: 30,
  },
  title: {
    fontFamily: 'HankenGrotesk-Bold',
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    fontFamily: 'HankenGrotesk-Regular',
    backgroundColor: '#2D3748',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    color: '#FFFFFF',
    width: '100%',
  },
  button: {
    backgroundColor: '#FF7E1E',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    fontFamily: 'HankenGrotesk-SemiBold',
    color: '#1A202C',
    fontSize: 16,
    fontWeight: '600',
  },
});