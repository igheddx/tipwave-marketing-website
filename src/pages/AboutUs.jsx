import SiteNav from '../components/SiteNav'
import SiteFooter from '../components/SiteFooter'

export default function AboutUs({ appUrl = 'https://app.tipwave.live' }) {
  return (
    <div className="min-h-screen">
      <SiteNav appUrl={appUrl} />

      {/* Hero Section */}
      <section className="text-white" style={{
          background:
            'radial-gradient(60% 50% at 100% 0%, rgba(6,182,200,0.35), transparent 70%),' +
            'radial-gradient(50% 45% at 0% 100%, rgba(229,84,140,0.26), transparent 70%),' +
            'linear-gradient(160deg,#0a2533,#0d4254 60%,#0f3447)'
        }}>
        <div className="mx-auto max-w-4xl px-6 py-16 text-center md:py-24">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Restoring the Human Moment in Live Performance
          </h1>
          <p className="text-xl text-white/75 max-w-3xl mx-auto">
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
                So he built Tipwave: hardware plus software that turns QR Code → Payment Method → Tip → Light & Sound Eruption into a single unforgettable stage moment.
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
                <span><strong className="text-deep-charcoal">Simplicity</strong> — QR Code → Payment Method → Tip → Light & Sound Eruption</span>
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
      <section className="text-white" style={{
          background:
            'radial-gradient(55% 80% at 100% 0%, rgba(229,84,140,0.35), transparent 70%),' +
            'linear-gradient(135deg,#0E7490,#0a2533)'
        }}>
        <div className="section-container text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to Join Our Mission?</h2>
          <p className="text-2xl mb-12 opacity-90">
            Be among the first performers to experience Tipwave’s live eruption moment
          </p>
          <a href="/#apply-prototype-access" className="btn-light px-10 py-4 text-lg">
            Apply for Prototype Access
          </a>
        </div>
      </section>

      <SiteFooter appUrl={appUrl} />
    </div>
  )
}
