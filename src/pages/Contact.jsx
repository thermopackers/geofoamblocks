import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  Clock,
  Loader2,
  Building2,
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const LOCATIONS = {
  Jalandhar: {
    label: 'Jalandhar Office',
    region: 'Punjab, India',
    description: 'Serving Punjab & North India',
    mapQuery: 'Jalandhar,Punjab,India',
    phone: '+91 9878165432',
    email: 'jalandhar@geofoamblocks.com',
  },
  Uttarakhand: {
    label: 'Uttarakhand Office',
    region: 'Dehradun / Roorkee region',
    description: 'Serving hill roads & infrastructure projects',
    mapQuery: 'Dehradun,Uttarakhand,India',
    phone: '+91 9878165432',
    email: 'uttarakhand@geofoamblocks.com',
  },
};

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    location: 'Jalandhar',
    message: '',
  });
  const [status, setStatus] = useState(''); // '', 'loading', 'success', 'error'
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Invalid email';
    if (!form.phone.trim()) errs.phone = 'Phone is required';
    else if (!/^[0-9+\-\s()]{7,}$/.test(form.phone)) errs.phone = 'Invalid phone';
    if (!form.message.trim()) errs.message = 'Message is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    try {
      await axios.post(`${API_URL}/api/contact`, form);
      setStatus('success');
      setForm({ name: '', email: '', phone: '', location: 'Jalandhar', message: '' });
      setTimeout(() => setStatus(''), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus(''), 5000);
    }
  };

  const updateField = (field, value) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: '' });
  };

  const activeLocation = LOCATIONS[form.location];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* HERO HEADER */}
     <section className="relative py-20 md:py-24 overflow-hidden">
  {/* Background image */}
  <div className="absolute inset-0">
    <img
      src="/assets/contact-hero.png"
      alt=""
      className="w-full h-full object-cover"
      onError={(e) => { e.target.style.display = 'none'; }}
    />
  </div>

  {/* Gradient overlay for text legibility */}
  <div className="absolute inset-0 bg-gradient-to-br from-geofoam-dark/50 via-geofoam-primary/60 to-geofoam-accent/30" />

  {/* Decorative glows */}
  <div className="absolute top-0 right-0 w-72 h-72 bg-geofoam-highlight/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
  <div className="absolute bottom-0 left-0 w-72 h-72 bg-geofoam-highlight/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    className="relative max-w-3xl mx-auto px-4 text-center text-white"
  >
    <span className="inline-block px-4 py-1.5 mb-5 text-xs font-semibold tracking-widest uppercase bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
      Contact Us
    </span>
    <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
      Get in{' '}
      <span className="bg-gradient-to-r from-geofoam-highlight to-orange-400 bg-clip-text text-transparent">
        Touch
      </span>
    </h1>
    <p className="text-white/75 max-w-lg mx-auto">
      Our Geofoam experts are available in Jalandhar & Uttarakhand. Tell
      us about your project and we&rsquo;ll respond within 24 hours.
    </p>
  </motion.div>
</section>

      {/* FORM + INFO */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-6xl mx-auto px-4 -mt-12 relative z-10"
      >
        <div className="grid lg:grid-cols-5 gap-6">
          {/* FORM (spans 3 cols) */}
          <div className="lg:col-span-3 bg-white rounded-3xl shadow-2xl p-6 md:p-10 border border-gray-100">
            <h2 className="text-2xl font-bold mb-1 text-geofoam-dark">
              Send Us a Message
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Fill in the details below and our team will get back to you.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="Your full name"
                  className={`w-full border rounded-xl p-3.5 focus:ring-2 focus:ring-geofoam-highlight focus:border-transparent outline-none transition-all ${
                    errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200'
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.name}
                  </p>
                )}
              </div>

              {/* Email + Phone */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="you@company.com"
                    className={`w-full border rounded-xl p-3.5 focus:ring-2 focus:ring-geofoam-highlight focus:border-transparent outline-none transition-all ${
                      errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder="+91 99999 99999"
                    className={`w-full border rounded-xl p-3.5 focus:ring-2 focus:ring-geofoam-highlight focus:border-transparent outline-none transition-all ${
                      errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Location selector */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Nearest Office
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(LOCATIONS).map(([key, loc]) => {
                    const active = form.location === key;
                    return (
                      <motion.button
                        key={key}
                        type="button"
                        onClick={() => updateField('location', key)}
                        whileTap={{ scale: 0.97 }}
                        className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                          active
                            ? 'border-geofoam-highlight bg-red-50 shadow-md'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <Building2
                          size={18}
                          className={active ? 'text-geofoam-highlight' : 'text-gray-400'}
                        />
                        <div className="font-bold text-sm mt-2">{key}</div>
                        <div className="text-[11px] text-gray-500 mt-0.5">
                          {loc.region}
                        </div>
                        {active && (
                          <motion.div
                            layoutId="activeLocation"
                            className="absolute inset-0 border-2 border-geofoam-highlight rounded-xl pointer-events-none"
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Message
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  placeholder="Tell us about your project, site conditions, and requirements..."
                  className={`w-full border rounded-xl p-3.5 focus:ring-2 focus:ring-geofoam-highlight focus:border-transparent outline-none transition-all resize-none ${
                    errors.message ? 'border-red-400 bg-red-50' : 'border-gray-200'
                  }`}
                />
                {errors.message && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} /> Send Message
                  </>
                )}
              </button>

              {/* Status messages */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-xl p-3 text-sm"
                  >
                    <CheckCircle size={18} />
                    Message sent successfully! We&rsquo;ll respond within 24 hours.
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 text-sm"
                  >
                    <AlertCircle size={18} />
                    Something went wrong. Please try again or call us directly.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          {/* INFO PANEL (spans 2 cols) */}
          <div className="lg:col-span-2 space-y-5">
            {/* Active office card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={form.location}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-geofoam-dark text-white rounded-3xl shadow-xl overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="text-geofoam-highlight" size={20} />
                    <h3 className="font-bold text-lg">
                      {activeLocation.label}
                    </h3>
                  </div>
                  <p className="text-sm text-white/70 mb-4">
                    {activeLocation.description}
                  </p>

                  <div className="space-y-2.5 text-sm">
                    <a
                      href={`tel:${activeLocation.phone.replace(/\s/g, '')}`}
                      className="flex items-center gap-2 text-white/80 hover:text-geofoam-highlight transition-colors"
                    >
                      <Phone size={14} className="text-geofoam-highlight" />
                      {activeLocation.phone}
                    </a>
                    <a
                      href={`mailto:${activeLocation.email}`}
                      className="flex items-center gap-2 text-white/80 hover:text-geofoam-highlight transition-colors"
                    >
                      <Mail size={14} className="text-geofoam-highlight" />
                      {activeLocation.email}
                    </a>
                    <div className="flex items-center gap-2 text-white/80">
                      <Clock size={14} className="text-geofoam-highlight" />
                      Mon–Sat, 9:00 AM – 6:00 PM IST
                    </div>
                  </div>
                </div>

                {/* Embedded map */}
                <div className="h-48 bg-white/5">
                  <iframe
                    title={`${activeLocation.label} location map`}
                    src={`https://www.google.com/maps?q=${encodeURIComponent(
                      activeLocation.mapQuery
                    )}&output=embed`}
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Other office quick card */}
            {Object.entries(LOCATIONS)
              .filter(([key]) => key !== form.location)
              .map(([key, loc]) => (
                <motion.button
                  key={key}
                  type="button"
                  onClick={() => updateField('location', key)}
                  whileHover={{ y: -2 }}
                  className="w-full text-left bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-5 border border-gray-100"
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-geofoam-highlight/10 p-2.5 rounded-xl">
                      <MapPin className="text-geofoam-highlight" size={18} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm text-geofoam-dark">
                        {loc.label}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {loc.region}
                      </p>
                      <p className="text-xs text-geofoam-highlight font-medium mt-1">
                        Switch to this office →
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}

            {/* Response promise */}
            <div className="bg-gradient-to-br from-geofoam-highlight/10 to-orange-50 border border-geofoam-highlight/20 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="text-geofoam-highlight" size={18} />
                <p className="font-bold text-sm text-geofoam-dark">
                  24-Hour Response
                </p>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                We respond to all project inquiries within one business day.
                For urgent site visits, call us directly.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;