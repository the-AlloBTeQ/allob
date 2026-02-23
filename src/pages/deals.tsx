import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Users2, TrendingUp, Users, Shield, ChevronRight, 
  Mail, Phone, Award, Target, Zap, ArrowRight, CheckCircle,
  Building2, Landmark, Globe, BarChart3, FileSearch, Network
} from 'lucide-react';
import SEO from '../components/SEO';

<SEO
  title="Deal Origination"
  description="AlloB Consultants identifies, packages, and prepares investment opportunities across South Africa — connecting businesses seeking funding with our financing partner network."
  keywords="deal origination South Africa, investment opportunities, financing readiness, business funding, deal packaging Gauteng"
  canonical="/deals"
/>

const DealsPage = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeProcess, setActiveProcess] = useState(0);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
    const interval = setInterval(() => {
      setActiveProcess(prev => (prev + 1) % 4);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Nodes represent businesses and funders
    const NODE_COUNT = 38;
    type Node = {
      x: number; y: number;
      vx: number; vy: number;
      radius: number;
      type: 'business' | 'funder' | 'neutral';
      pulse: number; pulseSpeed: number;
    };

    const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2.5 + 1.5,
      type: Math.random() < 0.3 ? 'business' : Math.random() < 0.5 ? 'funder' : 'neutral',
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.02,
    }));

    // Animated "deal packets" travelling along edges
    type Packet = { from: number; to: number; progress: number; speed: number; };
    const packets: Packet[] = [];
    const spawnPacket = () => {
      const from = Math.floor(Math.random() * NODE_COUNT);
      let to = Math.floor(Math.random() * NODE_COUNT);
      while (to === from) to = Math.floor(Math.random() * NODE_COUNT);
      packets.push({ from, to, progress: 0, speed: 0.004 + Math.random() * 0.006 });
    };
    for (let i = 0; i < 6; i++) spawnPacket();

    const MAX_DIST = 160;

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Move nodes
      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += n.pulseSpeed;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.18;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(147, 197, 253, ${alpha})`; // blue-300
            ctx.lineWidth = 0.8;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach(n => {
        const pulseRadius = n.radius + Math.sin(n.pulse) * 0.8;
        const color =
          n.type === 'business' ? 'rgba(147, 197, 253, 0.9)'  // blue-300
          : n.type === 'funder'  ? 'rgba(255, 255, 255, 0.85)'
          :                        'rgba(96, 165, 250, 0.5)';  // blue-400

        // Outer glow
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, pulseRadius * 3.5);
        grd.addColorStop(0, color.replace('0.9', '0.3').replace('0.85', '0.25').replace('0.5', '0.15'));
        grd.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(n.x, n.y, pulseRadius * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, pulseRadius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      });

      // Draw travelling packets (deal flow)
      packets.forEach((p, idx) => {
        p.progress += p.speed;
        if (p.progress >= 1) {
          packets.splice(idx, 1);
          spawnPacket();
          return;
        }
        const a = nodes[p.from];
        const b = nodes[p.to];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > MAX_DIST) { packets.splice(idx, 1); spawnPacket(); return; }

        const px = a.x + dx * p.progress;
        const py = a.y + dy * p.progress;

        // Trail
        const trailGrd = ctx.createRadialGradient(px, py, 0, px, py, 6);
        trailGrd.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
        trailGrd.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.fillStyle = trailGrd;
        ctx.fill();

        // Bright dot
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const originationCapabilities = [
    {
      title: "Deal Origination & Sourcing",
      description: "AlloB actively identifies and originates investment opportunities across South Africa's growth sectors — bringing vetted, analysis-ready deals to our financing partners.",
      icon: FileSearch,
      features: ["Proprietary Deal Flow", "Market Intelligence", "Sector Screening", "Opportunity Pipeline"]
    },
    {
      title: "Valuations & Due Diligence",
      description: "We perform rigorous financial analysis, business valuations, and due diligence — so our partners receive fully assessed deals ready for financing decisions.",
      icon: BarChart3,
      features: ["Business Valuation", "Financial Modeling", "Risk Assessment", "Investment Memoranda"]
    },
    {
      title: "Mergers & Acquisitions",
      description: "AlloB originates M&A opportunities — identifying targets, structuring transactions, and coordinating with financing partners to close buy-side and sell-side deals.",
      icon: Users,
      features: ["Target Identification", "Deal Structuring", "Transaction Coordination", "Post-Merger Support"]
    },
    {
      title: "Restructuring & Turnarounds",
      description: "We originate distressed opportunities with clear recovery strategies, presenting our financing partners with structured turnaround investment cases.",
      icon: Zap,
      features: ["Distressed Sourcing", "Recovery Planning", "Operational Review", "Exit Strategy"]
    },
    {
      title: "Capital & Strategy",
      description: "AlloB identifies businesses requiring growth capital, prepares them for investment, and connects them with the right financing partners in our network.",
      icon: Target,
      features: ["Capital Readiness", "Investor Matching", "Growth Planning", "IPO Preparation"]
    },
    {
      title: "Insolvency & Business Rescue",
      description: "We source and structure business rescue opportunities, acting as the expert intermediary between distressed businesses and financing partners who can intervene.",
      icon: Shield,
      features: ["Business Rescue", "Creditor Advisory", "Asset Recovery", "Distressed Financing"]
    },
  ];

  const process = [
    {
      step: "01",
      title: "We Source the Deal",
      description: "AlloB's team actively identifies and screens investment opportunities across sectors using proprietary market intelligence and industry networks.",
      icon: Search,
    },
    {
      step: "02",
      title: "We Analyse & Structure",
      description: "We perform comprehensive due diligence, valuations, and financial modeling — preparing a complete investment case with risk and return analysis.",
      icon: BarChart3,
    },
    {
      step: "03",
      title: "We Bring Partners In",
      description: "AlloB presents the packaged deal to our network of financing partners — banks, DFIs, private equity, family offices, and institutional investors.",
      icon: Network,
    },
    {
      step: "04",
      title: "We Close Together",
      description: "AlloB coordinates the transaction to close, continuing to support execution and post-deal monitoring alongside our financing partners.",
      icon: Users2,
    }
  ];

  const partnerTypes = [
    { label: "Development Finance Institutions", icon: Landmark },
    { label: "Commercial Banks", icon: Building2 },
    { label: "Private Equity Funds", icon: TrendingUp },
    { label: "Family Offices", icon: Users },
    { label: "Institutional Investors", icon: Globe },
    { label: "Impact Investors", icon: Target },
  ];

  const targetSectors = [
    {
      name: "Infrastructure",
      focus: "Transportation, Energy & Utilities",
      description: "We are actively seeking infrastructure investment opportunities in roads, energy, and water — bringing structured deals to our financing partners.",
      tags: ["Roads & Bridges", "Power Generation", "Water Systems"],
      targetIRR: "12–15% IRR",
      icon: Building2,
    },
    {
      name: "Agriculture",
      focus: "Sustainable Farming & Agribusiness",
      description: "AlloB is looking for agribusiness opportunities with strong food security impact across the full agricultural value chain.",
      tags: ["Crop Production", "Livestock", "Agritech"],
      targetIRR: "13–16% IRR",
      icon: Globe,
    },
    {
      name: "Renewable Energy",
      focus: "Clean Energy & Green Tech",
      description: "We are actively scouting solar, wind, and storage projects that can be packaged with the right regulatory and off-take structures for our financing partners.",
      tags: ["Solar", "Wind", "Energy Storage"],
      targetIRR: "14–18% IRR",
      icon: Zap,
    },
    {
      name: "Real Estate",
      focus: "Commercial & Residential Development",
      description: "AlloB is seeking development opportunities from site acquisition through planning — to structure and present to debt and equity financing partners.",
      tags: ["Commercial", "Residential", "Industrial"],
      targetIRR: "11–14% IRR",
      icon: Landmark,
    },
    {
      name: "Technology",
      focus: "Fintech & Digital Innovation",
      description: "We are looking for high-growth tech businesses requiring growth capital — to assess, package, and match with our venture and growth equity partners.",
      tags: ["Fintech", "SaaS", "E-commerce"],
      targetIRR: "16–22% IRR",
      icon: Network,
    },
    {
      name: "Healthcare",
      focus: "Medical Facilities & Life Sciences",
      description: "AlloB is actively sourcing healthcare opportunities spanning clinics, diagnostics, and pharma for our financing partner network.",
      tags: ["Hospitals", "Medical Devices", "Pharma"],
      targetIRR: "13–16% IRR",
      icon: Shield,
    }
  ];

  const stats = [
    { value: "8+", label: "Years of Experience", icon: Award },
    { value: "6", label: "Target Sectors", icon: FileSearch },
    { value: "5+", label: "Financing Partners", icon: Users2 },
    //{ value: "98%", label: "Client Satisfaction", icon: TrendingUp }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 12 }
    }
  };

  return (
    <div className="font-sans bg-gray-50">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-blue-900">

        {/* Animated network canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-0"
        />

        {/* Gradient vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 via-transparent to-blue-900/60 z-10 pointer-events-none" />

        {/* Dotted radial grid texture */}
        <div className="absolute inset-0 opacity-20 z-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />

        {/* Content */}
        <div className="relative z-20 max-w-6xl mx-auto px-6 py-20 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="flex flex-col items-center"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-blue-400/30 bg-blue-800/60 backdrop-blur-sm">
                <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse" />
                <span className="text-blue-200 font-semibold text-xs tracking-[0.2em] uppercase">Deal Origination & Advisory</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-black text-white mb-5 leading-[1.05] tracking-tight"
            >
              We're Actively
              <br />
              <span className="text-blue-300">Looking for Deals.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-blue-100 mb-4 max-w-3xl mx-auto leading-relaxed"
            >
              AlloB originates investment opportunities across South Africa — we find, structure, and package deals, then bring our financing partners to the table.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-sm md:text-base text-blue-200/70 mb-12 max-w-2xl mx-auto"
            >
              If you have a deal opportunity or are seeking investment, we want to hear from you.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12 w-full"
            >
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-blue-800/50 backdrop-blur-md rounded-2xl p-5 border border-blue-700/60 flex flex-col items-center justify-center group hover:bg-blue-700/60 transition-colors duration-300 cursor-default"
                  >
                    <Icon className="w-6 h-6 text-blue-300 mb-2 group-hover:text-white transition-colors" />
                    <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                    <div className="text-[10px] md:text-xs text-blue-300 uppercase tracking-wider font-semibold">{stat.label}</div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#sectors"
                className="group relative px-8 py-4 bg-white text-blue-800 font-bold rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2">
                Sectors We Target
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#submit-deal"
                className="px-8 py-4 border-2 border-white/30 text-white font-bold rounded-lg hover:bg-white/10 hover:border-white/50 backdrop-blur-sm transition-all duration-300 inline-flex items-center justify-center">
                Submit a Deal
              </a>
            </motion.div>

          </motion.div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <svg className="w-full h-16 md:h-24 fill-gray-50" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
          </svg>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-5 py-2 bg-blue-100 rounded-full">
              <span className="text-blue-700 font-bold text-sm tracking-widest uppercase">Our Model</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              AlloB Originates. Partners Finance.
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              We are the front-end of every deal — sourcing, structuring, and bringing transactions to our network of financing partners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 relative">
            {/* Connector */}
            <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-blue-200 z-0" />

            {process.map((step, i) => {
              const Icon = step.icon;
              const isActive = activeProcess === i;
              return (
                <div key={i}
                  className="relative z-10 flex flex-col items-center text-center px-4 cursor-pointer"
                  onClick={() => setActiveProcess(i)}>
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 shadow-md transition-all duration-500 ${
                    isActive ? 'bg-blue-700 scale-110' : 'bg-white border-2 border-blue-100 scale-100'
                  }`}>
                    <Icon className={`w-7 h-7 transition-colors duration-300 ${isActive ? 'text-white' : 'text-blue-400'}`} />
                  </div>
                  <div className={`text-xs font-black tracking-widest mb-1 ${isActive ? 'text-blue-700' : 'text-blue-300'}`}>
                    {step.step}
                  </div>
                  <h3 className={`text-base font-bold mb-3 transition-colors ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                    {step.title}
                  </h3>
                  <p className={`text-sm leading-relaxed transition-all duration-500 ${isActive ? 'text-gray-600' : 'text-gray-400'}`}>
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block mb-4 px-5 py-2 bg-blue-100 rounded-full">
                <span className="text-blue-700 font-bold text-sm tracking-widest uppercase">Who We Are</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                The originator behind every deal
              </h2>
              <p className="text-lg text-gray-600 mb-5 leading-relaxed">
                AlloB Consultants doesn't just advise — we go out and{' '}
                <strong className="text-blue-700">find the deals</strong>. Our team actively scouts,
                screens, and secures investment opportunities across South Africa's most promising sectors.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Once we've identified and structured an opportunity, we bring it to our{' '}
                <strong className="text-blue-700">financing partner network</strong> — development finance
                institutions, private equity funds, banks, and impact investors who trust AlloB's origination
                quality and analytical rigour.
              </p>
              <div className="space-y-3">
                {[
                  "Proprietary deal flow across 6+ sectors",
                  //"Full financial structuring before partner engagement",
                  //"Relationships with 15+ active financing partners",
                  "End-to-end transaction management"
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Diagram */}
            <div>
              <div className="bg-blue-900 rounded-3xl p-8 text-white shadow-2xl shadow-blue-900/25">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-3 px-6 py-3 bg-blue-600 rounded-2xl shadow-lg mb-3">
                    <Search className="w-6 h-6 text-white" />
                    <span className="font-black text-lg">AlloB Consultants</span>
                  </div>
                  <div className="text-blue-300 text-sm">Deal Originator & Structurer</div>
                </div>

                <div className="flex justify-center mb-6">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-0.5 h-5 bg-blue-500/60" />
                    <div className="text-blue-300 text-xs font-semibold">Packaged Deal</div>
                    <div className="w-0.5 h-5 bg-blue-500/60" />
                    <ArrowRight className="w-5 h-5 text-blue-400 rotate-90" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {partnerTypes.map((partner, i) => {
                    const Icon = partner.icon;
                    return (
                      <div key={i} className="flex items-center gap-2 bg-blue-800/60 border border-blue-700/50 rounded-xl px-3 py-2">
                        <Icon className="w-4 h-4 text-blue-300 flex-shrink-0" />
                        <span className="text-blue-100 text-xs leading-tight">{partner.label}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 pt-5 border-t border-blue-800 text-center text-blue-400 text-xs">
                  Our financing partner network
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ORIGINATION CAPABILITIES ── */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-5 py-2 bg-blue-100 rounded-full">
              <span className="text-blue-700 font-bold text-sm tracking-widest uppercase">What We Do</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Origination Capabilities
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Every service is built around AlloB's core role: finding and packaging the deal so our partners can finance with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {originationCapabilities.map((cap, i) => {
              const Icon = cap.icon;
              const isHovered = hoveredCard === i;
              return (
                <div
                  key={i}
                  className="group relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-400 cursor-pointer overflow-hidden"
                  style={{ transform: isHovered ? 'translateY(-6px)' : 'translateY(0)' }}
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="absolute top-0 left-0 right-0 bg-blue-600 transition-all duration-300"
                    style={{ height: isHovered ? '4px' : '2px' }} />
                  <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-50 transition-opacity duration-400" />

                  <div className="relative">
                    <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="w-7 h-7 text-blue-700" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{cap.title}</h3>
                    <p className="text-gray-500 mb-5 leading-relaxed text-sm">{cap.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {cap.features.map((f, fi) => (
                        <span key={fi} className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TARGET SECTORS ── */}
      <section id="sectors" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-5 py-2 bg-blue-100 rounded-full">
              <span className="text-blue-700 font-bold text-sm tracking-widest uppercase">Where We Look</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Sectors We're Actively Targeting
            </h2>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto">
              AlloB is actively seeking investment opportunities across these sectors. If you have a deal, a business seeking capital, or an asset for sale — we want to hear from you.
            </p>

            {/* Deal invitation callout */}
            <div className="mt-8 inline-flex items-center gap-4 bg-blue-900 text-white px-8 py-4 rounded-2xl">
              <div className="w-2.5 h-2.5 bg-blue-300 rounded-full animate-pulse flex-shrink-0" />
              <span className="text-blue-100 font-medium">Actively sourcing across all 6 sectors — <strong className="text-white">submit your deal opportunity below</strong></span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {targetSectors.map((sector, i) => {
              const Icon = sector.icon;
              return (
                <div key={i}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-400">
                  <div className="h-1.5 bg-blue-700" />
                  <div className="p-7">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold mb-2">
                          <Search className="w-3 h-3" />
                          Actively Seeking
                        </div>
                        <h3 className="text-xl font-black text-gray-900">{sector.name}</h3>
                        <div className="text-xs text-gray-400 mt-0.5">{sector.focus}</div>
                      </div>
                      <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-blue-700" />
                      </div>
                    </div>

                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{sector.description}</p>

                    <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 rounded-lg border border-blue-200">
                      <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                      <span className="text-blue-700 font-bold text-sm">Target: {sector.targetIRR}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {sector.tags.map((tag, ti) => (
                        <span key={ti} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a href="#submit-deal"
                      className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300">
                      Submit a Deal in This Sector
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SUBMIT A DEAL ── */}
      <section id="submit-deal" className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-5 py-2 bg-blue-100 rounded-full">
              <span className="text-blue-700 font-bold text-sm tracking-widest uppercase">Have a Deal?</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Bring Your Opportunity to AlloB
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Whether you own a business seeking investment, have an asset for sale, or know of a deal opportunity — we want to hear from you. AlloB will assess, structure, and find the right financing partner.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: "Business Owners",
                description: "Looking for growth capital, a strategic partner, or an exit? AlloB will structure your opportunity and connect you with the right investors.",
                icon: Users,
              },
              {
                title: "Deal Finders & Intermediaries",
                description: "If you've identified an opportunity but need a structuring and financing partner, AlloB can take it from there. We share in the upside.",
                icon: Users2,
              },
              {
                title: "Asset Sellers",
                description: "Have property, equipment, or business assets to sell? AlloB will identify the right buyer or financing structure in our network.",
                icon: Target,
              }
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="bg-white rounded-2xl p-7 border border-gray-200 shadow-sm text-center">
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-blue-700" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>

          {/* Contact CTA */}
          <div className="bg-blue-900 rounded-3xl p-10 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }} />
            <div className="relative z-10">
              <h3 className="text-3xl font-black mb-3">Ready to talk?</h3>
              <p className="text-blue-200 mb-8 max-w-xl mx-auto">
                Reach out to our deals team. All enquiries are handled confidentially — we respond within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                <a href="mailto:deals@allob.co.za"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-800 font-black rounded-xl hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-lg">
                  <Mail className="w-5 h-5" />
                  deals@allob.co.za
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="tel:+27123456789"
                  className="inline-flex items-center gap-3 px-8 py-4 border-2 border-white/40 text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300">
                  <Phone className="w-5 h-5" />
                  +27 67 921 1947
                </a>
              </div>
              <div className="flex items-center justify-center gap-2 text-blue-400 text-sm">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                All deal submissions treated with strict confidentiality
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BECOME A FINANCING PARTNER ── */}
      <section id="partner" className="py-24 bg-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
        <div className="absolute pointer-events-none inset-0">
          <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #60a5fa, transparent 70%)' }} />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #93c5fd, transparent 70%)' }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full border border-blue-500/50 bg-blue-800/60">
              <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse" />
              <span className="text-blue-200 font-semibold text-sm tracking-widest uppercase">For Financing Partners</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
              Partner with AlloB
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
              As we build our deal pipeline, we are establishing relationships with financing partners who want first access to AlloB-originated, fully structured investment opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {[
              {
                title: "Pre-screened Deals",
                description: "Every deal AlloB brings to you has been sourced, vetted, and structured — saving you time on origination and early-stage due diligence.",
                icon: FileSearch,
              },
              {
                title: "Investment-Ready Packages",
                description: "You receive full financial models, investment memoranda, and risk assessments — ready for your investment committee.",
                icon: BarChart3,
              },
              {
                title: "Ongoing Support",
                description: "AlloB stays involved through execution and post-deal monitoring — a trusted intermediary you can rely on for the life of the deal.",
                icon: Users2,
              }
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="bg-blue-800/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-700/60 text-center">
                  <div className="w-12 h-12 bg-blue-700/60 border border-blue-600/50 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-blue-300" />
                  </div>
                  <h3 className="font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-blue-200 text-sm leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="mailto:deals@allob.co.za"
              className="group flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-800 font-black rounded-xl hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-950/40">
              <Mail className="w-5 h-5" />
              Register as a Financing Partner
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="tel:+27123456789"
              className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/40 text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300">
              <Phone className="w-5 h-5" />
              Call Our Team
            </a>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-blue-400 text-sm">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            All enquiries handled with strict confidentiality · Response within 24 hours
          </div>
        </div>
      </section>

    </div>
  );
};

export default DealsPage;