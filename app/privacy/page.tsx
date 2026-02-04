export default function Privacy() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-extrabold">Privacy Policy</h1>
        <p className="mt-4 text-slate-300">
          This website generates QR codes in your browser. We do not store your input
          on our servers.
        </p>

        <h2 className="mt-8 text-xl font-bold">Advertising</h2>
        <p className="mt-2 text-slate-300">
          We use Google AdSense to display ads. Google may use cookies or device identifiers
          to personalize ads and measure performance.
        </p>

        <h2 className="mt-8 text-xl font-bold">Contact</h2>
        <p className="mt-2 text-slate-300">
          For questions, contact: your-email@example.com
        </p>

        <a className="mt-8 inline-block text-sky-400 hover:underline" href="/">
          ← Back
        </a>
      </div>
    </main>
  );
}
