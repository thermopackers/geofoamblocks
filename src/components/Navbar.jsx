import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Phone } from 'lucide-react';

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

  // Scroll-aware background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close drawer on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-md'
            : 'bg-white/80 backdrop-blur-md shadow-sm'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex justify-between items-center">
          {/* Brand */}
          <Link to="/" className="group flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-geofoam-highlight to-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:scale-105 transition-transform">
              G
            </div>
          <span className="text-xl font-bold text-geofoam-dark tracking-tight font-display">
  GeoFoam <span className="text-geofoam-highlight">Blocks</span>
</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => {
              const active = pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    active
                      ? 'text-geofoam-highlight'
                      : 'text-gray-600 hover:text-geofoam-dark'
                  }`}
                >
                  {l.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 bg-geofoam-highlight rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <Link
            to="/calculator"
            className="hidden md:inline-flex items-center gap-1.5 bg-geofoam-highlight text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-red-600 transition-colors shadow-sm"
          >
            Get Estimate <ArrowRight size={15} />
          </Link>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} className="text-geofoam-dark" />
          </button>
        </div>
      </motion.nav>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] md:hidden"
            />

            {/* Drawer panel */}
            <motion.aside
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 h-full w-[82%] max-w-sm bg-white z-[70] shadow-2xl md:hidden flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-geofoam-highlight to-orange-500 flex items-center justify-center text-white font-bold text-xs">
                    G
                  </div>
                  <span className="text-lg font-bold text-geofoam-dark">
                    Geo<span className="text-geofoam-highlight">Foam</span>
                  </span>
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={22} className="text-geofoam-dark" />
                </button>
              </div>

              {/* Drawer links */}
              <nav className="flex-1 overflow-y-auto px-4 py-6">
                <ul className="space-y-1">
                  {links.map((l, i) => {
                    const active = pathname === l.to;
                    return (
                      <motion.li
                        key={l.to}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                      >
                        <Link
                          to={l.to}
                          onClick={() => setOpen(false)}
                          className={`flex items-center justify-between px-4 py-3.5 rounded-xl font-medium transition-colors ${
                            active
                              ? 'bg-geofoam-highlight/10 text-geofoam-highlight'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <span>{l.label}</span>
                          <ArrowRight
                            size={16}
                            className={active ? 'text-geofoam-highlight' : 'text-gray-300'}
                          />
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>

                {/* Contact block */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-geofoam-primary to-geofoam-dark text-white"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">
                    Need Help?
                  </p>
                  <a
                    href="tel:+919878165432"
                    className="flex items-center gap-2 font-semibold hover:text-geofoam-highlight transition-colors"
                  >
                    <Phone size={16} /> +91 9878165432
                  </a>
                  <p className="text-xs text-white/60 mt-1">
                    Mon–Sat, 9:00 AM – 6:00 PM IST
                  </p>
                </motion.div>
              </nav>

              {/* Drawer CTA */}
              <div className="p-4 border-t border-gray-100">
                <Link
                  to="/calculator"
                  onClick={() => setOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-geofoam-highlight text-white font-semibold px-4 py-3.5 rounded-xl hover:bg-red-600 transition-colors"
                >
                  Calculate Your Cost <ArrowRight size={16} />
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;