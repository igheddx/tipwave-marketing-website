import { useState } from 'react'

function App() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-tipwave-blue">
              Tipwave
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#features" className="text-deep-charcoal hover:text-tipwave-blue transition">Features</a>
              <a href="#how-it-works" className="text-deep-charcoal hover:text-tipwave-blue transition">How It Works</a>
              <a href="#reviews" className="text-deep-charcoal hover:text-tipwave-blue transition">Reviews</a>
              <a href="#live-artists" className="text-deep-charcoal hover:text-tipwave-blue transition">Live Artists</a>
              <button className="btn-secondary">Artist Sign In</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white to-soft-gray pt-20 pb-32">
        <div className="section-container text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-deep-charcoal mb-6">
            Get Paid for Your Performance
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Tipwave empowers live performers with instant, secure tips and song requests from your audience—no hardware required.
          </p>
          
          {/* Search Box */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search artists by stage name…"
                className="w-full px-6 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-tipwave-blue focus:outline-none shadow-lg"
              />
              <svg className="absolute right-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary text-lg px-8 py-4">Artist Sign Up</button>
            <button className="btn-outline text-lg px-8 py-4">See Who's Live</button>
          </div>
        </div>
      </section>

      {/* Built for Artists Section */}
      <section id="features" className="bg-white">
        <div className="section-container">
          <h2 className="text-4xl font-bold text-center mb-4">Built for Artists</h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Everything you need to get paid and connect with your fans in real-time
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card text-center">
              <div className="w-16 h-16 bg-emerald rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Secured Payments</h3>
              <p className="text-gray-600">
                Powered by Stripe. Your money is safe, secure, and deposited directly to your account.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card text-center">
              <div className="w-16 h-16 bg-tipwave-blue rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Setlist & Queue Management</h3>
              <p className="text-gray-600">
                Let fans request songs. You control what gets played. Simple, transparent, and fun.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card text-center">
              <div className="w-16 h-16 bg-emerald rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Custom QR Codes</h3>
              <p className="text-gray-600">
                Display your unique QR code on stage. Fans scan, tip, and request in seconds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* No Hardware Needed Section */}
      <section id="how-it-works" className="bg-soft-gray">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">No Hardware Needed</h2>
              <p className="text-xl text-gray-600 mb-6">
                Tipwave runs entirely on your phone. No expensive terminals, no complicated setup, no hidden fees.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Just open the app, share your link or QR code, and start receiving tips and song requests instantly. Your fans tap their phone, and you get paid—simple as that.
              </p>
              <button className="btn-primary">Get Started Free</button>
            </div>
            <div className="bg-gradient-to-br from-tipwave-blue to-emerald rounded-2xl h-96 flex items-center justify-center shadow-2xl">
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
          <h2 className="text-4xl font-bold text-center mb-4">Your Digital Tip Jar, Your Way</h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Powerful features that put you in control of your performance
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold mb-4">Real-Time Queue</h3>
              <p className="text-gray-600">
                See song requests as they come in. Accept, decline, or rearrange your queue on the fly.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card">
              <div className="text-4xl mb-4">🎸</div>
              <h3 className="text-2xl font-bold mb-4">Band Mode</h3>
              <p className="text-gray-600">
                Split tips automatically with your bandmates. Fair, transparent, and instant.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-2xl font-bold mb-4">Track Everything</h3>
              <p className="text-gray-600">
                View your earnings, top songs, and fan engagement all in one beautiful dashboard.
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
                "Tipwave changed my game. I'm making more in tips than I ever did with a tip jar, and my fans love requesting songs."
              </p>
              <div className="font-bold">Sarah Mitchell</div>
              <div className="text-sm text-gray-500">Austin, TX</div>
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
                "No more cash handling. No more awkward tip jars. Just scan, tip, and done. My earnings doubled in the first month."
              </p>
              <div className="font-bold">Marcus Chen</div>
              <div className="text-sm text-gray-500">Nashville, TN</div>
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
                "The Band Mode feature is incredible. Tips are split automatically between our whole group. No more arguments!"
              </p>
              <div className="font-bold">Alex Rivera</div>
              <div className="text-sm text-gray-500">Portland, OR</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-tipwave-blue to-emerald text-white">
        <div className="section-container text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to Get Paid?</h2>
          <p className="text-2xl mb-8 opacity-90">
            Join thousands of artists already using Tipwave
          </p>
          <p className="text-lg mb-12 opacity-80">
            No credit card required • Free to start • 2 minutes setup
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-tipwave-blue px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition shadow-lg">
              Get Started for Free
            </button>
            <button className="border-2 border-white text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-tipwave-blue transition">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-deep-charcoal text-white">
        <div className="section-container">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="text-2xl font-bold text-tipwave-blue mb-4">Tipwave</div>
              <p className="text-gray-400">
                Empowering live performers with instant, secure tips and song requests.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Sign Up</a></li>
                <li><a href="#" className="hover:text-white transition">Login</a></li>
                <li><a href="#live-artists" className="hover:text-white transition">Live Artists</a></li>
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
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Acceptable Use</a></li>
                <li><a href="#" className="hover:text-white transition">Refund Policy</a></li>
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
