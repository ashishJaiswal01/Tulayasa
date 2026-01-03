import React, { useState, useEffect } from 'react';
import { 
  Leaf, 
  Wind, 
  Sun, 
  HeartPulse, 
  CheckCircle, 
  Star, 
  Menu, 
  X, 
  ArrowRight,
  LogOut,
  Droplets,
  Zap,
  Mail,
  MessageCircle,
  Phone
} from 'lucide-react';

/**
 * TULASYA - Digital Natural Lifestyle Movement
 * Proper Project Structure (Consolidated for Preview)
 * * To export: 
 * 1. Create a standard React project (Vite or CRA).
 * 2. Install dependencies from the provided package.json.
 * 3. You can eventually split the components below into separate files 
 * under src/components/ for a modular architecture.
 */

// --- SHARED UI COMPONENTS ---

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-lg',
    secondary: 'bg-white text-emerald-900 border-2 border-emerald-100 hover:bg-emerald-50',
    outline: 'border border-gray-200 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600',
    ghost: 'text-gray-500 hover:bg-emerald-50 hover:text-emerald-600'
  };

  return (
    <button 
      className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center justify-center ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// --- LAYOUT COMPONENTS ---

const Navbar = ({ currentPage, setCurrentPage, user, setUser, setAuthModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'What We Treat', id: 'treat' },
    { name: 'Programs', id: 'programs' },
    { name: 'Reviews', id: 'reviews' },
    { name: 'About Us', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-sm border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center cursor-pointer group" onClick={() => setCurrentPage('home')}>
            <img src="/Tulasaya.png" alt="Tulsaya Logo" className="h-8 w-8 md:h-10 md:w-10 mr-2 rounded-full object-cover" />
            <span className="text-lg md:text-2xl font-bold tracking-tight text-emerald-900">TULASYA</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setCurrentPage(link.id)}
                className={`text-sm font-medium transition-colors ${
                  currentPage === link.id ? 'text-emerald-600' : 'text-gray-600 hover:text-emerald-500'
                }`}
              >
                {link.name}
              </button>
            ))}
            
            {user ? (
              <div className="flex items-center space-x-4 pl-4 border-l border-emerald-100">
                <span className="text-sm font-semibold text-emerald-800">Hi, {user.name}</span>
                <button onClick={() => setUser(null)} className="p-2 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Button onClick={() => setAuthModal(true)}>Join Movement</Button>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 p-2">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-emerald-50 p-4 space-y-2 animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => { setCurrentPage(link.id); setIsMenuOpen(false); }}
              className="block w-full text-left px-4 py-3 text-base font-medium text-gray-600 hover:bg-emerald-50 rounded-xl"
            >
              {link.name}
            </button>
          ))}
          {!user && (
            <button
              onClick={() => { setAuthModal(true); setIsMenuOpen(false); }}
              className="block w-full text-center py-3 mt-4 bg-emerald-600 text-white rounded-xl font-bold"
            >
              Get Started
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

// --- FEATURE COMPONENTS ---

const AuthModal = ({ isOpen, onClose, setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ name: formData.name || formData.email.split('@')[0], email: formData.email });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-emerald-950/40 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in duration-300">
        <div className="bg-emerald-600 p-10 text-center text-white relative">
          <Leaf className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold">{isLogin ? 'Welcome Back' : 'Join Tulasya'}</h2>
          <p className="text-emerald-100 mt-2">Reclaim your biological inheritance.</p>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-emerald-800 uppercase pl-1">Full Name</label>
              <input
                type="text" required
                className="w-full px-4 py-3 bg-stone-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          )}
          <div className="space-y-1">
            <label className="text-xs font-bold text-emerald-800 uppercase pl-1">Email Address</label>
            <input
              type="email" required
              className="w-full px-4 py-3 bg-stone-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-emerald-800 uppercase pl-1">Password</label>
            <input
              type="password" required
              className="w-full px-4 py-3 bg-stone-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <button type="submit" className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg active:scale-95">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
          <p className="text-center text-sm text-gray-500 pt-4">
            {isLogin ? "New to Tulasya?" : "Already have an account?"}
            <button type="button" onClick={() => setIsLogin(!isLogin)} className="ml-2 font-bold text-emerald-600 hover:underline">
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

// --- PAGES ---

const HomePage = ({ setCurrentPage }) => (
  <div className="animate-in fade-in duration-700">
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=2000" 
          alt="Nature" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/80 to-transparent" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white text-xs font-bold uppercase tracking-widest">Digital Natural Lifestyle Movement</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white leading-[1.1] mb-8">
            Heal Naturally. <br />
            <span className="text-emerald-400">Live Consciously.</span>
          </h1>
          <p className="text-base md:text-xl text-emerald-50/80 mb-12 leading-relaxed max-w-xl">
            At Tulasya, we believe the body has an in-built power to heal — it only needs the right food, right routine, and right guidance. We offer online naturopathy-based lifestyle support for people who want long-term health, not temporary relief.
          </p>
          <div className="space-y-4 mb-12">
            <div className="flex items-center space-x-3 text-emerald-50">
              <span className="text-xl">👉</span>
              <span className="text-base md:text-lg">No medicines</span>
            </div>
            <div className="flex items-center space-x-3 text-emerald-50">
              <span className="text-xl">👉</span>
              <span className="text-base md:text-lg">No injections</span>
            </div>
            <div className="flex items-center space-x-3 text-emerald-50">
              <span className="text-xl">👉</span>
              <span className="text-base md:text-lg">No hospital visits</span>
            </div>
            <div className="flex items-center space-x-3 text-emerald-50">
              <span className="text-xl">👉</span>
              <span className="text-base md:text-lg">No lifelong dependency</span>
            </div>
            <div className="flex items-center space-x-3 text-emerald-50">
              <span className="text-xl">👉</span>
              <span className="text-base md:text-lg">100% online guidance</span>
            </div>
            <div className="flex items-center space-x-3 text-emerald-50">
              <span className="text-xl">👉</span>
              <span className="text-base md:text-lg">Disease-specific lifestyle & diet correction</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setCurrentPage('programs')}
              className="px-6 py-3 md:px-10 md:py-5 bg-emerald-500 text-emerald-950 rounded-2xl font-black text-base md:text-lg hover:bg-emerald-400 transition-all flex items-center shadow-2xl hover:-translate-y-1"
            >
              Start Your Journey <ArrowRight className="ml-3 h-6 w-6" />
            </button>
            <button 
              onClick={() => setCurrentPage('about')}
              className="px-6 py-3 md:px-10 md:py-5 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-2xl font-bold text-base md:text-lg hover:bg-white/20 transition-all"
            >
              About Us
            </button>
          </div>
        </div>
      </div>
    </section>

    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-black text-emerald-950 leading-tight">
              Reclaiming your <br />
              <span className="text-emerald-600">Vitality.</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              In a world increasingly reliant on synthetic interventions, Tulasya stands as a beacon for 
              biological integrity. Our mission is to educate and guide individuals toward a life where 
              vitality is maintained through natural laws rather than pharmaceutical dependency.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {['100% Drug-Free', 'Biophilic Design', 'Metabolic Mastery', 'Circadian Alignment'].map((item) => (
                <div key={item} className="flex items-center space-x-3 bg-stone-50 p-4 rounded-2xl border border-stone-100">
                  <CheckCircle className="text-emerald-500 h-6 w-6" />
                  <span className="font-bold text-emerald-900">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-emerald-100 rounded-[3rem] rotate-3 group-hover:rotate-1 transition-transform" />
            <img 
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200" 
              alt="Lifestyle"
              className="relative rounded-[2.5rem] shadow-2xl w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
);

const About = () => {
  return (
    <div className="pt-32 pb-24 bg-gradient-to-b from-stone-50 to-white min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden mb-24">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 via-emerald-100/50 to-stone-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-md px-6 py-3 rounded-full border border-emerald-100 mb-6">
              <Leaf className="h-5 w-5 text-emerald-600" />
              <span className="text-sm font-bold uppercase tracking-widest text-emerald-700">About Tulasya</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-emerald-950 leading-tight">
              Healing Through <span className="text-emerald-600">Nature's Wisdom</span>
            </h2>
            <div className="bg-white/90 backdrop-blur-sm rounded-[2rem] p-8 md:p-10 shadow-xl border border-emerald-100">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed space-y-4">
                <span className="block">Tulasya is a holistic natural healing platform based on the principles of <span className="font-semibold text-emerald-700">Naturopathy, lifestyle correction, food therapy, yoga and pranayama</span>.</span>
                <span className="block">We focus on <span className="font-semibold text-emerald-700">root-cause healing, not symptom suppression</span>.</span>
                <span className="block">Our approach is <span className="font-semibold text-emerald-700">simple, practical and designed to be followed easily at home</span>.</span>
                <span className="block">Healing at Tulasya is guided through personalised diet plans, natural juices, daily routine correction and mindful breathing, respecting each body's unique pace.</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 space-y-20">
        {/* Meet Your Natural Healing Guide */}
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-emerald-100 to-emerald-50 rounded-[3rem] blur-xl opacity-50" />
          <div className="relative bg-gradient-to-br from-white to-emerald-50/30 rounded-[3rem] p-10 md:p-14 shadow-2xl border border-emerald-100">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-emerald-100 p-4 rounded-full">
                <HeartPulse className="h-8 w-8 text-emerald-600" />
              </div>
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-emerald-950 text-center mb-8">
              Meet Your Natural Healing Guide
            </h3>
            <div className="max-w-3xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-[2rem] p-8 border border-emerald-100">
                <p className="text-lg md:text-xl text-gray-700 text-center leading-relaxed space-y-4">
                  <span className="block font-semibold text-emerald-900">I am Deepshikha, a certified Naturopath and Yoga Practitioner, and the founder of Tulasya.</span>
                  <span className="block">Through years of practice, I have observed that many chronic and lifestyle-related conditions do not always need medicines — they need <span className="font-semibold text-emerald-700">correct food, correct lifestyle and correct breathing</span>.</span>
                  <span className="block">Tulasya was created to help people heal naturally, safely and sustainably, using <span className="font-semibold text-emerald-700">simple Indian food, seasonal juices and practical routines</span> — without fear, starvation or dependency.</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* My Journey */}
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-emerald-200/30 to-stone-100 rounded-[3rem] blur-xl opacity-50" />
          <div className="relative bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl border-2 border-emerald-100">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-4 rounded-full shadow-lg">
                <Sun className="h-8 w-8 text-white" />
              </div>
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-emerald-950 text-center mb-10">
              My Journey
            </h3>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <div className="bg-emerald-50/50 rounded-2xl p-6 border-l-4 border-emerald-500">
                  <p>
                    <span className="font-semibold text-emerald-900">Fifteen years ago, I was diagnosed with endometriosis.</span>
                    Painful periods, heavy bleeding, and constant discomfort became a part of my life. Like many others, I initially depended on allopathic treatment. In the hope of relief, I even underwent left ovary surgery, believing the problem would end there — but it didn't.
                  </p>
                </div>
                <div className="bg-stone-50 rounded-2xl p-6 border-l-4 border-stone-300">
                  <p>
                    After 8–10 years, the condition returned, stronger and more painful. I consulted doctors across cities, only to be advised uterus and ovary removal, along with lifelong hormonal medication. The fear of future health complications pushed me into deep emotional distress.
                  </p>
                </div>
                <div className="bg-emerald-50/50 rounded-2xl p-6 border-l-4 border-emerald-500">
                  <p>
                    During this phase, I began researching deeply — reading, learning, and understanding endometriosis beyond symptoms. That's when I realised it is a hormonal and lifestyle-related condition, and healing needed to begin from within.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 rounded-2xl p-6 border-l-4 border-emerald-600">
                  <p>
                    I started practising yoga, diet correction and natural lifestyle changes. Attending a naturopathy camp under the guidance of my Guru became a <span className="font-semibold text-emerald-900">turning point</span> — within days, I felt a profound shift in my body and mind. That experience transformed my belief system completely.
                  </p>
                </div>
                <div className="bg-emerald-50/50 rounded-2xl p-6 border-l-4 border-emerald-500">
                  <p>
                    What began as personal healing soon became my purpose. I pursued certified studies in naturopathy and yoga, devoted years to learning, practising, and serving — including free seva for many years, which I continue to offer whenever possible.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-2xl p-6 border-l-4 border-emerald-600">
                  <p>
                    Today, my trust in naturopathy is not theoretical — it is <span className="font-semibold text-emerald-900">lived, experienced and deeply rooted</span>.
                    Tulasya was born from this journey, to guide others towards natural, sustainable and compassionate healing.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-8 text-center shadow-xl mt-10">
                  <p className="text-2xl md:text-3xl font-bold text-white italic">
                    "What healed me, now guides my work."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Philosophy */}
        <div className="relative mt-20">
          <div className="absolute -inset-4 bg-gradient-to-r from-emerald-300 to-emerald-200 rounded-[3rem] blur-xl opacity-50" />
          <div className="relative bg-gradient-to-br from-emerald-50 to-white rounded-[3rem] p-10 md:p-14 shadow-2xl border-2 border-emerald-200">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-4 rounded-full shadow-lg">
                <Wind className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-emerald-950">Our Philosophy</h3>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                I believe healing is not about fighting the body, but supporting it.
              </p>
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-8 shadow-lg">
                <p className="text-2xl md:text-3xl font-bold text-white text-center leading-tight">
                  "When food, lifestyle and breath are aligned, the body begins to heal naturally."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Who Can Benefit From Tulasya */}
        <div className="relative mt-20">
          <div className="absolute -inset-4 bg-gradient-to-r from-emerald-100 to-emerald-50 rounded-[3rem] blur-xl opacity-50" />
          <div className="relative bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl border-2 border-emerald-100">
            <div className="flex items-center space-x-4 mb-8">
              <div className="bg-emerald-100 p-4 rounded-full">
                <HeartPulse className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-emerald-950">Who Can Benefit From Tulasya</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Those tired of long-term medicines',
                'Women dealing with hormonal imbalance',
                'People struggling with gut, digestion or chronic fatigue',
                'Anyone seeking natural, sustainable healing'
              ].map((item, idx) => (
                <div key={idx} className="bg-emerald-50/50 rounded-xl p-5 border-2 border-emerald-100 hover:border-emerald-300 transition-colors">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-lg text-gray-700 font-medium">{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* What Makes Tulasya Different */}
        <div className="relative mt-20">
          <div className="absolute -inset-4 bg-gradient-to-r from-emerald-200 to-emerald-100 rounded-[3rem] blur-xl opacity-50" />
          <div className="relative bg-gradient-to-br from-emerald-50 to-white rounded-[3rem] p-10 md:p-14 shadow-2xl border-2 border-emerald-200">
            <div className="flex items-center space-x-4 mb-8">
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-4 rounded-full shadow-lg">
                <Star className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-emerald-950">What Makes Tulasya Different</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'No starvation, no extreme diets',
                'Simple Indian food & seasonal juices',
                'Root-cause focused, not symptom chasing',
                'Personal guidance, not generic plans'
              ].map((item, idx) => (
                <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-lg transition-all">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-lg text-gray-700 font-medium">{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Free Seva & Ethical */}
        <div className="relative mt-20">
          <div className="absolute -inset-4 bg-gradient-to-r from-emerald-100 to-stone-100 rounded-[3rem] blur-xl opacity-50" />
          <div className="relative bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl border-2 border-emerald-100">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-emerald-100 p-4 rounded-full">
                <Droplets className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-emerald-950">Free Seva & Ethical</h3>
            </div>
            <div className="bg-emerald-50/50 rounded-2xl p-8 border-2 border-emerald-100">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                Along with guided programs, I continue to offer <span className="font-semibold text-emerald-700">free seva and guidance</span> whenever possible, staying true to the <span className="font-semibold text-emerald-700">ethical roots of naturopathy</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Gentle Disclaimer */}
        <div className="relative mt-20">
          <div className="absolute -inset-4 bg-gradient-to-r from-stone-100 to-emerald-50 rounded-[3rem] blur-xl opacity-50" />
          <div className="relative bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl border-2 border-stone-200">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-stone-100 p-4 rounded-full">
                <HeartPulse className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-emerald-950">Gentle Disclaimer</h3>
            </div>
            <div className="bg-stone-50 rounded-2xl p-8 border-2 border-stone-200">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                Natural healing is a <span className="font-semibold text-emerald-700">supportive process</span> and works alongside medical advice. <span className="font-semibold text-emerald-700">Results may vary</span> based on individual conditions.
              </p>
            </div>
          </div>
        </div>

        {/* Our Approach */}
        <div className="relative mt-20">
          <div className="absolute -inset-4 bg-gradient-to-r from-emerald-200 to-emerald-100 rounded-[3rem] blur-xl opacity-50" />
          <div className="relative bg-gradient-to-br from-white to-emerald-50/50 rounded-[3rem] p-10 md:p-14 shadow-2xl border-2 border-emerald-100">
            <div className="flex items-center space-x-4 mb-8">
              <div className="bg-emerald-100 p-4 rounded-full">
                <Zap className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-emerald-950">Our Approach</h3>
            </div>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 text-center">
                Our approach is not about treating disease — it is about <span className="font-semibold text-emerald-700">correcting the root cause</span> through:
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {[
                  { icon: Leaf, text: 'Food awareness' },
                  { icon: Sun, text: 'Daily routine correction' },
                  { icon: HeartPulse, text: 'Emotional balance' },
                  { icon: Droplets, text: 'Body detox (safe & gradual)' }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border-2 border-emerald-100 hover:border-emerald-300 hover:shadow-lg transition-all">
                    <div className="flex items-center space-x-4">
                      <div className="bg-emerald-100 p-3 rounded-full">
                        <item.icon className="h-6 w-6 text-emerald-600" />
                      </div>
                      <span className="text-lg text-gray-700 font-semibold">{item.text}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-gradient-to-r from-emerald-100 to-emerald-50 rounded-2xl p-6 border-2 border-emerald-200 text-center">
                <p className="text-lg md:text-xl text-emerald-900 font-semibold">
                  🌐 We work 100% online, supporting individuals and families across India.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* A Personal Promise */}
        <div className="relative mt-20">
          <div className="absolute -inset-4 bg-gradient-to-r from-emerald-200 to-emerald-300 rounded-[3rem] blur-xl opacity-30" />
          <div className="relative bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-[3rem] p-10 md:p-14 shadow-2xl border-2 border-emerald-500">
            <div className="text-center">
              <div className="inline-flex items-center justify-center mb-6">
                <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border-2 border-white/30">
                  <HeartPulse className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-6">A Personal Promise</h3>
              <p className="text-xl md:text-2xl text-white/95 leading-relaxed font-medium max-w-3xl mx-auto italic">
                "I will guide you with honesty, care and patience — exactly as I once needed for myself."
              </p>
            </div>
          </div>
        </div>

        {/* Important Note */}
        <div className="relative mt-20">
          <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-[4rem] blur-2xl opacity-30" />
          <div className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900 rounded-[4rem] p-12 md:p-16 text-center text-white shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
            <div className="relative z-10">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest">Important Notice</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-black mb-6">IMPORTANT NOTE</h3>
              <p className="text-xl md:text-2xl text-emerald-50/90 max-w-3xl mx-auto leading-relaxed font-medium">
                Tulasya provides lifestyle and wellness guidance only. We do not replace medical treatment.
              </p>
            </div>
          </div>
        </div>

        {/* Why Tulasya */}
        <div className="mt-20 relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-emerald-100 to-emerald-50 rounded-[3rem] blur-xl opacity-50" />
          <div className="relative bg-gradient-to-br from-white to-emerald-50/30 rounded-[3rem] p-10 md:p-14 shadow-2xl border-2 border-emerald-100">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center mb-4">
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-4 rounded-full shadow-lg">
                  <Star className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-emerald-950 mb-4">WHY TULSAYA?</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[
                'Natural & non-invasive approach',
                'No dependency-creating methods',
                'Practical guidance for daily life',
                'Family-friendly & sustainable',
                'Honest, ethical & transparent'
              ].map((item, idx) => (
                <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border-2 border-emerald-100 hover:border-emerald-300 hover:shadow-lg transition-all group">
                  <div className="flex items-center space-x-3">
                    <div className="bg-emerald-100 group-hover:bg-emerald-200 p-2 rounded-full transition-colors">
                      <CheckCircle className="h-5 w-5 text-emerald-600" />
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 bg-gradient-to-r from-emerald-100 to-emerald-50 rounded-2xl p-6 border-2 border-emerald-200 text-center">
              <p className="text-lg md:text-xl text-emerald-900 font-semibold italic">
                "We don't promise miracles — we guide you towards self-healing."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Treat = () => {
  const conditionCategories = [
    {
      emoji: '🧠',
      title: 'Mental & Nervous System',
      conditions: [
        'Stress, Anxiety, Panic attacks',
        'Poor sleep / Insomnia',
        'Mental fatigue, Brain fog',
        'Mild depression (lifestyle-related)'
      ]
    },
    {
      emoji: '🍽',
      title: 'Digestive & Gut Health',
      conditions: [
        'Acidity, Gas, Bloating',
        'IBS, Colitis, Constipation',
        'Indigestion, Slow digestion',
        'Fatty Liver (Grade 1–2)',
        'Poor appetite / Weak digestion'
      ]
    },
    {
      emoji: '⚖',
      title: 'Weight & Metabolic Health',
      conditions: [
        'Obesity / Weight gain',
        'Sudden weight loss / कमजोरी',
        'Diabetes (Type 2 – lifestyle managed)',
        'Insulin resistance',
        'PCOD / PCOS',
        'Hormonal imbalance'
      ]
    },
    {
      emoji: '❤️',
      title: 'Heart & Circulation',
      conditions: [
        'High Blood Pressure (BP)',
        'Cholesterol imbalance',
        'Poor circulation, heaviness'
      ]
    },
    {
      emoji: '🦴',
      title: 'Bones, Joints & Muscles',
      conditions: [
        'Joint pain, Knee pain',
        'Back pain, Cervical pain',
        'Slip disc (supportive care)',
        'Muscle stiffness & weakness'
      ]
    },
    {
      emoji: '🧴',
      title: 'Skin & Allergy Issues',
      conditions: [
        'Skin issues (eczema, allergy)',
        'Chronic itching',
        'Pimples / acne (gut-related)',
        'Dry & dull skin'
      ]
    },
    {
      emoji: '🛌',
      title: 'Lifestyle-Related Issues',
      conditions: [
        'Low immunity',
        'Chronic tiredness',
        'कमजोरी, low energy',
        'Irregular daily routine'
      ]
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-5xl font-black text-emerald-950">What We Treat</h2>
          <p className="text-gray-500">Conditions where medicines give temporary relief but lifestyle gives permanent healing.</p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-stone-50 p-10 rounded-[2.5rem] shadow-xl border border-stone-200">
            <h3 className="text-3xl font-bold text-emerald-950 mb-10 text-center">Chronic & Lifestyle Conditions</h3>
            <div className="space-y-8">
              {conditionCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="space-y-3">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{category.emoji}</span>
                    <h4 className="text-xl font-bold text-emerald-900">{category.title}</h4>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3 ml-8">
                    {category.conditions.map((condition, conditionIndex) => (
                      <div key={conditionIndex} className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{condition}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Programs = () => {
  const programs = [
    {
      id: 'consultation',
      title: '1:1 Online Consultation',
      icon: <HeartPulse className="h-8 w-8" />,
      desc: 'Personal health discussion, Disease-specific strategy, Fully confidential.',
      color: 'emerald'
    },
    {
      id: 'diet',
      title: 'Personalised Diet Plans',
      icon: <Leaf className="h-8 w-8" />,
      desc: 'No starvation, No expensive foods, Indian home-based meals, Seasonal & practical.',
      color: 'sky'
    },
    {
      id: 'yoga',
      title: 'Yoga & Pranayama Guidance',
      icon: <Wind className="h-8 w-8" />,
      desc: 'Simple & safe, Disease-specific, Age-friendly.',
      color: 'rose'
    },
    {
      id: 'lifestyle',
      title: 'Lifestyle Correction Coaching',
      icon: <Droplets className="h-8 w-8" />,
      desc: 'Sleep correction, Stress management, Daily routine healing.',
      color: 'amber'
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-5xl font-black text-emerald-950">Programs (Online Only)</h2>
          <p className="text-gray-500">Choose your path to natural healing.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {programs.map((program) => (
            <div key={program.id} className="bg-stone-50 p-10 rounded-[2.5rem] shadow-xl border border-stone-200 hover:-translate-y-2 transition-all duration-300">
              <div className={`mb-6 p-4 rounded-2xl w-fit bg-${program.color}-50 text-${program.color}-600`}>
                {program.icon}
              </div>
              <h3 className="text-2xl font-bold text-emerald-950 mb-4">{program.title}</h3>
              <p className="text-gray-600 leading-relaxed">{program.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-emerald-50 rounded-[3rem] p-12 text-center">
          <h3 className="text-3xl font-bold text-emerald-950 mb-6">HOW ONLINE CONSULTATION WORKS</h3>
          <div className="grid md:grid-cols-5 gap-6 text-sm">
            <div className="space-y-2">
              <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold mx-auto">1</div>
              <p>Fill enquiry / message us</p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold mx-auto">2</div>
              <p>Initial online discussion (audio/video)</p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold mx-auto">3</div>
              <p>Personalised guidance shared</p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold mx-auto">4</div>
              <p>Weekly follow-ups</p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold mx-auto">5</div>
              <p>Ongoing lifestyle support</p>
            </div>
          </div>
          <p className="mt-6 text-emerald-700 font-medium">👉 Everything is online & simple 👉 No hospital visits required</p>
        </div>
      </div>
    </div>
  );
};

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `Contact from ${name}`;
    const body = `${message}%0A%0AFrom: ${name}%0AEmail: ${email}`;
    window.location.href = `mailto:deepajaiswal7275@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="pt-32 pb-24 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-5xl font-black text-emerald-950">Contact Us</h2>
          <p className="text-xl text-gray-500">Start your natural healing journey today 🌿</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-emerald-950 mb-4">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-6 w-6 text-emerald-600" />
                  <span className="text-gray-700">deepajaiswal7275@gmail.com</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-emerald-950 mb-4">Quick Contact</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://wa.me/1234567890" // Replace with actual WhatsApp number
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-2xl font-bold hover:bg-green-700 transition-colors"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  WhatsApp
                </a>
                <a
                  href="tel:+1234567890" // Replace with actual phone number
                  className="flex items-center justify-center px-6 py-3 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-colors"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Call
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl">
            <h3 className="text-2xl font-bold text-emerald-950 mb-6">Send us a Message</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <textarea
                  rows="5"
                  placeholder="Your Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const Reviews = () => {
  const [testimonials, setTestimonials] = useState([
    { name: 'Sarah J.', text: '6 months pain-free after 10 years of migraines. Tulasya changed everything.', rating: 5, videoUrl: null },
    { name: 'Michael C.', text: 'The biological science behind these natural lifestyle changes is undeniable.', rating: 5, videoUrl: null },
    { name: 'Anita R.', text: 'Stability in my energy levels I haven\'t felt since my childhood.', rating: 5, videoUrl: null }
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', text: '', rating: 5, videoUrl: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setTestimonials([...testimonials, newReview]);
    setNewReview({ name: '', text: '', rating: 5, videoUrl: '' });
    setShowForm(false);
  };

  const VideoEmbed = ({ url }) => {
    let embedUrl = '';
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes('instagram.com')) {
      const parts = url.split('/');
      const id = parts[4];
      embedUrl = `https://www.instagram.com/p/${id}/embed/`;
    } else if (url.includes('facebook.com')) {
      embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=0&width=560`;
    }
    if (!embedUrl) return null;
    return (
      <iframe
        src={embedUrl}
        width="560"
        height="315"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full mb-6 rounded-2xl"
      ></iframe>
    );
  };

  return (
    <div className="pt-32 pb-24 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-black text-emerald-950 text-center mb-20">Movement Stories</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white p-12 rounded-[3rem] shadow-xl shadow-stone-200 border border-stone-100">
              <div className="flex mb-6 space-x-1">
                {[...Array(t.rating)].map((_, i) => <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />)}
              </div>
              <p className="text-xl text-emerald-950 italic mb-10 leading-relaxed">"{t.text}"</p>
              {t.videoUrl && <VideoEmbed url={t.videoUrl} />}
              <div>
                <h4 className="font-black text-emerald-900">{t.name}</h4>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-colors"
          >
            {showForm ? 'Cancel' : 'Add Review'}
          </button>
        </div>

        {showForm && (
          <div className="mt-12 bg-white p-8 rounded-[2.5rem] shadow-xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-emerald-950 mb-6 text-center">Share Your Story</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                />
              </div>
              <textarea
                rows="4"
                placeholder="Your Review"
                value={newReview.text}
                onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none resize-none"
              ></textarea>
              <div>
                <input
                  type="url"
                  placeholder="Video URL (YouTube, Instagram, Facebook - optional)"
                  value={newReview.videoUrl}
                  onChange={(e) => setNewReview({ ...newReview, videoUrl: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                />
              </div>
              <div className="flex items-center space-x-4">
                <label className="font-semibold text-emerald-950">Rating:</label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          star <= newReview.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-colors"
              >
                Submit Review
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-emerald-950 text-white py-24">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 pb-20 border-b border-white/10">
        <div className="lg:col-span-2">
          <div className="flex items-center mb-8">
            <img src="/Tulasaya.png" alt="Tulsaya Logo" className="h-8 w-8 rounded-full object-cover border-2 border-emerald-400 mr-2" />
            <span className="text-2xl font-black tracking-tight">TULASYA</span>
          </div>
          <p className="text-emerald-100/60 max-w-sm leading-relaxed text-lg">
            Reclaiming your biological inheritance through nature, food, and fasting. Join thousands healing without medicine.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-8 uppercase tracking-widest text-xs text-emerald-500">About Tulasya</h4>
          <ul className="space-y-4 text-emerald-50/70">
            <li><button className="hover:text-emerald-400 transition-colors font-medium">Our Story</button></li>
            <li><button className="hover:text-emerald-400 transition-colors font-medium">About Us</button></li>
            <li><button className="hover:text-emerald-400 transition-colors font-medium">Team</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-8 uppercase tracking-widest text-xs text-emerald-500">Services</h4>
          <ul className="space-y-4 text-emerald-50/70">
            <li><button className="hover:text-emerald-400 transition-colors font-medium">1:1 Online Consultation</button></li>
            <li><button className="hover:text-emerald-400 transition-colors font-medium">Personalised Diet Plans</button></li>
            <li><button className="hover:text-emerald-400 transition-colors font-medium">Yoga & Pranayama Guidance</button></li>
            <li><button className="hover:text-emerald-400 transition-colors font-medium">Lifestyle Correction Coaching</button></li>
          </ul>
        </div>
      </div>

      <div className="pb-20 border-b border-white/10">
        <div className="text-center mb-12">
          <h4 className="text-2xl font-bold text-emerald-400 mb-4">FAQs</h4>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="space-y-6">
            <div>
              <h5 className="font-semibold text-emerald-200 mb-2">Q. How long does natural healing take?</h5>
              <p className="text-emerald-100/80">Healing is a gradual process. Some people feel relief early, while others need consistent lifestyle and diet correction over time. We respect your body's pace.</p>
            </div>
            <div>
              <h5 className="font-semibold text-emerald-200 mb-2">Q. Will I have to follow very strict or difficult diets?</h5>
              <p className="text-emerald-100/80">No. Our plans are simple, practical and based on Indian home food. No starvation, no extreme rules.</p>
            </div>
            <div>
              <h5 className="font-semibold text-emerald-200 mb-2">Q. Can this help with long-term acidity, gut issues or hormonal problems?</h5>
              <p className="text-emerald-100/80">Yes. Many such conditions are lifestyle and stress related. We work on digestion, food habits, routine and mental well-being together.</p>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h5 className="font-semibold text-emerald-200 mb-2">Q. What if my condition gets worse initially?</h5>
              <p className="text-emerald-100/80">Mild fluctuations can happen as the body adjusts. You are guided closely, and changes are made whenever required.</p>
            </div>
            <div>
              <h5 className="font-semibold text-emerald-200 mb-2">Q. Is emotional or mental stress addressed here?</h5>
              <p className="text-emerald-100/80">Yes. Mental stress and suppressed emotions affect physical health. You can openly share your concerns — healing is approached holistically.</p>
            </div>
            <div>
              <h5 className="font-semibold text-emerald-200 mb-2">Q. Do I need to buy special products or supplements?</h5>
              <p className="text-emerald-100/80">No. Healing is guided through food, lifestyle, yoga and natural practices — nothing fancy or expensive.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-10">
        <div className="text-center mb-8">
          <blockquote className="text-2xl md:text-3xl font-light italic text-emerald-200">
            "Healing is not a pill.<br />It is a lifestyle."
          </blockquote>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-emerald-100/40">
          <div className="flex space-x-8 mb-6 md:mb-0">
            <button className="hover:text-emerald-400">Disclaimer</button>
            <button className="hover:text-emerald-400">Privacy Policy</button>
            <button className="hover:text-emerald-400">Contact</button>
          </div>
          <div className="flex space-x-4">
            {/* Social Media Links - placeholders */}
            <button className="hover:text-emerald-400">Facebook</button>
            <a href="https://www.instagram.com/tulasaya.naturecure/?utm_source=qr&igsh=MWd4emhtd2VucXh4Zg%3D%3D#" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">Instagram</a>
            <button className="hover:text-emerald-400">Twitter</button>
          </div>
        </div>
        <div className="text-center mt-8 pt-8 border-t border-white/10">
          <p>&copy; 2025 TULASYA Movement. Built for Vitality.</p>
        </div>
      </div>
    </div>
  </footer>
);

// --- MAIN APPLICATION ---

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [authModal, setAuthModal] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <HomePage setCurrentPage={setCurrentPage} />;
      case 'about': return <About />;
      case 'contact': return <Contact />;
      case 'treat': return <Treat />;
      case 'programs': return <Programs />;
      case 'reviews': return <Reviews />;
      default: return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen font-sans bg-white selection:bg-emerald-200 selection:text-emerald-900">
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        user={user} 
        setUser={setUser}
        setAuthModal={setAuthModal}
      />
      
      <main className="pt-20 transition-all duration-500">
        {renderPage()}
      </main>

      <Footer />

      <AuthModal 
        isOpen={authModal} 
        onClose={() => setAuthModal(false)} 
        setUser={setUser} 
      />
    </div>
  );
}
