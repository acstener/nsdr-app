// src/supabaseClient.js
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dvyyjlqtdhwbniavtppr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2eXlqbHF0ZGh3Ym5pYXZ0cHByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM1NDkzMDIsImV4cCI6MjAzOTEyNTMwMn0.AYxA9z_Zrs7Y_eUpSWj1TNmQeyPZksl1doVplnnxqNQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});