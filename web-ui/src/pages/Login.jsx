import React, { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Email and password are required.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      const user = data.user;

      // ✅ Notify App.jsx
      onLoginSuccess({
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name || user.email.split("@")[0],
        mobile: user.user_metadata?.mobile || null,
      });

    } catch (err) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {message && (
          <p className="bg-red-100 text-red-800 p-2 rounded-md text-center mb-4">
            {message}
          </p>
        )}

        <input
          className="w-full p-2 border rounded-md mb-3"
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="w-full p-2 border rounded-md mb-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          disabled={loading}
          className={`w-full py-2 rounded-md text-white ${
            loading
              ? "bg-gray-400"
              : "bg-emerald-600 hover:bg-emerald-700"
          }`}
          type="submit"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center mt-3 text-sm">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={() => onLoginSuccess(null, "signup")}
            className="text-emerald-600 font-semibold hover:underline"
          >
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
}
