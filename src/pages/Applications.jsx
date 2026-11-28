
import { useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import {
  Road,
  Building2,
  Mountain,
  Trees,
  Layers,
  Plane,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Zap,
  ShieldCheck,
  ChevronRight,
  SlidersHorizontal,
} from 'lucide-react';

const applications = [
  {
    icon: Road,
    category: 'Infrastructure',
    title: 'Road Embankments',
    description:
      'Geofoam blocks replace heavy soil fill in road embankments, reducing settlement on soft ground and speeding up construction on highways and expressways.',
    example:
      'Used in Uttarakhand hill roads to stabilize slopes without cutting into fragile terrain.',
    image: '/assets/road-embankment.png',
    stats: 'Up to 95% lighter than soil',
  },
  {
    icon: Building2,
    category: 'Infrastructure',
    title: 'Bridge Approaches',
    description:
      'Prevents the "bump at the end of the bridge" problem by eliminating differential settlement between the rigid bridge and flexible road.',
    example:
      'Ideal for Jalandhar bypass projects where soil is soft and waterlogged.',
    image: '/assets/bridge-approach.png',
    stats: 'Reduces post-construction settlement',
  },
  {
    icon: Mountain,
    category: 'Infrastructure',
    title: 'Retaining Walls & Slopes',
    description:
      'Lightweight Geofoam backfill dramatically reduces lateral earth pressure, allowing thinner, cheaper retaining walls.',
    example:
      'Landslide-prone zones in Uttarakhand benefit from reduced driving forces.',
    image: '/assets/retaining-wall.png',
    stats: 'Lowers lateral pressure by 60%+',
  },
  {
    icon: Trees,
    category: 'Buildings',
    title: 'Landscaping & Terraces',
    description:
      'Create raised planters, terraces, and green roofs on rooftops or podiums without overloading the structure.',
    example:
      'Rooftop gardens in urban Jalandhar use Geofoam to stay within load limits.',
    image: '/assets/landscaping.png',
    stats: 'Perfect for rooftop gardens',
  },
  {
    icon: Layers,
    category: 'Buildings',
    title: 'Floor & Foundation Fill',
    description:
      'Used as void fill under floors, parking lots, and slabs to reduce dead load on underlying soil or basement structures.',
    example:
      'Basement backfill in commercial buildings reduces structural costs.',
    image: '/assets/foundation-fill.png',
    stats: 'Cheaper than structural concrete fill',
  },
  {
    icon: Plane,
    category: 'Special',
    title: 'Airport Runways',
    description:
      'Geofoam stabilizes runway subgrades on soft or compressible soil, preventing differential settlement that causes pavement cracking and aircraft safety issues.',
    example:
      'Used in runway extensions where soft soil would otherwise require deep piling or excavation.',
    image: '/assets/airport-runway.png',
    stats: 'Prevents runway settlement',
  },
];

const categories = [
  { name: 'All', icon: Sparkles },
  { name: 'Infrastructure', icon: Road },
  { name: 'Buildings', icon: Building2 },
  { name: 'Special', icon: Plane },
];

const ease = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const benefits = [
  {
    title: '100× Lighter',
    description: 'Than soil and sand fill',
    icon: Zap,
    number: '01',
  },
  {
    title: 'No Compaction',
    description: 'Place and go — no curing time',
    icon: CheckCircle,
    number: '02',
  },
  {
    title: '50+ Year Life',
    description: 'Engineered EPS durability',
    icon: ShieldCheck,
    number: '03',
  },
];

const FloatingOrb = ({ className = '' }) => (
  <motion.div
    aria-hidden="true"
    animate={{ y: [0, -16, 0], scale: [1, 1.06, 1] }}
    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
  />
);

const SectionHeading = ({ eyebrow, title, description, light = false }) => (
  <motion.div
    variants={fadeUp}
    className="text-center max-w-3xl mx-auto mb-14"
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

const ApplicationCard = ({ app, index }) => {
  const Icon = app.icon;

  return (
    <motion.article
      layout
      variants={fadeUp}
      whileHover={{ y: -9 }}
      transition={{ type: 'spring', stiffness: 250, damping: 22 }}
      className="group relative bg-white rounded-[1.8rem] overflow-hidden border border-slate-200/80 shadow-[0_10px_35px_rgba(15,23,42,0.05)] hover:shadow-[0_25px_60px_rgba(15,23,42,0.12)] hover:border-orange-200 transition-all duration-500 flex flex-col"
    >
      {/* Image */}
      <div className="relative h-56 sm:h-60 overflow-hidden bg-gradient-to-br from-[#153b61] to-[#071426]">
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon size={75} className="text-white/20" />
        </div>

        <img
          src={app.image}
          alt={app.title}
          loading="lazy"
          className="relative z-[1] w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />

        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#071426]/90 via-[#071426]/10 to-transparent pointer-events-none" />

        {/* Top category */}
        <div className="absolute z-[3] top-4 left-4">
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 bg-white/15 backdrop-blur-xl border border-white/20 text-white text-[10px] font-bold tracking-wider uppercase">
            <Icon size={12} />
            {app.category}
          </span>
        </div>

        {/* Index */}
        <span className="absolute z-[3] top-4 right-4 text-white/70 text-xs font-bold tracking-widest">
          0{index + 1}
        </span>

        {/* Image title */}
        <div className="absolute z-[3] bottom-5 left-5 right-5">
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            {app.title}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-7 flex flex-col flex-1">
        {/* Stats */}
        <div className="inline-flex self-start items-center gap-2 px-3 py-2 mb-5 rounded-xl bg-orange-50 border border-orange-100 text-orange-700 text-xs font-bold">
          <Zap size={14} />
          {app.stats}
        </div>

        <p className="text-sm text-slate-600 leading-[1.85] mb-6 flex-1">
          {app.description}
        </p>

        {/* Real world example */}
        <div className="relative rounded-2xl bg-slate-50 border border-slate-100 p-4 sm:p-5 overflow-hidden group-hover:border-orange-100 transition-colors">
          <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-orange-400 to-orange-600" />

          <div className="flex items-center gap-2 mb-2">
            <CheckCircle size={14} className="text-orange-600" />
            <span className="text-[10px] font-extrabold tracking-[0.13em] uppercase text-orange-600">
              Real-World Example
            </span>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            {app.example}
          </p>
        </div>

        {/* Bottom accent */}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Geofoam Application
          </span>

          <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
            <ChevronRight size={17} />
          </span>
        </div>
      </div>
    </motion.article>
  );
};

const Applications = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const shouldReduceMotion = useReducedMotion();

  const filtered = useMemo(
    () =>
      activeCategory === 'All'
        ? applications
        : applications.filter((app) => app.category === activeCategory),
    [activeCategory]
  );

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* ======================================
          HERO SECTION
      ======================================= */}
      <section className="relative min-h-[470px] md:min-h-[570px] flex items-center justify-center overflow-hidden bg-[#071426] text-white px-4 sm:px-6">
        <img
          src="/assets/applications-hero.png"
          alt="Geofoam engineering applications"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover opacity-35"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-br from-[#071426]/95 via-[#102b49]/75 to-[#071426]/90" />

        {/* Grid effect */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <FloatingOrb className="w-80 h-80 bg-orange-500/20 -top-32 -left-40" />
        <FloatingOrb className="w-96 h-96 bg-blue-500/20 -bottom-40 -right-40" />

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          className="relative z-10 max-w-5xl mx-auto text-center py-24 md:py-32"
        >
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/[0.07] border border-white/15 backdrop-blur-xl"
          >
            <Sparkles size={14} className="text-orange-400" />
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-white/90">
              Engineered for Every Application
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.04em] leading-[1.1] mb-7">
            Where{' '}
            <span className="bg-gradient-to-r from-orange-300 via-orange-400 to-amber-500 bg-clip-text text-transparent">
              Geofoam
            </span>
            <br className="sm:hidden" /> Shines
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-9">
            From highways to rooftops, Geofoam replaces heavy, problematic
            fill with a lightweight, durable, and termite-proof solution.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-300">
            {['Infrastructure', 'Buildings', 'Special Applications'].map(
              (item) => (
                <span
                  key={item}
                  className="px-4 py-2 rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-md"
                >
                  {item}
                </span>
              )
            )}
          </div>
        </motion.div>

        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40"
        >
          <ChevronRight size={21} className="rotate-90" />
        </motion.div>
      </section>

      {/* ======================================
          APPLICATIONS FILTER + GRID
      ======================================= */}
      <section className="relative py-24 md:py-28 px-4 sm:px-6 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto">

          <SectionHeading
            eyebrow="Explore Applications"
            title={
              <>
                One Material.
                <br className="sm:hidden" />{' '}
                <span className="text-orange-500">Endless Possibilities.</span>
              </>
            }
            description="Discover how lightweight Geofoam technology is transforming infrastructure, buildings, and specialized construction projects."
          />

          {/* Filter panel */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5 mb-10">
            <div className="flex items-center gap-2 text-slate-500">
              <SlidersHorizontal size={17} />
              <span className="text-xs font-bold uppercase tracking-widest">
                Filter Applications
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-2 p-2 rounded-2xl bg-white border border-slate-200 shadow-sm">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.name;

                return (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => setActiveCategory(cat.name)}
                    aria-pressed={isActive}
                    className={`relative flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-colors duration-300 ${
                      isActive
                        ? 'text-white'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="application-filter"
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg shadow-orange-500/20"
                        transition={{
                          type: 'spring',
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}

                    <Icon size={16} className="relative z-10" />
                    <span className="relative z-10">{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs text-slate-500">
              Showing{' '}
              <span className="font-bold text-slate-900">
                {filtered.length}
              </span>{' '}
              applications
            </p>

            <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
              Engineered Solutions
            </span>
          </div>

          {/* Animated application cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? {} : { opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {filtered.map((app) => (
                <ApplicationCard
                  key={app.title}
                  app={app}
                  index={applications.indexOf(app)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ======================================
          WHY GEOFOAM WORKS
      ======================================= */}
      <AnimatedSection className="relative py-24 px-4 sm:px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="The Geofoam Advantage"
            title={
              <>
                Built Different.
                <span className="text-orange-500"> Built Better.</span>
              </>
            }
            description="The engineering advantages that make Geofoam a smarter alternative to traditional heavy fill materials."
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-3 gap-5"
          >
            {benefits.map((item) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  whileHover={{ y: -8 }}
                  className="group relative p-8 rounded-[1.8rem] bg-[#f8fafc] border border-slate-200 hover:border-orange-200 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 overflow-hidden"
                >
                  <span className="absolute top-5 right-6 text-4xl font-black text-slate-100 group-hover:text-orange-100 transition-colors">
                    {item.number}
                  </span>

                  <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-orange-50 text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 mb-7">
                    <Icon size={26} />
                  </div>

                  <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-500 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="mt-7 h-1 w-12 rounded-full bg-orange-400 group-hover:w-20 transition-all duration-500" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ======================================
          CTA
      ======================================= */}
      <AnimatedSection className="py-20 md:py-24 px-4 sm:px-6 bg-[#f8fafc]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#153b61] via-[#0c2947] to-[#071426] px-6 py-16 sm:px-12 md:py-20 text-center text-white shadow-[0_25px_80px_rgba(7,20,38,0.2)]"
          >
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
                backgroundSize: '45px 45px',
              }}
            />

            <FloatingOrb className="w-72 h-72 bg-orange-500/20 -top-36 -right-20" />
            <FloatingOrb className="w-72 h-72 bg-blue-500/10 -bottom-36 -left-20" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-orange-300/20 bg-orange-400/10 text-orange-300 text-xs font-bold tracking-widest uppercase">
                <Sparkles size={14} />
                Let's Build Something Better
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-5">
                Have a Project in Mind?
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-xl mx-auto mb-9 leading-relaxed">
                Our engineers can recommend the right Geofoam grade and layout
                for your specific site conditions.
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

              <div className="mt-9 flex flex-wrap justify-center gap-6 text-xs text-slate-400">
                <span className="flex items-center gap-2">
                  <ShieldCheck size={15} className="text-emerald-400" />
                  Engineered Solutions
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle size={15} className="text-emerald-400" />
                  Project Estimates
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Applications;
