
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
  ArrowRight,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  Headphones,
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

  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};

    if (!form.name.trim()) errs.name = 'Name is required';

    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      errs.email = 'Invalid email';
    }

    if (!form.phone.trim()) errs.phone = 'Phone is required';
    else if (!/^[0-9+\-\s()]{7,}$/.test(form.phone)) {
      errs.phone = 'Invalid phone';
    }

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
      setForm({
        name: '',
        email: '',
        phone: '',
        location: 'Jalandhar',
        message: '',
      });

      setTimeout(() => setStatus(''), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus(''), 5000);
    }
  };

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const activeLocation = LOCATIONS[form.location];

  const inputClass = (field) =>
    `w-full bg-gray-50 border rounded-xl px-4 py-3.5 text-sm text-geofoam-dark placeholder:text-gray-400 outline-none transition-all duration-300 focus:bg-white focus:ring-4 focus:ring-geofoam-highlight/10 focus:border-geofoam-highlight ${
      errors[field]
        ? 'border-red-400 bg-red-50/50'
        : 'border-gray-200 hover:border-gray-300'
    }`;

  return (
    <div className="min-h-screen bg-[#f5f7fa] pb-20 overflow-hidden">

      {/* HERO */}
      <section className="relative min-h-[370px] md:min-h-[420px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/contact-hero.png"
            alt=""
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-geofoam-dark/85 via-geofoam-primary/75 to-geofoam-accent/65" />

        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
            backgroundSize: '45px 45px',
          }}
        />

        <div className="absolute top-0 right-0 w-80 h-80 bg-geofoam-highlight/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-400/15 rounded-full blur-[100px]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-3xl mx-auto px-5 py-20 text-center text-white"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-xs font-bold tracking-[0.18em] uppercase bg-white/10 backdrop-blur-xl border border-white/20 rounded-full"
          >
            <Sparkles size={14} className="text-geofoam-highlight" />
            Let's Build Something Better
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
            Get in
            <span className="block mt-2 bg-gradient-to-r from-geofoam-highlight via-orange-300 to-yellow-200 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>

          <p className="text-white/75 max-w-xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
            Have a Geofoam project in mind? Connect with our experts in
            Jalandhar and Uttarakhand. Tell us what you need, and we'll
            help you find the right solution.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {[
              { icon: Clock, text: '24-Hour Response' },
              { icon: Headphones, text: 'Expert Assistance' },
              { icon: ShieldCheck, text: 'Project Support' },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 border border-white/10 text-xs sm:text-sm text-white/85 backdrop-blur-md"
              >
                <item.icon size={15} className="text-geofoam-highlight" />
                {item.text}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CONTACT CONTENT */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="grid lg:grid-cols-5 gap-6 items-start"
        >

          {/* CONTACT FORM */}
          <div className="lg:col-span-3 bg-white rounded-3xl border border-gray-100 shadow-[0_20px_70px_rgba(15,23,42,0.09)] overflow-hidden">

            <div className="p-6 sm:p-8 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center">
                  <MessageSquare size={23} className="text-geofoam-highlight" />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-geofoam-highlight">
                    Contact Our Team
                  </p>
                  <h2 className="text-2xl font-extrabold text-geofoam-dark mt-1">
                    Send Us a Message
                  </h2>
                </div>
              </div>

              <p className="text-sm text-gray-500 leading-relaxed">
                Fill in your project details below. Our team will get back
                to you with the information and assistance you need.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 space-y-6"
              noValidate
            >

              {/* NAME */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-bold text-geofoam-dark mb-2"
                >
                  Full Name <span className="text-geofoam-highlight">*</span>
                </label>

                <input
                  id="contact-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  className={inputClass('name')}
                />

                {errors.name && (
                  <p className="text-xs text-red-500 mt-2 flex items-center gap-1.5">
                    <AlertCircle size={13} />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* EMAIL + PHONE */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-bold text-geofoam-dark mb-2"
                  >
                    Email Address <span className="text-geofoam-highlight">*</span>
                  </label>

                  <div className="relative">
                    <Mail
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />

                    <input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder="you@company.com"
                      autoComplete="email"
                      aria-invalid={Boolean(errors.email)}
                      className={`${inputClass('email')} pl-11`}
                    />
                  </div>

                  {errors.email && (
                    <p className="text-xs text-red-500 mt-2 flex items-center gap-1.5">
                      <AlertCircle size={13} />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-sm font-bold text-geofoam-dark mb-2"
                  >
                    Phone Number <span className="text-geofoam-highlight">*</span>
                  </label>

                  <div className="relative">
                    <Phone
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />

                    <input
                      id="contact-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      placeholder="+91 99999 99999"
                      autoComplete="tel"
                      aria-invalid={Boolean(errors.phone)}
                      className={`${inputClass('phone')} pl-11`}
                    />
                  </div>

                  {errors.phone && (
                    <p className="text-xs text-red-500 mt-2 flex items-center gap-1.5">
                      <AlertCircle size={13} />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* OFFICE SELECTION */}
              <div>
                <div className="mb-3">
                  <label className="block text-sm font-bold text-geofoam-dark">
                    Nearest Office
                  </label>
                  <p className="text-xs text-gray-400 mt-1">
                    Select the office closest to your project.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(LOCATIONS).map(([key, loc]) => {
                    const active = form.location === key;

                    return (
                      <motion.button
                        key={key}
                        type="button"
                        onClick={() => updateField('location', key)}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative overflow-hidden text-left p-4 rounded-2xl border-2 transition-all duration-300 ${
                          active
                            ? 'border-geofoam-highlight bg-orange-50/70 shadow-lg shadow-orange-100'
                            : 'border-gray-100 bg-gray-50/70 hover:border-gray-300 hover:bg-white'
                        }`}
                      >
                        {active && (
                          <motion.div
                            layoutId="activeLocation"
                            className="absolute inset-0 rounded-2xl border-2 border-geofoam-highlight pointer-events-none"
                            transition={{
                              type: 'spring',
                              stiffness: 350,
                              damping: 30,
                            }}
                          />
                        )}

                        <div className="relative z-10 flex items-start gap-3">
                          <div
                            className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center ${
                              active
                                ? 'bg-geofoam-highlight text-white'
                                : 'bg-white text-gray-400 border border-gray-100'
                            }`}
                          >
                            <Building2 size={19} />
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-sm text-geofoam-dark">
                              {loc.label}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {loc.region}
                            </p>
                            <p
                              className={`text-[11px] mt-2 font-semibold ${
                                active
                                  ? 'text-geofoam-highlight'
                                  : 'text-gray-400'
                              }`}
                            >
                              {active ? 'Selected Office' : 'Select Office'}
                            </p>
                          </div>

                          {active && (
                            <CheckCircle
                              size={17}
                              className="text-geofoam-highlight shrink-0"
                            />
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* MESSAGE */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-bold text-geofoam-dark mb-2"
                >
                  Project Details / Message{' '}
                  <span className="text-geofoam-highlight">*</span>
                </label>

                <textarea
                  id="contact-message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  placeholder="Tell us about your project, site conditions, location, dimensions, and requirements..."
                  aria-invalid={Boolean(errors.message)}
                  className={`${inputClass('message')} resize-none leading-relaxed`}
                />

                {errors.message && (
                  <p className="text-xs text-red-500 mt-2 flex items-center gap-1.5">
                    <AlertCircle size={13} />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* SUBMIT */}
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={status !== 'loading' ? { scale: 1.015 } : {}}
                whileTap={status !== 'loading' ? { scale: 0.98 } : {}}
                className="group w-full min-h-[56px] rounded-xl bg-geofoam-highlight text-white font-bold flex items-center justify-center gap-3 shadow-lg shadow-geofoam-highlight/20 hover:shadow-xl hover:brightness-105 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={19} className="animate-spin" />
                    Sending Your Message...
                  </>
                ) : (
                  <>
                    <Send size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                    Send Message
                    <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </motion.button>

              {/* STATUS */}
              <AnimatePresence mode="wait">
                {status === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div
                      role="status"
                      className="flex items-start gap-3 bg-green-50 border border-green-200 text-green-800 rounded-2xl p-4"
                    >
                      <CheckCircle size={20} className="shrink-0 mt-0.5 text-green-600" />
                      <div>
                        <p className="font-bold text-sm">Message sent successfully!</p>
                        <p className="text-xs mt-1 text-green-700">
                          Thank you for contacting us. We'll respond within 24 hours.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div
                      role="alert"
                      className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-800 rounded-2xl p-4"
                    >
                      <AlertCircle size={20} className="shrink-0 mt-0.5 text-red-600" />
                      <div>
                        <p className="font-bold text-sm">Unable to send your message</p>
                        <p className="text-xs mt-1 text-red-700">
                          Please try again or contact our office directly.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="text-center text-[11px] text-gray-400 leading-relaxed">
                By submitting this form, you agree to be contacted by our team
                regarding your project inquiry.
              </p>
            </form>
          </div>

          {/* OFFICE INFORMATION */}
          <div className="lg:col-span-2 space-y-5">

            {/* ACTIVE OFFICE */}
            <AnimatePresence mode="wait">
              <motion.div
                key={form.location}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.35 }}
                className="bg-geofoam-dark text-white rounded-3xl shadow-xl overflow-hidden"
              >
                <div className="p-6 sm:p-7 relative overflow-hidden">
                  <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-geofoam-highlight/15 blur-[65px]" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 text-geofoam-highlight text-xs font-bold uppercase tracking-[0.16em] mb-4">
                      <MapPin size={15} />
                      Our Office
                    </div>

                    <h3 className="text-2xl font-extrabold mb-2">
                      {activeLocation.label}
                    </h3>

                    <p className="text-sm text-white/60 mb-6">
                      {activeLocation.description}
                    </p>

                    <div className="space-y-4">
                      <a
                        href={`tel:${activeLocation.phone.replace(/\s/g, '')}`}
                        className="group flex items-center gap-3 text-white/80 hover:text-geofoam-highlight transition-colors"
                      >
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                          <Phone size={17} className="text-geofoam-highlight" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] uppercase tracking-wider text-white/40 font-bold">
                            Call Us
                          </p>
                          <p className="text-sm font-semibold mt-0.5 break-all">
                            {activeLocation.phone}
                          </p>
                        </div>
                      </a>

                      <a
                        href={`mailto:${activeLocation.email}`}
                        className="group flex items-center gap-3 text-white/80 hover:text-geofoam-highlight transition-colors"
                      >
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                          <Mail size={17} className="text-geofoam-highlight" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] uppercase tracking-wider text-white/40 font-bold">
                            Email Us
                          </p>
                          <p className="text-sm font-semibold mt-0.5 break-all">
                            {activeLocation.email}
                          </p>
                        </div>
                      </a>

                      <div className="flex items-center gap-3 text-white/80">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                          <Clock size={17} className="text-geofoam-highlight" />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-white/40 font-bold">
                            Working Hours
                          </p>
                          <p className="text-sm font-semibold mt-0.5">
                            Mon–Sat, 9:00 AM – 6:00 PM IST
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* GOOGLE MAP */}
                <div className="h-56 bg-white/5 relative">
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

            {/* OTHER OFFICE */}
            {Object.entries(LOCATIONS)
              .filter(([key]) => key !== form.location)
              .map(([key, loc]) => (
                <motion.button
                  key={key}
                  type="button"
                  onClick={() => updateField('location', key)}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full text-left bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-5 border border-gray-100 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-orange-50 flex items-center justify-center group-hover:bg-geofoam-highlight transition-colors duration-300">
                      <MapPin
                        size={21}
                        className="text-geofoam-highlight group-hover:text-white transition-colors duration-300"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-geofoam-dark">
                        {loc.label}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {loc.region}
                      </p>
                      <p className="text-xs text-geofoam-highlight font-semibold mt-2">
                        Switch to this office →
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}

            {/* RESPONSE PROMISE */}
            <div className="relative overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 rounded-2xl p-5">
              <div className="absolute -right-8 -bottom-8 w-28 h-28 bg-geofoam-highlight/10 rounded-full blur-2xl" />

              <div className="relative z-10 flex items-start gap-3">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-white flex items-center justify-center shadow-sm">
                  <Clock size={19} className="text-geofoam-highlight" />
                </div>

                <div>
                  <p className="font-extrabold text-sm text-geofoam-dark">
                    24-Hour Response
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed mt-2">
                    We respond to all project inquiries within one business
                    day. For urgent site visits, call us directly.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
