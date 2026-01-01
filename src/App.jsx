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
            <img src="/Tulasya.jpeg" alt="Tulsaya Logo" className="h-8 w-8 md:h-10 md:w-10 mr-2" />
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
    <div className="pt-32 pb-24 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-5xl font-black text-emerald-950">About Us</h2>
          <p className="text-xl text-gray-500">Tulasya is a holistic natural healing platform based on Naturopathy, Lifestyle Correction, Food Therapy, Yoga & Pranayama.
We focus on root cause healing, not symptom suppression.</p>
        </div>

        <div className="bg-white rounded-[3rem] p-12 shadow-xl mb-20">
          <h3 className="text-3xl font-bold text-emerald-950 text-center mb-8">Meet Your Natural Healing Guide</h3>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto leading-relaxed">
            I am Deepshika, a certified Naturopath, Yoga practitioner and founder of Tulasya. Through years of practice, I have seen that many chronic diseases do not need medicines — they need correct lifestyle, correct food, and correct breathing. Tulasya was created to help people heal naturally, safely, and sustainably from their homes.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-emerald-950">Our Approach</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our approach is not about treating disease — it is about correcting the root cause through:
            </p>
            <ul className="space-y-4 text-lg text-gray-600">
              <li>• Food awareness</li>
              <li>• Daily routine correction</li>
              <li>• Emotional balance</li>
              <li>• Body detox (safe & gradual)</li>
            </ul>
            <p className="text-lg text-gray-600">
              We work 100% online, supporting individuals and families across India.
            </p>
          </div>
          <div className="bg-white p-10 rounded-[2.5rem] shadow-xl">
            <h3 className="text-3xl font-bold text-emerald-950 mb-6">Our Philosophy</h3>
            <p className="text-lg text-gray-600 mb-6">
              When lifestyle becomes medicine, healing becomes permanent.
            </p>
            <p className="text-lg text-gray-600 mb-6">We focus on:</p>
            <ul className="space-y-2 text-gray-600">
              <li>• Digestive health</li>
              <li>• Hormonal balance</li>
              <li>• Metabolic support</li>
              <li>• Stress reduction</li>
              <li>• Long-term wellness</li>
            </ul>
          </div>
        </div>

        <div className="bg-emerald-900 rounded-[4rem] p-16 text-center text-white shadow-2xl relative overflow-hidden">
          <h3 className="text-4xl font-bold mb-8">IMPORTANT NOTE</h3>
          <p className="text-emerald-100/80 max-w-2xl mx-auto text-xl leading-relaxed">
            Tulasya provides lifestyle and wellness guidance only. We do not replace medical treatment.
          </p>
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        </div>

        <div className="mt-20 bg-white rounded-[3rem] p-12 shadow-xl">
          <h3 className="text-3xl font-bold text-emerald-950 text-center mb-8">WHY TULSAYA?</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-6 w-6 text-emerald-600" />
              <span className="text-gray-700">Natural & non-invasive approach</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-6 w-6 text-emerald-600" />
              <span className="text-gray-700">No dependency-creating methods</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-6 w-6 text-emerald-600" />
              <span className="text-gray-700">Practical guidance for daily life</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-6 w-6 text-emerald-600" />
              <span className="text-gray-700">Family-friendly & sustainable</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-6 w-6 text-emerald-600" />
              <span className="text-gray-700">Honest, ethical & transparent</span>
            </div>
            <div className="flex items-center space-x-3 col-span-full justify-center">
              <span className="text-emerald-700 font-medium italic">We don't promise miracles — we guide you towards self-healing.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Treat = () => {
  const conditions = [
    'PCOD / PCOS',
    'Thyroid imbalance',
    'Diabetes (Type 2)',
    'High Blood Pressure',
    'Obesity / Weight Issues',
    'IBS, Colitis, Constipation',
    'Acidity, Gas, Fatty Liver',
    'Joint Pain, Knee Pain, Back Pain',
    'Cervical & Slip Disc',
    'Skin issues (eczema, allergy)',
    'Stress, Anxiety, Poor Sleep'
  ];

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-5xl font-black text-emerald-950">What We Treat</h2>
          <p className="text-gray-500">Conditions where medicines give temporary relief but lifestyle gives permanent healing.</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-stone-50 p-10 rounded-[2.5rem] shadow-xl border border-stone-200">
            <h3 className="text-3xl font-bold text-emerald-950 mb-8 text-center">Chronic & Lifestyle Conditions</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {conditions.map((condition, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-emerald-600 flex-shrink-0" />
                  <span className="text-gray-700">{condition}</span>
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
  const testimonials = [
    { name: 'Sarah J.', role: '21-Day Graduate', text: '6 months pain-free after 10 years of migraines. Tulasya changed everything.', rating: 5 },
    { name: 'Michael C.', role: 'Healthcare Professional', text: 'The biological science behind these natural lifestyle changes is undeniable.', rating: 5 },
    { name: 'Anita R.', role: '7-Day Detox', text: 'Stability in my energy levels I haven\'t felt since my childhood.', rating: 5 }
  ];

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
              <div>
                <h4 className="font-black text-emerald-900">{t.name}</h4>
                <p className="text-sm text-emerald-600 font-bold">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
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
            <img src="/Tulasya.jpeg" alt="Tulsaya Logo" className="h-8 w-8 rounded-full object-cover border-2 border-emerald-400 mr-2" />
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
          <h4 className="text-2xl font-bold text-emerald-400 mb-4">FAQs (बहुत ज़रूरी)</h4>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="space-y-6">
            <div>
              <h5 className="font-semibold text-emerald-200 mb-2">Q. Is this medical treatment?</h5>
              <p className="text-emerald-100/80">No. This is natural lifestyle-based guidance.</p>
            </div>
            <div>
              <h5 className="font-semibold text-emerald-200 mb-2">Q. Do I need to stop my medicines?</h5>
              <p className="text-emerald-100/80">Only after doctor advice. We guide gradually.</p>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h5 className="font-semibold text-emerald-200 mb-2">Q. Is this safe for elderly?</h5>
              <p className="text-emerald-100/80">Yes. Plans are gentle & customised.</p>
            </div>
            <div>
              <h5 className="font-semibold text-emerald-200 mb-2">Q. How is consultation done?</h5>
              <p className="text-emerald-100/80">Online via call / video / WhatsApp.</p>
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
            <button className="hover:text-emerald-400">Instagram</button>
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
