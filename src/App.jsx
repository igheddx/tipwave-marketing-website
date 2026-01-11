import { useState, useEffect, useRef } from 'react'
import TipwaveLogo from './assets/tipwave-logo2.png'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const searchTimeoutRef = useRef(null)
  const resultsRef = useRef(null)

  // Determine app URL based on environment with env override
  const getAppUrl = () => {
    const envAppUrl = import.meta.env.VITE_APP_URL
    if (envAppUrl) return envAppUrl

    const hostname = window.location.hostname
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:3000'
    }
    return 'https://app.tipply.live'
  }

  // Determine backend API URL based on environment with env override
  const getApiUrl = () => {
    const envApiUrl = import.meta.env.VITE_API_URL
    if (envApiUrl) return envApiUrl

    const hostname = window.location.hostname
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:5000'
    }
    // Fallback: Tipply backend BaseUrl (from backend appsettings)
    return 'https://uhxejjh8s1.execute-api.us-east-1.amazonaws.com/dev'
  }

  const appUrl = getAppUrl()
  const apiUrl = getApiUrl()

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
        console.error('Search failed:', response.status)
        setSearchResults([])
      }
    } catch (error) {
      console.error('Search error:', error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  // Handle search input change with debounce
  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchQuery(value)

    // Clear existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    // Set new timeout for search
    if (value.length >= 3) {
      searchTimeoutRef.current = setTimeout(() => {
        searchPerformers(value)
      }, 300) // 300ms debounce
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

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="h-12 w-auto">
              <img src={TipwaveLogo} alt="Tipwave" className="h-full" />
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#features" className="text-deep-charcoal hover:text-tipwave-teal transition">Features</a>
              <a href="#how-it-works" className="text-deep-charcoal hover:text-tipwave-teal transition">How It Works</a>
              <a href="#reviews" className="text-deep-charcoal hover:text-tipwave-teal transition">Reviews</a>
              <a href="#live-artists" className="text-deep-charcoal hover:text-tipwave-teal transition">Live Artists</a>
              <a href={`${appUrl}/login`} className="btn-secondary">Artist Sign In</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white to-soft-gray pt-20 pb-32">
        <div className="section-container text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-deep-charcoal mb-6">
            Every Tip Becomes a Spark. Every Moment, Unforgettable.
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Tipwave transforms digital appreciation into something you can see, hear, and feel. When your audience tips, your device erupts with light and sound. It's a physical celebration that fills the room and fuels your performance. You don't just get paid. You feel seen.
          </p>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto italic">
            This is live performance, electrified. No hidden notifications. No silence. Just pure, radiant connection between you and your fans.
          </p>
          <p className="text-base text-gray-500 mb-12 max-w-2xl mx-auto">
            <strong>Now in Limited Prototype:</strong> Tipwave is currently being tested with select performers in Austin, TX. Join the waitlist to become a founding performer and help shape the future of live performance.
          </p>
          
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

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`${appUrl}/onboarding`} className="btn-primary text-lg px-8 py-4 inline-block text-center">Join the Waitlist</a>
            <button className="btn-outline text-lg px-8 py-4">See Prototype in Action</button>
          </div>
        </div>
      </section>

      {/* Built for Artists Section */}
      <section id="features" className="bg-white">
        <div className="section-container">
          <h2 className="text-4xl font-bold text-center mb-4">The Tipwave Experience</h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            You pour your heart into every performance. Now, your audience's appreciation glows back at you in real time, in living color.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card text-center">
              <div className="w-16 h-16 bg-tipwave-teal rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Instant Hardware Feedback</h3>
              <p className="text-gray-600">
                The moment a fan sends a tip, your device pulses with color and sound. Every tier has its own animation, building anticipation, celebrating generosity, and making every contribution feel monumental.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card text-center">
              <div className="w-16 h-16 bg-tipwave-magenta rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Song Requests on Demand</h3>
              <p className="text-gray-600">
                Your fans want to hear you play their favorite song. With a scan and a tap, they make it happen. You see their request instantly, choose what to play, and give them a moment they'll never forget.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card text-center">
              <div className="w-16 h-16 bg-tipwave-teal rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Secure Stripe Payments</h3>
              <p className="text-gray-600">
                Your earnings flow directly to you, protected by Stripe's world-class security. No cash. No confusion. Just fast, safe payouts so you can focus on what matters: your performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* A Tip You Can Feel Section */}
      <section id="how-it-works" className="bg-soft-gray">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">The Magic of Physical Feedback</h2>
              <p className="text-xl text-gray-600 mb-6">
                You've felt the silence after a great set. The awkward moment when you wonder if they loved it.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                With Tipwave, that silence turns into light. Your audience taps their screen. Your device erupts. Everyone sees it. Everyone feels it. The energy surges, the room lights up, and you know, instantly, that you're connecting.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                This isn't a buzz in your pocket. It's a celebration on your stage. A visible, radiant thank-you that turns appreciation into pure energy.
              </p>
              <button className="btn-primary">Join Early Access</button>
            </div>
            <div className="bg-gradient-to-br from-tipwave-teal to-tipwave-magenta rounded-2xl h-96 flex items-center justify-center shadow-2xl">
              <svg className="w-32 h-32 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Your Digital Tip Jar Section */}
      <section className="bg-white">
        <div className="section-container">
          <h2 className="text-4xl font-bold text-center mb-4">Everything You Need to Perform Better</h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Tipwave doesn't just help you earn. It helps you connect, grow, and turn every show into something magical.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold mb-4">Live Request Queue</h3>
              <p className="text-gray-600">
                Requests flow in as you perform. See what your fans want to hear, accept the ones that feel right, and shape your set in real time. Your show, your choice, their joy.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card">
              <div className="text-4xl mb-4">🎸</div>
              <h3 className="text-2xl font-bold mb-4">Instant Feedback Loop</h3>
              <p className="text-gray-600">
                Every tip is a jolt of joy. Your fans see their appreciation light up your stage. You feel their energy surge through the room. It's a loop of positivity that amplifies every performance.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-2xl font-bold mb-4">Performance Insights</h3>
              <p className="text-gray-600">
                See what's working. Which songs resonate. Who your biggest supporters are. Your dashboard shows you the story behind your earnings, so you can grow smarter, not harder.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="reviews" className="bg-soft-gray">
        <div className="section-container">
          <h2 className="text-4xl font-bold text-center mb-16">What Artists Are Saying</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="card">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "The moment that device lights up, the whole crowd erupts. It's magical. I've tripled my tips and my fans feel more connected than ever."
              </p>
              <div className="font-bold">Sarah Mitchell</div>
              <div className="text-sm text-gray-500">Singer-Songwriter, Austin, TX</div>
            </div>

            {/* Testimonial 2 */}
            <div className="card">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "My band plays three nights a week. With Tipwave, tips come in instantly, the device creates amazing energy on stage, and everyone gets paid automatically. Game-changer."
              </p>
              <div className="font-bold">Marcus Chen</div>
              <div className="text-sm text-gray-500">Drummer, Austin, TX</div>
            </div>

            {/* Testimonial 3 */}
            <div className="card">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "I busk downtown. The Tipwave device completely changed my street performance. Fans tip way more when they see the light show. Plus, it's secure and professional."
              </p>
              <div className="font-bold">Alex Rivera</div>
              <div className="text-sm text-gray-500">Street Busker, Austin, TX</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-tipwave-teal to-tipwave-magenta text-white">
        <div className="section-container text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to Feel the Magic?</h2>
          <p className="text-2xl mb-8 opacity-90">
            Be among the first performers to experience Tipwave
          </p>
          <p className="text-lg mb-12 opacity-80">
            Limited prototype spots available in Austin, TX • Join the waitlist to become a founding performer
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-tipwave-teal px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition shadow-lg">
              Join the Waitlist
            </button>
            <button className="border-2 border-white text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-tipwave-teal transition">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-deep-charcoal text-white">
        <div className="section-container">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="h-12 w-auto mb-4">
                <img src={TipwaveLogo} alt="Tipwave" className="h-full" />
              </div>
              <p className="text-gray-400">
                Tipwave turns digital appreciation into physical magic. Currently in limited prototype with select Austin performers. Join the waitlist to help shape the future of live performance.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href={`${appUrl}/onboarding`} className="hover:text-white transition">Sign Up</a></li>
                <li><a href={`${appUrl}/login`} className="hover:text-white transition">Login</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
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

export default App
