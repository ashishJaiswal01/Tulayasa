import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, MessageCircle, Phone } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          message: form.message
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setStatus("✅ Message sent successfully!");
      setForm({ name: "", email: "", message: "" });

    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-black text-emerald-950">Contact Us</h2>
          <p className="text-gray-500 mt-3">
            Start your natural healing journey 🌿
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20">
          {/* LEFT */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="text-emerald-600" />
                tulasya.care@gmail.com
              </div>
              <div className="flex gap-4 mt-6">
                <a
                  href="https://wa.me/1234567890"
                  className="bg-green-600 text-white px-5 py-2 rounded-xl font-semibold"
                >
                  <MessageCircle className="inline mr-2" />
                  WhatsApp
                </a>
                <a
                  href="tel:+1234567890"
                  className="bg-emerald-600 text-white px-5 py-2 rounded-xl font-semibold"
                >
                  <Phone className="inline mr-2" />
                  Call
                </a>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="bg-white p-8 rounded-3xl shadow-xl">
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>

            {status && (
              <p className="mb-4 text-center font-semibold">
                {status}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-xl"
              />

              <input
                name="email"
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-xl"
              />

              <textarea
                name="message"
                rows="5"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-xl"
              />

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-xl font-bold text-white ${
                  loading
                    ? "bg-gray-400"
                    : "bg-emerald-600 hover:bg-emerald-700"
                }`}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
