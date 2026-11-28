
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
  Ruler,
  Layers3,
  CheckCircle2,
  Sparkles,
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

const BASE_PRICE_PER_M3 = 3500;
const SAND_DENSITY_KG_M3 = 2000;
const GEOFOAM_DENSITY_KG_M3 = 30;

const RANGE_LOW_FACTOR = 0.85;
const RANGE_HIGH_FACTOR = 1.25;

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

const Calculator = () => {
  const [area, setArea] = useState('');
  const [areaUnit, setAreaUnit] = useState('sqft');
  const [height, setHeight] = useState('');
  const [heightUnit, setHeightUnit] = useState('ft');
  const [application, setApplication] = useState('foot');
  const [result, setResult] = useState(null);

  const getVolume = () => {
    const areaNum = parseFloat(area);
    const heightNum = parseFloat(height);

    if (!Number.isFinite(areaNum) || !Number.isFinite(heightNum) || areaNum <= 0 || heightNum <= 0) {
      return null;
    }

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
      sandWeight: (sandWeight / 1000).toFixed(1),
      geofoamWeight: (geofoamWeight / 1000).toFixed(1),
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

  const inputClass =
    'w-full min-w-0 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-geofoam-dark font-semibold placeholder:text-gray-400 placeholder:font-normal outline-none transition-all duration-300 focus:bg-white focus:border-geofoam-highlight focus:ring-4 focus:ring-geofoam-highlight/10';

  const selectClass =
    'bg-gray-50 border border-gray-200 rounded-xl px-3 py-3.5 text-sm font-semibold text-geofoam-dark outline-none cursor-pointer transition-all duration-300 focus:border-geofoam-highlight focus:ring-4 focus:ring-geofoam-highlight/10';

  return (
    <div className="min-h-screen bg-[#f5f7fa] pb-20 overflow-hidden">

      {/* HERO */}
      <section className="relative min-h-[370px] md:min-h-[420px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/geof.png"
            alt=""
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-geofoam-dark/90 via-geofoam-primary/80 to-geofoam-accent/75" />

        <div className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
            backgroundSize: '45px 45px',
          }}
        />

        <div className="absolute -top-24 -right-20 w-80 h-80 rounded-full bg-geofoam-highlight/20 blur-[100px]" />
        <div className="absolute -bottom-28 -left-20 w-80 h-80 rounded-full bg-orange-400/20 blur-[100px]" />

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-3xl mx-auto px-5 py-20 text-center text-white"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl text-xs font-bold tracking-[0.18em] uppercase mb-6"
          >
            <Sparkles size={14} className="text-geofoam-highlight" />
            Smart Project Estimator
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6">
            Geofoam Cost
            <span className="block mt-2 bg-gradient-to-r from-geofoam-highlight via-orange-300 to-yellow-200 bg-clip-text text-transparent">
              Estimator
            </span>
          </h1>

          <p className="text-white/75 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Plan your next project with confidence. Calculate estimated
            Geofoam requirements, material costs, and weight savings in seconds.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {[
              { icon: CheckCircle2, text: 'Instant Estimate' },
              { icon: Layers3, text: 'Volume Calculation' },
              { icon: TrendingDown, text: 'Weight Comparison' },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-2 text-xs sm:text-sm text-white/80 bg-white/10 border border-white/10 backdrop-blur-md rounded-full px-3 py-2"
              >
                <item.icon size={15} className="text-geofoam-highlight" />
                {item.text}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* MAIN CALCULATOR */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 -mt-10 md:-mt-14">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="grid lg:grid-cols-[1.05fr_.95fr] gap-6 items-start"
        >

          {/* INPUT PANEL */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_20px_70px_rgba(15,23,42,0.09)] overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-gray-100">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-geofoam-highlight text-xs font-bold tracking-[0.16em] uppercase mb-2">
                    <CalcIcon size={15} />
                    Project Calculator
                  </div>
                  <h2 className="text-2xl font-extrabold text-geofoam-dark">
                    Project Details
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Enter your measurements to get started.
                  </p>
                </div>

                <div className="hidden sm:flex w-12 h-12 rounded-2xl bg-orange-50 items-center justify-center">
                  <Ruler size={23} className="text-geofoam-highlight" />
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-8">

              {/* AREA */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 shrink-0 rounded-xl bg-geofoam-highlight text-white text-sm font-bold flex items-center justify-center shadow-lg shadow-geofoam-highlight/20">
                    01
                  </span>
                  <div>
                    <label htmlFor="project-area" className="block font-bold text-geofoam-dark">
                      Enter Your Area
                    </label>
                    <p className="text-xs text-gray-400">Total surface area of your project</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    id="project-area"
                    type="number"
                    min="0"
                    step="any"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="e.g. 500"
                    className={inputClass}
                  />

                  <select
                    aria-label="Area unit"
                    value={areaUnit}
                    onChange={(e) => setAreaUnit(e.target.value)}
                    className={selectClass}
                  >
                    <option value="sqft">Sq Ft</option>
                    <option value="sqm">Sq M</option>
                  </select>
                </div>
              </div>

              {/* HEIGHT */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 shrink-0 rounded-xl bg-geofoam-highlight text-white text-sm font-bold flex items-center justify-center shadow-lg shadow-geofoam-highlight/20">
                    02
                  </span>
                  <div>
                    <label htmlFor="project-height" className="block font-bold text-geofoam-dark">
                      Height to Raise
                    </label>
                    <p className="text-xs text-gray-400">Required filling or elevation height</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    id="project-height"
                    type="number"
                    min="0"
                    step="any"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="e.g. 3"
                    className={inputClass}
                  />

                  <select
                    aria-label="Height unit"
                    value={heightUnit}
                    onChange={(e) => setHeightUnit(e.target.value)}
                    className={selectClass}
                  >
                    <option value="ft">Feet</option>
                    <option value="m">Metres</option>
                  </select>
                </div>
              </div>

              {/* LIVE VOLUME */}
              <AnimatePresence>
                {liveVolume !== null && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: 8 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-center justify-between gap-3 rounded-2xl p-4 bg-blue-50 border border-blue-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                          <Box size={20} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider">
                            Live Volume Preview
                          </p>
                          <p className="text-xs text-blue-800 mt-0.5">
                            Based on your measurements
                          </p>
                        </div>
                      </div>
                      <p className="text-xl font-extrabold text-blue-800 whitespace-nowrap">
                        {liveVolume.toFixed(2)}
                        <span className="text-xs font-semibold ml-1">m³</span>
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* APPLICATION */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 shrink-0 rounded-xl bg-geofoam-highlight text-white text-sm font-bold flex items-center justify-center shadow-lg shadow-geofoam-highlight/20">
                    03
                  </span>
                  <div>
                    <p className="font-bold text-geofoam-dark">
                      Select Application
                    </p>
                    <p className="text-xs text-gray-400">
                      Choose the expected load condition
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {Object.entries(DENSITY_OPTIONS).map(([key, opt]) => {
                    const Icon = opt.icon;
                    const active = application === key;

                    return (
                      <motion.button
                        key={key}
                        type="button"
                        onClick={() => setApplication(key)}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.97 }}
                        className={`relative text-left p-4 rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                          active
                            ? 'border-geofoam-highlight bg-orange-50/70 shadow-lg shadow-orange-100'
                            : 'border-gray-100 bg-gray-50/70 hover:border-gray-300 hover:bg-white'
                        }`}
                      >
                        {active && (
                          <motion.div
                            layoutId="activeDensity"
                            className="absolute inset-0 border-2 border-geofoam-highlight rounded-2xl pointer-events-none"
                            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                          />
                        )}

                        <div className="relative z-10">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                            active
                              ? 'bg-geofoam-highlight text-white'
                              : 'bg-white text-gray-400 border border-gray-100'
                          }`}>
                            <Icon size={21} />
                          </div>

                          <p className={`font-bold text-sm ${
                            active ? 'text-geofoam-dark' : 'text-gray-700'
                          }`}>
                            {opt.label}
                          </p>

                          <p className="text-[11px] text-gray-500 mt-1 leading-relaxed min-h-[32px]">
                            {opt.description}
                          </p>

                          <div className="flex items-center justify-between mt-3 gap-1">
                            <span className={`text-[10px] font-extrabold ${
                              active ? 'text-geofoam-highlight' : 'text-gray-500'
                            }`}>
                              {opt.epsDensity}
                            </span>
                            {active && (
                              <CheckCircle2 size={15} className="text-geofoam-highlight" />
                            )}
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-3 pt-2">
                <motion.button
                  type="button"
                  onClick={calculate}
                  disabled={!liveVolume}
                  whileHover={liveVolume ? { scale: 1.015 } : {}}
                  whileTap={liveVolume ? { scale: 0.98 } : {}}
                  className="flex-1 min-h-[54px] rounded-xl bg-geofoam-highlight text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-geofoam-highlight/20 hover:shadow-xl hover:brightness-105 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  <CalcIcon size={19} />
                  Calculate Budget
                  <ArrowRight size={17} />
                </motion.button>

                {(area || height || result) && (
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={reset}
                    className="w-14 shrink-0 rounded-xl border border-gray-200 bg-white text-gray-500 hover:text-geofoam-highlight hover:bg-orange-50 hover:border-orange-200 transition-all duration-300 flex items-center justify-center"
                    aria-label="Reset calculator"
                    title="Reset calculator"
                  >
                    <RotateCcw size={19} />
                  </motion.button>
                )}
              </div>

              {!liveVolume && (area || height) && (
                <p className="text-xs text-gray-400 flex items-center gap-2">
                  <Info size={14} />
                  Enter positive area and height values to calculate your estimate.
                </p>
              )}
            </div>
          </div>

          {/* RESULTS PANEL */}
          <div className="space-y-5 lg:sticky lg:top-6">

            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="bg-geofoam-dark rounded-3xl p-7 sm:p-9 text-white relative overflow-hidden min-h-[340px] flex flex-col justify-between shadow-[0_20px_60px_rgba(15,23,42,0.15)]"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-geofoam-highlight/15 blur-[75px]" />
                  <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-blue-400/10 blur-[75px]" />

                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center mb-6">
                      <CalcIcon size={26} className="text-geofoam-highlight" />
                    </div>

                    <p className="text-xs font-bold tracking-[0.18em] uppercase text-white/45 mb-3">
                      Your Project Estimate
                    </p>

                    <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                      Your results
                      <span className="block text-geofoam-highlight">
                        will appear here.
                      </span>
                    </h3>

                    <p className="text-white/55 text-sm leading-relaxed mt-4 max-w-sm">
                      Add your project dimensions and choose an application
                      to see your estimated Geofoam material budget.
                    </p>
                  </div>

                  <div className="relative z-10 mt-10 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                      <Box size={19} className="text-geofoam-highlight mb-3" />
                      <p className="text-xs text-white/45">Volume</p>
                      <p className="font-bold text-sm mt-1">Calculated live</p>
                    </div>
                    <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                      <TrendingDown size={19} className="text-geofoam-highlight mb-3" />
                      <p className="text-xs text-white/45">Weight savings</p>
                      <p className="font-bold text-sm mt-1">Compared to sand</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-5"
                >
                  {/* PRICE */}
                  <div className="bg-geofoam-dark text-white rounded-3xl p-7 sm:p-8 relative overflow-hidden shadow-[0_20px_60px_rgba(15,23,42,0.15)]">
                    <div className="absolute -top-16 -right-12 w-56 h-56 bg-geofoam-highlight/20 rounded-full blur-[65px]" />
                    <div className="absolute bottom-0 left-0 w-48 h-32 bg-blue-400/10 rounded-full blur-[60px]" />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between gap-3 mb-7">
                        <div>
                          <p className="text-xs uppercase tracking-[0.16em] text-white/45 font-bold">
                            Indicative Budget Range
                          </p>
                          <p className="text-xs text-white/50 mt-1">
                            Estimated Geofoam material cost
                          </p>
                        </div>
                        <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">
                          <TrendingDown className="text-geofoam-highlight" size={22} />
                        </div>
                      </div>

                      <motion.p
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-3xl sm:text-4xl font-extrabold tracking-tight text-geofoam-highlight break-words"
                      >
                        ₹{result.costLow}
                        <span className="text-white/40 mx-2 font-normal">–</span>
                        ₹{result.costHigh}
                      </motion.p>

                      <div className="mt-7 pt-5 border-t border-white/10 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-[11px] uppercase tracking-wider text-white/40">
                            Required Volume
                          </p>
                          <p className="text-xl font-bold mt-1">
                            {result.volume} <span className="text-sm text-white/55">m³</span>
                          </p>
                        </div>
                        <div>
                          <p className="text-[11px] uppercase tracking-wider text-white/40">
                            Suggested Grade
                          </p>
                          <p className="text-xl font-bold mt-1">{result.epsDensity}</p>
                        </div>
                      </div>

                      <div className="mt-5 inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-3 py-2 text-xs text-white/80">
                        <CheckCircle2 size={14} className="text-green-400" />
                        {result.densityLabel}
                      </div>
                    </div>
                  </div>

                  {/* COST DISCLAIMER */}
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 shrink-0 rounded-xl bg-amber-100 flex items-center justify-center">
                        <AlertCircle size={18} className="text-amber-600" />
                      </div>
                      <div>
                        <p className="font-bold text-amber-900 text-sm mb-1">
                          What this estimate covers
                        </p>
                        <p className="text-xs text-amber-800/80 leading-relaxed">
                          Geofoam material cost only, based on volume and density
                          grade. Transport, installation, wastage, and GST are
                          <strong> not included</strong> — final quote is typically
                          20–35% higher.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* WEIGHT COMPARISON */}
                  <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div>
                        <p className="font-extrabold text-geofoam-dark">
                          Weight Comparison
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Same project volume, different materials
                        </p>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                        <TrendingDown size={20} className="text-green-600" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-red-50 border border-red-100 p-4">
                        <p className="text-[10px] font-extrabold tracking-wider uppercase text-red-500">
                          Sand Fill
                        </p>
                        <p className="text-2xl font-extrabold text-gray-800 mt-2">
                          {result.sandWeight}
                          <span className="text-xs font-bold ml-1">T</span>
                        </p>
                        <p className="text-[11px] text-gray-400 mt-1">Approx. weight</p>
                      </div>

                      <div className="rounded-2xl bg-green-50 border border-green-100 p-4">
                        <p className="text-[10px] font-extrabold tracking-wider uppercase text-green-600">
                          Geofoam
                        </p>
                        <p className="text-2xl font-extrabold text-gray-800 mt-2">
                          {result.geofoamWeight}
                          <span className="text-xs font-bold ml-1">T</span>
                        </p>
                        <p className="text-[11px] text-gray-400 mt-1">Approx. weight</p>
                      </div>
                    </div>

                    <div className="mt-5 rounded-2xl bg-green-50 p-4 text-center">
                      <p className="text-3xl font-extrabold text-green-700">
                        {result.savings}%
                      </p>
                      <p className="text-xs font-bold text-green-700 mt-1">
                        Approximate Weight Reduction
                      </p>
                      <div className="h-2 bg-green-100 rounded-full mt-3 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${result.savings}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className="h-full bg-green-500 rounded-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* EXACT QUOTE */}
                  <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.98 }}
                    className="group w-full min-h-[58px] rounded-2xl bg-geofoam-highlight text-white font-bold flex items-center justify-center gap-3 shadow-lg shadow-geofoam-highlight/20 hover:shadow-xl hover:brightness-105 transition-all duration-300"
                  >
                    Get Exact Project Quote
                    <ArrowRight size={19} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </motion.a>

                  {/* DISCLAIMER */}
                  <div className="flex gap-2 items-start px-2 text-xs text-gray-400 leading-relaxed">
                    <Info size={15} className="shrink-0 mt-0.5" />
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

      {/* BOTTOM TRUST STRIP */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 mt-16"
      >
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              icon: Box,
              title: 'Accurate Volume',
              description: 'Instant cubic metre conversion from your dimensions.',
            },
            {
              icon: Weight,
              title: 'Lightweight Fill',
              description: 'Compare Geofoam weight against conventional sand fill.',
            },
            {
              icon: CheckCircle2,
              title: 'Project Planning',
              description: 'Get an indicative material budget before requesting a quote.',
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white border border-gray-100 rounded-2xl p-5 flex items-start gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-11 h-11 shrink-0 rounded-xl bg-orange-50 flex items-center justify-center">
                <item.icon size={21} className="text-geofoam-highlight" />
              </div>
              <div>
                <p className="font-bold text-geofoam-dark text-sm">{item.title}</p>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default Calculator;
