const inputClass =
  'w-full h-12 rounded-xl border border-slate-300 bg-white px-4 text-ink-900 placeholder:text-ink-400 transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand-500'

export default function WaitlistModal({ open, onClose, form, onChange, onSubmit, submitting, message }) {
  if (!open) return null
  const ok = message && message.includes('Success')
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-label="Apply for access">
      <div className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-lift sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-ink-900">Apply for access</h2>
            <p className="mt-1 text-sm text-ink-500">We will reach out within 48 hours.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="flex h-9 w-9 items-center justify-center rounded-full text-ink-500 hover:bg-slate-100">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="wl-first" className="mb-1.5 block text-sm font-semibold text-ink-700">First name</label>
              <input id="wl-first" type="text" name="firstName" autoComplete="given-name" value={form.firstName} onChange={onChange} required className={inputClass} />
            </div>
            <div>
              <label htmlFor="wl-last" className="mb-1.5 block text-sm font-semibold text-ink-700">Last name</label>
              <input id="wl-last" type="text" name="lastName" autoComplete="family-name" value={form.lastName} onChange={onChange} required className={inputClass} />
            </div>
          </div>
          <div>
            <label htmlFor="wl-email" className="mb-1.5 block text-sm font-semibold text-ink-700">Email</label>
            <input id="wl-email" type="email" name="email" autoComplete="email" value={form.email} onChange={onChange} required className={inputClass} placeholder="you@example.com" />
          </div>
          <div>
            <label htmlFor="wl-phone" className="mb-1.5 block text-sm font-semibold text-ink-700">
              Phone <span className="font-normal text-ink-500">(optional)</span>
            </label>
            <input id="wl-phone" type="tel" name="phone" autoComplete="tel" value={form.phone} onChange={onChange} className={inputClass} placeholder="+1 (555) 000-0000" />
          </div>

          {message && (
            <div role="status" className={`rounded-xl px-4 py-3 text-center text-sm font-semibold ${ok ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {message}
            </div>
          )}

          <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-50">
            {submitting ? 'Sending…' : 'Send application'}
          </button>
        </form>
      </div>
    </div>
  )
}
