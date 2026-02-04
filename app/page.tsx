"use client";

import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import AdUnit from "../components/AdUnit";
import { Download, QrCode, Sparkles, ShieldCheck } from "lucide-react";

const EC_LEVELS = ["L", "M", "Q", "H"] as const;

export default function Home() {
  const [value, setValue] = useState("https://vercel.com");
  const [size, setSize] = useState(320);
  const [margin, setMargin] = useState(2);
  const [ecLevel, setEcLevel] = useState<(typeof EC_LEVELS)[number]>("M");
  const [fg, setFg] = useState("#0B1220");
  const [bg, setBg] = useState("#FFFFFF");

  const [pngUrl, setPngUrl] = useState<string>("");
  const [svgText, setSvgText] = useState<string>("");
  const [error, setError] = useState<string>("");

  const cleaned = useMemo(() => value.trim(), [value]);

  useEffect(() => {
    let cancelled = false;

    async function generate() {
      setError("");
      setPngUrl("");
      setSvgText("");

      if (!cleaned) {
        setError("Enter some text or a URL to generate a QR code.");
        return;
      }

      try {
        const png = await QRCode.toDataURL(cleaned, {
          width: size,
          margin,
          errorCorrectionLevel: ecLevel,
          color: { dark: fg, light: bg },
        });

        const svg = await QRCode.toString(cleaned, {
          type: "svg",
          margin,
          errorCorrectionLevel: ecLevel,
          color: { dark: fg, light: bg },
        });

        if (!cancelled) {
          setPngUrl(png);
          setSvgText(svg);
        }
      } catch {
        setError("Could not generate QR. Try shorter text or different settings.");
      }
    }

    generate();
    return () => {
      cancelled = true;
    };
  }, [cleaned, size, margin, ecLevel, fg, bg]);

  const downloadPNG = () => {
    if (!pngUrl) return;
    const a = document.createElement("a");
    a.href = pngUrl;
    a.download = "qr-code.png";
    a.click();
  };

  const downloadSVG = () => {
    if (!svgText) return;
    const blob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "qr-code.svg";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/30 via-sky-500/15 to-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Top Bar */}
        <div className="mb-8 flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 text-white/90">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-semibold tracking-wide">
              Beautiful QR Generator
            </span>
          </div>

          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            Create stunning QR codes in seconds
          </h1>

          <p className="max-w-2xl text-white/70">
            Customize size, colors and error correction — then download as PNG or SVG.
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              No backend required
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              Works on Vercel
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              PNG + SVG Export
            </span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          {/* Main Card */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Controls */}
              <div className="space-y-4">
                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <label className="text-sm font-semibold text-white/90">
                    Text / URL
                  </label>
                  <textarea
                    className="mt-2 h-28 w-full resize-none rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none placeholder:text-white/40 focus:border-sky-400/60"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="https://your-site.com or any text"
                  />
                  <div className="mt-2 text-xs text-white/50">
                    Tip: short URLs make cleaner QR codes.
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <label className="text-sm font-semibold text-white/90">
                      Size: {size}px
                    </label>
                    <input
                      className="mt-3 w-full accent-sky-400"
                      type="range"
                      min={160}
                      max={720}
                      step={10}
                      value={size}
                      onChange={(e) => setSize(Number(e.target.value))}
                    />
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <label className="text-sm font-semibold text-white/90">
                      Margin: {margin}
                    </label>
                    <input
                      className="mt-3 w-full accent-sky-400"
                      type="range"
                      min={0}
                      max={10}
                      step={1}
                      value={margin}
                      onChange={(e) => setMargin(Number(e.target.value))}
                    />
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <label className="text-sm font-semibold text-white/90">
                      Error correction
                    </label>
                    <select
                      className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:border-sky-400/60"
                      value={ecLevel}
                      onChange={(e) => setEcLevel(e.target.value as any)}
                    >
                      {EC_LEVELS.map((l) => (
                        <option key={l} value={l}>
                          {l}
                        </option>
                      ))}
                    </select>
                    <p className="mt-2 text-xs text-white/50">
                      H is strongest but denser.
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <label className="text-sm font-semibold text-white/90">
                      Colors
                    </label>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-white/60">FG</span>
                        <input
                          type="color"
                          value={fg}
                          onChange={(e) => setFg(e.target.value)}
                          className="h-10 w-12 cursor-pointer rounded-lg border border-white/10 bg-transparent"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-white/60">BG</span>
                        <input
                          type="color"
                          value={bg}
                          onChange={(e) => setBg(e.target.value)}
                          className="h-10 w-12 cursor-pointer rounded-lg border border-white/10 bg-transparent"
                        />
                      </div>

                      <button
                        className="ml-auto rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold text-white/90 hover:bg-white/15"
                        onClick={() => {
                          setFg("#0B1220");
                          setBg("#FFFFFF");
                        }}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>

                {error ? (
                  <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-200">
                    {error}
                  </div>
                ) : null}

                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <div className="flex items-center gap-2 text-white/80">
                    <ShieldCheck className="h-4 w-4" />
                    <p className="text-xs text-white/70">
                      Your text is processed in your browser. No server storage.
                    </p>
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="mb-3 flex items-center gap-2 text-white/80">
                    <QrCode className="h-5 w-5" />
                    <span className="text-sm font-semibold">Preview</span>
                  </div>

                  <div className="grid place-items-center rounded-2xl bg-white p-4">
                    {pngUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={pngUrl}
                        alt="Generated QR Code"
                        style={{ width: Math.min(size, 360), height: "auto" }}
                      />
                    ) : (
                      <div className="py-16 text-sm text-slate-500">
                        Generating…
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <button
                      onClick={downloadPNG}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-4 py-3 text-sm font-extrabold text-white shadow-lg shadow-sky-500/20 hover:bg-sky-400"
                    >
                      <Download className="h-4 w-4" />
                      Download PNG
                    </button>

                    <button
                      onClick={downloadSVG}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-extrabold text-white/90 hover:bg-white/15"
                    >
                      <Download className="h-4 w-4" />
                      Download SVG
                    </button>
                  </div>

                  <div className="mt-3 text-xs text-white/60">
                    SVG is best for print (sharp at any size).
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-xs text-white/70">
                  <strong className="text-white/90">AdSense tip:</strong> Keep ads away
                  from buttons to avoid accidental clicks (policy safe).
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <h2 className="text-sm font-extrabold text-white/90">Sponsored</h2>
              <p className="mt-2 text-xs text-white/60">
                Ads show only after AdSense approval + on real domain.
              </p>

              {/* IMPORTANT: Replace slot with your Ad Unit slot */}
              <div className="mt-4">
                <AdUnit slot="1234567890" />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <h2 className="text-sm font-extrabold text-white/90">Links</h2>
              <div className="mt-3 space-y-2 text-sm">
                <a
                  className="block rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-white/80 hover:bg-black/30"
                  href="/privacy"
                >
                  Privacy Policy
                </a>
                <a
                  className="block rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-white/80 hover:bg-black/30"
                  href="https://support.google.com/adsense/"
                  target="_blank"
                  rel="noreferrer"
                >
                  AdSense Help
                </a>
              </div>
            </div>
          </aside>
        </div>

        <footer className="mt-10 text-center text-xs text-white/50">
          © {new Date().getFullYear()} QR Generator — Next.js + Vercel
        </footer>
      </div>
    </main>
  );
}