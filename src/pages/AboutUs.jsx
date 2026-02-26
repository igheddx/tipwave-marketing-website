import TipwaveLogo from '../assets/tipwave-logo2.png'

export default function AboutUs() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="h-20 w-auto">
              <a href="/">
                <img src={TipwaveLogo} alt="Tipwave" className="h-full" />
              </a>
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              <a href="/#features" className="text-deep-charcoal hover:text-tipwave-teal transition">Features</a>
              <a href="/#how-it-works" className="text-deep-charcoal hover:text-tipwave-teal transition">How It Works</a>
              <a href="/#reviews" className="text-deep-charcoal hover:text-tipwave-teal transition">Reviews</a>
              <a href="/login" className="btn-secondary">Performer Dashboard</a>
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
            <span className="block font-bold mt-4">When someone says "thank you," the performer should feel it instantly — in the room, on stage, in real light and sound.</span>
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
                Digital tipping made payments convenient, but it made appreciation invisible. Performers give everything in real time, yet gratitude often arrives as a silent notification after the moment has passed.
              </p>
              <p>
                Tipwave brings the spark back with hardware you can see and hear.
              </p>
              <p className="pt-4">
                Live performance is built on shared emotion. When appreciation is silent, that loop breaks. Tipwave was built to restore it.
              </p>
              <p>
                Our 11×6 LED cylinder erupts with light and sound the instant a fan tips. It turns a payment into a physical stage moment — visible, unmistakable, and emotionally clear for everyone present.
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
                <span className="block font-bold mt-2">Performers were giving everything, but receiving appreciation in silence.</span>
              </p>
              <p>
                Dominic, our founder, spent countless nights watching artists pour themselves out on stage while tips arrived quietly on a screen. The gratitude was real, but the emotional moment was missing.
              </p>
              <p>
                He believed appreciation should be physical, visible, and immediate.
              </p>
              <p>
                So he built Tipwave: hardware plus software that turns QR Code → Tip → Light & Sound Eruption into a single unforgettable stage moment.
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
                We imagine a world where every performer — from buskers to touring artists — gets immediate emotional clarity from their audience. A world where generosity is felt, not guessed.
              </p>
              <p className="pt-4">
                <span className="block font-bold mb-2">Tipwave is more than a tool.</span>
                It's a physical celebration of the human moment.
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
                <span><strong className="text-deep-charcoal">Human-first design</strong> — every feature must strengthen real-time performer-audience connection</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-tipwave-teal font-bold text-2xl mt-1">•</span>
                <span><strong className="text-deep-charcoal">Respect for performers</strong> — their craft, confidence, and emotional labor matter</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-tipwave-teal font-bold text-2xl mt-1">•</span>
                <span><strong className="text-deep-charcoal">Simplicity</strong> — QR Code → Tip → Light & Sound Eruption</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-tipwave-teal font-bold text-2xl mt-1">•</span>
                <span><strong className="text-deep-charcoal">Presence</strong> — technology should amplify the stage moment, not hide it</span>
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
            Be among the first performers to experience Tipwave’s live eruption moment
          </p>
          <a href="/onboarding" className="bg-white text-tipwave-teal px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition shadow-lg inline-block">
            Apply for Prototype Access
          </a>
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
                Tipwave is a hardware-plus-software tipping experience built around an 11×6 LED cylinder that erupts the instant a fan tips. Built for connection, confidence, and stage magic.
              </p>
              <p className="text-gray-300 mt-4 font-medium">
                Limited prototype spots available in Austin. Apply to become a Founding Performer.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="https://app.tipwave.live/onboarding" className="hover:text-white transition">Apply for Prototype Access</a></li>
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
