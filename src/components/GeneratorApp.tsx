"use client";

import { useState } from "react";

interface GeneratorAppProps {
  onBack: () => void;
}

type Language = "python" | "typescript";
type InputMode = "openapi" | "describe";

interface GenerateResult {
  code: string;
  language: Language;
  tools: string[];
  fileName: string;
  readme: string;
  dockerfile: string;
}

export default function GeneratorApp({ onBack }: GeneratorAppProps) {
  const [inputMode, setInputMode] = useState<InputMode>("describe");
  const [language, setLanguage] = useState<Language>("python");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"code" | "readme" | "docker">("code");
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) {
      setError("è«è¼¸å¥ API æè¿°æ OpenAPI spec");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: input.trim(), language, inputMode }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Generation failed");
      }

      const data = await res.json();
      setResult(data);
      setActiveTab("code");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // éç´æ¹æ¡
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const blob = new Blob([result.code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = result.fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getActiveContent = () => {
    if (!result) return "";
    switch (activeTab) {
      case "code": return result.code;
      case "readme": return result.readme;
      case "docker": return result.dockerfile;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Top Bar */}
      <div className="border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-xs font-bold">M</div>
            <span className="font-semibold text-sm">MCPGen</span>
          </div>
          <div className="text-xs text-gray-500">Free: 3/3 remaining</div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Input */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Describe Your API</h2>
              <p className="text-sm text-gray-400">
                Tell us about your API endpoints, parameters, and authentication. Or paste an OpenAPI/Swagger spec.
              </p>
            </div>

            {/* Input Mode Toggle */}
            <div className="flex rounded-lg overflow-hidden border border-white/10">
              <button
                onClick={() => setInputMode("describe")}
                className={`flex-1 py-2 text-sm font-medium transition-colors ${
                  inputMode === "describe"
                    ? "bg-violet-600 text-white"
                    : "bg-transparent text-gray-400 hover:text-white"
                }`}
              >
                Describe in English
              </button>
              <button
                onClick={() => setInputMode("openapi")}
                className={`flex-1 py-2 text-sm font-medium transition-colors ${
                  inputMode === "openapi"
                    ? "bg-violet-600 text-white"
                    : "bg-transparent text-gray-400 hover:text-white"
                }`}
              >
                OpenAPI / Swagger
              </button>
            </div>

            {/* Language Toggle */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">Output:</span>
              <div className="flex rounded-lg overflow-hidden border border-white/10">
                <button
                  onClick={() => setLanguage("python")}
                  className={`px-4 py-1.5 text-sm font-medium transition-colors ${
                    language === "python"
                      ? "bg-blue-600 text-white"
                      : "bg-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  ð Python
                </button>
                <button
                  onClick={() => setLanguage("typescript")}
                  className={`px-4 py-1.5 text-sm font-medium transition-colors ${
                    language === "typescript"
                      ? "bg-blue-600 text-white"
                      : "bg-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  ð TypeScript
                </button>
              </div>
            </div>

            {/* Input Area */}
            <div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  inputMode === "describe"
                    ? "Example: I have a REST API at https://api.example.com for managing a bookstore.\n\nEndpoints:\n- GET /books â list all books (supports ?genre=fiction&limit=10)\n- GET /books/:id â get book details\n- POST /books â create a new book (title, author, genre, price)\n- PUT /books/:id â update a book\n- DELETE /books/:id â delete a book\n\nAuth: Bearer token in Authorization header.\nAll responses are JSON."
                    : '{\n  "openapi": "3.0.0",\n  "info": { "title": "My API", "version": "1.0" },\n  "paths": {\n    "/items": {\n      "get": {\n        "summary": "List items",\n        "parameters": [...]\n      }\n    }\n  }\n}'
                }
                className="w-full h-64 p-4 rounded-xl bg-[#111] border border-white/10 text-sm font-mono text-gray-200 placeholder-gray-600 resize-none focus:outline-none focus:border-violet-500/50 transition-colors"
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold transition-all flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Generating MCP Server...
                </>
              ) : (
                "Generate MCP Server â¡"
              )}
            </button>

            {/* Sample prompts */}
            <div>
              <p className="text-xs text-gray-500 mb-2">Try these examples:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Todo API with CRUD + auth",
                  "Weather API with location search",
                  "E-commerce product catalog",
                  "GitHub issues integration",
                ].map((example) => (
                  <button
                    key={example}
                    onClick={() =>
                      setInput(
                        example === "Todo API with CRUD + auth"
                          ? "REST API at https://api.example.com/v1 for managing todos.\n\nEndpoints:\n- GET /todos â list all todos (supports ?status=pending&limit=20)\n- GET /todos/:id â get a specific todo\n- POST /todos â create todo (title: string, description?: string, due_date?: string)\n- PUT /todos/:id â update todo fields\n- DELETE /todos/:id â delete todo\n\nAuth: Bearer token in Authorization header.\nResponses are JSON with { data, meta } wrapper."
                          : example === "Weather API with location search"
                          ? "Weather API at https://weather.example.com/api\n\nEndpoints:\n- GET /current?city={city} â current weather for a city\n- GET /forecast?city={city}&days={1-7} â weather forecast\n- GET /search?q={query} â search for city names\n\nNo auth required. Returns JSON with temperature, humidity, wind, description."
                          : example === "E-commerce product catalog"
                          ? "E-commerce API at https://shop.example.com/api/v2\n\nEndpoints:\n- GET /products â list products (?category, ?min_price, ?max_price, ?sort_by, ?page)\n- GET /products/:id â product details with reviews\n- GET /categories â all categories\n- POST /cart/items â add to cart (product_id, quantity)\n- GET /cart â view cart\n- DELETE /cart/items/:id â remove from cart\n\nAuth: API key in X-API-Key header."
                          : "GitHub-like issues API at https://api.example.com\n\nEndpoints:\n- GET /repos/:owner/:repo/issues â list issues (?state=open&labels=bug&assignee=user)\n- GET /repos/:owner/:repo/issues/:number â get issue details\n- POST /repos/:owner/:repo/issues â create issue (title, body, labels[], assignees[])\n- PATCH /repos/:owner/:repo/issues/:number â update issue\n- POST /repos/:owner/:repo/issues/:number/comments â add comment (body)\n\nAuth: Bearer token. Pagination via Link header."
                      )
                    }
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-gray-400 hover:text-white transition-colors"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Output */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Generated Output</h2>
              {result && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(getActiveContent())}
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-gray-400 hover:text-white transition-colors"
                  >
                    {copied ? "â Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-xs text-white transition-colors"
                  >
                    Download
                  </button>
                </div>
              )}
            </div>

            {result ? (
              <>
                {/* Tool badges */}
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="text-xs text-gray-500">Detected tools:</span>
                  {result.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {/* Tab bar */}
                <div className="flex rounded-lg overflow-hidden border border-white/10">
                  {[
                    { key: "code" as const, label: result.fileName },
                    { key: "readme" as const, label: "README.md" },
                    { key: "docker" as const, label: "Dockerfile" },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`flex-1 py-2 text-xs font-mono transition-colors ${
                        activeTab === tab.key
                          ? "bg-white/10 text-white"
                          : "text-gray-500 hover:text-gray-300"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Code display */}
                <div className="rounded-xl bg-[#111] border border-white/5 overflow-hidden">
                  <pre className="p-4 overflow-x-auto max-h-[600px] overflow-y-auto">
                    <code className="text-sm font-mono text-gray-200 whitespace-pre">
                      {getActiveContent()}
                    </code>
                  </pre>
                </div>
              </>
            ) : (
              <div className="rounded-xl bg-[#111] border border-white/5 flex items-center justify-center h-[500px]">
                <div className="text-center text-gray-500">
                  <div className="text-5xl mb-4">â¡</div>
                  <p className="text-sm">Your generated MCP server will appear here</p>
                  <p className="text-xs mt-2 text-gray-600">
                    Describe your API on the left and click Generate
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
