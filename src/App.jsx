import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Applications from './pages/Applications';
import Contact from './pages/Contact';
import About from './pages/About';
import Calculator from './pages/Calculator';
import WhatsAppButton from './components/WhatsAppButton';
import AdminNewsletter from './pages/AdminNewsletter';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Small delay lets AnimatePresence finish mounting the new page
    // before the smooth scroll begins, so both animations read as one motion.
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/admin/newsletter" element={<AdminNewsletter />} />
        </Routes>
      </AnimatePresence>
      <Footer />
            <WhatsAppButton />
    </Router>
  );
}

export default App;