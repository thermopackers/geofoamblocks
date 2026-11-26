import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator as CalcIcon,
  Footprints,
  Weight,
  Truck,
  RotateCcw,
  TrendingDown,
  Box,
  Info,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';

const DENSITY_OPTIONS = {
  foot: {
    label: 'Foot Movement',
    multiplier: 1.0,
    description: 'Pedestrian areas, landscaping',
    icon: Footprints,
    epsDensity: 'EPS 15–20',
  },
  heavy: {
    label: 'Heavy Load',
    multiplier: 1.3,
    description: 'Concentrated structural loads',
    icon: Weight,
    epsDensity: 'EPS 25–29',
  },
  truck: {
    label: 'Truck Movement',
    multiplier: 1.6,
    description: 'Roads, parking, vehicle traffic',
    icon: Truck,
    epsDensity: 'EPS 30+',
  },
};

// Base price per cubic meter (INR) — adjust to your supplier
const BASE_PRICE_PER_M3 = 3500;
const SAND_DENSITY_KG_M3 = 2000; // ~2 tons/m³
const GEOFOAM_DENSITY_KG_M3 = 30; // ~30 kg/m³ average

// Range factors — material cost rarely comes in under; transport & site issues push it up
const RANGE_LOW_FACTOR = 0.85; // -15%
const RANGE_HIGH_FACTOR = 1.25; // +25%

const Calculator = () => {
  const [area, setArea] = useState('');
  const [areaUnit, setAreaUnit] = useState('sqft');
  const [height, setHeight] = useState('');
  const [heightUnit, setHeightUnit] = useState('ft');
  const [application, setApplication] = useState('foot');
  const [result, setResult] = useState(null);

  // Live volume preview (before clicking calculate)
  const getVolume = () => {
    const areaNum = parseFloat(area);
    const heightNum = parseFloat(height);
    if (!areaNum || !heightNum) return null;
    const areaM2 = areaUnit === 'sqft' ? areaNum * 0.092903 : areaNum;
    const heightM = heightUnit === 'ft' ? heightNum * 0.3048 : heightNum;
    return areaM2 * heightM;
  };

  const liveVolume = getVolume();

  const calculate = () => {
    const volumeM3 = getVolume();
    if (!volumeM3) return;

    const multiplier = DENSITY_OPTIONS[application].multiplier;
    const materialCost = volumeM3 * BASE_PRICE_PER_M3 * multiplier;
    const sandWeight = volumeM3 * SAND_DENSITY_KG_M3;
    const geofoamWeight = volumeM3 * GEOFOAM_DENSITY_KG_M3;

    setResult({
      volume: volumeM3.toFixed(2),
      costLow: Math.round(materialCost * RANGE_LOW_FACTOR).toLocaleString('en-IN', {
        maximumFractionDigits: 0,
      }),
      costHigh: Math.round(materialCost * RANGE_HIGH_FACTOR).toLocaleString('en-IN', {
        maximumFractionDigits: 0,
      }),
      densityLabel: DENSITY_OPTIONS[application].label,
      epsDensity: DENSITY_OPTIONS[application].epsDensity,
      sandWeight: (sandWeight / 1000).toFixed(1), // tons
      geofoamWeight: (geofoamWeight / 1000).toFixed(1), // tons
      savings: Math.round(((sandWeight - geofoamWeight) / sandWeight) * 100),
    });
  };

  const reset = () => {
    setArea('');
    setHeight('');
    setAreaUnit('sqft');
    setHeightUnit('ft');
    setApplication('foot');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* HERO HEADER */}
      <section className="relative py-20 md:py-24 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/assets/geof.png"
            alt=""
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-geofoam-dark/65 via-geofoam-primary/60 to-geofoam-accent/55" />

        {/* Decorative glows */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-geofoam-highlight/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-geofoam-highlight/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative max-w-2xl mx-auto px-4 text-center text-white"
        >
          <span className="inline-block px-4 py-1.5 mb-5 text-xs font-semibold tracking-widest uppercase bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
            Instant Estimate
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Geofoam Cost{' '}
            <span className="bg-gradient-to-r from-geofoam-highlight to-orange-400 bg-clip-text text-transparent">
              Estimator
            </span>
          </h1>
          <p className="text-white/75 max-w-lg mx-auto">
            Enter your project details below for an instant budget range —
            including weight savings versus sand fill.
          </p>
        </motion.div>
      </section>

      {/* FORM CARD */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-2xl mx-auto px-4 -mt-12 relative z-10"
      >
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 space-y-7 border border-gray-100">
          {/* Step 1: Area */}
          <div>
            <label className="flex items-center gap-2 font-semibold mb-2 text-geofoam-dark">
              <span className="w-6 h-6 bg-geofoam-highlight text-white text-xs rounded-full flex items-center justify-center">
                1
              </span>
              Enter Your Area
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="e.g. 500"
                className="flex-1 border border-gray-200 rounded-xl p-3.5 focus:ring-2 focus:ring-geofoam-highlight focus:border-transparent outline-none transition-all"
              />
              <select
                value={areaUnit}
                onChange={(e) => setAreaUnit(e.target.value)}
                className="border border-gray-200 rounded-xl p-3.5 bg-gray-50 font-medium focus:ring-2 focus:ring-geofoam-highlight outline-none cursor-pointer"
              >
                <option value="sqft">Sq Ft</option>
                <option value="sqm">Sq M</option>
              </select>
            </div>
          </div>

          {/* Step 2: Height */}
          <div>
            <label className="flex items-center gap-2 font-semibold mb-2 text-geofoam-dark">
              <span className="w-6 h-6 bg-geofoam-highlight text-white text-xs rounded-full flex items-center justify-center">
                2
              </span>
              Height to Raise
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="e.g. 3"
                className="flex-1 border border-gray-200 rounded-xl p-3.5 focus:ring-2 focus:ring-geofoam-highlight focus:border-transparent outline-none transition-all"
              />
              <select
                value={heightUnit}
                onChange={(e) => setHeightUnit(e.target.value)}
                className="border border-gray-200 rounded-xl p-3.5 bg-gray-50 font-medium focus:ring-2 focus:ring-geofoam-highlight outline-none cursor-pointer"
              >
                <option value="ft">Feet</option>
                <option value="m">Metres</option>
              </select>
            </div>
          </div>

          {/* Live volume preview */}
          <AnimatePresence>
            {liveVolume && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-xl p-3.5"
              >
                <Box className="text-blue-500 shrink-0" size={20} />
                <p className="text-sm text-blue-800">
                  Volume required:{' '}
                  <span className="font-bold">{liveVolume.toFixed(2)} m³</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 3: Application / Density */}
          <div>
            <label className="flex items-center gap-2 font-semibold mb-3 text-geofoam-dark">
              <span className="w-6 h-6 bg-geofoam-highlight text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
              Application Area (Density)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {Object.entries(DENSITY_OPTIONS).map(([key, opt]) => {
                const Icon = opt.icon;
                const active = application === key;
                return (
                  <motion.button
                    key={key}
                    onClick={() => setApplication(key)}
                    whileTap={{ scale: 0.97 }}
                    className={`p-4 rounded-xl border-2 text-left transition-all relative overflow-hidden ${
                      active
                        ? 'border-geofoam-highlight bg-red-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <Icon
                      size={22}
                      className={
                        active ? 'text-geofoam-highlight' : 'text-gray-400'
                      }
                    />
                    <div className="font-bold text-sm mt-2">{opt.label}</div>
                    <div className="text-[11px] text-gray-500 mt-1 leading-snug">
                      {opt.description}
                    </div>
                    <div className="text-[10px] font-semibold text-geofoam-highlight mt-2">
                      {opt.epsDensity}
                    </div>
                    {active && (
                      <motion.div
                        layoutId="activeDensity"
                        className="absolute inset-0 border-2 border-geofoam-highlight rounded-xl pointer-events-none"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={calculate}
              disabled={!liveVolume}
              className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <CalcIcon size={20} /> Calculate Budget Range
            </button>
            {(area || height || result) && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={reset}
                className="px-4 py-3 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                aria-label="Reset"
              >
                <RotateCcw size={20} />
              </motion.button>
            )}
          </div>

          {/* RESULT */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                {/* Main range card */}
                <div className="bg-geofoam-dark text-white rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-geofoam-highlight/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

                  <p className="text-xs uppercase tracking-wider text-white/50 mb-1 relative">
                    Indicative Budget Range
                  </p>
                  <p className="text-3xl md:text-4xl font-bold text-geofoam-highlight relative">
                    ₹{result.costLow} – ₹{result.costHigh}
                  </p>

                  <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-3 text-sm relative">
                    <div>
                      <p className="text-white/50 text-xs">Volume</p>
                      <p className="font-semibold">{result.volume} m³</p>
                    </div>
                    <div>
                      <p className="text-white/50 text-xs">Grade</p>
                      <p className="font-semibold">{result.epsDensity}</p>
                    </div>
                  </div>
                </div>

                {/* What this range covers */}
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="text-amber-600 shrink-0 mt-0.5" size={16} />
                    <div className="text-sm text-amber-900">
                      <p className="font-semibold mb-1">What this range covers</p>
                      <p className="text-xs leading-relaxed">
                        Geofoam material cost only, based on volume and density
                        grade. Transport, installation, wastage, and GST are{' '}
                        <strong>not included</strong> — final quote is typically
                        20–35% higher.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Weight comparison */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingDown className="text-green-600" size={20} />
                    <p className="font-bold text-green-800 text-sm">
                      Weight Comparison
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/70 rounded-lg p-3 text-center">
                      <p className="text-[10px] font-semibold text-red-500 uppercase">
                        Sand Fill
                      </p>
                      <p className="text-lg font-bold text-gray-800">
                        {result.sandWeight} T
                      </p>
                    </div>
                    <div className="bg-white/70 rounded-lg p-3 text-center">
                      <p className="text-[10px] font-semibold text-green-600 uppercase">
                        Geofoam
                      </p>
                      <p className="text-lg font-bold text-gray-800">
                        {result.geofoamWeight} T
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-green-700 text-center mt-3 font-medium">
                    ~{result.savings}% weight reduction
                  </p>
                </div>

                {/* Get Exact Quote CTA */}
                <a
                  href="/contact"
                  className="btn-primary w-full inline-flex items-center justify-center gap-2"
                >
                  Get Exact Quote <ArrowRight size={18} />
                </a>

                {/* Fine-print disclaimer */}
                <div className="flex gap-2 items-start text-xs text-gray-500 px-2">
                  <Info size={14} className="shrink-0 mt-0.5" />
                  <p>
                    Calculated using standard EPS block rates for North India.
                    Actual rates vary by supplier, order size, and site
                    location. Contact us for a formal quotation.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Calculator;