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
      const eased = 1 - Math.pow(1 - progress, 3);
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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-[#fafaf8]/95 backdrop-blur-sm shadow-[0_1px_0_0_rgba(0,0,0,0.06)]" : "bg-transparent"}`}>
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#" className="text-lg font-semibold tracking-tight text-[#111]">
          TechWave
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-[13px] text-[#666] hover:text-[#111] transition-colors">
              {l.label}
            </a>
          ))}
          <a href="#contact" className="text-[13px] px-4 py-1.5 border border-[#111] text-[#111] hover:bg-[#111] hover:text-white transition-colors">
            Get Started
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-[#666]" aria-label="Menu">
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? <path d="M6 6l10 10M6 16L16 6" /> : <path d="M4 6h14M4 11h14M4 16h14" />}
          </svg>
        </button>
      </div>
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="bg-[#fafaf8] border-t border-[#e8e8e6] px-6 pb-4">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-3 text-[#666] hover:text-[#111] transition-colors text-sm">
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="block mt-2 text-center py-2 border border-[#111] text-[#111] text-sm hover:bg-[#111] hover:text-white transition-colors">
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ─── Hero ─── */
function Hero() {
  const { ref, visible } = useInView(0.1);

  return (
    <section ref={ref} className="relative min-h-[90vh] flex items-center justify-center pt-14 px-6">
      {/* Subtle dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-40" />

      <div className={`relative max-w-3xl text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <p className="text-[13px] text-[#666] mb-6 tracking-wide uppercase">
          Trusted by 200+ companies worldwide
        </p>
        <h1 className="text-4xl sm:text-6xl font-semibold leading-[1.1] mb-6 tracking-tight">
          AI-powered solutions for{" "}
          <span className="text-[#4f46e5]">modern business</span>
        </h1>
        <p className="text-base sm:text-lg text-[#666] max-w-xl mx-auto mb-10 leading-relaxed">
          Automate workflows, unlock insights from your data, and scale your operations with our enterprise-grade platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="#contact" className="px-6 py-2.5 bg-[#4f46e5] text-white text-sm font-medium hover:bg-[#4338ca] transition-colors">
            Start Free Trial
          </a>
          <a href="#features" className="px-6 py-2.5 border border-[#d4d4d4] text-[#444] text-sm font-medium hover:border-[#999] hover:text-[#111] transition-colors">
            See How It Works
          </a>
        </div>
        {/* Stats row */}
        <div className="mt-20 flex justify-center gap-16 max-w-md mx-auto">
          <div>
            <div className="text-2xl font-semibold text-[#111]"><AnimatedNumber value={99} suffix=".9%" /></div>
            <div className="text-xs text-[#999] mt-1">Uptime</div>
          </div>
          <div className="w-px bg-[#e8e8e6]" />
          <div>
            <div className="text-2xl font-semibold text-[#111]"><AnimatedNumber value={10} suffix="x" /></div>
            <div className="text-xs text-[#999] mt-1">Faster</div>
          </div>
          <div className="w-px bg-[#e8e8e6]" />
          <div>
            <div className="text-2xl font-semibold text-[#111]"><AnimatedNumber value={200} suffix="+" /></div>
            <div className="text-xs text-[#999] mt-1">Clients</div>
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
              <div key={i} className="flex-1 bg-[#4f46e5]/15 transition-all duration-500" style={{ height: `${h}%`, transitionDelay: `${i * 50}ms` }} />
            ))}
          </div>
          <div className="flex justify-between text-[11px] text-[#999]">
            <span>Jan</span><span>Jun</span><span>Dec</span>
          </div>
          <div className="flex gap-2 mt-2">
            <div className="flex-1 p-2 border border-[#e8e8e6]">
              <div className="text-[10px] text-[#999]">Accuracy</div>
              <div className="text-sm font-semibold text-[#4f46e5]">97.3%</div>
            </div>
            <div className="flex-1 p-2 border border-[#e8e8e6]">
              <div className="text-[10px] text-[#999]">Predictions</div>
              <div className="text-sm font-semibold text-[#111]">1,284</div>
            </div>
            <div className="flex-1 p-2 border border-[#e8e8e6]">
              <div className="text-[10px] text-[#999]">Saved</div>
              <div className="text-sm font-semibold text-[#111]">$48K</div>
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
        <div className="space-y-1.5">
          {[
            { label: "Data Import", status: "done", time: "0.3s" },
            { label: "Validation", status: "done", time: "1.2s" },
            { label: "ML Processing", status: "done", time: "4.7s" },
            { label: "Report Generation", status: "running", time: "..." },
            { label: "Email Notification", status: "pending", time: "" },
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-3 p-2 border-b border-[#f0f0ee] last:border-0">
              <div className={`w-5 h-5 flex items-center justify-center text-[10px] border ${
                step.status === "done" ? "border-[#16a34a] text-[#16a34a] bg-[#16a34a]/5" :
                step.status === "running" ? "border-[#4f46e5] text-[#4f46e5] bg-[#4f46e5]/5" :
                "border-[#d4d4d4] text-[#999]"
              }`}>
                {step.status === "done" ? "\u2713" : step.status === "running" ? "\u25CF" : (i + 1)}
              </div>
              <span className={`flex-1 text-sm ${step.status === "pending" ? "text-[#bbb]" : "text-[#444]"}`}>{step.label}</span>
              <span className="text-xs text-[#999] tabular-nums">{step.time}</span>
            </div>
          ))}
          <div className="mt-3 h-1 bg-[#f0f0ee] overflow-hidden">
            <div className="h-full w-3/5 bg-[#4f46e5]" />
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
              <div key={region} className="p-2 border border-[#e8e8e6] text-center">
                <div className="w-1.5 h-1.5 bg-[#16a34a] mx-auto mb-1" />
                <div className="text-[10px] text-[#999]">{region}</div>
                <div className="text-xs font-medium text-[#16a34a]">Online</div>
              </div>
            ))}
          </div>
          <div className="p-3 border border-[#e8e8e6]">
            <div className="flex justify-between mb-1.5">
              <span className="text-xs text-[#999]">CPU Usage</span>
              <span className="text-xs text-[#444] tabular-nums">42%</span>
            </div>
            <div className="h-1 bg-[#f0f0ee] overflow-hidden">
              <div className="h-full w-[42%] bg-[#4f46e5]" />
            </div>
            <div className="flex justify-between mt-3 mb-1.5">
              <span className="text-xs text-[#999]">Memory</span>
              <span className="text-xs text-[#444] tabular-nums">67%</span>
            </div>
            <div className="h-1 bg-[#f0f0ee] overflow-hidden">
              <div className="h-full w-[67%] bg-[#666]" />
            </div>
            <div className="flex justify-between mt-3 mb-1.5">
              <span className="text-xs text-[#999]">Bandwidth</span>
              <span className="text-xs text-[#444] tabular-nums">28%</span>
            </div>
            <div className="h-1 bg-[#f0f0ee] overflow-hidden">
              <div className="h-full w-[28%] bg-[#16a34a]" />
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
        <div className="space-y-0">
          {[
            { label: "SSL/TLS Encryption", status: "Active" },
            { label: "DDoS Protection", status: "Active" },
            { label: "WAF Rules", status: "247 rules" },
            { label: "Last Scan", status: "2 min ago" },
            { label: "Threats Blocked (24h)", status: "1,847" },
            { label: "SOC 2 Compliance", status: "Verified" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-[#f0f0ee] last:border-0">
              <span className="text-sm text-[#666]">{item.label}</span>
              <span className="text-xs font-medium text-[#444]">{item.status}</span>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <section id="features" className="py-24 px-6" ref={ref}>
      <div className={`max-w-5xl mx-auto transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <div className="mb-16">
          <p className="text-xs text-[#4f46e5] font-medium mb-3 uppercase tracking-widest">Features</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">Everything you need to scale</h2>
          <p className="text-[#666] max-w-md text-[15px]">A complete platform that grows with your business, from startup to enterprise.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Feature tabs */}
          <div className="space-y-1">
            {features.map((f, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-full text-left px-4 py-4 border-l-2 transition-all duration-200 ${
                  active === i
                    ? "border-l-[#4f46e5] bg-[#4f46e5]/[0.03]"
                    : "border-l-transparent hover:border-l-[#d4d4d4] hover:bg-[#f5f5f3]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 flex items-center justify-center transition-colors ${
                    active === i ? "text-[#4f46e5]" : "text-[#999]"
                  }`}>
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">{f.icon}</svg>
                  </div>
                  <div>
                    <h3 className={`text-sm font-medium transition-colors ${active === i ? "text-[#111]" : "text-[#666]"}`}>{f.title}</h3>
                    <p className="text-xs text-[#999]">{f.short}</p>
                  </div>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${active === i ? "max-h-20 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                  <p className="text-[13px] text-[#666] leading-relaxed pl-11">{f.desc}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Interactive demo panel */}
          <div className="sticky top-20">
            <div className="p-6 border border-[#e8e8e6] bg-white min-h-[380px]">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#f0f0ee]">
                <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
                <div className="w-2 h-2 rounded-full bg-[#28c840]" />
                <span className="ml-2 text-[11px] text-[#bbb]">{features[active].title} Dashboard</span>
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
    { title: "E-Commerce", desc: "Optimize inventory, personalize recommendations, and automate customer support with AI-powered tools.", stat: "35%", statLabel: "conversion increase", icon: <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" /> },
    { title: "Healthcare", desc: "HIPAA-compliant platform for patient data management, appointment scheduling, and predictive diagnostics.", stat: "50%", statLabel: "less admin work", icon: <path d="M22 12h-4l-3 9L9 3l-3 9H2" /> },
    { title: "Finance", desc: "Real-time fraud detection, regulatory compliance automation, and intelligent risk assessment tools.", stat: "99.7%", statLabel: "fraud detection", icon: <><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></> },
    { title: "Education", desc: "Adaptive learning platforms, automated grading, and student performance analytics for institutions.", stat: "2x", statLabel: "engagement boost", icon: <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /> },
  ];

  return (
    <section id="solutions" className="py-24 px-6 border-t border-[#e8e8e6]" ref={ref}>
      <div className={`max-w-5xl mx-auto transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <div className="mb-16">
          <p className="text-xs text-[#4f46e5] font-medium mb-3 uppercase tracking-widest">Solutions</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Built for every industry</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#e8e8e6]">
          {items.map((s, i) => (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`p-8 bg-[#fafaf8] transition-all duration-300 cursor-default ${hovered === i ? "bg-white" : ""}`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-9 h-9 flex items-center justify-center border transition-colors ${
                  hovered === i ? "border-[#4f46e5] text-[#4f46e5]" : "border-[#d4d4d4] text-[#999]"
                }`}>
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">{s.icon}</svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 tracking-tight">{s.title}</h3>
                  <p className="text-[#666] text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-[#f0f0ee]">
                <div className="text-xl font-semibold text-[#4f46e5]">{s.stat}</div>
                <div className="text-xs text-[#999]">{s.statLabel}</div>
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
      <div className={`max-w-5xl mx-auto transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <div className="text-center mb-12">
          <p className="text-xs text-[#4f46e5] font-medium mb-3 uppercase tracking-widest">Pricing</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">Simple, transparent pricing</h2>
          <p className="text-[#999] text-sm mb-8">No hidden fees. Cancel anytime.</p>
          {/* Toggle */}
          <div className="inline-flex items-center border border-[#e8e8e6]">
            <button onClick={() => setAnnual(false)} className={`px-5 py-2 text-sm transition-all ${!annual ? "bg-[#111] text-white" : "text-[#666] hover:text-[#111]"}`}>
              Monthly
            </button>
            <button onClick={() => setAnnual(true)} className={`px-5 py-2 text-sm transition-all ${annual ? "bg-[#111] text-white" : "text-[#666] hover:text-[#111]"}`}>
              Annual <span className="text-[11px] opacity-70">(-17%)</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#e8e8e6] border border-[#e8e8e6]">
          {plans.map((plan) => {
            const price = plan.monthly === 0 ? "Custom" : `$${annual ? plan.annual : plan.monthly}`;
            return (
              <div
                key={plan.name}
                className={`p-8 transition-all duration-300 ${
                  plan.highlight
                    ? "bg-white"
                    : "bg-[#fafaf8] hover:bg-white"
                }`}
              >
                {plan.highlight && (
                  <div className="text-[11px] text-[#4f46e5] font-medium mb-4 uppercase tracking-widest">Most Popular</div>
                )}
                <h3 className="text-lg font-semibold mb-1 tracking-tight">{plan.name}</h3>
                <p className="text-[#999] text-sm mb-5">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-3xl font-semibold tracking-tight">{price}</span>
                  {price !== "Custom" && <span className="text-[#999] text-sm ml-1">/{annual ? "mo" : "month"}</span>}
                </div>
                {annual && plan.monthly > 0 && (
                  <div className="mb-5 text-xs text-[#16a34a] font-medium">
                    Save ${(plan.monthly - plan.annual) * 12}/year
                  </div>
                )}
                <ul className="space-y-2.5 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-[#666]">
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-[#4f46e5] shrink-0">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-2.5 text-sm font-medium transition-all ${
                    plan.highlight
                      ? "bg-[#4f46e5] text-white hover:bg-[#4338ca]"
                      : "border border-[#d4d4d4] text-[#444] hover:border-[#111] hover:text-[#111]"
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
    <section id="testimonials" className="py-24 px-6 border-t border-[#e8e8e6]" ref={ref}>
      <div className={`max-w-3xl mx-auto transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <div className="text-center mb-16">
          <p className="text-xs text-[#4f46e5] font-medium mb-3 uppercase tracking-widest">Testimonials</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Loved by teams everywhere</h2>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${current * 100}%)` }}>
            {reviews.map((r, i) => (
              <div key={i} className="w-full shrink-0 px-4">
                <div className="max-w-xl mx-auto text-center">
                  <p className="text-lg sm:text-xl text-[#444] leading-relaxed mb-8 italic">&ldquo;{r.text}&rdquo;</p>
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-10 h-10 bg-[#4f46e5] text-white flex items-center justify-center text-sm font-semibold">
                      {r.name[0]}
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium text-[#111]">{r.name}</div>
                      <div className="text-xs text-[#999]">{r.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={() => goTo((current - 1 + reviews.length) % reviews.length)}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 border border-[#e8e8e6] bg-white flex items-center justify-center text-[#999] hover:text-[#111] hover:border-[#999] transition-colors"
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button
            onClick={() => goTo((current + 1) % reviews.length)}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 border border-[#e8e8e6] bg-white flex items-center justify-center text-[#999] hover:text-[#111] hover:border-[#999] transition-colors"
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>

        {/* Progress indicators */}
        <div className="flex justify-center gap-1.5 mt-10">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-0.5 transition-all duration-300 ${current === i ? "bg-[#4f46e5] w-8" : "bg-[#d4d4d4] w-4 hover:bg-[#999]"}`}
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
      <div className={`max-w-2xl mx-auto transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <div className="mb-16">
          <p className="text-xs text-[#4f46e5] font-medium mb-3 uppercase tracking-widest">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Frequently asked questions</h2>
        </div>
        <div className="divide-y divide-[#e8e8e6]">
          {questions.map((item, i) => (
            <div key={i}>
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left group"
              >
                <span className="text-sm font-medium pr-4 group-hover:text-[#4f46e5] transition-colors">{item.q}</span>
                <svg
                  width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"
                  className={`shrink-0 text-[#bbb] transition-transform duration-300 ${openIdx === i ? "rotate-45" : ""}`}
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIdx === i ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}>
                <p className="pb-5 text-sm text-[#666] leading-relaxed">{item.a}</p>
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
      <section id="contact" className="py-24 px-6 border-t border-[#e8e8e6]" ref={ref}>
        <div className="max-w-md mx-auto text-center">
          <div className="w-12 h-12 border border-[#16a34a] text-[#16a34a] flex items-center justify-center mx-auto mb-6">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-3">Message Sent</h2>
          <p className="text-[#666] text-sm mb-6">Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
          <button onClick={() => { setSubmitted(false); setName(""); setEmail(""); setMessage(""); }} className="text-sm text-[#4f46e5] hover:underline">
            Send another message
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 px-6 border-t border-[#e8e8e6]" ref={ref}>
      <div className={`max-w-lg mx-auto transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <div className="mb-10">
          <p className="text-xs text-[#4f46e5] font-medium mb-3 uppercase tracking-widest">Contact</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">Get in touch</h2>
          <p className="text-[#666] text-sm">
            Ready to transform your business? Start your free 14-day trial or reach out to learn more.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#999] mb-1.5 uppercase tracking-wider">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); if (errors.name) setErrors((p) => { const n = { ...p }; delete n.name; return n; }); }}
                placeholder="John Doe"
                className={`w-full px-3 py-2.5 bg-white border text-[#111] placeholder-[#ccc] text-sm focus:outline-none transition-colors ${
                  errors.name ? "border-[#dc2626]" : "border-[#d4d4d4] focus:border-[#4f46e5]"
                }`}
              />
              {errors.name && <p className="text-xs text-[#dc2626] mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-xs text-[#999] mb-1.5 uppercase tracking-wider">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((p) => { const n = { ...p }; delete n.email; return n; }); }}
                placeholder="john@company.com"
                className={`w-full px-3 py-2.5 bg-white border text-[#111] placeholder-[#ccc] text-sm focus:outline-none transition-colors ${
                  errors.email ? "border-[#dc2626]" : "border-[#d4d4d4] focus:border-[#4f46e5]"
                }`}
              />
              {errors.email && <p className="text-xs text-[#dc2626] mt-1">{errors.email}</p>}
            </div>
          </div>
          <div>
            <label className="block text-xs text-[#999] mb-1.5 uppercase tracking-wider">Message</label>
            <textarea
              value={message}
              onChange={(e) => { setMessage(e.target.value); if (errors.message) setErrors((p) => { const n = { ...p }; delete n.message; return n; }); }}
              placeholder="Tell us about your project..."
              rows={4}
              className={`w-full px-3 py-2.5 bg-white border text-[#111] placeholder-[#ccc] text-sm focus:outline-none transition-colors resize-none ${
                errors.message ? "border-[#dc2626]" : "border-[#d4d4d4] focus:border-[#4f46e5]"
              }`}
            />
            {errors.message && <p className="text-xs text-[#dc2626] mt-1">{errors.message}</p>}
            <p className="text-[11px] text-[#ccc] mt-1 text-right tabular-nums">{message.length} characters</p>
          </div>
          <button type="submit" className="w-full py-2.5 bg-[#4f46e5] text-white text-sm font-medium hover:bg-[#4338ca] transition-colors">
            Send Message
          </button>
          <p className="text-[11px] text-[#bbb] text-center">Or email us directly at hello@techwave.dev</p>
        </form>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-[#e8e8e6]">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="text-base font-semibold text-[#111] mb-3 tracking-tight">TechWave</div>
            <p className="text-sm text-[#999]">AI-powered solutions for modern business.</p>
          </div>
          {[
            { title: "Product", links: ["Features", "Pricing", "Integrations", "Changelog"] },
            { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
            { title: "Legal", links: ["Privacy", "Terms", "Security", "GDPR"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-medium mb-3 uppercase tracking-wider text-[#111]">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-[#999] hover:text-[#111] transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-[#e8e8e6] pt-8 text-center text-xs text-[#bbb]">
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
