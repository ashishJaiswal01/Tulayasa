import { loginUser } from "../auth/authApi";

async function handleLogin() {
  const email = "...";
  const password = "...";

  try {
    const { session } = await loginUser(email, password);
    localStorage.setItem("token", session.access_token);
  } catch (e) {
    alert(e.message);
  }
}

// Default export for App.jsx
export default function Login() {
  return null; // This is a placeholder - implement login UI as needed
}
