import TipwaveLogo from '../assets/tipwave-logo2.png'

export default function AboutUs() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="h-12 w-auto">
              <a href="/">
                <img src={TipwaveLogo} alt="Tipwave" className="h-full origin-left scale-[4]" />
              </a>
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              <a href="/#features" className="text-deep-charcoal hover:text-tipwave-teal transition">Features</a>
              <a href="/#how-it-works" className="text-deep-charcoal hover:text-tipwave-teal transition">How It Works</a>
              <a href="/#reviews" className="text-deep-charcoal hover:text-tipwave-teal transition">Reviews</a>
              <a href="/login" className="btn-secondary">Artist Sign In</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white to-soft-gray pt-20 pb-16">
        <div className="section-container text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-deep-charcoal mb-8">
            Restoring the Human Moment in Live Performance
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tipwave exists for one simple belief:  
            <span className="block font-bold mt-4">When someone says "thank you," the performer should feel it.</span>
          </p>
        </div>
      </section>

      {/* Why Tipwave Exists */}
      <section className="bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-deep-charcoal mb-8">Why Tipwave Exists</h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                In today's world, digital payments have made tipping convenient — but invisible. Performers pour their heart into every moment, yet appreciation often arrives as a silent notification long after the show is over. No eye contact. No shared smile. No spark.
              </p>
              <p>
                We're here to bring that spark back.
              </p>
              <p className="pt-4">
                Live performance is one of the last places where humans gather to feel something together. But the emotional loop between performer and audience has quietly broken. Tipwave was created to repair it.
              </p>
              <p>
                Our device lights up, reacts, and celebrates instantly when someone tips — turning a simple gesture into a shared moment of joy. It's not just a payment. It's presence. It's connection. It's the moment every performer deserves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-soft-gray">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-deep-charcoal mb-8">Our Story</h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                Tipwave began with a simple observation:  
                <span className="block font-bold mt-2">Performers were giving everything, but receiving nothing they could <em>feel</em>.</span>
              </p>
              <p>
                Dominic, our founder, spent countless nights watching musicians, comedians, poets, and creators pour themselves out on stage — only to get a quiet buzz on their phone hours later. The gratitude was real, but the moment was gone.
              </p>
              <p>
                He believed appreciation should be visible. Emotional. Human.
              </p>
              <p>
                So he built a device that brings the audience's "thank you" back into the room — where it belongs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision */}
      <section className="bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-deep-charcoal mb-8">Our Vision</h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                We imagine a world where every performer — from street artists to touring musicians — can feel the love their audience gives them. A world where generosity is joyful, not silent. A world where technology amplifies connection instead of replacing it.
              </p>
              <p className="pt-4">
                <span className="block font-bold mb-2">Tipwave is more than a tool.</span>
                It's a celebration of the human moment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-soft-gray">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-deep-charcoal mb-12">Our Values</h2>
            <ul className="space-y-6 text-lg text-gray-600">
              <li className="flex items-start gap-4">
                <span className="text-tipwave-teal font-bold text-2xl mt-1">•</span>
                <span><strong className="text-deep-charcoal">Human-first design</strong> — every feature must deepen connection</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-tipwave-teal font-bold text-2xl mt-1">•</span>
                <span><strong className="text-deep-charcoal">Respect for performers</strong> — their craft, time, and emotional labor matter</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-tipwave-teal font-bold text-2xl mt-1">•</span>
                <span><strong className="text-deep-charcoal">Simplicity</strong> — tipping should be effortless and delightful</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-tipwave-teal font-bold text-2xl mt-1">•</span>
                <span><strong className="text-deep-charcoal">Presence</strong> — technology should enhance the moment, not distract from it</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-tipwave-teal to-tipwave-magenta text-white">
        <div className="section-container text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to Join Our Mission?</h2>
          <p className="text-2xl mb-12 opacity-90">
            Be among the first performers to experience Tipwave
          </p>
          <a href="/onboarding" className="bg-white text-tipwave-teal px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition shadow-lg inline-block">
            Join the Waitlist
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-deep-charcoal text-white">
        <div className="section-container">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="h-24 w-auto mb-4">
                <img src={TipwaveLogo} alt="Tipwave" className="h-full" />
              </div>
              <p className="text-gray-400">
                Tipwave turns digital appreciation into physical magic. Currently in limited prototype with select Austin performers. Join the waitlist to help shape the future of live performance.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/onboarding" className="hover:text-white transition">Sign Up</a></li>
                <li><a href="/login" className="hover:text-white transition">Login</a></li>
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
