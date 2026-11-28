
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from 'framer-motion';
import { useEffect, useRef } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import {
  Target,
  Leaf,
  Award,
  Users,
  ArrowRight,
  Quote,
  Sparkles,
  CheckCircle2,
  Building2,
  TrendingUp,
  ShieldCheck,
  Globe2,
  Lightbulb,
  CalendarDays,
} from 'lucide-react';

const PROJECT_IMAGE = '/assets/geofoam-project.png';

const stats = [
  { value: 500, suffix: '+', label: 'Projects Completed', icon: Building2 },
  { value: 12000, suffix: '+', label: 'Tons of Sand Replaced', icon: TrendingUp },
  { value: 6, suffix: '', label: 'States Served', icon: Globe2 },
  { value: 100, suffix: '%', label: 'Client Satisfaction', icon: Award },
];

const values = [
  {
    icon: Leaf,
    title: 'Sustainability',
    description:
      'Every Geofoam block we install replaces thousands of kilograms of sand, reducing quarrying, transport emissions, and site disruption.',
    number: '01',
  },
  {
    icon: Target,
    title: 'Engineering Precision',
    description:
      'We work with structural engineers to select the exact EPS grade and layout your project needs — no oversizing, no compromise.',
    number: '02',
  },
  {
    icon: Award,
    title: 'Proven Quality',
    description:
      'Our Geofoam meets IS and ASTM standards for density, compressive strength, and water absorption.',
    number: '03',
  },
  {
    icon: Users,
    title: 'Local Expertise',
    description:
      'Rooted in Jalandhar and Uttarakhand, we understand North India’s soil, climate, and infrastructure challenges firsthand.',
    number: '04',
  },
];

const timeline = [
  {
    year: '2018',
    title: 'Founded in Jalandhar',
    text: 'Started with a mission to solve settlement problems in Punjab’s soft-soil highway projects.',
  },
  {
    year: '2020',
    title: 'Expanded to Uttarakhand',
    text: 'Began serving hill-road and landslide-prone infrastructure with lightweight fill solutions.',
  },
  {
    year: '2022',
    title: '500th Project',
    text: 'Crossed 500 completed Geofoam installations across North India.',
  },
  {
    year: '2025',
    title: 'Going National',
    text: 'Now supplying and installing Geofoam across 6 states with 12,000+ tons of sand replaced.',
  },
];

const Counter = ({ value, suffix = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-50px',
  });

  const motionValue = useMotionValue(0);

  const rounded = useTransform(motionValue, (latest) =>
    Math.round(latest).toLocaleString('en-IN')
  );

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, value, {
        duration: 1.8,
        ease: [0.22, 1, 0.36, 1],
      });

      return controls.stop;
    }
  }, [isInView, value, motionValue]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
};

const SectionHeading = ({ eyebrow, title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6 }}
    className="text-center max-w-2xl mx-auto mb-12"
  >
    <div className="inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.18em] uppercase text-geofoam-highlight">
      <Sparkles size={14} />
      {eyebrow}
    </div>

    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-geofoam-dark mt-4 tracking-tight">
      {title}
    </h2>

    {description && (
      <p className="text-sm sm:text-base text-gray-500 mt-4 leading-relaxed">
        {description}
      </p>
    )}
  </motion.div>
);

const About = () => {
  return (
    <div className="min-h-screen bg-[#f5f7fa] pb-20 overflow-hidden">

      {/* HERO */}
      <section className="relative min-h-[470px] md:min-h-[560px] flex items-center justify-center overflow-hidden bg-geofoam-dark">
        <img
          src={PROJECT_IMAGE}
          alt="Geofoam project site"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-br from-geofoam-dark/90 via-geofoam-primary/75 to-geofoam-dark/80" />

        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
            backgroundSize: '45px 45px',
          }}
        />

        <div className="absolute -top-20 -right-20 w-80 h-80 bg-geofoam-highlight/20 rounded-full blur-[100px]" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-orange-400/15 rounded-full blur-[100px]" />

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative z-10 max-w-4xl mx-auto px-5 py-24 text-center text-white"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-7 text-xs font-bold tracking-[0.18em] uppercase bg-white/10 backdrop-blur-xl border border-white/20 rounded-full"
          >
            <Sparkles size={14} className="text-geofoam-highlight" />
            Our Story & Our Purpose
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-7 leading-[1.08] tracking-tight">
            About
            <span className="block mt-2 bg-gradient-to-r from-geofoam-highlight via-orange-300 to-yellow-200 bg-clip-text text-transparent">
              GeoFoam Blocks
            </span>
          </h1>

          <p className="text-white/75 text-sm sm:text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
            We are a specialist Geofoam (EPS) supplier and installer committed
            to replacing outdated sand fill with lightweight, sustainable
            engineering solutions.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-9">
            {[
              { icon: ShieldCheck, text: 'Engineering Focused' },
              { icon: Leaf, text: 'Sustainable Solutions' },
              { icon: Building2, text: 'Infrastructure Experts' },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-xs sm:text-sm text-white/85 backdrop-blur-md"
              >
                <item.icon size={15} className="text-geofoam-highlight" />
                {item.text}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* STATS */}
      <AnimatedSection className="max-w-6xl mx-auto px-4 sm:px-6 -mt-12 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {stats.map((s, i) => {
            const Icon = s.icon;

            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="group bg-white rounded-2xl sm:rounded-3xl shadow-[0_15px_50px_rgba(15,23,42,0.08)] p-5 sm:p-7 text-center border border-gray-100 hover:border-orange-100 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center mx-auto mb-4 group-hover:bg-geofoam-highlight transition-colors duration-300">
                  <Icon
                    size={21}
                    className="text-geofoam-highlight group-hover:text-white transition-colors duration-300"
                  />
                </div>

                <p className="text-3xl sm:text-4xl font-extrabold text-geofoam-dark tracking-tight">
                  <span className="text-geofoam-highlight">
                    <Counter value={s.value} suffix={s.suffix} />
                  </span>
                </p>

                <p className="text-xs sm:text-sm text-gray-500 mt-2 font-semibold">
                  {s.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </AnimatedSection>

      {/* MISSION & VISION */}
      <AnimatedSection className="max-w-6xl mx-auto px-4 sm:px-6 mt-24">
        <SectionHeading
          eyebrow="Our Direction"
          title="Purpose Behind Every Project"
          description="Our work is driven by a simple belief: infrastructure should be lighter, smarter, and built to last."
        />

        <div className="grid md:grid-cols-2 gap-5 sm:gap-7">

          {/* MISSION */}
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl p-7 sm:p-10 relative overflow-hidden transition-shadow duration-300"
          >
            <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-orange-50 group-hover:bg-orange-100/70 transition-colors blur-2xl" />

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center mb-7 group-hover:bg-geofoam-highlight transition-colors duration-300">
                <Target
                  className="text-geofoam-highlight group-hover:text-white transition-colors"
                  size={26}
                />
              </div>

              <p className="text-xs font-bold tracking-[0.16em] uppercase text-geofoam-highlight mb-3">
                What We Stand For
              </p>

              <h3 className="text-2xl sm:text-3xl font-extrabold mb-4 text-geofoam-dark">
                Our Mission
              </h3>

              <p className="text-gray-500 leading-relaxed text-sm sm:text-base">
                To eliminate the weight, erosion, and termite problems of
                traditional sand filling by making Geofoam the default choice
                for infrastructure and construction projects across India.
              </p>
            </div>
          </motion.div>

          {/* VISION */}
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="group bg-gradient-to-br from-geofoam-primary to-geofoam-dark text-white rounded-3xl shadow-lg p-7 sm:p-10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-56 h-56 bg-geofoam-highlight/20 rounded-full blur-[75px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full blur-[70px]" />

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center mb-7">
                <Leaf className="text-geofoam-highlight" size={26} />
              </div>

              <p className="text-xs font-bold tracking-[0.16em] uppercase text-geofoam-highlight mb-3">
                Where We're Heading
              </p>

              <h3 className="text-2xl sm:text-3xl font-extrabold mb-4">
                Our Vision
              </h3>

              <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                A future where every embankment, retaining wall, and raised
                floor in India is built lighter, faster, and smarter — with
                zero compromise on strength.
              </p>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* VALUES */}
      <AnimatedSection className="max-w-6xl mx-auto px-4 sm:px-6 mt-24">
        <SectionHeading
          eyebrow="Our Principles"
          title="What Drives Us"
          description="The principles that shape our engineering approach, our partnerships, and every project we deliver."
        />

        <div className="grid sm:grid-cols-2 gap-5">
          {values.map((v, i) => {
            const Icon = v.icon;

            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="group relative bg-white rounded-3xl border border-gray-100 hover:border-orange-100 shadow-sm hover:shadow-xl p-6 sm:p-8 flex gap-5 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-0 right-0 text-7xl font-black text-gray-50 group-hover:text-orange-50/80 transition-colors select-none">
                  {v.number}
                </div>

                <div className="relative z-10 w-14 h-14 shrink-0 rounded-2xl bg-orange-50 flex items-center justify-center group-hover:bg-geofoam-highlight transition-all duration-300">
                  <Icon
                    size={25}
                    className="text-geofoam-highlight group-hover:text-white transition-colors duration-300"
                  />
                </div>

                <div className="relative z-10">
                  <h3 className="font-extrabold text-lg sm:text-xl mb-2 text-geofoam-dark">
                    {v.title}
                  </h3>

                  <p className="text-sm text-gray-500 leading-relaxed">
                    {v.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </AnimatedSection>

      {/* QUOTE */}
      <AnimatedSection className="max-w-6xl mx-auto px-4 sm:px-6 mt-24">
        <div className="relative bg-geofoam-dark text-white rounded-3xl p-8 sm:p-12 md:p-16 overflow-hidden text-center shadow-xl">
          <div className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
              backgroundSize: '35px 35px',
            }}
          />

          <div className="absolute top-0 right-0 w-72 h-72 bg-geofoam-highlight/20 rounded-full blur-[90px]" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-400/10 rounded-full blur-[90px]" />

          <Quote
            className="absolute top-6 left-6 sm:top-10 sm:left-10 text-geofoam-highlight/20"
            size={75}
          />

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-xs font-bold tracking-widest uppercase text-geofoam-highlight mb-7">
              <Lightbulb size={14} />
              Our Philosophy
            </div>

            <p className="text-xl sm:text-2xl md:text-3xl font-semibold leading-relaxed">
              “We don’t just sell Geofoam blocks. We help engineers eliminate
              the single biggest cause of post-construction failure —
              unnecessary weight.”
            </p>

            <div className="w-12 h-1 rounded-full bg-geofoam-highlight mx-auto mt-8 mb-5" />

            <p className="text-sm text-white/50 font-medium">
              — GeoFoam Blocks Engineering Team
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* TIMELINE */}
      <AnimatedSection className="max-w-5xl mx-auto px-4 sm:px-6 mt-24">
        <SectionHeading
          eyebrow="Our Milestones"
          title="The Journey So Far"
          description="From our beginnings in Jalandhar to serving infrastructure projects across India."
        />

        <div className="relative max-w-3xl mx-auto">

          {/* TIMELINE LINE */}
          <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-geofoam-highlight via-geofoam-highlight/40 to-transparent md:-translate-x-1/2" />

          <div className="space-y-8 md:space-y-10">
            {timeline.map((t, i) => (
              <motion.div
                key={t.year}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex items-start pl-12 md:pl-0 ${
                  i % 2 === 0
                    ? 'md:flex-row'
                    : 'md:flex-row-reverse'
                }`}
              >
                {/* TIMELINE DOT */}
                <div className="absolute left-[15px] md:left-1/2 top-7 w-3.5 h-3.5 rounded-full bg-geofoam-highlight ring-4 ring-orange-100 -translate-x-1/2 z-10" />

                {/* CARD */}
                <div
                  className={`w-full md:w-1/2 ${
                    i % 2 === 0
                      ? 'md:pr-12 md:text-right'
                      : 'md:pl-12 md:text-left'
                  }`}
                >
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100"
                  >
                    <div className={`flex items-center gap-2 mb-3 ${
                      i % 2 === 0 ? 'md:justify-end' : ''
                    }`}>
                      <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                        <CalendarDays
                          size={16}
                          className="text-geofoam-highlight"
                        />
                      </div>

                      <span className="text-sm font-extrabold text-geofoam-highlight">
                        {t.year}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg sm:text-xl mb-2 text-geofoam-dark">
                      {t.title}
                    </h3>

                    <p className="text-sm text-gray-500 leading-relaxed">
                      {t.text}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection className="max-w-6xl mx-auto px-4 sm:px-6 mt-24">
        <div className="relative overflow-hidden bg-gradient-to-br from-geofoam-primary to-geofoam-dark text-white rounded-3xl p-9 sm:p-12 md:p-16 text-center shadow-xl">
          <div className="absolute -top-24 -right-20 w-80 h-80 bg-geofoam-highlight/20 rounded-full blur-[100px]" />
          <div className="absolute -bottom-24 -left-20 w-80 h-80 bg-blue-400/10 rounded-full blur-[100px]" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-xs font-bold tracking-widest uppercase text-geofoam-highlight mb-6">
              <Sparkles size={14} />
              Build Smarter With Us
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5 leading-tight">
              Let's Build
              <span className="block text-geofoam-highlight">
                Lighter Together
              </span>
            </h2>

            <p className="text-white/65 text-sm sm:text-base mb-9 max-w-lg mx-auto leading-relaxed">
              Talk to our engineering team about your next project. We'll
              help you choose the right Geofoam solution.
            </p>

            <motion.a
              href="/contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center justify-center gap-3 bg-geofoam-highlight text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-black/10 hover:brightness-110 transition-all duration-300"
            >
              Contact Our Team
              <ArrowRight
                size={19}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </motion.a>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default About;
