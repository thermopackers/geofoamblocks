import { motion } from 'framer-motion';
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
} from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

// Replace these with your actual asset paths
const HERO_VIDEO = '/assets/geofoam-hero.mp4';
const INSTALL_VIDEO = '/assets/geofoam-install.mp4';
const SAND_IMAGE = '/assets/sand-fill-problems.jpg';
const GEOFOAM_IMAGE = '/assets/geofoam-installation.jpg';

const Landing = () => {
  return (
    <div className="pt-20 bg-white">
      {/* HERO with video background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-geofoam-dark text-white px-4">
        {/* Video background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={GEOFOAM_IMAGE}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-geofoam-dark/30 via-geofoam-primary/20 to-geofoam-accent/10" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-center max-w-5xl"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase bg-white/10 backdrop-blur-md border border-white/20 rounded-full"
          >
            Engineered Lightweight Fill
          </motion.span>

      {/* Landing.jsx hero */}
<h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.05] tracking-tight">
  Replace Sand.{' '}
  <span className="bg-gradient-to-r from-geofoam-highlight to-orange-400 bg-clip-text text-transparent">
    Build Lighter.
  </span>
</h1>

          <p className="text-lg md:text-2xl mb-10 text-white/85 max-w-2xl mx-auto leading-relaxed">
            Geofoam blocks are up to{' '}
            <span className="font-semibold text-white">100× lighter</span> than
            sand fill — eliminating settlement, termite risk, and soil erosion
            on every project.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/calculator"
              className="group btn-primary inline-flex items-center justify-center gap-2 text-base"
            >
              Calculate Your Savings
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
            <a
              href="#comparison"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold border border-white/30 hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
            >
              <Play size={18} />
              See the Difference
            </a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
        >
          <div className="w-5 h-8 border-2 border-white/40 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* OLD vs NEW — with real images */}
      <AnimatedSection
        id="comparison"
        className="py-24 px-4 max-w-6xl mx-auto"
      >
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-geofoam-highlight">
            The Problem & The Solution
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            Why Replace Sand Filling?
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Traditional sand fill creates long-term liabilities. Geofoam
            eliminates them at the source.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* OLD: Sand */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="group relative rounded-3xl overflow-hidden border border-red-100 bg-white shadow-lg hover:shadow-2xl transition-shadow duration-500"
          >
            {/* Image */}
            <div className="relative h-56 overflow-hidden bg-red-100">
              <img
                src={SAND_IMAGE}
                alt="Sand fill construction problems"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-red-900/60 to-transparent" />
              <span className="absolute bottom-4 left-4 flex items-center gap-2 text-white font-bold text-lg">
                <AlertTriangle size={22} /> Conventional Sand Fill
              </span>
            </div>

            <div className="p-8">
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="bg-red-100 p-2.5 rounded-xl shrink-0">
                    <Weight className="text-red-600" size={20} />
                  </div>
                  <div>
                    <strong className="block text-red-800 mb-0.5">
                      Extreme Weight
                    </strong>
                    <span className="text-sm text-gray-600">
                      ~2 tons per cubic meter. Causes settlement and structural
                      stress on soft ground.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-red-100 p-2.5 rounded-xl shrink-0">
                    <Bug className="text-red-600" size={20} />
                  </div>
                  <div>
                    <strong className="block text-red-800 mb-0.5">
                      Termite Risk
                    </strong>
                    <span className="text-sm text-gray-600">
                      Sand attracts pests and requires recurring chemical
                      treatment.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-red-100 p-2.5 rounded-xl shrink-0">
                    <Droplets className="text-red-600" size={20} />
                  </div>
                  <div>
                    <strong className="block text-red-800 mb-0.5">
                      Soil Erosion
                    </strong>
                    <span className="text-sm text-gray-600">
                      Susceptible to washout, lateral spreading, and long-term
                      subsidence.
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* NEW: Geofoam */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="group relative rounded-3xl overflow-hidden border border-green-100 bg-white shadow-lg hover:shadow-2xl transition-shadow duration-500"
          >
            {/* Image */}
            <div className="relative h-56 overflow-hidden bg-green-100">
              <img
                src={GEOFOAM_IMAGE}
                alt="Geofoam block installation"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent" />
              <span className="absolute bottom-4 left-4 flex items-center gap-2 text-white font-bold text-lg">
                <CheckCircle size={22} /> Geofoam Solution
              </span>
            </div>

            <div className="p-8">
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="bg-green-100 p-2.5 rounded-xl shrink-0">
                    <Weight className="text-green-600" size={20} />
                  </div>
                  <div>
                    <strong className="block text-green-800 mb-0.5">
                      Ultra-Light
                    </strong>
                    <span className="text-sm text-gray-600">
                      ~20–40 kg/m³ — roughly 1/50th the weight of sand.
                      Reduces settlement dramatically [citation:1].
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-green-100 p-2.5 rounded-xl shrink-0">
                    <Bug className="text-green-600" size={20} />
                  </div>
                  <div>
                    <strong className="block text-green-800 mb-0.5">
                      Termite-Proof
                    </strong>
                    <span className="text-sm text-gray-600">
                      Inorganic EPS has no food value for pests. No chemical
                      treatment needed.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-green-100 p-2.5 rounded-xl shrink-0">
                    <Droplets className="text-green-600" size={20} />
                  </div>
                  <div>
                    <strong className="block text-green-800 mb-0.5">
                      Erosion-Immune
                    </strong>
                    <span className="text-sm text-gray-600">
                      Closed-cell structure resists water absorption and will
                      not wash away [citation:1].
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Extra benefits strip */}
        <div className="grid sm:grid-cols-3 gap-4 mt-12">
          {[
            {
              icon: Truck,
              title: 'Fewer Trips',
              text: 'One truck of Geofoam replaces multiple soil trips.',
            },
            {
              icon: Recycle,
              title: '50–100 Year Life',
              text: 'Engineered EPS lasts for decades [citation:1].',
            },
            {
              icon: CheckCircle,
              title: 'Faster Construction',
              text: 'No compaction equipment or curing delays.',
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                whileHover={{ y: -3 }}
                className="flex items-start gap-3 p-5 rounded-2xl bg-gray-50 border border-gray-100"
              >
                <Icon className="text-geofoam-highlight shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="font-semibold text-sm text-geofoam-dark">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </AnimatedSection>

      {/* VIDEO SECTION — installation footage */}
      <AnimatedSection className="py-24 bg-geofoam-dark text-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest uppercase text-geofoam-highlight">
              Watch It In Action
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
              See the Difference
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              From problematic sand fill to precision Geofoam installation —
              watch how modern projects are built lighter and faster.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Sand video / image placeholder */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative rounded-2xl overflow-hidden bg-red-900/30 border border-red-500/20 aspect-video group"
            >
              <img
                src={SAND_IMAGE}
                alt="Sand fill problems"
                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Play className="text-white ml-0.5" size={24} />
                </div>
                <span className="text-sm font-semibold text-white/90">
                  Sand Fill: The Old Way
                </span>
                <span className="text-xs text-white/50 mt-1">
                  Settlement • Erosion • Termites
                </span>
              </div>
            </motion.div>

            {/* Geofoam installation video */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative rounded-2xl overflow-hidden bg-green-900/30 border border-green-500/20 aspect-video group"
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                poster={GEOFOAM_IMAGE}
                className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-500"
              >
                <source src={INSTALL_VIDEO} type="video/mp4" />
              </video>
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 pointer-events-none">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Play className="text-white ml-0.5" size={24} />
                </div>
                <span className="text-sm font-semibold text-white/90">
                  Geofoam: The New Standard
                </span>
                <span className="text-xs text-white/50 mt-1">
                  Lightweight • Fast • Durable
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-geofoam-primary to-geofoam-dark rounded-3xl p-12 md:p-16 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-geofoam-highlight/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative">
            Ready to Build Lighter?
          </h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto relative">
            Get an instant estimate for your project. No commitment, no
            obligation — just clarity.
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

export default Landing;