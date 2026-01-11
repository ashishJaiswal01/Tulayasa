// src/auth/authApi.js
import { supabase } from "../supabaseClient";

// Register User
export async function registerUser({ name, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name }
    },
  });

  if (error) throw error;
  return data;
}

// Login User
export async function loginUser(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

// Logout User
export async function logoutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
