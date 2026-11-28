
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
  AlertCircle,
  Sparkles,
  Clock,
  Building2,
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/applications', label: 'Applications' },
  { to: '/calculator', label: 'Cost Calculator' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
];

const socialLinks = [
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
];

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setError('');

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Enter a valid email address.');
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${API_URL}/api/newsletter`, { email });

      setSubscribed(true);
      setEmail('');

      setTimeout(() => setSubscribed(false), 4000);
    } catch (err) {
      console.error(
        'Newsletter error:',
        err.response?.data || err.message
      );

      setError('Something went wrong. Try again.');
      setTimeout(() => setError(''), 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="relative bg-geofoam-dark text-white/80 overflow-hidden">

      {/* TOP ACCENT */}
      <div className="h-1 bg-gradient-to-r from-geofoam-highlight via-orange-400 to-yellow-300" />

      {/* BACKGROUND DECORATION */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-geofoam-highlight/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-geofoam-accent/15 rounded-full blur-[110px] pointer-events-none" />

      {/* CTA STRIP */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden bg-gradient-to-r from-geofoam-primary via-geofoam-primary to-geofoam-accent rounded-3xl p-7 sm:p-9 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-7 border border-white/10 shadow-xl"
        >
          <div className="absolute -right-16 -top-24 w-72 h-72 bg-geofoam-highlight/20 rounded-full blur-[80px]" />

          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-geofoam-highlight mb-3">
              <Sparkles size={14} />
              Start Your Next Project
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Ready to Replace
              <span className="text-geofoam-highlight"> Sand Fill?</span>
            </h3>

            <p className="text-sm sm:text-base text-white/65 mt-3 leading-relaxed">
              Get an instant estimate for your project in under 30 seconds.
              Discover a smarter way to build.
            </p>
          </div>

          <Link
            to="/calculator"
            className="relative z-10 group inline-flex items-center justify-center gap-3 bg-geofoam-highlight hover:bg-red-600 text-white font-bold px-7 py-4 rounded-xl shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 shrink-0 w-full md:w-auto"
          >
            Calculate Project Cost

            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </Link>
        </motion.div>
      </div>

      {/* MAIN FOOTER GRID */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* BRAND */}
          <div className="lg:col-span-4">
            <Link
              to="/"
              className="inline-flex items-center gap-3 mb-6 group"
            >
              <motion.div
                whileHover={{ rotate: -5, scale: 1.06 }}
                className="w-11 h-11 rounded-xl bg-gradient-to-br from-geofoam-highlight to-orange-500 flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-orange-500/20"
              >
                G
              </motion.div>

              <div>
                <span className="text-2xl font-extrabold text-white tracking-tight font-display">
                  GeoFoam
                  <span className="text-geofoam-highlight"> Blocks</span>
                </span>

                <p className="text-[9px] uppercase tracking-[0.22em] text-white/40 font-bold mt-1">
                  Lightweight Engineering
                </p>
              </div>
            </Link>

            <p className="text-sm leading-7 text-white/55 max-w-sm mb-7">
              Lightweight Geofoam solutions for roads, bridges, and buildings
              across North India. Replacing heavy sand fill with engineered EPS.
            </p>

            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-geofoam-highlight" />
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/45">
                Connect With Us
              </span>
            </div>

            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  whileHover={{ y: -4, scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-geofoam-highlight border border-white/10 hover:border-geofoam-highlight flex items-center justify-center text-white/65 hover:text-white transition-all duration-300"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d={social.path} />
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="lg:col-span-2">
            <h4 className="font-extrabold text-white mb-6 text-xs uppercase tracking-[0.16em]">
              Quick Links
            </h4>

            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group inline-flex items-center gap-2 text-sm text-white/55 hover:text-geofoam-highlight transition-colors duration-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/25 group-hover:bg-geofoam-highlight group-hover:scale-125 transition-all" />

                    {link.label}

                    <ArrowRight
                      size={13}
                      className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* OFFICES */}
          <div className="lg:col-span-3">
            <h4 className="font-extrabold text-white mb-6 text-xs uppercase tracking-[0.16em]">
              Our Offices
            </h4>

            <div className="space-y-6">
              {[
                {
                  city: 'Jalandhar',
                  region: 'Punjab, India',
                  tag: 'Head Office',
                },
                {
                  city: 'Dehradun / Roorkee',
                  region: 'Uttarakhand, India',
                  tag: 'Regional Office',
                },
              ].map((office) => (
                <div key={office.city} className="flex gap-3 group">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-geofoam-highlight/15 group-hover:border-geofoam-highlight/30 transition-all">
                    <MapPin
                      size={17}
                      className="text-geofoam-highlight"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-white/90">
                      {office.city}
                    </p>

                    <p className="text-xs text-white/45 mt-1">
                      {office.region}
                    </p>

                    <span className="inline-flex mt-2 text-[9px] font-extrabold uppercase tracking-wider text-geofoam-highlight bg-geofoam-highlight/10 border border-geofoam-highlight/10 px-2.5 py-1 rounded-full">
                      {office.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CONTACT + NEWSLETTER */}
          <div className="lg:col-span-3">
            <h4 className="font-extrabold text-white mb-6 text-xs uppercase tracking-[0.16em]">
              Get In Touch
            </h4>

            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:info@geofoamblocks.com"
                  className="group flex items-center gap-3 text-sm text-white/55 hover:text-geofoam-highlight transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-geofoam-highlight/15 transition-all">
                    <Mail
                      size={16}
                      className="text-geofoam-highlight"
                    />
                  </div>

                  <span className="break-all">
                    info@geofoamblocks.com
                  </span>
                </a>
              </li>

              <li>
                <a
                  href="tel:+919878165432"
                  className="group flex items-center gap-3 text-sm text-white/55 hover:text-geofoam-highlight transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-geofoam-highlight/15 transition-all">
                    <Phone
                      size={16}
                      className="text-geofoam-highlight"
                    />
                  </div>

                  +91 9878165432
                </a>
              </li>

              <li className="flex items-center gap-3 text-sm text-white/50">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Clock size={16} className="text-geofoam-highlight" />
                </div>

                <span>Mon–Sat, 9 AM – 6 PM IST</span>
              </li>
            </ul>

           
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="relative border-t border-white/10 bg-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40 text-center md:text-left">
            © {new Date().getFullYear()} GeoFoam Blocks. All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-xs text-white/40">
            <a
              href="#"
              className="hover:text-geofoam-highlight transition-colors"
            >
              Privacy Policy
            </a>

            <span className="w-1 h-1 rounded-full bg-white/20" />

            <a
              href="#"
              className="hover:text-geofoam-highlight transition-colors"
            >
              Terms of Service
            </a>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-white/30 font-medium">
            <Building2 size={13} />
            Lightweight Engineering Solutions
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
