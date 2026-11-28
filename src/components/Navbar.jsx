
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ArrowRight,
  Phone,
  Sparkles,
  Calculator,
  Clock,
} from 'lucide-react';

const links = [
  { to: '/', label: 'Home' },
  { to: '/applications', label: 'Applications' },
  { to: '/calculator', label: 'Cost Calculator' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  // Scroll-aware navbar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scrolling while mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close drawer when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close drawer with Escape key
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-2xl shadow-[0_8px_35px_rgba(15,23,42,0.09)] border-b border-gray-100'
            : 'bg-white/85 backdrop-blur-xl shadow-sm border-b border-white/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex justify-between items-center transition-all duration-300 ${
              scrolled ? 'h-[68px]' : 'h-[78px]'
            }`}
          >
            {/* BRAND */}
            <Link
              to="/"
              className="group flex items-center gap-3 shrink-0"
              aria-label="GeoFoam Blocks Home"
            >
              <motion.div
                whileHover={{ rotate: -5, scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-geofoam-highlight to-orange-500 flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-orange-500/20 overflow-hidden"
              >
                <span className="relative z-10">G</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </motion.div>

              <div className="flex flex-col leading-none">
                <span className="text-xl sm:text-[22px] font-extrabold text-geofoam-dark tracking-tight font-display">
                  GeoFoam
                  <span className="text-geofoam-highlight"> Blocks</span>
                </span>

                <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-gray-400 mt-1.5">
                  Lightweight Engineering
                </span>
              </div>
            </Link>

            {/* DESKTOP NAVIGATION */}
            <div className="hidden lg:flex items-center gap-1">
              {links.map((link) => {
                const active = pathname === link.to;

                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`relative px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-300 ${
                      active
                        ? 'text-geofoam-highlight bg-orange-50/70'
                        : 'text-gray-600 hover:text-geofoam-dark hover:bg-gray-50'
                    }`}
                  >
                    {link.label}

                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-geofoam-highlight"
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* DESKTOP CTA */}
            <div className="hidden lg:flex items-center">
              <Link
                to="/calculator"
                className="group relative inline-flex items-center gap-2 overflow-hidden bg-geofoam-highlight hover:bg-red-600 text-white text-sm font-bold px-5 py-3 rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all duration-300"
              >
                <Calculator size={16} />

                <span className="relative z-10">Get Estimate</span>

                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </Link>
            </div>

            {/* MOBILE / TABLET MENU BUTTON */}
            <button
              type="button"
              className="lg:hidden relative w-11 h-11 flex items-center justify-center rounded-xl bg-gray-50 hover:bg-orange-50 border border-gray-100 hover:border-orange-100 transition-all duration-300"
              onClick={() => setOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={open}
              aria-controls="mobile-navigation"
            >
              <Menu size={23} className="text-geofoam-dark" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {open && (
          <>
            {/* BACKDROP */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-slate-950/55 backdrop-blur-sm z-[60] lg:hidden"
              aria-hidden="true"
            />

            {/* DRAWER */}
            <motion.aside
              key="drawer"
              id="mobile-navigation"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{
                type: 'spring',
                stiffness: 320,
                damping: 34,
              }}
              className="fixed top-0 right-0 h-[100dvh] w-[88%] max-w-[390px] bg-white z-[70] shadow-2xl lg:hidden flex flex-col overflow-hidden"
              aria-label="Mobile navigation"
            >
              {/* DRAWER HEADER */}
              <div className="relative flex items-center justify-between px-5 py-5 border-b border-gray-100">
                <Link
                  to="/"
                  className="flex items-center gap-3"
                  onClick={() => setOpen(false)}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-geofoam-highlight to-orange-500 flex items-center justify-center text-white font-extrabold shadow-md">
                    G
                  </div>

                  <div>
                    <p className="text-lg font-extrabold text-geofoam-dark leading-none">
                      Geo<span className="text-geofoam-highlight">Foam</span>
                    </p>

                    <p className="text-[9px] text-gray-400 font-bold tracking-[0.18em] uppercase mt-1.5">
                      Blocks
                    </p>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 hover:bg-red-50 text-gray-500 hover:text-red-500 transition-all duration-300"
                  aria-label="Close navigation menu"
                >
                  <X size={21} />
                </button>
              </div>

              {/* DRAWER INTRO */}
              <div className="px-5 pt-7 pb-3">
                <div className="flex items-center gap-2 text-geofoam-highlight text-[10px] font-extrabold uppercase tracking-[0.2em]">
                  <Sparkles size={13} />
                  Explore GeoFoam
                </div>

                <h2 className="text-2xl font-extrabold text-geofoam-dark mt-2">
                  Where would you like to go?
                </h2>

                <p className="text-xs text-gray-400 mt-1">
                  Discover smarter lightweight engineering solutions.
                </p>
              </div>

              {/* DRAWER LINKS */}
              <nav className="flex-1 overflow-y-auto px-4 py-5">
                <ul className="space-y-2">
                  {links.map((link, i) => {
                    const active = pathname === link.to;

                    return (
                      <motion.li
                        key={link.to}
                        initial={{ opacity: 0, x: 25 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.08 + i * 0.06,
                          duration: 0.3,
                        }}
                      >
                        <Link
                          to={link.to}
                          onClick={() => setOpen(false)}
                          aria-current={active ? 'page' : undefined}
                          className={`group flex items-center justify-between px-4 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                            active
                              ? 'bg-orange-50 text-geofoam-highlight border border-orange-100 shadow-sm'
                              : 'text-gray-600 hover:bg-gray-50 border border-transparent'
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <span
                              className={`w-1.5 h-7 rounded-full transition-all ${
                                active
                                  ? 'bg-geofoam-highlight'
                                  : 'bg-gray-200 group-hover:bg-orange-300'
                              }`}
                            />

                            <span className="text-sm">{link.label}</span>
                          </span>

                          <ArrowRight
                            size={17}
                            className={`transition-all duration-300 ${
                              active
                                ? 'text-geofoam-highlight'
                                : 'text-gray-300 group-hover:text-geofoam-highlight group-hover:translate-x-1'
                            }`}
                          />
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>

                {/* CONTACT BLOCK */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 p-5 rounded-2xl bg-gradient-to-br from-geofoam-primary to-geofoam-dark text-white relative overflow-hidden"
                >
                  <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-geofoam-highlight/20 blur-3xl" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                        <Phone size={16} className="text-geofoam-highlight" />
                      </div>

                      <p className="text-xs font-bold uppercase tracking-wider text-white/70">
                        Need Help?
                      </p>
                    </div>

                    <a
                      href="tel:+919878165432"
                      className="flex items-center gap-2 text-lg font-extrabold hover:text-geofoam-highlight transition-colors"
                    >
                      +91 9878165432
                    </a>

                    <div className="flex items-center gap-2 text-xs text-white/55 mt-3">
                      <Clock size={13} />
                      Mon–Sat, 9:00 AM – 6:00 PM IST
                    </div>
                  </div>
                </motion.div>
              </nav>

              {/* DRAWER CTA */}
              <div className="p-5 border-t border-gray-100 bg-white">
                <Link
                  to="/calculator"
                  onClick={() => setOpen(false)}
                  className="group w-full flex items-center justify-center gap-2 bg-geofoam-highlight hover:bg-red-600 text-white font-bold text-sm px-5 py-4 rounded-xl shadow-lg shadow-orange-500/20 transition-all duration-300"
                >
                  <Calculator size={17} />
                  Calculate Your Cost

                  <ArrowRight
                    size={17}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>

                <p className="text-center text-[10px] text-gray-400 mt-3">
                  Lightweight Engineering. Smarter Construction.
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
