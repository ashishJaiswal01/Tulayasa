import { supabase } from '../supabaseClient';

// Signup user
export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) throw error;
  return data;
}

// Login user
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw error;
  return data;
}

// Logout
export async function logout() {
  await supabase.auth.signOut();
  localStorage.removeItem('token');
}
