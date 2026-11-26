import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { Target, Leaf, Award, Users, ArrowRight, Quote } from 'lucide-react';

// Replace with your actual asset
const PROJECT_IMAGE = '/assets/geofoam-project.png';

const stats = [
  { value: 500, suffix: '+', label: 'Projects Completed' },
  { value: 12000, suffix: '+', label: 'Tons of Sand Replaced' },
  { value: 6, suffix: '', label: 'States Served' },
  { value: 100, suffix: '%', label: 'Client Satisfaction' },
];

const values = [
  {
    icon: Leaf,
    title: 'Sustainability',
    description:
      'Every Geofoam block we install replaces thousands of kilograms of sand, reducing quarrying, transport emissions, and site disruption.',
  },
  {
    icon: Target,
    title: 'Engineering Precision',
    description:
      'We work with structural engineers to select the exact EPS grade and layout your project needs — no oversizing, no compromise.',
  },
  {
    icon: Award,
    title: 'Proven Quality',
    description:
      'Our Geofoam meets IS and ASTM standards for density, compressive strength, and water absorption.',
  },
  {
    icon: Users,
    title: 'Local Expertise',
    description:
      'Rooted in Jalandhar and Uttarakhand, we understand North India\u2019s soil, climate, and infrastructure challenges firsthand.',
  },
];

const timeline = [
  {
    year: '2018',
    title: 'Founded in Jalandhar',
    text: 'Started with a mission to solve settlement problems in Punjab\u2019s soft-soil highway projects.',
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

// Animated counter component
const Counter = ({ value, suffix = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
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

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* HERO with image */}
      <section className="relative h-[60vh] min-h-[420px] flex items-center justify-center overflow-hidden bg-geofoam-dark">
        <img
          src={PROJECT_IMAGE}
          alt="Geofoam project site"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-geofoam-dark/30 via-geofoam-primary/20 to-geofoam-dark/10" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white"
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
            Our Story
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-5 leading-tight">
            About{' '}
            <span className="text-geofoam-highlight">GeoFoam Blocks</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            We are a specialist Geofoam (EPS) supplier and installer committed
            to replacing outdated sand fill with lightweight, sustainable
            engineering solutions.
          </p>
        </motion.div>
      </section>

      {/* STATS with counters */}
      <AnimatedSection className="max-w-5xl mx-auto px-4 -mt-16 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100"
            >
              <p className="text-3xl md:text-4xl font-bold text-geofoam-highlight">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="text-xs md:text-sm text-gray-600 mt-2 font-medium">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      {/* MISSION & VISION */}
      <AnimatedSection className="max-w-5xl mx-auto px-4 mt-20">
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white rounded-3xl shadow-lg p-8 md:p-10 border border-gray-100"
          >
            <div className="bg-geofoam-highlight/10 w-12 h-12 rounded-xl flex items-center justify-center mb-5">
              <Target className="text-geofoam-highlight" size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-geofoam-dark">
              Our Mission
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To eliminate the weight, erosion, and termite problems of
              traditional sand filling by making Geofoam the default choice for
              infrastructure and construction projects across India.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="bg-gradient-to-br from-geofoam-primary to-geofoam-dark text-white rounded-3xl shadow-lg p-8 md:p-10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-geofoam-highlight/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center mb-5 relative">
              <Leaf className="text-white" size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-3 relative">Our Vision</h3>
            <p className="text-white/80 leading-relaxed relative">
              A future where every embankment, retaining wall, and raised floor
              in India is built lighter, faster, and smarter — with zero
              compromise on strength.
            </p>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* VALUES */}
      <AnimatedSection className="max-w-5xl mx-auto px-4 mt-20">
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-geofoam-highlight">
            Our Principles
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3">What Drives Us</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow p-6 flex gap-4 border border-gray-100"
              >
                <div className="bg-geofoam-highlight/10 group-hover:bg-geofoam-highlight/20 transition-colors p-3 rounded-xl h-fit shrink-0">
                  <Icon className="text-geofoam-highlight" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1.5">{v.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {v.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </AnimatedSection>

      {/* QUOTE STRIP */}
      <AnimatedSection className="max-w-4xl mx-auto px-4 mt-20">
        <div className="bg-geofoam-dark text-white rounded-3xl p-10 md:p-14 relative overflow-hidden text-center">
          <Quote
            className="absolute top-6 left-6 text-geofoam-highlight/20"
            size={80}
          />
          <p className="text-xl md:text-2xl font-medium leading-relaxed relative max-w-2xl mx-auto">
            &ldquo;We don&rsquo;t just sell Geofoam blocks. We help engineers
            eliminate the single biggest cause of post-construction failure —
            unnecessary weight.&rdquo;
          </p>
          <p className="text-sm text-white/50 mt-6 relative">
            — GeoFoam Blocks Engineering Team
          </p>
        </div>
      </AnimatedSection>

      {/* TIMELINE */}
      <AnimatedSection className="max-w-3xl mx-auto px-4 mt-20">
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-geofoam-highlight">
            Milestones
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3">Our Journey</h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-geofoam-highlight/60 via-geofoam-highlight/30 to-transparent md:-translate-x-1/2" />

          <div className="space-y-10">
            {timeline.map((t, i) => (
              <motion.div
                key={t.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex items-start gap-6 pl-12 md:pl-0 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 top-2 w-3 h-3 rounded-full bg-geofoam-highlight ring-4 ring-geofoam-highlight/20 -translate-x-1/2 md:-translate-x-1/2 z-10" />

                {/* Card */}
                <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-5 border border-gray-100 inline-block w-full"
                  >
                    <span className="inline-block bg-geofoam-highlight text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                      {t.year}
                    </span>
                    <h3 className="font-bold text-lg mb-1">{t.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
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
      <AnimatedSection className="max-w-4xl mx-auto px-4 mt-20">
        <div className="bg-gradient-to-br from-geofoam-primary to-geofoam-dark text-white rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-geofoam-highlight/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative">
            Let&rsquo;s Build Lighter Together
          </h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto relative">
            Talk to our engineering team about your next project. We&rsquo;ll
            help you choose the right Geofoam solution.
          </p>
          <a
            href="/contact"
            className="group btn-primary inline-flex items-center gap-2 relative"
          >
            Contact Us
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default About;