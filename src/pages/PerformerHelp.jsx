import { useEffect, useState } from 'react'
import SiteNav from '../components/SiteNav'
import SiteFooter from '../components/SiteFooter'

// Paste the CloudFront link here once the onboarding walkthrough is uploaded
// (upload to s3://tipwave-performer-media/videos/, link looks like https://d7skwhqoj49or.cloudfront.net/videos/<file>.mp4).
// While this is empty the page shows a "coming soon" note instead of a broken player.
const VIDEO_URL = ''

export default function PerformerHelp({ appUrl = 'https://app.tipwave.live' }) {
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
      <SiteNav appUrl={appUrl} />

      <section className="text-white" style={{
          background:
            'radial-gradient(60% 50% at 100% 0%, rgba(6,182,200,0.35), transparent 70%),' +
            'radial-gradient(50% 45% at 0% 100%, rgba(229,84,140,0.26), transparent 70%),' +
            'linear-gradient(160deg,#0a2533,#0d4254 60%,#0f3447)'
        }}>
        <div className="mx-auto max-w-4xl px-6 py-16 text-center md:py-24">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Performer Help Center</h1>
          <p className="text-xl text-white/75 max-w-3xl mx-auto">Your home for quick videos, tips, and guidance for using Tipwave.</p>
        </div>
      </section>

      <section className="bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto card">
            <h2 className="text-3xl font-bold text-deep-charcoal mb-4">Getting Started: Quick Onboarding Walkthrough</h2>
            <p className="text-lg text-gray-600 mb-8">A fast, friendly walkthrough to help you get set up and ready for your first show.</p>

            {VIDEO_URL ? (
              <>
              <video
                className="w-full max-w-full rounded-xl shadow-lg bg-black"
                controls
                preload="metadata"
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
                  className="inline-flex items-center px-5 py-3 rounded-full border-2 border-accent-500 text-accent-600 font-semibold hover:bg-accent-500 hover:text-white transition-all duration-200"
                >
                  {copyState === 'copied' ? 'Link Copied' : copyState === 'error' ? 'Copy Failed' : 'Copy Video Link'}
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-4">Share this link with your bandmates if they’re joining Tipwave too.</p>
              </>
            ) : (
              <div className="rounded-xl bg-surface p-8 text-center">
                <p className="text-lg font-semibold text-ink-900">The walkthrough video is coming soon.</p>
                <p className="mt-2 text-ink-500">
                  In the meantime, email <a className="font-semibold text-brand-700" href="mailto:contact@tipwave.live">contact@tipwave.live</a> or call{' '}
                  <a className="font-semibold text-brand-700" href="tel:+18776847928">877-684-7928</a> and we will walk you through setup.
                </p>
              </div>
            )}
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

      <SiteFooter appUrl={appUrl} />
    </div>
  )
}
