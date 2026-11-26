import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
} from 'lucide-react';

const applications = [
  {
    icon: Road,
    category: 'Infrastructure',
    title: 'Road Embankments',
    description:
      'Geofoam blocks replace heavy soil fill in road embankments, reducing settlement on soft ground and speeding up construction on highways and expressways.',
    example: 'Used in Uttarakhand hill roads to stabilize slopes without cutting into fragile terrain.',
    image: '/assets/road-embankment.png',
    stats: 'Up to 95% lighter than soil',
  },
  {
    icon: Building2,
    category: 'Infrastructure',
    title: 'Bridge Approaches',
    description:
      'Prevents the "bump at the end of the bridge" problem by eliminating differential settlement between the rigid bridge and flexible road.',
    example: 'Ideal for Jalandhar bypass projects where soil is soft and waterlogged.',
    image: '/assets/bridge-approach.png',
    stats: 'Reduces post-construction settlement',
  },
  {
    icon: Mountain,
    category: 'Infrastructure',
    title: 'Retaining Walls & Slopes',
    description:
      'Lightweight Geofoam backfill dramatically reduces lateral earth pressure, allowing thinner, cheaper retaining walls.',
    example: 'Landslide-prone zones in Uttarakhand benefit from reduced driving forces.',
    image: '/assets/retaining-wall.png',
    stats: 'Lowers lateral pressure by 60%+',
  },
  {
    icon: Trees,
    category: 'Buildings',
    title: 'Landscaping & Terraces',
    description:
      'Create raised planters, terraces, and green roofs on rooftops or podiums without overloading the structure.',
    example: 'Rooftop gardens in urban Jalandhar use Geofoam to stay within load limits.',
    image: '/assets/landscaping.png',
    stats: 'Perfect for rooftop gardens',
  },
  {
    icon: Layers,
    category: 'Buildings',
    title: 'Floor & Foundation Fill',
    description:
      'Used as void fill under floors, parking lots, and slabs to reduce dead load on underlying soil or basement structures.',
    example: 'Basement backfill in commercial buildings reduces structural costs.',
    image: '/assets/foundation-fill.png',
    stats: 'Cheaper than structural concrete fill',
  },
  {
    icon: Plane,
    category: 'Special',
    title: 'Airport Runways',
    description:
      'Geofoam stabilizes runway subgrades on soft or compressible soil, preventing differential settlement that causes pavement cracking and aircraft safety issues.',
    example: 'Used in runway extensions where soft soil would otherwise require deep piling or excavation.',
    image: '/assets/airport-runway.png',
    stats: 'Prevents runway settlement',
  },
];

const categories = ['All', 'Infrastructure', 'Buildings', 'Special'];

const Applications = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? applications
      : applications.filter((a) => a.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* HERO */}
      <section className="relative py-28 md:py-36 flex items-center justify-center overflow-hidden bg-geofoam-dark">
        <div className="absolute inset-0">
          <img
            src="/assets/applications-hero.png"
            alt="Geofoam applications"
            className="w-full h-full object-cover opacity-30"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-geofoam-dark/30 via-geofoam-primary/20 to-geofoam-dark/10" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white"
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
            Applications
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-5 leading-tight">
            Where{' '}
            <span className="bg-gradient-to-r from-geofoam-highlight to-orange-400 bg-clip-text text-transparent">
              Geofoam
            </span>{' '}
            Shines
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            From highways to rooftops, Geofoam replaces heavy, problematic fill
            with a lightweight, durable, and termite-proof solution.
          </p>
        </motion.div>
      </section>

      {/* FILTER TABS */}
      <div className="max-w-6xl mx-auto px-4 mt-12 mb-10">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileTap={{ scale: 0.96 }}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-geofoam-highlight text-white shadow-lg shadow-geofoam-highlight/30'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </div>

      {/* CARDS GRID */}
      <div className="max-w-6xl mx-auto px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {filtered.map((app, i) => {
              const Icon = app.icon;
              return (
                <motion.div
                  key={app.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-500 border border-gray-100 flex flex-col"
                >
                  {/* Image / Icon header */}
                  <div className="relative h-52 overflow-hidden bg-gradient-to-br from-geofoam-primary to-geofoam-accent">
                    <img
                      src={app.image}
                      alt={app.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    {/* Icon fallback (sits behind image; visible if image fails) */}
                    <div className="absolute inset-0 flex items-center justify-center -z-0">
                      <Icon size={72} className="text-white/40" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Stats badge */}
                    <span className="absolute bottom-3 left-3 bg-white/95 backdrop-blur text-geofoam-dark text-xs font-bold px-3 py-1.5 rounded-full">
                      {app.stats}
                    </span>

                    {/* Category badge */}
                    <span className="absolute top-3 right-3 bg-geofoam-highlight text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                      {app.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="bg-geofoam-highlight/10 p-2 rounded-lg">
                        <Icon className="text-geofoam-highlight" size={18} />
                      </div>
                      <h3 className="text-lg font-bold text-geofoam-dark">
                        {app.title}
                      </h3>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 flex-1 leading-relaxed">
                      {app.description}
                    </p>

                    <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-geofoam-highlight">
                      <p className="text-[10px] font-bold text-geofoam-highlight uppercase tracking-wider mb-1">
                        Real-World Example
                      </p>
                      <p className="text-sm text-gray-700 leading-snug">
                        {app.example}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* WHY IT WORKS STRIP */}
      <AnimatedSection className="max-w-6xl mx-auto px-4 mt-20">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { title: '100× Lighter', text: 'Than soil and sand fill' },
            { title: 'No Compaction', text: 'Place and go — no curing time' },
            { title: '50+ Year Life', text: 'Engineered EPS durability' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center"
            >
              <CheckCircle
                className="text-geofoam-highlight mx-auto mb-3"
                size={28}
              />
              <p className="text-2xl font-bold text-geofoam-dark">
                {item.title}
              </p>
              <p className="text-sm text-gray-500 mt-1">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection className="max-w-4xl mx-auto px-4 mt-20">
        <div className="bg-gradient-to-br from-geofoam-primary to-geofoam-dark text-white rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-geofoam-highlight/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-geofoam-highlight/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative">
            Have a Project in Mind?
          </h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto relative">
            Our engineers can recommend the right Geofoam grade and layout for
            your specific site conditions.
          </p>
          <a
            href="/calculator"
            className="group btn-primary inline-flex items-center gap-2 relative"
          >
            Estimate Your Cost
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

export default Applications;