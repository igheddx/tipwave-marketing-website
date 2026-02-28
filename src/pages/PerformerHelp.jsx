import { useEffect, useState } from 'react'
import TipwaveLogo from '../assets/tipwave-logo3.png'

const VIDEO_URL = 'https://d123456abcdef.cloudfront.net/tipwave-onboarding-demo.mp4'

export default function PerformerHelp({ appUrl = 'https://app.tipwave.live' }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [copyState, setCopyState] = useState('idle')

  useEffect(() => {
    document.title = 'Tipwave Performer Help Center'

    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute('content', 'Watch videos and explore guides to help you navigate the Tipwave performer platform.')

    return () => {
      document.title = 'Tipwave'
    }
  }, [])

  const handleCopyVideoLink = async () => {
    try {
      await navigator.clipboard.writeText(VIDEO_URL)
      setCopyState('copied')
      setTimeout(() => setCopyState('idle'), 2000)
    } catch {
      setCopyState('error')
      setTimeout(() => setCopyState('idle'), 2000)
    }
  }

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 h-[72px]">
          <div className="flex h-full justify-between items-center">
            <div className="h-full w-auto flex items-center">
              <a href="/" className="h-full flex items-center">
                <img src={TipwaveLogo} alt="Tipwave" className="h-10 sm:h-16 md:h-[64px] w-auto object-contain" />
              </a>
            </div>
            <button
              type="button"
              className="md:hidden text-deep-charcoal"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
            <div className="hidden md:flex h-full space-x-8 items-center">
              <a href="/#features" className="text-deep-charcoal hover:text-tipwave-teal transition">Features</a>
              <a href="/#how-it-works" className="text-deep-charcoal hover:text-tipwave-teal transition">How It Works</a>
              <a href="/#reviews" className="text-deep-charcoal hover:text-tipwave-teal transition">Reviews</a>
              <a href={`${appUrl}/login`} className="btn-secondary text-sm opacity-90">Artist Sign-In</a>
            </div>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4">
            <div className="flex flex-col gap-4">
              <a href="/#features" onClick={() => setIsMobileMenuOpen(false)} className="text-deep-charcoal hover:text-tipwave-teal transition">Features</a>
              <a href="/#how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="text-deep-charcoal hover:text-tipwave-teal transition">How It Works</a>
              <a href="/#reviews" onClick={() => setIsMobileMenuOpen(false)} className="text-deep-charcoal hover:text-tipwave-teal transition">Reviews</a>
              <a href={`${appUrl}/login`} onClick={() => setIsMobileMenuOpen(false)} className="btn-secondary text-sm opacity-90 inline-block w-fit">Artist Sign-In</a>
            </div>
          </div>
        )}
      </nav>

      <section className="bg-gradient-to-br from-white to-soft-gray">
        <div className="section-container text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-deep-charcoal mb-6">Performer Help Center</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Your home for quick videos, tips, and guidance for using Tipwave.</p>
        </div>
      </section>

      <section className="bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto card">
            <h2 className="text-3xl font-bold text-deep-charcoal mb-4">Getting Started: Quick Onboarding Walkthrough</h2>
            <p className="text-lg text-gray-600 mb-8">A fast, friendly walkthrough to help you get set up and ready for your first show.</p>

            <video
              className="w-full max-w-full rounded-xl shadow-lg bg-black"
              controls
              preload="metadata"
              poster="/images/onboarding-poster.jpg"
              src={VIDEO_URL}
            >
              Your browser does not support the video tag.
            </video>

            <div className="mt-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <a
                href={VIDEO_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-primary inline-block"
              >
                Open Full Screen
              </a>
              <button
                type="button"
                onClick={handleCopyVideoLink}
                className="inline-flex items-center px-5 py-3 rounded-full border-2 border-tipwave-magenta text-tipwave-magenta font-semibold hover:bg-tipwave-magenta hover:text-white transition-all duration-200"
              >
                {copyState === 'copied' ? 'Link Copied' : copyState === 'error' ? 'Copy Failed' : 'Copy Video Link'}
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">Share this link with your bandmates if they’re joining Tipwave too.</p>
          </div>
        </div>
      </section>

      <section className="bg-soft-gray">
        <div className="section-container">
          <h2 className="text-4xl font-bold text-center mb-4">More Tips Coming Soon</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">This page will grow with new videos and guides to help you navigate the platform.</p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card">
              <h3 className="text-2xl font-bold mb-3">Live Tip Setup</h3>
              <p className="text-gray-600">Step-by-step setup tips for getting your device ready before each show.</p>
            </div>
            <div className="card">
              <h3 className="text-2xl font-bold mb-3">Audience Moments</h3>
              <p className="text-gray-600">Quick ideas for creating stronger crowd participation with each eruption moment.</p>
            </div>
            <div className="card">
              <h3 className="text-2xl font-bold mb-3">Performance Best Practices</h3>
              <p className="text-gray-600">Simple playbook guidance to help you maximize confidence and repeat tipping.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="section-container">
          <h2 className="text-4xl font-bold text-center mb-12">FAQ</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <details className="card group" open>
              <summary className="font-semibold text-lg cursor-pointer list-none">How long is the onboarding video?</summary>
              <p className="text-gray-600 mt-3">About 2 minutes.</p>
            </details>
            <details className="card group">
              <summary className="font-semibold text-lg cursor-pointer list-none">Do I need an account first?</summary>
              <p className="text-gray-600 mt-3">No, this video is for anyone preparing to join the pilot.</p>
            </details>
            <details className="card group">
              <summary className="font-semibold text-lg cursor-pointer list-none">Will this page be updated?</summary>
              <p className="text-gray-600 mt-3">Yes, new videos and guides will be added as the platform grows.</p>
            </details>
          </div>
        </div>
      </section>

      <footer className="bg-deep-charcoal text-white">
        <div className="section-container">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="h-12 w-auto mb-4">
                <img src={TipwaveLogo} alt="Tipwave" className="h-full" />
              </div>
              <p className="text-gray-400">
                Tipwave makes appreciation impossible to miss—driving more tipping moments and creating a shared connection between performers and audiences.
              </p>
              <p className="text-gray-300 mt-4 font-medium">
                Limited prototype spots available in Austin. Apply to become a Founding Performer.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/#apply-prototype-access" className="hover:text-white transition">Apply for Prototype Access</a></li>
                <li><a href={`${appUrl}/login`} className="hover:text-white transition">Login</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/about" className="hover:text-white transition">About Us</a></li>
                <li className="text-gray-400">Contact: contact@tipwave.live</li>
                <li className="text-gray-400">Call: 877-684-7928</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/terms-of-service.html" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="/privacy-policy.html" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="/acceptable-use-policy.html" className="hover:text-white transition">Acceptable Use</a></li>
                <li><a href="/refund-policy.html" className="hover:text-white transition">Refund Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Tipwave. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
