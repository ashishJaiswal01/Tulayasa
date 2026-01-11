import { signIn } from './auth/authApi'

async function handleLogin() {
  const email = "...";
  const password = "...";

  try {
    const { session } = await signIn(email, password);
    localStorage.setItem("token", session.access_token);
  } catch (e) {
    alert(e.message);
  }
}
