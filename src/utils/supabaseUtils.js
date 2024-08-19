// src/utils/supabaseUtils.js
import { supabase } from '../supabaseClient';

export const getCategories = async () => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error in getCategories:', error.message);
    throw error;
  }
};

export const getTracksByCategory = async (categoryId) => {
  try {
    const { data, error } = await supabase
      .from('tracks')
      .select('*')
      .eq('category_id', categoryId)
      .order('title');
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error in getTracksByCategory:', error.message);
    throw error;
  }
};

export const getTrackById = async (trackId) => {
  try {
    const { data, error } = await supabase
      .from('tracks')
      .select('*, categories(*)')
      .eq('id', trackId)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error in getTrackById:', error.message);
    throw error;
  }
};