"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ─── Scroll-triggered animation hook ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── Animated counter ─── */
function AnimatedNumber({ value, suffix = "", prefix = "", duration = 1800 }: { value: number; suffix?: string; prefix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const { ref, visible } = useInView(0.3);
  useEffect(() => {
    if (!visible) return;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, value, duration]);
  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

/* ─── Navbar ─── */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#features", label: "Features" },
    { href: "#solutions", label: "Solutions" },
    { href: "#pricing", label: "Pricing" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-slate-950/95 backdrop-blur-md shadow-lg shadow-black/20" : "bg-transparent"} border-b border-slate-800/50`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          TechWave
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-slate-400 hover:text-white transition-colors">
              {l.label}
            </a>
          ))}
          <a href="#contact" className="text-sm px-5 py-2 rounded-full bg-cyan-500 text-white hover:bg-cyan-400 transition-colors">
            Get Started
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-slate-400" aria-label="Menu">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="bg-slate-950/95 backdrop-blur px-6 pb-4">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-3 text-slate-400 hover:text-white transition-colors">
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="block mt-2 text-center py-2.5 rounded-full bg-cyan-500 text-white">
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ─── Hero with animated counters ─── */
function Hero() {
  const { ref, visible } = useInView(0.1);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center pt-16 px-6 overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />

      <div className={`relative max-w-4xl text-center transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-sm">
          Trusted by 200+ Companies Worldwide
        </div>
        <h1 className="text-5xl sm:text-7xl font-bold leading-tight mb-6">
          AI-Powered Solutions for{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Modern Business
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Automate workflows, unlock insights from your data, and scale your operations with our enterprise-grade AI platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#contact" className="px-8 py-3.5 bg-cyan-500 text-white rounded-full font-medium hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5">
            Start Free Trial
          </a>
          <a href="#features" className="px-8 py-3.5 border border-slate-700 text-slate-300 rounded-full font-medium hover:border-slate-500 hover:text-white transition-all hover:-translate-y-0.5">
            See How It Works
          </a>
        </div>
        {/* Animated stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div>
            <div className="text-2xl font-bold text-white"><AnimatedNumber value={99} suffix=".9%" /></div>
            <div className="text-sm text-slate-500">Uptime</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white"><AnimatedNumber value={10} suffix="x" /></div>
            <div className="text-sm text-slate-500">Faster</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white"><AnimatedNumber value={200} suffix="+" /></div>
            <div className="text-sm text-slate-500">Clients</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Interactive Feature Tabs ─── */
function Features() {
  const [active, setActive] = useState(0);
  const { ref, visible } = useInView();

  const features = [
    {
      icon: <path d="M12 2a7 7 0 017 7c0 2.5-1.3 4.7-3.2 6H8.2C6.3 13.7 5 11.5 5 9a7 7 0 017-7zM9 22h6M10 18v4M14 18v4" />,
      title: "AI Analytics",
      short: "Real-time ML insights",
      desc: "Real-time insights powered by machine learning. Predict trends, detect anomalies, and make data-driven decisions faster than ever before.",
      demo: (
        <div className="space-y-3">
          <div className="flex items-end gap-1 h-32">
            {[35, 52, 48, 65, 58, 78, 72, 88, 82, 95, 90, 98].map((h, i) => (
              <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-cyan-500/40 to-cyan-400/80 transition-all duration-500" style={{ height: `${h}%`, transitionDelay: `${i * 50}ms` }} />
            ))}
          </div>
          <div className="flex justify-between text-xs text-slate-500">
            <span>Jan</span><span>Jun</span><span>Dec</span>
          </div>
          <div className="flex gap-3 mt-2">
            <div className="flex-1 p-2 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <div className="text-[10px] text-slate-500">Accuracy</div>
              <div className="text-sm font-bold text-cyan-400">97.3%</div>
            </div>
            <div className="flex-1 p-2 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <div className="text-[10px] text-slate-500">Predictions</div>
              <div className="text-sm font-bold text-emerald-400">1,284</div>
            </div>
            <div className="flex-1 p-2 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <div className="text-[10px] text-slate-500">Saved</div>
              <div className="text-sm font-bold text-purple-400">$48K</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />,
      title: "Workflow Automation",
      short: "Eliminate repetitive tasks",
      desc: "Eliminate repetitive tasks with intelligent automation. Connect your tools and let AI handle the heavy lifting across your entire organization.",
      demo: (
        <div className="space-y-2">
          {[
            { label: "Data Import", status: "done", time: "0.3s" },
            { label: "Validation", status: "done", time: "1.2s" },
            { label: "ML Processing", status: "done", time: "4.7s" },
            { label: "Report Generation", status: "running", time: "..." },
            { label: "Email Notification", status: "pending", time: "" },
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/30">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                step.status === "done" ? "bg-emerald-500/20 text-emerald-400" :
                step.status === "running" ? "bg-cyan-500/20 text-cyan-400 animate-pulse" :
                "bg-slate-700/50 text-slate-500"
              }`}>
                {step.status === "done" ? "\u2713" : step.status === "running" ? "\u25CF" : (i + 1)}
              </div>
              <span className={`flex-1 text-sm ${step.status === "pending" ? "text-slate-600" : "text-slate-300"}`}>{step.label}</span>
              <span className="text-xs text-slate-500">{step.time}</span>
            </div>
          ))}
          <div className="mt-2 h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div className="h-full w-3/5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 animate-pulse" />
          </div>
        </div>
      ),
    },
    {
      icon: <><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></>,
      title: "Cloud Infrastructure",
      short: "Auto-scaling platform",
      desc: "Enterprise-grade cloud platform with auto-scaling, global CDN, and 99.9% guaranteed uptime for all your applications.",
      demo: (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {["US-East", "EU-West", "AP-South"].map((region) => (
              <div key={region} className="p-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-center">
                <div className="w-2 h-2 rounded-full bg-emerald-400 mx-auto mb-1 animate-pulse" />
                <div className="text-[10px] text-slate-400">{region}</div>
                <div className="text-xs font-bold text-emerald-400">Online</div>
              </div>
            ))}
          </div>
          <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/30">
            <div className="flex justify-between mb-2">
              <span className="text-xs text-slate-500">CPU Usage</span>
              <span className="text-xs text-cyan-400">42%</span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-700 overflow-hidden">
              <div className="h-full w-[42%] rounded-full bg-cyan-500" />
            </div>
            <div className="flex justify-between mt-3 mb-2">
              <span className="text-xs text-slate-500">Memory</span>
              <span className="text-xs text-purple-400">67%</span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-700 overflow-hidden">
              <div className="h-full w-[67%] rounded-full bg-purple-500" />
            </div>
            <div className="flex justify-between mt-3 mb-2">
              <span className="text-xs text-slate-500">Bandwidth</span>
              <span className="text-xs text-emerald-400">28%</span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-700 overflow-hidden">
              <div className="h-full w-[28%] rounded-full bg-emerald-500" />
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
      title: "Security First",
      short: "SOC 2 & E2E encryption",
      desc: "SOC 2 compliant with end-to-end encryption, role-based access control, and continuous security monitoring across all services.",
      demo: (
        <div className="space-y-2">
          {[
            { label: "SSL/TLS Encryption", status: "Active", color: "emerald" },
            { label: "DDoS Protection", status: "Active", color: "emerald" },
            { label: "WAF Rules", status: "247 rules", color: "cyan" },
            { label: "Last Scan", status: "2 min ago", color: "cyan" },
            { label: "Threats Blocked (24h)", status: "1,847", color: "orange" },
            { label: "SOC 2 Compliance", status: "Verified", color: "emerald" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-800/30">
              <span className="text-sm text-slate-400">{item.label}</span>
              <span className={`text-xs font-medium text-${item.color}-400 bg-${item.color}-500/10 px-2 py-0.5 rounded-full`}>{item.status}</span>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <section id="features" className="py-24 px-6" ref={ref}>
      <div className={`max-w-6xl mx-auto transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="text-center mb-16">
          <p className="text-cyan-400 text-sm font-medium mb-2 uppercase tracking-wider">Features</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything You Need to Scale</h2>
          <p className="text-slate-500 max-w-lg mx-auto">A complete platform that grows with your business, from startup to enterprise.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Feature tabs */}
          <div className="space-y-2">
            {features.map((f, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-full text-left p-5 rounded-xl border transition-all duration-300 ${
                  active === i
                    ? "bg-slate-900/80 border-cyan-500/40 shadow-lg shadow-cyan-500/5"
                    : "bg-transparent border-slate-800/50 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center gap-3 mb-1">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                    active === i ? "bg-cyan-500/20 text-cyan-400" : "bg-slate-800 text-slate-500"
                  }`}>
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">{f.icon}</svg>
                  </div>
                  <div>
                    <h3 className={`font-semibold transition-colors ${active === i ? "text-white" : "text-slate-400"}`}>{f.title}</h3>
                    <p className="text-xs text-slate-500">{f.short}</p>
                  </div>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${active === i ? "max-h-20 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                  <p className="text-sm text-slate-500 leading-relaxed pl-12">{f.desc}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Interactive demo panel */}
          <div className="sticky top-24">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 min-h-[380px]">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800/50">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                <span className="ml-2 text-xs text-slate-600">{features[active].title} Dashboard</span>
              </div>
              {features[active].demo}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Solutions ─── */
function Solutions() {
  const { ref, visible } = useInView();
  const [hovered, setHovered] = useState<number | null>(null);

  const items = [
    { title: "E-Commerce", desc: "Optimize inventory, personalize recommendations, and automate customer support with AI-powered tools.", gradient: "from-purple-500/20 to-pink-500/20", stat: "35%", statLabel: "conversion increase", icon: <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" /> },
    { title: "Healthcare", desc: "HIPAA-compliant platform for patient data management, appointment scheduling, and predictive diagnostics.", gradient: "from-green-500/20 to-emerald-500/20", stat: "50%", statLabel: "less admin work", icon: <path d="M22 12h-4l-3 9L9 3l-3 9H2" /> },
    { title: "Finance", desc: "Real-time fraud detection, regulatory compliance automation, and intelligent risk assessment tools.", gradient: "from-orange-500/20 to-amber-500/20", stat: "99.7%", statLabel: "fraud detection", icon: <><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></> },
    { title: "Education", desc: "Adaptive learning platforms, automated grading, and student performance analytics for institutions.", gradient: "from-blue-500/20 to-indigo-500/20", stat: "2x", statLabel: "engagement boost", icon: <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /> },
  ];

  return (
    <section id="solutions" className="py-24 px-6 bg-slate-900/30" ref={ref}>
      <div className={`max-w-6xl mx-auto transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="text-center mb-16">
          <p className="text-cyan-400 text-sm font-medium mb-2 uppercase tracking-wider">Solutions</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Built for Every Industry</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((s, i) => (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`relative p-8 rounded-2xl bg-gradient-to-br ${s.gradient} border border-slate-800 transition-all duration-500 cursor-default ${hovered === i ? "border-slate-600 scale-[1.02] shadow-xl" : "hover:border-slate-700"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800/60 flex items-center justify-center text-cyan-400 shrink-0">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">{s.icon}</svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                  <p className="text-slate-400 mb-4 leading-relaxed text-sm">{s.desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-2 pt-4 border-t border-slate-700/30">
                <div className="text-2xl font-bold text-cyan-400">{s.stat}</div>
                <div className="text-sm text-slate-500">{s.statLabel}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Pricing with monthly/annual toggle ─── */
function Pricing() {
  const [annual, setAnnual] = useState(false);
  const { ref, visible } = useInView();

  const plans = [
    {
      name: "Starter",
      monthly: 29,
      annual: 24,
      desc: "Perfect for small teams getting started",
      features: ["Up to 5 team members", "10GB storage", "Basic analytics", "Email support", "API access"],
      highlight: false,
    },
    {
      name: "Professional",
      monthly: 79,
      annual: 66,
      desc: "Best for growing businesses",
      features: ["Up to 25 team members", "100GB storage", "Advanced AI analytics", "Priority support", "Custom integrations", "SSO authentication"],
      highlight: true,
    },
    {
      name: "Enterprise",
      monthly: 0,
      annual: 0,
      desc: "For large-scale deployments",
      features: ["Unlimited members", "Unlimited storage", "Custom AI models", "24/7 dedicated support", "On-premise option", "SLA guarantee"],
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 px-6" ref={ref}>
      <div className={`max-w-5xl mx-auto transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="text-center mb-12">
          <p className="text-cyan-400 text-sm font-medium mb-2 uppercase tracking-wider">Pricing</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-slate-500 mb-8">No hidden fees. Cancel anytime.</p>
          {/* Toggle */}
          <div className="inline-flex items-center gap-3 p-1 rounded-full bg-slate-900 border border-slate-800">
            <button onClick={() => setAnnual(false)} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${!annual ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/25" : "text-slate-400 hover:text-white"}`}>
              Monthly
            </button>
            <button onClick={() => setAnnual(true)} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${annual ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/25" : "text-slate-400 hover:text-white"}`}>
              Annual <span className="text-xs opacity-80">(-17%)</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const price = plan.monthly === 0 ? "Custom" : `$${annual ? plan.annual : plan.monthly}`;
            return (
              <div
                key={plan.name}
                className={`p-8 rounded-2xl border transition-all duration-300 ${
                  plan.highlight
                    ? "bg-gradient-to-b from-cyan-500/10 to-blue-500/10 border-cyan-500/50 md:scale-105 shadow-xl shadow-cyan-500/5"
                    : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
                }`}
              >
                {plan.highlight && (
                  <div className="text-xs text-cyan-400 font-medium mb-4 uppercase tracking-wider">Most Popular</div>
                )}
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-slate-500 text-sm mb-4">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold transition-all">{price}</span>
                  {price !== "Custom" && <span className="text-slate-500 text-sm">/{annual ? "mo (billed yearly)" : "month"}</span>}
                </div>
                {annual && plan.monthly > 0 && (
                  <div className="mb-4 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg inline-block">
                    Save ${(plan.monthly - plan.annual) * 12}/year
                  </div>
                )}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-400">
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-cyan-400 shrink-0">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-full font-medium text-sm transition-all ${
                    plan.highlight
                      ? "bg-cyan-500 text-white hover:bg-cyan-400 shadow-lg shadow-cyan-500/25"
                      : "border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white"
                  }`}
                >
                  {price === "Custom" ? "Contact Sales" : "Start Free Trial"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonial Carousel ─── */
function Testimonials() {
  const reviews = [
    { name: "Sarah Chen", role: "CTO, FinanceHub", text: "TechWave transformed our data pipeline. We went from spending 3 days on reports to getting real-time insights. The ROI was visible within the first month." },
    { name: "Marcus Johnson", role: "VP Engineering, ShopFlow", text: "The automation tools saved our team 20+ hours per week. Their AI models for demand forecasting have been incredibly accurate." },
    { name: "Emily Rivera", role: "Head of Product, MedCore", text: "HIPAA compliance was non-negotiable for us. TechWave delivered a secure, scalable platform that our medical staff actually enjoys using." },
    { name: "David Kim", role: "Founder, ScaleAI", text: "We evaluated 12 platforms before choosing TechWave. The combination of AI capabilities and ease of use is unmatched in the market." },
    { name: "Lisa Park", role: "COO, DataVault", text: "The migration from our legacy system was seamless. Their team guided us every step of the way, and we were fully operational in under a week." },
  ];

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const { ref, visible } = useInView();

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setCurrent((c) => (c + 1) % reviews.length), 5000);
    return () => clearInterval(timer);
  }, [paused, reviews.length]);

  const goTo = useCallback((idx: number) => {
    setCurrent(idx);
    setPaused(true);
    setTimeout(() => setPaused(false), 10000);
  }, []);

  return (
    <section id="testimonials" className="py-24 px-6 bg-slate-900/30" ref={ref}>
      <div className={`max-w-4xl mx-auto transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="text-center mb-16">
          <p className="text-cyan-400 text-sm font-medium mb-2 uppercase tracking-wider">Testimonials</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Loved by Teams Everywhere</h2>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${current * 100}%)` }}>
            {reviews.map((r, i) => (
              <div key={i} className="w-full shrink-0 px-4">
                <div className="max-w-2xl mx-auto text-center">
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} width="20" height="20" fill="#facc15" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8">&ldquo;{r.text}&rdquo;</p>
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-lg font-bold">
                      {r.name[0]}
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{r.name}</div>
                      <div className="text-sm text-slate-500">{r.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={() => goTo((current - 1 + reviews.length) % reviews.length)}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button
            onClick={() => goTo((current + 1) % reviews.length)}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${current === i ? "bg-cyan-400 w-8" : "bg-slate-700 hover:bg-slate-600"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ Accordion ─── */
function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const { ref, visible } = useInView();

  const questions = [
    { q: "How does the 14-day free trial work?", a: "You get full access to all Professional plan features for 14 days. No credit card required to start. At the end of the trial, you can choose a plan that fits your needs or downgrade to our free tier." },
    { q: "Can I switch plans later?", a: "Absolutely. You can upgrade or downgrade your plan at any time. When upgrading, you'll get immediate access to new features. When downgrading, the change takes effect at the end of your billing cycle." },
    { q: "Is my data secure?", a: "Yes. We use AES-256 encryption at rest and TLS 1.3 in transit. We're SOC 2 Type II certified, and undergo regular third-party security audits. Your data is stored in ISO 27001 certified data centers." },
    { q: "Do you offer custom integrations?", a: "Yes. Our Professional plan includes access to our REST API and webhooks. Enterprise customers get dedicated integration support, including custom connectors for legacy systems and on-premise deployments." },
    { q: "What kind of support do you offer?", a: "Starter plans include email support (24h response). Professional plans get priority support with 4h response time and live chat. Enterprise customers receive 24/7 dedicated support with a named account manager." },
    { q: "Can I cancel my subscription?", a: "Yes, you can cancel anytime from your account settings. There are no cancellation fees or long-term contracts. Your account remains active until the end of your current billing period." },
  ];

  return (
    <section id="faq" className="py-24 px-6" ref={ref}>
      <div className={`max-w-3xl mx-auto transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="text-center mb-16">
          <p className="text-cyan-400 text-sm font-medium mb-2 uppercase tracking-wider">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-3">
          {questions.map((item, i) => (
            <div key={i} className="rounded-xl border border-slate-800 overflow-hidden transition-colors hover:border-slate-700">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-medium text-sm pr-4">{item.q}</span>
                <svg
                  width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                  className={`shrink-0 text-slate-500 transition-transform duration-300 ${openIdx === i ? "rotate-180" : ""}`}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIdx === i ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}>
                <p className="px-5 pb-5 text-sm text-slate-400 leading-relaxed">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Contact with form validation ─── */
function Contact() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const { ref, visible } = useInView();

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Invalid email address";
    if (!message.trim()) errs.message = "Message is required";
    else if (message.trim().length < 10) errs.message = "Message must be at least 10 characters";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <section id="contact" className="py-24 px-6" ref={ref}>
        <div className="max-w-lg mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
            <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-emerald-400">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-3">Message Sent!</h2>
          <p className="text-slate-400 mb-6">Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
          <button onClick={() => { setSubmitted(false); setName(""); setEmail(""); setMessage(""); }} className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
            Send another message
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 px-6" ref={ref}>
      <div className={`max-w-2xl mx-auto transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-slate-400 max-w-md mx-auto">
            Ready to transform your business? Start your free 14-day trial or reach out to learn more.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); if (errors.name) setErrors((p) => { const n = { ...p }; delete n.name; return n; }); }}
                placeholder="John Doe"
                className={`w-full px-4 py-3 rounded-xl bg-slate-900 border text-white placeholder-slate-600 focus:outline-none transition-colors ${
                  errors.name ? "border-red-500 focus:border-red-400" : "border-slate-800 focus:border-cyan-500"
                }`}
              />
              {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((p) => { const n = { ...p }; delete n.email; return n; }); }}
                placeholder="john@company.com"
                className={`w-full px-4 py-3 rounded-xl bg-slate-900 border text-white placeholder-slate-600 focus:outline-none transition-colors ${
                  errors.email ? "border-red-500 focus:border-red-400" : "border-slate-800 focus:border-cyan-500"
                }`}
              />
              {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
            </div>
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Message</label>
            <textarea
              value={message}
              onChange={(e) => { setMessage(e.target.value); if (errors.message) setErrors((p) => { const n = { ...p }; delete n.message; return n; }); }}
              placeholder="Tell us about your project..."
              rows={4}
              className={`w-full px-4 py-3 rounded-xl bg-slate-900 border text-white placeholder-slate-600 focus:outline-none transition-colors resize-none ${
                errors.message ? "border-red-500 focus:border-red-400" : "border-slate-800 focus:border-cyan-500"
              }`}
            />
            {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
            <p className="text-xs text-slate-600 mt-1 text-right">{message.length} characters</p>
          </div>
          <button type="submit" className="w-full py-3.5 rounded-xl bg-cyan-500 text-white font-medium hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40">
            Send Message
          </button>
          <p className="text-xs text-slate-600 text-center">Or email us directly at hello@techwave.dev</p>
        </form>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-slate-800/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
              TechWave
            </div>
            <p className="text-sm text-slate-500">AI-powered solutions for modern business.</p>
          </div>
          {[
            { title: "Product", links: ["Features", "Pricing", "Integrations", "Changelog"] },
            { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
            { title: "Legal", links: ["Privacy", "Terms", "Security", "GDPR"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-slate-500 hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-slate-800/50 pt-8 text-center text-sm text-slate-600">
          &copy; {new Date().getFullYear()} TechWave Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ─── */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Solutions />
        <Pricing />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
