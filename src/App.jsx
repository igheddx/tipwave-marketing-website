import { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SiteNav from './components/SiteNav'
import SiteFooter from './components/SiteFooter'
import WaitlistModal from './components/WaitlistModal'
import { BrandIcon } from './components/BrandIcons'
import logger from './utils/logger'
import AboutUs from './pages/AboutUs'
import PerformerHelp from './pages/PerformerHelp'

function App() {
  // Determine app URL based on environment with env override
  const getAppUrl = () => {
    const envAppUrl = import.meta.env.VITE_APP_URL
    if (envAppUrl) return envAppUrl

    const hostname = window.location.hostname
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:3000'
    }
    return 'https://app.tipwave.live'
  }

  // Determine backend API URL based on environment with env override
  const getApiUrl = () => {
    const envApiUrl = import.meta.env.VITE_API_URL
    if (envApiUrl) return envApiUrl

    const hostname = window.location.hostname
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:5000'
    }
    return 'https://uhxejjh8s1.execute-api.us-east-1.amazonaws.com/dev'
  }

  const appUrl = getAppUrl()
  const apiUrl = getApiUrl()

  return (
    <Router>
      <Routes>
        <Route path="/about" element={<AboutUs appUrl={appUrl} />} />
        <Route path="/performer-help" element={<PerformerHelp appUrl={appUrl} />} />
        <Route path="/" element={<HomePage appUrl={appUrl} apiUrl={apiUrl} />} />
      </Routes>
    </Router>
  )
}

function HomePage({ appUrl, apiUrl }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [showWaitlistForm, setShowWaitlistForm] = useState(false)
  const [waitlistForm, setWaitlistForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })
  const [waitlistSubmitting, setWaitlistSubmitting] = useState(false)
  const [waitlistMessage, setWaitlistMessage] = useState('')
  const searchTimeoutRef = useRef(null)
  const resultsRef = useRef(null)

  // Search performers
  const searchPerformers = async (query) => {
    if (query.length < 3) {
      setSearchResults([])
      setShowResults(false)
      return
    }

    setIsSearching(true)
    try {
      const response = await fetch(`${apiUrl}/api/performersearch?query=${encodeURIComponent(query)}`)
      if (response.ok) {
        const data = await response.json()
        setSearchResults(data)
        setShowResults(true)
      } else {
        logger.error('Search failed:', response.status)
        setSearchResults([])
      }
    } catch (error) {
      logger.error('Search error:', error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  // Handle search input change with debounce
  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchQuery(value)

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    if (value.length >= 3) {
      searchTimeoutRef.current = setTimeout(() => {
        searchPerformers(value)
      }, 300)
    } else {
      setSearchResults([])
      setShowResults(false)
    }
  }

  // Handle clicking outside to close results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target)) {
        setShowResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Navigate to performer tip page
  const navigateToPerformer = (deviceId) => {
    window.location.href = `${appUrl}/tip/${deviceId}`
  }

  // Handle waitlist form submission
  const handleWaitlistSubmit = async (e) => {
    e.preventDefault()
    setWaitlistSubmitting(true)
    setWaitlistMessage('')

    try {
      const response = await fetch(`${apiUrl}/api/email/send-waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: waitlistForm.firstName,
          lastName: waitlistForm.lastName,
          email: waitlistForm.email,
          phone: waitlistForm.phone || ''
        })
      })

      if (response.ok) {
        setWaitlistMessage('Success! We\'ll be in touch soon.')
        setWaitlistForm({ firstName: '', lastName: '', email: '', phone: '' })
        setTimeout(() => setShowWaitlistForm(false), 2000)
      } else {
        setWaitlistMessage('Something went wrong. Please try again.')
      }
    } catch (error) {
      logger.error('Waitlist submission error:', error)
      setWaitlistMessage('Network error. Please try again.')
    } finally {
      setWaitlistSubmitting(false)
    }
  }

  // Handle waitlist form input
  const handleWaitlistInput = (e) => {
    const { name, value } = e.target
    setWaitlistForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const openPrototypeForm = () => {
    setShowWaitlistForm(true)
  }

  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === '#apply-prototype-access') {
        setShowWaitlistForm(true)
      }
    }

    openFromHash()
    window.addEventListener('hashchange', openFromHash)

    return () => window.removeEventListener('hashchange', openFromHash)
  }, [])

  const featureIcon = (name, tone = 'brand') => (
    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50">
      <BrandIcon name={name} size={26} tone={tone} />
    </span>
  )

  return (
    <div className="min-h-screen">
      <SiteNav appUrl={appUrl} onApply={openPrototypeForm} home />

      {/* Hero */}
      <section
        className="relative overflow-hidden text-white"
        style={{
          background:
            'radial-gradient(60% 50% at 100% 0%, rgba(6,182,200,0.35), transparent 70%),' +
            'radial-gradient(50% 45% at 0% 100%, rgba(229,84,140,0.26), transparent 70%),' +
            'linear-gradient(160deg,#0a2533,#0d4254 60%,#0f3447)'
        }}
      >
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:py-24 lg:grid-cols-[1fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20">
              <span className="h-2 w-2 rounded-full bg-accent-400" />
              Now recruiting Austin performers · Limited prototype
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Increase tip volume with visible appreciation.
            </h1>
            <p className="mt-5 text-xl font-semibold text-brand-200">
              More eruptions. More audience momentum. More earnings on stage.
            </p>
            <p className="mt-4 max-w-xl text-lg text-white/75">
              Tipwave turns appreciation into a visible, contagious moment that pulls the room in and drives more people to tip.
            </p>

          {false && (
            <>
              {/* Search Box */}
              <div className="max-w-2xl mx-auto mb-8 relative" ref={resultsRef}>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Find performers using Tipwave…"
                    className="w-full px-6 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-tipwave-teal focus:outline-none shadow-lg"
                    onFocus={() => searchQuery.length >= 3 && searchResults.length > 0 && setShowResults(true)}
                  />
                  {isSearching ? (
                    <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-tipwave-teal"></div>
                    </div>
                  ) : (
                    <svg className="absolute right-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  )}
                </div>

                {/* Search Results Dropdown */}
                {showResults && searchResults.length > 0 && (
                  <div className="absolute w-full mt-2 bg-white rounded-2xl shadow-2xl border-2 border-gray-100 max-h-96 overflow-y-auto z-50">
                    {searchResults.map((performer, index) => (
                      <div
                        key={index}
                        onClick={() => navigateToPerformer(performer.deviceId)}
                        className="px-6 py-4 hover:bg-soft-gray cursor-pointer transition border-b border-gray-100 last:border-b-0"
                      >
                        <div className="font-bold text-deep-charcoal text-lg">{performer.stageName}</div>
                        {performer.bio && (
                          <div className="text-gray-600 text-sm mt-1 line-clamp-2">{performer.bio}</div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* No Results Message */}
                {showResults && searchQuery.length >= 3 && searchResults.length === 0 && !isSearching && (
                  <div className="absolute w-full mt-2 bg-white rounded-2xl shadow-2xl border-2 border-gray-100 p-6 z-50">
                    <p className="text-gray-600 text-center">No artists found matching "{searchQuery}"</p>
                  </div>
                )}
              </div>
            </>
          )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={openPrototypeForm} className="btn-light px-8 py-4 text-lg">
                Apply for prototype access
              </button>
              <a href="#how-it-works" className="btn-ghost-light px-8 py-4 text-lg">See how it works</a>
            </div>
            <p className="mt-6 max-w-xl text-sm text-white/60">
              If you want stronger crowd response and higher tip momentum, this program is built for you.
            </p>
          </div>

          <div className="mx-auto w-full max-w-[600px] rounded-[1.5rem] bg-gradient-to-br from-brand-400 to-accent-500 p-1 shadow-lift">
            <div className="aspect-video w-full overflow-hidden rounded-[1.25rem] bg-black">
              <video
                className="h-full w-full object-contain"
                src="/videos/tipwave-artist-promo.mp4"
                poster="/videos/tipwave-artist-promo-poster.jpg"
                controls
                loop
                playsInline
                preload="metadata"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Prototype program */}
      <section className="bg-white">
        <div className="section-container text-center">
          <p className="eyebrow">Prototype program</p>
          <h2 className="mx-auto max-w-3xl text-3xl font-bold md:text-4xl">Help shape Tipwave before it launches</h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg text-ink-500">
            Tipwave is in limited prototype testing in Austin, TX. We are selecting a small group of performers to test the device in real venues, and their feedback will directly shape the final product and experience.
          </p>
        </div>
      </section>

      {/* Benefits and who we are looking for */}
      <section className="bg-surface">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-16 md:py-20 lg:grid-cols-2">
          <div className="card">
            <h3 className="text-2xl font-bold">Benefits for prototype performers</h3>
            <ul className="mt-6 space-y-4">
              {[
                'Free access to the Tipwave device during the test period',
                'Direct contact with the founder for support and feedback',
                'Early access to new features',
                'Exclusive “Founding Performer” status at launch',
                'Opportunity to influence the final design and experience'
              ].map(t => (
                <li key={t} className="flex items-start gap-3 text-ink-700">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50">
                    <BrandIcon name="check" size={14} strokeWidth={2.6} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3 className="text-2xl font-bold">Who we’re looking for</h3>
            <p className="mt-3 text-ink-500">We’re inviting performers in Austin, TX across live entertainment:</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Solo artists and singer-songwriters', 'Bands and live ensembles', 'Street buskers', 'DJs', 'Comedians'].map(t => (
                <span key={t} className="rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-800">{t}</span>
              ))}
            </div>
            <p className="mt-5 text-ink-500">And other live performers who want stronger audience connection.</p>
          </div>
        </div>
      </section>

      {/* How to join */}
      <section className="bg-white">
        <div className="section-container">
          <div className="text-center">
            <p className="eyebrow">How to join</p>
            <h2 className="text-3xl font-bold md:text-4xl">Three steps to your stage</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              'Fill out the short form',
              'We’ll reach out within 48 hours',
              'If selected, you’ll receive your prototype device and onboarding'
            ].map((t, i) => (
              <div key={t} className="rounded-2xl border border-slate-100 bg-surface p-8 text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-700 text-xl font-bold text-white">{i + 1}</span>
                <p className="mt-5 font-semibold text-ink-700">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Tipwave experience */}
      <section id="features" className="bg-surface">
        <div className="section-container">
          <div className="text-center">
            <p className="eyebrow">The Tipwave experience</p>
            <h2 className="mx-auto max-w-3xl text-3xl font-bold md:text-4xl">Every tip lights up the stage</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-500">
              Tier-based light and sound eruptions turn appreciation into a shared, visible moment that raises energy for everyone in the room.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="card">
              {featureIcon('bolt')}
              <h3 className="mt-5 text-xl font-bold">Instant hardware feedback</h3>
              <p className="mt-3 text-ink-500">
                The 11×6 LED cylinder erupts the instant a tip lands. Each tip tier has its own animation and sound profile, so fans feel the escalation and performers see appreciation happen live.
              </p>
            </div>
            <div className="card">
              {featureIcon('music')}
              <h3 className="mt-5 text-xl font-bold">Song requests on demand</h3>
              <p className="mt-3 text-ink-500">
                Fans scan the QR code, choose a payment method, tip inside the Tipwave app, and the device erupts instantly. Requests arrive in real time so you can adapt your set with confidence.
              </p>
            </div>
            <div className="card">
              {featureIcon('shield')}
              <h3 className="mt-5 text-xl font-bold">Secure payment processing</h3>
              <p className="mt-3 text-ink-500">
                Payments run on Stripe, and tipping happens inside the Tipwave app. Secure rails in the background, instant celebration on stage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The magic of physical feedback */}
      <section id="how-it-works" className="bg-white">
        <div className="section-container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">How it works</p>
            <h2 className="text-3xl font-bold md:text-4xl">The magic of physical feedback</h2>
            <p className="mt-5 text-xl text-ink-700">You give everything, then wonder if the room really felt it.</p>
            <p className="mt-4 text-lg text-ink-500">
              Tipwave makes that answer visible. A fan tips, the LED cylinder erupts with light and sound, and the whole room feels the shift. It is not a silent app notification. It is a physical celebration on stage that restores connection, builds confidence, and keeps momentum alive.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl items-center gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
            {[
              { icon: 'qr', title: 'Scan', text: 'Fans scan the QR code' },
              { icon: 'coin', title: 'Tip', text: 'Pick an amount and tip' },
              { icon: 'sparkle', title: 'Erupt', text: 'Light and sound on stage' }
            ].flatMap((step, i, arr) => {
              const card = (
                <div key={step.title} className="rounded-2xl border border-slate-100 bg-surface p-6 text-center">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-card">
                    <BrandIcon name={step.icon} size={28} />
                  </span>
                  <div className="mt-4 text-lg font-bold">{step.title}</div>
                  <div className="text-sm text-ink-500">{step.text}</div>
                </div>
              )
              return i < arr.length - 1
                ? [card, <div key={`a${i}`} className="hidden justify-center md:flex"><BrandIcon name="chevron-right" size={28} tone="muted" /></div>]
                : [card]
            })}
          </div>

          <div className="mt-10 text-center">
            <button type="button" onClick={openPrototypeForm} className="btn-primary px-8 py-4 text-lg">Apply for prototype access</button>
          </div>
        </div>
      </section>

      {/* Everything you need */}
      <section className="bg-surface">
        <div className="section-container">
          <div className="text-center">
            <p className="eyebrow">For performers</p>
            <h2 className="mx-auto max-w-3xl text-3xl font-bold md:text-4xl">Everything you need to perform better</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-500">
              Built for performer confidence, audience connection, and unmistakable feedback, so every show feels more alive and every tip feels real.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="card">
              {featureIcon('mic')}
              <h3 className="mt-5 text-xl font-bold">Live request queue</h3>
              <p className="mt-3 text-ink-500">
                Requests arrive in real time as tips come in. See demand at a glance, choose what fits your set, and respond while the room stays engaged.
              </p>
            </div>
            <div className="card">
              {featureIcon('sparkle')}
              <h3 className="mt-5 text-xl font-bold">Instant feedback loop</h3>
              <p className="mt-3 text-ink-500">
                QR code, tip, light and sound. That loop boosts audience connection, performer confidence, and repeat tipping behavior.
              </p>
            </div>
            <div className="card">
              {featureIcon('trend-up')}
              <h3 className="mt-5 text-xl font-bold">Performance insights</h3>
              <p className="mt-3 text-ink-500">
                Understand what resonated, when your biggest moments happened, and where support is growing, so you can shape better sets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="bg-white">
        <div className="section-container">
          <div className="text-center">
            <p className="eyebrow">Reviews</p>
            <h2 className="text-3xl font-bold md:text-4xl">What artists are saying</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                quote: 'When the cylinder erupts, the room changes instantly. People cheer, phones come up, and the connection feels undeniable. My tip volume and crowd energy both jumped.',
                name: 'Sarah Mitchell',
                role: 'Singer-Songwriter, Austin, TX'
              },
              {
                quote: 'We play multiple nights a week, and Tipwave gives us instant clarity. The light-and-sound hit tells us the crowd is with us right now, not later. It changed our stage confidence.',
                name: 'Marcus Chen',
                role: 'Drummer, Austin, TX'
              },
              {
                quote: 'As a busker, visible feedback matters. The eruption stops people in their tracks, invites more tips, and makes every contribution feel celebrated in public.',
                name: 'Alex Rivera',
                role: 'Street Busker, Austin, TX'
              }
            ].map(t => (
              <figure key={t.name} className="rounded-2xl border border-slate-100 bg-surface p-8">
                <div className="flex gap-1 text-amber-400" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="mt-4 text-ink-700">“{t.quote}”</blockquote>
                <figcaption className="mt-6">
                  <div className="font-bold">{t.name}</div>
                  <div className="text-sm text-ink-500">{t.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Closing call to action */}
      <section
        className="relative overflow-hidden text-white"
        style={{
          background:
            'radial-gradient(55% 80% at 100% 0%, rgba(229,84,140,0.35), transparent 70%),' +
            'linear-gradient(135deg,#0E7490,#0a2533)'
        }}
      >
        <div className="mx-auto max-w-4xl px-6 py-16 text-center md:py-24">
          <h2 className="text-4xl font-bold md:text-5xl">Ready to feel the magic?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-xl text-white/85">
            Be among the first performers to experience Tipwave’s live eruption moment.
          </p>
          <p className="mt-3 text-white/65">Limited prototype spots in Austin, TX · Become a Founding Performer.</p>
          <button type="button" onClick={openPrototypeForm} className="btn-light mt-8 px-10 py-4 text-lg">
            Apply for prototype access
          </button>
        </div>
      </section>

      <SiteFooter appUrl={appUrl} onApply={openPrototypeForm} />

      <WaitlistModal
        open={showWaitlistForm}
        onClose={() => setShowWaitlistForm(false)}
        form={waitlistForm}
        onChange={handleWaitlistInput}
        onSubmit={handleWaitlistSubmit}
        submitting={waitlistSubmitting}
        message={waitlistMessage}
      />
    </div>
  )
}

export default App
