
import { motion, useReducedMotion } from 'framer-motion';
import {
  AlertTriangle,
  CheckCircle,
  Weight,
  Bug,
  Droplets,
  Play,
  ArrowRight,
  Truck,
  Recycle,
  ShieldCheck,
  Zap,
  Clock3,
  Layers3,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import AnimatedSection from '../components/AnimatedSection';

// Existing assets — unchanged
const HERO_VIDEO = '/assets/geofoam-hero.mp4';
const INSTALL_VIDEO = '/assets/geofoam-install.mp4';
const SAND_IMAGE = '/assets/sand-fill-problems.jpg';
const GEOFOAM_IMAGE = '/assets/geofoam-installation.jpg';

const ease = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.13 },
  },
};

const sandProblems = [
  {
    icon: Weight,
    title: 'Extreme Weight',
    description:
      '~2 tons per cubic meter. Causes settlement and structural stress on soft ground.',
  },
  {
    icon: Bug,
    title: 'Termite Risk',
    description:
      'Sand attracts pests and requires recurring chemical treatment.',
  },
  {
    icon: Droplets,
    title: 'Soil Erosion',
    description:
      'Susceptible to washout, lateral spreading, and long-term subsidence.',
  },
];

const geofoamBenefits = [
  {
    icon: Weight,
    title: 'Ultra-Light',
    description:
      '~20–40 kg/m³ — roughly 1/50th the weight of sand. Reduces settlement dramatically [citation:1].',
  },
  {
    icon: Bug,
    title: 'Termite-Proof',
    description:
      'Inorganic EPS has no food value for pests. No chemical treatment needed.',
  },
  {
    icon: Droplets,
    title: 'Erosion-Immune',
    description:
      'Closed-cell structure resists water absorption and will not wash away [citation:1].',
  },
];

const extraBenefits = [
  {
    icon: Truck,
    title: 'Fewer Trips',
    description: 'One truck of Geofoam replaces multiple soil trips.',
  },
  {
    icon: Recycle,
    title: '50–100 Year Life',
    description: 'Engineered EPS lasts for decades [citation:1].',
  },
  {
    icon: CheckCircle,
    title: 'Faster Construction',
    description: 'No compaction equipment or curing delays.',
  },
];

const highlights = [
  { icon: Weight, value: '100×', label: 'Lighter than sand' },
  { icon: Layers3, value: '20–40', label: 'kg/m³ density' },
  { icon: Clock3, value: 'Faster', label: 'Installation process' },
];

const FloatingOrb = ({ className = '' }) => (
  <motion.div
    aria-hidden="true"
    animate={{ y: [0, -18, 0], scale: [1, 1.05, 1] }}
    transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
    className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
  />
);

const SectionHeading = ({ eyebrow, title, description, light = false }) => (
  <motion.div
    variants={fadeUp}
    className="text-center max-w-3xl mx-auto mb-14 md:mb-16"
  >
    <span
      className={`inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase ${
        light ? 'text-orange-300' : 'text-orange-600'
      }`}
    >
      <span className="w-7 h-px bg-current" />
      {eyebrow}
      <span className="w-7 h-px bg-current" />
    </span>

    <h2
      className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mt-5 mb-5 leading-tight ${
        light ? 'text-white' : 'text-slate-900'
      }`}
    >
      {title}
    </h2>

    <p
      className={`text-sm sm:text-base md:text-lg leading-relaxed ${
        light ? 'text-slate-300' : 'text-slate-500'
      }`}
    >
      {description}
    </p>
  </motion.div>
);

const BenefitItem = ({ item, variant = 'green' }) => {
  const Icon = item.icon;
  const isGreen = variant === 'green';

  return (
    <motion.li
      variants={fadeUp}
      whileHover={{ x: 5 }}
      className="group flex items-start gap-4"
    >
      <div
        className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
          isGreen
            ? 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white'
            : 'bg-red-50 text-red-500 group-hover:bg-red-500 group-hover:text-white'
        }`}
      >
        <Icon size={21} strokeWidth={2} />
      </div>

      <div className="pt-0.5">
        <h3
          className={`font-bold text-base mb-1 ${
            isGreen ? 'text-slate-900' : 'text-slate-800'
          }`}
        >
          {item.title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed">
          {item.description}
        </p>
      </div>
    </motion.li>
  );
};

const ComparisonCard = ({ type, image, items }) => {
  const isGreen = type === 'green';
  const Icon = isGreen ? CheckCircle : AlertTriangle;

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -9 }}
      transition={{ type: 'spring', stiffness: 250, damping: 22 }}
      className={`group relative rounded-[2rem] overflow-hidden bg-white border shadow-[0_12px_45px_rgba(15,23,42,0.06)] hover:shadow-[0_25px_70px_rgba(15,23,42,0.13)] transition-shadow duration-500 ${
        isGreen ? 'border-emerald-100' : 'border-red-100'
      }`}
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={
            isGreen
              ? 'Geofoam block installation'
              : 'Sand fill construction problems'
          }
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />

        <div
          className={`absolute inset-0 ${
            isGreen
              ? 'bg-gradient-to-t from-emerald-950/90 via-emerald-950/10 to-transparent'
              : 'bg-gradient-to-t from-red-950/90 via-red-950/10 to-transparent'
          }`}
        />

        <div className="absolute top-5 left-5">
          <span
            className={`px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase backdrop-blur-md text-white border border-white/20 ${
              isGreen ? 'bg-emerald-500/30' : 'bg-red-500/30'
            }`}
          >
            {isGreen ? 'Modern Solution' : 'Traditional Method'}
          </span>
        </div>

        <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/20 ${
              isGreen ? 'bg-emerald-500/30' : 'bg-red-500/30'
            }`}
          >
            <Icon size={23} className="text-white" />
          </div>

          <h3 className="text-xl md:text-2xl font-extrabold text-white">
            {isGreen ? 'Geofoam Solution' : 'Conventional Sand Fill'}
          </h3>
        </div>
      </div>

      {/* Benefits */}
      <div className="p-6 sm:p-8">
        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-7"
        >
          {items.map((item) => (
            <BenefitItem
              key={item.title}
              item={item}
              variant={isGreen ? 'green' : 'red'}
            />
          ))}
        </motion.ul>
      </div>

      <div
        className={`h-1 w-full ${
          isGreen
            ? 'bg-gradient-to-r from-emerald-400 to-teal-500'
            : 'bg-gradient-to-r from-red-400 to-orange-500'
        }`}
      />
    </motion.div>
  );
};

const Landing = () => {
  const shouldReduceMotion = useReducedMotion();

  const motionSettings = shouldReduceMotion
    ? { initial: false, animate: { opacity: 1, y: 0 } }
    : {};

  return (
    <div className="pt-20 bg-white overflow-hidden">
      {/* =========================================
          HERO SECTION
      ========================================== */}
      <section className="relative min-h-[calc(100svh-5rem)] flex items-center justify-center overflow-hidden bg-[#071426] text-white px-4 sm:px-6">
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={GEOFOAM_IMAGE}
          preload="metadata"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>

        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#071426]/95 via-[#102b49]/75 to-[#071426]/90" />

        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)',
            backgroundSize: '65px 65px',
          }}
        />

        <FloatingOrb className="w-80 h-80 bg-orange-500/20 top-10 -left-40" />
        <FloatingOrb className="w-96 h-96 bg-blue-500/20 bottom-0 -right-40" />

        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-400/60 to-transparent" />

        {/* Hero content */}
        <motion.div
          {...motionSettings}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 45 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
          className="relative z-10 max-w-6xl mx-auto w-full text-center py-20 md:py-24"
        >
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/[0.07] border border-white/15 backdrop-blur-xl"
          >
            <Sparkles size={14} className="text-orange-400" />
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-white/90">
              Engineered Lightweight Fill
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </motion.div>

          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9, ease }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-black leading-[1.06] tracking-[-0.045em] mb-7"
          >
            Replace Sand.
            <br />
            <span className="relative inline-block mt-2">
              <span className="bg-gradient-to-r from-orange-300 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                Build Lighter.
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.8, ease }}
                className="absolute -bottom-2 left-0 w-full h-1 rounded-full origin-left bg-gradient-to-r from-orange-400 to-transparent"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8 }}
            className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Geofoam blocks are up to{' '}
            <span className="text-white font-bold">100× lighter</span> than
            sand fill — eliminating settlement, termite risk, and soil erosion
            on every project.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="/calculator"
              className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 shadow-[0_10px_35px_rgba(249,115,22,0.3)] hover:shadow-[0_15px_45px_rgba(249,115,22,0.45)] hover:-translate-y-1 transition-all duration-300"
            >
              Calculate Your Savings
              <ArrowRight
                size={19}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>

            <ScrollLink
              to="comparison"
              smooth
              duration={750}
              offset={-90}
              className="group cursor-pointer w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-sm sm:text-base text-white border border-white/20 bg-white/[0.06] backdrop-blur-xl hover:bg-white/15 hover:border-white/40 hover:-translate-y-1 transition-all duration-300"
            >
              <Play size={17} className="text-orange-400" />
              See the Difference
            </ScrollLink>
          </motion.div>

          {/* Hero statistics */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto mt-16"
          >
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  className="flex items-center justify-center gap-3 px-4 py-4 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-lg"
                >
                  <Icon className="text-orange-400 shrink-0" size={22} />
                  <div className="text-left">
                    <p className="text-xl font-extrabold text-white">
                      {item.value}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {item.label}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 9, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-[9px] tracking-[0.25em] uppercase">
            Scroll to explore
          </span>
          <ChevronDown size={20} />
        </motion.div>
      </section>

      {/* =========================================
          COMPARISON SECTION
      ========================================== */}
      <AnimatedSection
        id="comparison"
        className="relative py-24 md:py-32 px-4 sm:px-6 bg-[#f8fafc]"
      >
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#071426]/5 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto relative">
          <SectionHeading
            eyebrow="The Problem & The Solution"
            title={
              <>
                Why Replace Sand
                <span className="text-orange-500"> Filling?</span>
              </>
            }
            description="Traditional sand fill creates long-term liabilities. Geofoam eliminates them at the source."
          />

          {/* Comparison cards */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            className="grid md:grid-cols-2 gap-7 lg:gap-10"
          >
            <ComparisonCard
              type="red"
              image={SAND_IMAGE}
              items={sandProblems}
            />

            <ComparisonCard
              type="green"
              image={GEOFOAM_IMAGE}
              items={geofoamBenefits}
            />
          </motion.div>

          {/* Additional benefits */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10"
          >
            {extraBenefits.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  className="group relative flex items-start gap-4 p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-orange-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute top-0 left-0 h-0.5 w-0 bg-gradient-to-r from-orange-400 to-amber-500 group-hover:w-full transition-all duration-500" />

                  <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-orange-50 text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                    <Icon size={22} />
                  </div>

                  <div>
                    <p className="font-bold text-slate-900 mb-1">
                      {item.title}
                    </p>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <span className="absolute top-3 right-4 text-[10px] font-bold text-slate-200">
                    0{index + 1}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* =========================================
          VIDEO SECTION
      ========================================== */}
      <AnimatedSection className="relative py-24 md:py-32 px-4 sm:px-6 bg-[#071426] text-white overflow-hidden">
        <FloatingOrb className="w-96 h-96 bg-blue-500/10 -top-40 -left-40" />
        <FloatingOrb className="w-96 h-96 bg-orange-500/10 bottom-0 -right-40" />

        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeading
            eyebrow="Watch It In Action"
            title={
              <>
                See the{' '}
                <span className="text-orange-400">Difference</span>
              </>
            }
            description="From problematic sand fill to precision Geofoam installation — watch how modern projects are built lighter and faster."
            light
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid md:grid-cols-2 gap-6 lg:gap-9"
          >
            {/* Sand visual */}
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -7 }}
              className="group relative rounded-3xl overflow-hidden aspect-video bg-red-950/30 border border-white/10 shadow-2xl"
            >
              <img
                src={SAND_IMAGE}
                alt="Sand fill problems"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-55 group-hover:opacity-75 group-hover:scale-105 transition-all duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10" />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-5">
                <div className="w-16 h-16 rounded-full bg-white/15 border border-white/30 backdrop-blur-xl flex items-center justify-center mb-5 group-hover:bg-red-500/80 group-hover:scale-110 transition-all duration-300">
                  <Play className="text-white ml-1" size={25} />
                </div>

                <span className="text-xl md:text-2xl font-extrabold text-white">
                  Sand Fill: The Old Way
                </span>

                <span className="text-xs sm:text-sm text-white/60 mt-2">
                  Settlement • Erosion • Termites
                </span>

                <span className="mt-5 text-[10px] tracking-[0.2em] uppercase font-bold text-red-300 border border-red-300/30 bg-red-500/10 rounded-full px-4 py-2">
                  Traditional Construction
                </span>
              </div>
            </motion.div>

            {/* Geofoam installation video */}
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -7 }}
              className="group relative rounded-3xl overflow-hidden aspect-video bg-emerald-950/30 border border-white/10 shadow-2xl"
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                poster={GEOFOAM_IMAGE}
                preload="metadata"
                aria-label="Geofoam installation footage"
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
              >
                <source src={INSTALL_VIDEO} type="video/mp4" />
              </video>

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10 pointer-events-none" />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-5 pointer-events-none">
                <div className="w-16 h-16 rounded-full bg-white/15 border border-white/30 backdrop-blur-xl flex items-center justify-center mb-5 group-hover:bg-emerald-500/80 group-hover:scale-110 transition-all duration-300">
                  <Play className="text-white ml-1" size={25} />
                </div>

                <span className="text-xl md:text-2xl font-extrabold text-white">
                  Geofoam: The New Standard
                </span>

                <span className="text-xs sm:text-sm text-white/60 mt-2">
                  Lightweight • Fast • Durable
                </span>

                <span className="mt-5 text-[10px] tracking-[0.2em] uppercase font-bold text-emerald-300 border border-emerald-300/30 bg-emerald-500/10 rounded-full px-4 py-2">
                  Modern Construction
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* =========================================
          FINAL CTA SECTION
      ========================================== */}
      <AnimatedSection className="relative py-24 md:py-28 px-4 sm:px-6 bg-[#f8fafc]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#153b61] via-[#0c2947] to-[#071426] px-6 py-16 sm:px-12 md:py-20 text-center text-white shadow-[0_25px_80px_rgba(7,20,38,0.2)]"
          >
            {/* Decorative elements */}
            <div className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
                backgroundSize: '45px 45px',
              }}
            />

            <FloatingOrb className="w-72 h-72 bg-orange-500/20 -top-36 -right-20" />
            <FloatingOrb className="w-72 h-72 bg-blue-400/10 -bottom-36 -left-20" />

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center gap-2 px-4 py-2 mb-6 rounded-full border border-orange-300/20 bg-orange-400/10 text-orange-300 text-xs font-bold tracking-widest uppercase">
                <Zap size={14} />
                Start Your Project
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-5 leading-tight">
                Ready to Build
                <br />
                <span className="text-orange-400">Lighter?</span>
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-xl mx-auto mb-9 leading-relaxed">
                Get an instant estimate for your project. No commitment, no
                obligation — just clarity.
              </p>

              <a
                href="/calculator"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-bold shadow-[0_10px_35px_rgba(249,115,22,0.3)] hover:shadow-[0_15px_45px_rgba(249,115,22,0.45)] hover:-translate-y-1 transition-all duration-300"
              >
                Estimate Your Cost
                <ArrowRight
                  size={19}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>

              <div className="mt-10 flex flex-wrap justify-center gap-x-7 gap-y-3 text-xs text-slate-400">
                <span className="flex items-center gap-2">
                  <ShieldCheck size={15} className="text-emerald-400" />
                  No commitment
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle size={15} className="text-emerald-400" />
                  Instant estimate
                </span>
                <span className="flex items-center gap-2">
                  <Zap size={15} className="text-orange-400" />
                  Simple process
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Landing;
