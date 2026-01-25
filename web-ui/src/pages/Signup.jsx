import React, { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Signup() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setMessage("Name, email and password are required.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const { data,error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: name,   // shows in "Display name"
            phone: mobile // shows in "Phone"
          }
        }
      });

      if (error) {
        setMessage(error.message);
        return;
      }
      
      // 🔴 THIS IS THE MISSING CHECK
      if (data?.user && data.user.identities.length === 0) {
        setMessage("This email is already registered. Please log in instead.");
        return;
      }

      setMessage(
        "🎉 Signup successful! Please check your email to verify your account."
      );

      setTimeout(() => {
        if (setCurrentPage) {
          setCurrentPage("home");
        } else {
          window.location.href = "/";
        }
      }, 1500);

      setName("");
      setMobile("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>

        {message && (
          <p className="bg-yellow-100 text-yellow-800 p-2 rounded-md text-center mb-4">
            {message}
          </p>
        )}

        <input
          className="w-full p-2 border rounded-md mb-3"
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="w-full p-2 border rounded-md mb-3"
          type="tel"
          placeholder="Mobile number (optional)"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <input
          className="w-full p-2 border rounded-md mb-3"
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="w-full p-2 border rounded-md mb-3"
          type="password"
          placeholder="Create password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          className="w-full p-2 border rounded-md mb-4"
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button
          disabled={loading}
          className={`w-full py-2 rounded-md text-white ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
          type="submit"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <p className="text-center mt-3 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 font-semibold hover:underline">
            Log in
          </a>
        </p>
      </form>
    </div>
  );
}
