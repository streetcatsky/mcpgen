"use client";

import { useState } from "react";

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const features = [
    {
      icon: "â¡",
      title: "60-Second Generation",
      desc: "Paste your OpenAPI spec or describe your API in plain English. Get a complete MCP server in under a minute.",
    },
    {
      icon: "ð§",
      title: "Production-Ready Code",
      desc: "Generated servers include error handling, type safety, authentication support, and follow MCP best practices.",
    },
    {
      icon: "ð",
      title: "Python & TypeScript",
      desc: "Choose your preferred language. Python (FastMCP) or TypeScript (MCP SDK) â both fully supported.",
    },
    {
      icon: "ð",
      title: "OpenAPI / Swagger Import",
      desc: "Upload your OpenAPI 3.0 spec and we'll auto-extract all endpoints, parameters, and schemas.",
    },
    {
      icon: "ð§ª",
      title: "Built-in Test Playground",
      desc: "Test your generated MCP server directly in the browser before downloading or deploying.",
    },
    {
      icon: "ð",
      title: "One-Click Deploy Ready",
      desc: "Generated code includes Dockerfile, README, and deployment configs for Vercel, Railway, or Docker.",
    },
  ];

  const faqs = [
    {
      q: "What is MCP (Model Context Protocol)?",
      a: "MCP is an open protocol that lets AI assistants (like Claude, Cursor, Devin) connect to external tools and data sources. Think of it as a USB-C port for AI â one standard interface for all your tools.",
    },
    {
      q: "Why would I need an MCP server?",
      a: "If you have an API or service, creating an MCP server makes it instantly accessible to AI agents. Your users can interact with your service through Claude, Cursor, or any MCP-compatible AI tool.",
    },
    {
      q: "Do I need to write any code?",
      a: "No! Just paste your API documentation or describe what your API does in plain English. MCPGen handles all the code generation. You can then customize the output if needed.",
    },
    {
      q: "What languages are supported for generated servers?",
      a: "We currently generate Python (using FastMCP framework) and TypeScript (using the official MCP SDK). Both produce production-ready, well-documented code.",
    },
    {
      q: "Is the generated code open source?",
      a: "Yes! The code you generate is yours to use, modify, and deploy however you want. There are no licensing restrictions on generated output.",
    },
    {
      q: "How does pricing work?",
      a: "Free tier: 3 generations per month. Pro ($29/mo): unlimited generations + custom templates. Team ($99/mo): API access + priority support + private deployments.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-sm font-bold">M</div>
            <span className="text-lg font-semibold tracking-tight">MCPGen</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
          <button
            onClick={onStart}
            className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-sm font-medium transition-colors"
          >
            Start Generating â
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            MCP ecosystem is exploding â Datadog, Cursor, Devin all onboard
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            Any REST API â{" "}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              MCP Server
            </span>
            <br />in 60 Seconds
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Paste your OpenAPI spec or describe your API in plain English.
            MCPGen generates production-ready MCP server code â Python or TypeScript â instantly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStart}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-violet-500/25"
            >
              Generate Your MCP Server â Free
            </button>
            <a
              href="#features"
              className="px-8 py-4 rounded-xl border border-white/10 hover:border-white/20 text-gray-300 hover:text-white transition-all"
            >
              See How It Works
            </a>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            No account required Â· 3 free generations/month Â· No credit card
          </p>
        </div>
      </section>

      {/* Demo Preview */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl bg-[#111] border border-white/5 overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#0d0d0d]">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="ml-4 text-xs text-gray-500 font-mono">mcpgen.dev â Generator</span>
            </div>
            <div className="p-6 font-mono text-sm">
              <div className="text-gray-500 mb-1"># Input: Your API Description</div>
              <div className="text-violet-400 mb-4">
                &quot;I have a REST API for managing todos at api.example.com.
                <br />
                It has GET /todos, POST /todos, PUT /todos/:id, DELETE /todos/:id.
                <br />
                Auth via Bearer token in header.&quot;
              </div>
              <div className="text-gray-500 mb-1"># Output: Complete MCP Server (Python)</div>
              <div className="text-green-400">
                <div>from fastmcp import FastMCP</div>
                <div>import httpx</div>
                <div className="mt-2">mcp = FastMCP(&quot;todo-api&quot;)</div>
                <div className="mt-2">@mcp.tool()</div>
                <div>async def list_todos(token: str) -&gt; list[dict]:</div>
                <div className="text-gray-500 pl-4">&quot;&quot;&quot;åå¾ææå¾è¾¦äºé &quot;&quot;&quot;</div>
                <div className="pl-4">async with httpx.AsyncClient() as client:</div>
                <div className="pl-8">resp = await client.get(</div>
                <div className="pl-12">&quot;https://api.example.com/todos&quot;,</div>
                <div className="pl-12">headers={`{"Authorization": f"Bearer {token}"}`}</div>
                <div className="pl-8">)</div>
                <div className="pl-8">return resp.json()</div>
                <div className="text-gray-500 mt-2">...</div>
                <div className="text-gray-500"># + 3 more tools, README, Dockerfile, tests</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Everything You Need to Ship
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-xl mx-auto">
            From API spec to deployable MCP server in one step. No boilerplate, no guesswork.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                   key={i}
                className="p-6 rounded-xl bg-[#111] border border-white/5 hover:border-violet-500/30 transition-all group"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-violet-400 transition-colors">
                  {f.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-[#080808]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-400 text-center mb-16">
            Start free. Upgrade when you need more.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Free",
                price: "$0",
                period: "forever",
                features: [
                  "3 generations / month",
                  "Python & TypeScript",
                  "OpenAPI import",
                  "Download generated code",
                  "Community support",
                ],
                cta: "Get Started Free",
                highlight: false,
              },
              {
                name: "Pro",
                price: "$29",
                period: "/month",
                features: [
                  "Unlimited generations",
                  "Custom templates",
                  "Built-in test playground",
                  "Deploy configs included",
                  "Priority email support",
                  "Early access to new features",
                ],
                cta: "Start Pro Trial",
                highlight: true,
              },
              {
                name: "Team",
                price: "$99",
                period: "/month",
                features: [
                  "Everything in Pro",
                  "API access (CI/CD integration)",
                  "Private deployment configs",
                  "Team collaboration",
                  "Dedicated support",
                  "Custom output formats",
                ],
                cta: "Contact Us",
                highlight: false,
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`p-8 rounded-xl border ${
                  plan.highlight
                    ? "bg-gradient-to-b from-violet-500/10 to-transparent border-violet-500/30 ring-1 ring-violet-500/20"
                    : "bg-[#111] border-white/5"
                }`}
              >
                {plan.highlight && (
                  <div className="text-xs font-medium text-violet-400 mb-4 uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-400 text-sm">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-300">
                      <svg className="w-4 h-4 text-violet-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={onStart}
                  className={`w-full py-3 rounded-lg text-sm font-medium transition-colors ${
                    plan.highlight
                      ? "bg-violet-600 hover:bg-violet-500 text-white"
                      : "bg-white/5 hover:bg-white/10 text-gray-300"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/5 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-medium text-sm">{faq.q}</span>
                  <svg
                    className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-sm text-gray-400 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Make Your API AI-Agent Ready
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Join the MCP ecosystem. Let AI assistants connect to your service today.
          </p>
          <button
            onClick={onStart}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-lg font-semibold transition-all transform hover:scale-105"
          >
            Generate Your First MCP Server â
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-xs font-bold">M</div>
            <span className="text-sm text-gray-400">MCPGen by NanaLab</span>
          </div>
          <p className="text-xs text-gray-500">
            Â© 2026 NanaLab. Built with passion for the AI agent ecosystem.
          </p>
        </div>
      </footer>
    </div>
  );
}
