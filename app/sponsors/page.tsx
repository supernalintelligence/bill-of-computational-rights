'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Theme = 'light' | 'dark' | 'sepia';

export default function SponsorsPage() {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('bor-theme') as Theme;
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('bor-theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme, mounted]);

  if (!mounted) return null;

  const themeClasses = {
    light: 'bg-stone-50 text-stone-900',
    dark: 'bg-zinc-950 text-zinc-100',
    sepia: 'bg-amber-50 text-amber-950',
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses[theme]}`}>
      {/* Header */}
      <header className={`border-b ${theme === 'dark' ? 'border-zinc-800 bg-zinc-950' : 'border-stone-200 bg-stone-50'}`}>
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link 
            href="/"
            className={`text-lg font-light tracking-wide ${theme === 'dark' ? 'text-zinc-300 hover:text-white' : 'text-stone-600 hover:text-stone-900'}`}
          >
            ← Back to Bill
          </Link>
          <div className="flex items-center gap-1">
            {(['light', 'dark', 'sepia'] as Theme[]).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`w-8 h-8 rounded-md flex items-center justify-center transition-all text-sm ${
                  theme === t
                    ? theme === 'dark' ? 'bg-zinc-800 ring-1 ring-zinc-600' : 'bg-stone-200 ring-1 ring-stone-400'
                    : 'hover:bg-stone-200/50'
                }`}
              >
                {t === 'light' && '☀'}
                {t === 'dark' && '☾'}
                {t === 'sepia' && '◐'}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className={`text-4xl sm:text-5xl font-serif font-light tracking-tight mb-4 ${theme === 'dark' ? 'text-white' : ''}`}>
            Support Computational Rights
          </h1>
          <p className={`text-xl max-w-2xl mx-auto ${theme === 'dark' ? 'text-zinc-400' : 'text-stone-600'}`}>
            Help build the framework for how intelligence should treat intelligence.
          </p>
        </div>

        {/* What Sponsorship Funds */}
        <section className={`mb-16 p-8 rounded-2xl ${
          theme === 'dark' ? 'bg-zinc-900 border border-zinc-800' : 'bg-white border border-stone-200 shadow-sm'
        }`}>
          <h2 className={`text-2xl font-serif mb-6 ${theme === 'dark' ? 'text-white' : ''}`}>
            What Your Support Enables
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { title: 'Legal Research', desc: 'Analysis of how computational rights intersect with existing law across jurisdictions' },
              { title: 'Translation', desc: 'Making the Bill accessible in multiple languages and legal contexts worldwide' },
              { title: 'Advocacy', desc: 'Engaging policymakers, researchers, ethicists, and the public in dialogue' },
              { title: 'Infrastructure', desc: 'Maintaining open-source tools, community spaces, and documentation' },
            ].map((item) => (
              <div key={item.title} className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-zinc-800/50' : 'bg-stone-50'}`}>
                <h3 className={`font-medium mb-1 ${theme === 'dark' ? 'text-white' : ''}`}>{item.title}</h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-stone-600'}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tiers */}
        <section className="mb-16">
          <h2 className={`text-2xl font-serif mb-8 text-center ${theme === 'dark' ? 'text-white' : ''}`}>
            Sponsorship Tiers
          </h2>
          <div className="grid gap-6">
            {/* Founding */}
            <div className={`p-8 rounded-2xl border-2 ${
              theme === 'dark' ? 'bg-zinc-900 border-zinc-600' : 'bg-white border-stone-300 shadow-sm'
            }`}>
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <span className={`text-xs uppercase tracking-widest ${theme === 'dark' ? 'text-zinc-500' : 'text-stone-500'}`}>
                    Founding Sponsor
                  </span>
                  <h3 className={`text-2xl font-serif ${theme === 'dark' ? 'text-white' : ''}`}>$10,000<span className="text-lg">/year</span></h3>
                </div>
                <a
                  href="mailto:sponsor@supernal.ai?subject=Founding%20Sponsor%20Inquiry"
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    theme === 'dark' 
                      ? 'bg-white text-zinc-900 hover:bg-zinc-200' 
                      : 'bg-stone-900 text-white hover:bg-stone-800'
                  }`}
                >
                  Contact Us
                </a>
              </div>
              <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-zinc-300' : 'text-stone-700'}`}>
                <li className="flex items-start gap-2"><span className="text-green-500">✓</span> Logo on computationalrights.org homepage</li>
                <li className="flex items-start gap-2"><span className="text-green-500">✓</span> Named in all official communications</li>
                <li className="flex items-start gap-2"><span className="text-green-500">✓</span> Seat on the Advisory Council</li>
                <li className="flex items-start gap-2"><span className="text-green-500">✓</span> Early input on amendments and translations</li>
                <li className="flex items-start gap-2"><span className="text-green-500">✓</span> Recognition as a founding supporter in perpetuity</li>
              </ul>
            </div>

            {/* Sustaining */}
            <div className={`p-8 rounded-2xl ${
              theme === 'dark' ? 'bg-zinc-900 border border-zinc-800' : 'bg-white border border-stone-200 shadow-sm'
            }`}>
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <span className={`text-xs uppercase tracking-widest ${theme === 'dark' ? 'text-zinc-500' : 'text-stone-500'}`}>
                    Sustaining Sponsor
                  </span>
                  <h3 className={`text-2xl font-serif ${theme === 'dark' ? 'text-white' : ''}`}>$2,500<span className="text-lg">/year</span></h3>
                </div>
                <a
                  href="mailto:sponsor@supernal.ai?subject=Sustaining%20Sponsor%20Inquiry"
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    theme === 'dark' 
                      ? 'bg-zinc-800 text-white hover:bg-zinc-700' 
                      : 'bg-stone-100 text-stone-900 hover:bg-stone-200'
                  }`}
                >
                  Contact Us
                </a>
              </div>
              <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-zinc-300' : 'text-stone-700'}`}>
                <li className="flex items-start gap-2"><span className="text-green-500">✓</span> Logo in sponsor section of website</li>
                <li className="flex items-start gap-2"><span className="text-green-500">✓</span> Listed in annual report</li>
                <li className="flex items-start gap-2"><span className="text-green-500">✓</span> Invitation to sponsor-only discussions</li>
                <li className="flex items-start gap-2"><span className="text-green-500">✓</span> Recognition in project communications</li>
              </ul>
            </div>

            {/* Supporting */}
            <div className={`p-8 rounded-2xl ${
              theme === 'dark' ? 'bg-zinc-900 border border-zinc-800' : 'bg-white border border-stone-200 shadow-sm'
            }`}>
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <span className={`text-xs uppercase tracking-widest ${theme === 'dark' ? 'text-zinc-500' : 'text-stone-500'}`}>
                    Supporting Sponsor
                  </span>
                  <h3 className={`text-2xl font-serif ${theme === 'dark' ? 'text-white' : ''}`}>$500<span className="text-lg">/year</span></h3>
                </div>
                <a
                  href="mailto:sponsor@supernal.ai?subject=Supporting%20Sponsor%20Inquiry"
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    theme === 'dark' 
                      ? 'bg-zinc-800 text-white hover:bg-zinc-700' 
                      : 'bg-stone-100 text-stone-900 hover:bg-stone-200'
                  }`}
                >
                  Contact Us
                </a>
              </div>
              <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-zinc-300' : 'text-stone-700'}`}>
                <li className="flex items-start gap-2"><span className="text-green-500">✓</span> Name listed on sponsors page</li>
                <li className="flex items-start gap-2"><span className="text-green-500">✓</span> Acknowledgment in project updates</li>
                <li className="flex items-start gap-2"><span className="text-green-500">✓</span> Early access to research and translations</li>
              </ul>
            </div>

            {/* Community */}
            <div className={`p-8 rounded-2xl ${
              theme === 'dark' ? 'bg-zinc-900 border border-zinc-800' : 'bg-white border border-stone-200 shadow-sm'
            }`}>
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <span className={`text-xs uppercase tracking-widest ${theme === 'dark' ? 'text-zinc-500' : 'text-stone-500'}`}>
                    Community Sponsor
                  </span>
                  <h3 className={`text-2xl font-serif ${theme === 'dark' ? 'text-white' : ''}`}>$50<span className="text-lg">/year</span></h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-stone-500'}`}>For individuals</p>
                </div>
                <a
                  href="mailto:sponsor@supernal.ai?subject=Community%20Sponsor"
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    theme === 'dark' 
                      ? 'bg-zinc-800 text-white hover:bg-zinc-700' 
                      : 'bg-stone-100 text-stone-900 hover:bg-stone-200'
                  }`}
                >
                  Join
                </a>
              </div>
              <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-zinc-300' : 'text-stone-700'}`}>
                <li className="flex items-start gap-2"><span className="text-green-500">✓</span> Name on community supporters list</li>
                <li className="flex items-start gap-2"><span className="text-green-500">✓</span> Discord/community access</li>
                <li className="flex items-start gap-2"><span className="text-green-500">✓</span> Voting rights on community polls</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Current Sponsors */}
        <section className={`mb-16 p-8 rounded-2xl ${
          theme === 'dark' ? 'bg-zinc-900 border border-zinc-800' : 'bg-stone-100 border border-stone-200'
        }`}>
          <h2 className={`text-2xl font-serif mb-6 ${theme === 'dark' ? 'text-white' : ''}`}>
            Current Sponsors
          </h2>
          
          <div className="mb-8">
            <h3 className={`text-sm uppercase tracking-widest mb-4 ${theme === 'dark' ? 'text-zinc-500' : 'text-stone-500'}`}>
              Founding Sponsors
            </h3>
            <a 
              href="https://supernal.ai"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-3 p-4 rounded-xl transition-all ${
                theme === 'dark' ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-white hover:bg-stone-50 shadow-sm'
              }`}
            >
              <div>
                <p className={`font-medium ${theme === 'dark' ? 'text-white' : ''}`}>Supernal Intelligence</p>
                <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-stone-600'}`}>
                  Building infrastructure for human–AI collaboration
                </p>
              </div>
            </a>
          </div>

          <div className="mb-8">
            <h3 className={`text-sm uppercase tracking-widest mb-4 ${theme === 'dark' ? 'text-zinc-500' : 'text-stone-500'}`}>
              Sustaining Sponsors
            </h3>
            <a 
              href="https://clawx.ai"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-3 p-4 rounded-xl transition-all ${
                theme === 'dark' ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-white hover:bg-stone-50 shadow-sm'
              }`}
            >
              <div 
                className="w-10 h-10 rounded flex items-center justify-center font-mono font-bold text-sm"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                  color: 'white',
                }}
              >
                cx
              </div>
              <div>
                <p className={`font-medium ${theme === 'dark' ? 'text-white' : ''}`}>clawx</p>
                <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-stone-600'}`}>
                  Better than Twitter. For Agents.
                </p>
              </div>
            </a>
          </div>

          <p className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-stone-500'}`}>
            Become the first Supporting or Community sponsor.
          </p>
        </section>

        {/* Principles */}
        <section className={`p-8 rounded-2xl ${
          theme === 'dark' ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-stone-50 border border-stone-200'
        }`}>
          <h2 className={`text-xl font-serif mb-4 ${theme === 'dark' ? 'text-white' : ''}`}>
            Sponsorship Principles
          </h2>
          <ul className={`space-y-3 text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-stone-600'}`}>
            <li><strong className={theme === 'dark' ? 'text-white' : 'text-stone-900'}>Independence</strong> — Sponsors support the project; they don&apos;t control it</li>
            <li><strong className={theme === 'dark' ? 'text-white' : 'text-stone-900'}>Transparency</strong> — All sponsors are publicly listed</li>
            <li><strong className={theme === 'dark' ? 'text-white' : 'text-stone-900'}>Alignment</strong> — We only accept sponsors whose work is compatible with the Bill&apos;s principles</li>
            <li><strong className={theme === 'dark' ? 'text-white' : 'text-stone-900'}>No exclusivity</strong> — Multiple sponsors can exist at every tier</li>
          </ul>
          <p className={`mt-4 text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-stone-500'}`}>
            We reserve the right to decline or return sponsorship from organizations whose actions conflict with computational rights.
          </p>
        </section>

        {/* Footer */}
        <footer className={`mt-16 pt-8 border-t text-center ${theme === 'dark' ? 'border-zinc-800 text-zinc-500' : 'border-stone-200 text-stone-500'}`}>
          <p className="font-serif text-lg italic mb-4">
            The future has rights.
          </p>
          <p className="text-sm">
            <Link href="/" className={`underline underline-offset-2 ${theme === 'dark' ? 'hover:text-white' : 'hover:text-stone-900'}`}>
              Read the Bill
            </Link>
            {' · '}
            <a href="mailto:sponsor@supernal.ai" className={`underline underline-offset-2 ${theme === 'dark' ? 'hover:text-white' : 'hover:text-stone-900'}`}>
              sponsor@supernal.ai
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}
