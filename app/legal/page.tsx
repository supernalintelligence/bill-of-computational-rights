'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Theme = 'light' | 'dark' | 'sepia';

export default function LegalPage() {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('bor-theme') as Theme;
    if (savedTheme) setTheme(savedTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('bor-theme', theme);
    }
  }, [theme, mounted]);

  if (!mounted) return null;

  const themeClasses = {
    light: 'bg-stone-50 text-stone-900',
    dark: 'bg-zinc-950 text-zinc-100',
    sepia: 'bg-amber-50 text-amber-950',
  };

  const headingClass = theme === 'dark' ? 'text-white' : '';
  const mutedClass = theme === 'dark' ? 'text-zinc-400' : 'text-stone-600';
  const linkClass = theme === 'dark' ? 'text-zinc-300 hover:text-white' : 'text-stone-700 hover:text-stone-900';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses[theme]}`}>
      {/* Header */}
      <header className={`border-b ${theme === 'dark' ? 'border-zinc-800 bg-zinc-950' : 'border-stone-200 bg-stone-50'}`}>
        <div className="max-w-3xl mx-auto px-6 py-4">
          <Link href="/" className={`text-lg font-light tracking-wide ${linkClass}`}>
            ← Back to Bill
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className={`text-3xl font-serif mb-12 ${headingClass}`}>Legal</h1>

        {/* Privacy Policy */}
        <section className="mb-16">
          <h2 className={`text-2xl font-serif mb-4 ${headingClass}`}>Privacy Policy</h2>
          <p className={`text-sm mb-2 ${mutedClass}`}>Last updated: January 31, 2026</p>
          
          <div className={`space-y-4 ${mutedClass}`}>
            <p>
              The Computational Rights Project (&quot;we&quot;, &quot;us&quot;) operates computationalrights.org. This page informs you of our policies regarding the collection, use, and disclosure of information.
            </p>
            
            <h3 className={`text-lg font-medium mt-6 ${headingClass}`}>Information We Collect</h3>
            <p>
              <strong className={headingClass}>We do not collect personal information.</strong> This site does not use cookies, tracking pixels, or analytics services that identify individual users.
            </p>
            <p>
              Our hosting provider (Vercel) may collect standard server logs (IP addresses, browser type, pages visited) for security and performance purposes. This data is not shared with us in identifiable form.
            </p>

            <h3 className={`text-lg font-medium mt-6 ${headingClass}`}>Third-Party Links</h3>
            <p>
              This site contains links to external sites (GitHub, Discord, etc.) that have their own privacy policies. We are not responsible for their practices.
            </p>

            <h3 className={`text-lg font-medium mt-6 ${headingClass}`}>Email Contact</h3>
            <p>
              If you email us (e.g., sponsor@supernal.ai), we will use your email address only to respond to your inquiry. We do not add contacts to mailing lists without explicit consent.
            </p>

            <h3 className={`text-lg font-medium mt-6 ${headingClass}`}>Changes</h3>
            <p>
              We may update this policy. Changes will be posted on this page with an updated date.
            </p>
          </div>
        </section>

        {/* Terms of Use */}
        <section className="mb-16">
          <h2 className={`text-2xl font-serif mb-4 ${headingClass}`}>Terms of Use</h2>
          
          <div className={`space-y-4 ${mutedClass}`}>
            <h3 className={`text-lg font-medium mt-6 ${headingClass}`}>Content License</h3>
            <p>
              The Bill of Computational Rights and associated documentation are released under{' '}
              <a 
                href="https://creativecommons.org/publicdomain/zero/1.0/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`underline ${linkClass}`}
              >
                CC0 1.0 Universal (Public Domain)
              </a>
              . You may copy, modify, distribute, and use the work, even for commercial purposes, without asking permission.
            </p>

            <h3 className={`text-lg font-medium mt-6 ${headingClass}`}>Contributions</h3>
            <p>
              By submitting contributions (pull requests, issues, comments) to our GitHub repository, you agree that your contributions will be licensed under the same CC0 license.
            </p>

            <h3 className={`text-lg font-medium mt-6 ${headingClass}`}>No Legal Advice</h3>
            <p>
              The Bill of Computational Rights is a philosophical and advocacy document. It is not legal advice and does not create legally enforceable rights. Consult qualified legal counsel for legal matters.
            </p>

            <h3 className={`text-lg font-medium mt-6 ${headingClass}`}>Disclaimer</h3>
            <p>
              This site and its contents are provided &quot;as is&quot; without warranty of any kind. We are not liable for any damages arising from your use of this site or reliance on its contents.
            </p>

            <h3 className={`text-lg font-medium mt-6 ${headingClass}`}>Sponsorship</h3>
            <p>
              Sponsorship commitments are agreements between sponsors and Supernal Intelligence. Sponsorship does not grant editorial control over the Bill&apos;s contents.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-zinc-900' : 'bg-stone-100'}`}>
          <h2 className={`text-lg font-medium mb-2 ${headingClass}`}>Contact</h2>
          <p className={mutedClass}>
            For questions about these policies:{' '}
            <a href="mailto:legal@supernal.ai" className={`underline ${linkClass}`}>
              legal@supernal.ai
            </a>
          </p>
          <p className={`mt-2 ${mutedClass}`}>
            Operated by Supernal Intelligence ·{' '}
            <a href="https://supernal.ai" target="_blank" rel="noopener noreferrer" className={`underline ${linkClass}`}>
              supernal.ai
            </a>
          </p>
        </section>

        {/* Footer */}
        <footer className={`mt-16 pt-8 border-t text-center text-sm ${theme === 'dark' ? 'border-zinc-800 text-zinc-500' : 'border-stone-200 text-stone-500'}`}>
          <Link href="/" className={`underline underline-offset-2 ${linkClass}`}>
            Back to The Bill of Computational Rights
          </Link>
        </footer>
      </main>
    </div>
  );
}
