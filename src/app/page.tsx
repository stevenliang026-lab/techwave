"use client";

import { useState } from "react";

/* ─── Navbar ─── */
function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#features", label: "Features" },
    { href: "#solutions", label: "Solutions" },
    { href: "#pricing", label: "Pricing" },
    { href: "#testimonials", label: "Testimonials" },
  ];
  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50">
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
      {open && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur px-6 pb-4">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-3 text-slate-400 hover:text-white">
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 px-6 overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-4xl text-center">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-sm animate-fade-in-up">
          Trusted by 200+ Companies Worldwide
        </div>
        <h1 className="text-5xl sm:text-7xl font-bold leading-tight mb-6 animate-fade-in-up delay-100">
          AI-Powered Solutions for{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Modern Business
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-200">
          Automate workflows, unlock insights from your data, and scale your operations with our enterprise-grade AI platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
          <a href="#contact" className="px-8 py-3.5 bg-cyan-500 text-white rounded-full font-medium hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/25">
            Start Free Trial
          </a>
          <a href="#features" className="px-8 py-3.5 border border-slate-700 text-slate-300 rounded-full font-medium hover:border-slate-500 hover:text-white transition-colors">
            See How It Works
          </a>
        </div>
        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto animate-fade-in-up delay-400">
          {[
            { n: "99.9%", l: "Uptime" },
            { n: "10x", l: "Faster" },
            { n: "200+", l: "Clients" },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-2xl font-bold text-white">{s.n}</div>
              <div className="text-sm text-slate-500">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Features ─── */
function Features() {
  const items = [
    {
      icon: (
        <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path d="M12 2a7 7 0 017 7c0 2.5-1.3 4.7-3.2 6H8.2C6.3 13.7 5 11.5 5 9a7 7 0 017-7zM9 22h6M10 18v4M14 18v4" />
        </svg>
      ),
      title: "AI Analytics",
      desc: "Real-time insights powered by machine learning. Predict trends, detect anomalies, and make data-driven decisions faster.",
    },
    {
      icon: (
        <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
      title: "Workflow Automation",
      desc: "Eliminate repetitive tasks with intelligent automation. Connect your tools and let AI handle the heavy lifting.",
    },
    {
      icon: (
        <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      ),
      title: "Cloud Infrastructure",
      desc: "Enterprise-grade cloud platform with auto-scaling, global CDN, and 99.9% guaranteed uptime for your applications.",
    },
    {
      icon: (
        <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      title: "Security First",
      desc: "SOC 2 compliant with end-to-end encryption, role-based access control, and continuous security monitoring.",
    },
    {
      icon: (
        <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z" />
        </svg>
      ),
      title: "Global Scale",
      desc: "Deploy to 30+ regions worldwide with one click. Serve your customers from the nearest edge location.",
    },
    {
      icon: (
        <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
      ),
      title: "Team Collaboration",
      desc: "Built-in tools for team communication, project tracking, and knowledge sharing across your organization.",
    },
  ];

  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-cyan-400 text-sm font-medium mb-2 uppercase tracking-wider">Features</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything You Need to Scale</h2>
          <p className="text-slate-500 max-w-lg mx-auto">A complete platform that grows with your business, from startup to enterprise.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div key={i} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4 group-hover:bg-cyan-500/20 transition-colors">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Solutions ─── */
function Solutions() {
  return (
    <section id="solutions" className="py-24 px-6 bg-slate-900/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-cyan-400 text-sm font-medium mb-2 uppercase tracking-wider">Solutions</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Built for Every Industry</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "E-Commerce",
              desc: "Optimize inventory, personalize recommendations, and automate customer support with AI-powered tools.",
              gradient: "from-purple-500/20 to-pink-500/20",
              stat: "35% increase in conversion rates",
            },
            {
              title: "Healthcare",
              desc: "HIPAA-compliant platform for patient data management, appointment scheduling, and predictive diagnostics.",
              gradient: "from-green-500/20 to-emerald-500/20",
              stat: "50% reduction in admin workload",
            },
            {
              title: "Finance",
              desc: "Real-time fraud detection, regulatory compliance automation, and intelligent risk assessment tools.",
              gradient: "from-orange-500/20 to-amber-500/20",
              stat: "99.7% fraud detection accuracy",
            },
            {
              title: "Education",
              desc: "Adaptive learning platforms, automated grading, and student performance analytics for institutions.",
              gradient: "from-blue-500/20 to-indigo-500/20",
              stat: "2x student engagement improvement",
            },
          ].map((s, i) => (
            <div key={i} className={`p-8 rounded-2xl bg-gradient-to-br ${s.gradient} border border-slate-800 hover:border-slate-700 transition-all`}>
              <h3 className="text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-slate-400 mb-4 leading-relaxed">{s.desc}</p>
              <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <path d="M22 4L12 14.01l-3-3" />
                </svg>
                {s.stat}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Pricing ─── */
function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$29",
      desc: "Perfect for small teams getting started",
      features: ["Up to 5 team members", "10GB storage", "Basic analytics", "Email support", "API access"],
      highlight: false,
    },
    {
      name: "Professional",
      price: "$79",
      desc: "Best for growing businesses",
      features: ["Up to 25 team members", "100GB storage", "Advanced AI analytics", "Priority support", "Custom integrations", "SSO authentication"],
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      desc: "For large-scale deployments",
      features: ["Unlimited members", "Unlimited storage", "Custom AI models", "24/7 dedicated support", "On-premise option", "SLA guarantee"],
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-cyan-400 text-sm font-medium mb-2 uppercase tracking-wider">Pricing</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-slate-500">No hidden fees. Cancel anytime.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`p-8 rounded-2xl border transition-all ${
                plan.highlight
                  ? "bg-gradient-to-b from-cyan-500/10 to-blue-500/10 border-cyan-500/50 scale-105"
                  : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
              }`}
            >
              {plan.highlight && (
                <div className="text-xs text-cyan-400 font-medium mb-4 uppercase tracking-wider">Most Popular</div>
              )}
              <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
              <p className="text-slate-500 text-sm mb-4">{plan.desc}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price !== "Custom" && <span className="text-slate-500 text-sm">/month</span>}
              </div>
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
              <a
                href="#contact"
                className={`block text-center py-3 rounded-full font-medium text-sm transition-colors ${
                  plan.highlight
                    ? "bg-cyan-500 text-white hover:bg-cyan-400"
                    : "border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white"
                }`}
              >
                {plan.price === "Custom" ? "Contact Sales" : "Start Free Trial"}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ─── */
function Testimonials() {
  const reviews = [
    {
      name: "Sarah Chen",
      role: "CTO, FinanceHub",
      text: "TechWave transformed our data pipeline. We went from spending 3 days on reports to getting real-time insights. The ROI was visible within the first month.",
    },
    {
      name: "Marcus Johnson",
      role: "VP Engineering, ShopFlow",
      text: "The automation tools saved our team 20+ hours per week. Their AI models for demand forecasting have been incredibly accurate.",
    },
    {
      name: "Emily Rivera",
      role: "Head of Product, MedCore",
      text: "HIPAA compliance was non-negotiable for us. TechWave delivered a secure, scalable platform that our medical staff actually enjoys using.",
    },
  ];

  return (
    <section id="testimonials" className="py-24 px-6 bg-slate-900/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-cyan-400 text-sm font-medium mb-2 uppercase tracking-wider">Testimonials</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Loved by Teams Everywhere</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div key={i} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} width="16" height="16" fill="#facc15" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-sm font-bold">
                  {r.name[0]}
                </div>
                <div>
                  <div className="text-sm font-medium">{r.name}</div>
                  <div className="text-xs text-slate-500">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Contact / CTA ─── */
function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-slate-400 mb-10 max-w-lg mx-auto">
          Join 200+ companies already using TechWave. Start your free 14-day trial today.
        </p>
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your work email"
            className="flex-1 px-5 py-3 rounded-full bg-slate-900 border border-slate-800 text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
          />
          <button type="submit" className="px-8 py-3 rounded-full bg-cyan-500 text-white font-medium hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/25">
            Start Free
          </button>
        </form>
        <p className="text-xs text-slate-600 mt-4">No credit card required. 14-day free trial.</p>
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
        <Contact />
      </main>
      <Footer />
    </>
  );
}
