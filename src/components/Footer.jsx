import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import {
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  Send,
  CheckCircle,
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/applications', label: 'Applications' },
  { to: '/calculator', label: 'Cost Calculator' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
];

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setError('');

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Enter a valid email');
      return;
    }

    try {
      await axios.post(`${API_URL}/api/newsletter`, { email });
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    } catch (err)  {
        console.error('Newsletter error:', err.response?.data || err.message);
      setError('Something went wrong. Try again.');
      setTimeout(() => setError(''), 4000);
    }
  };

  return (
    <footer className="relative bg-geofoam-dark text-white/80 overflow-hidden">
      {/* Top gradient accent */}
      <div className="h-1 bg-gradient-to-r from-geofoam-highlight via-orange-400 to-geofoam-highlight" />

      {/* Decorative glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-geofoam-highlight/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-geofoam-accent/10 rounded-full blur-3xl pointer-events-none" />

      {/* CTA STRIP */}
      <div className="relative max-w-6xl mx-auto px-4 pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-geofoam-primary to-geofoam-accent rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 border border-white/10"
        >
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white">
              Ready to replace sand fill?
            </h3>
            <p className="text-sm text-white/60 mt-1">
              Get an instant estimate for your project in under 30 seconds.
            </p>
          </div>
          <Link
            to="/calculator"
            className="group inline-flex items-center gap-2 bg-geofoam-highlight text-white font-semibold px-6 py-3 rounded-xl hover:bg-red-600 transition-colors shrink-0"
          >
            Calculate Cost
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>
      </div>

      {/* MAIN GRID */}
      <div className="relative max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-12 gap-10">
        {/* Brand + social */}
        <div className="md:col-span-4">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-geofoam-highlight to-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:scale-105 transition-transform">
              G
            </div>
            <span className="text-2xl font-bold text-white tracking-tight font-display">
              GeoFoam <span className="text-geofoam-highlight">Blocks</span>
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-white/60 mb-5">
            Lightweight Geofoam solutions for roads, bridges, and buildings
            across North India. Replacing heavy sand fill with engineered EPS.
          </p>
          <div className="flex gap-2">
            {[
              {
                label: 'Facebook',
                path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
              },
              {
                label: 'Instagram',
                path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
              },
              {
                label: 'LinkedIn',
                path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
              },
            ].map((s) => (
              <motion.a
                key={s.label}
                href="#"
                aria-label={s.label}
                whileHover={{ y: -3 }}
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-geofoam-highlight border border-white/10 hover:border-geofoam-highlight flex items-center justify-center transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d={s.path} />
                </svg>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-2">
          <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-sm">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="group inline-flex items-center gap-1.5 text-white/60 hover:text-geofoam-highlight transition-colors"
                >
                  <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-geofoam-highlight transition-colors" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Offices */}
        <div className="md:col-span-3">
          <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
            Our Offices
          </h4>
          <ul className="space-y-4 text-sm">
            {[
              { city: 'Jalandhar', region: 'Punjab, India', tag: 'Head Office' },
              { city: 'Dehradun / Roorkee', region: 'Uttarakhand, India', tag: 'Regional' },
            ].map((o) => (
              <li key={o.city} className="flex gap-2.5">
                <MapPin size={16} className="text-geofoam-highlight mt-0.5 shrink-0" />
                <div>
                  <p className="text-white/90 font-medium">{o.city}</p>
                  <p className="text-xs text-white/50">{o.region}</p>
                  <span className="inline-block mt-1 text-[10px] font-semibold uppercase tracking-wider text-geofoam-highlight bg-geofoam-highlight/10 px-2 py-0.5 rounded">
                    {o.tag}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter + Contact */}
        <div className="md:col-span-3">
          <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
            Stay Updated
          </h4>
          <p className="text-xs text-white/50 mb-3">
            Project insights, new case studies, and Geofoam tips — once a month.
          </p>
          <form onSubmit={handleSubscribe} className="mb-5">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-2.5 text-sm text-white placeholder-white/30 focus:ring-2 focus:ring-geofoam-highlight focus:border-transparent outline-none transition-all"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-geofoam-highlight hover:bg-red-600 flex items-center justify-center transition-colors"
              >
                <Send size={14} className="text-white" />
              </button>
            </div>
            {subscribed && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-1.5 text-xs text-green-400 mt-2"
              >
                <CheckCircle size={12} /> Subscribed! Check your inbox.
              </motion.p>
            )}
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-400 mt-2"
              >
                {error}
              </motion.p>
            )}
          </form>

          <ul className="space-y-2.5 text-sm">
            <li>
              <a
                href="mailto:info@geofoamblocks.com"
                className="flex items-center gap-2 text-white/60 hover:text-geofoam-highlight transition-colors"
              >
                <Mail size={15} className="text-geofoam-highlight shrink-0" />
                info@geofoamblocks.com
              </a>
            </li>
            <li>
              <a
                href="tel:+919878165432"
                className="flex items-center gap-2 text-white/60 hover:text-geofoam-highlight transition-colors"
              >
                <Phone size={15} className="text-geofoam-highlight shrink-0" />
                +91 9878165432
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="relative border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>
            © {new Date().getFullYear()} GeoFoam Blocks. All rights reserved.
          </p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-geofoam-highlight transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-geofoam-highlight transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;