export default function SiteFooter({ appUrl, onApply }) {
  const apply = onApply ? (
    <button type="button" onClick={onApply} className="transition-colors hover:text-white">Apply for access</button>
  ) : (
    <a href="/#apply-prototype-access" className="transition-colors hover:text-white">Apply for access</a>
  )
  return (
    <footer className="bg-ink-900 text-white">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <img src="/images/logo/tipwave-logo-v2-light.png" alt="Tipwave" className="h-9 w-auto" />
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Tipwave makes appreciation impossible to miss, creating a shared moment between performers and their audience.
            </p>
            <p className="mt-4 text-sm font-medium text-slate-300">
              Limited prototype spots in Austin. Apply to become a Founding Performer.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-300">Product</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>{apply}</li>
              <li><a href={`${appUrl}/login`} className="transition-colors hover:text-white">Artist sign in</a></li>
              <li><a href="/performer-help" className="transition-colors hover:text-white">Help center</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-300">Company</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="/about" className="transition-colors hover:text-white">About us</a></li>
              <li><a href="mailto:contact@tipwave.live" className="transition-colors hover:text-white">contact@tipwave.live</a></li>
              <li><a href="tel:+18776847928" className="transition-colors hover:text-white">877-684-7928</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-300">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="/terms-of-service.html" className="transition-colors hover:text-white">Terms of service</a></li>
              <li><a href="/privacy-policy.html" className="transition-colors hover:text-white">Privacy policy</a></li>
              <li><a href="/acceptable-use-policy.html" className="transition-colors hover:text-white">Acceptable use</a></li>
              <li><a href="/refund-policy.html" className="transition-colors hover:text-white">Refund policy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-slate-500">
          &copy; 2026 Tipwave. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
