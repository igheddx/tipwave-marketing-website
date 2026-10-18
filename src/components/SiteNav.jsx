import { useState } from 'react'
import { BrandIcon } from './BrandIcons'

/**
 * The top bar shared by every page. On the home page the section links scroll in place;
 * on other pages they go back to the home page first.
 */
export default function SiteNav({ appUrl, onApply, home = false }) {
  const [open, setOpen] = useState(false)
  const base = home ? '' : '/'
  const links = [
    { href: `${base}#features`, label: 'Features' },
    { href: `${base}#how-it-works`, label: 'How it works' },
    { href: `${base}#reviews`, label: 'Reviews' },
    { href: '/performer-help', label: 'Help center' }
  ]
  const apply = onApply
    ? { onClick: () => { setOpen(false); onApply() } }
    : { href: '/#apply-prototype-access' }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="/" className="flex items-center" aria-label="Tipwave home">
          <img src="/images/logo/tipwave-logo-v2.png" alt="Tipwave" className="h-9 w-auto" />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {links.map(l => (
            <a key={l.label} href={l.href} className="text-sm font-semibold text-ink-700 transition-colors hover:text-brand-700">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a href={`${appUrl}/login`} className="px-3 py-2 text-sm font-semibold text-ink-700 hover:text-brand-700">
            Artist sign in
          </a>
          {onApply ? (
            <button type="button" {...apply} className="btn-primary px-5 py-2.5 text-sm">Apply for access</button>
          ) : (
            <a {...apply} className="btn-primary px-5 py-2.5 text-sm">Apply for access</a>
          )}
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-ink-900 md:hidden"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          <BrandIcon name={open ? 'close' : 'menu'} size={24} tone="current" strokeWidth={2} />
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map(l => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-2 py-3 font-semibold text-ink-700 hover:bg-slate-50">
                {l.label}
              </a>
            ))}
            <a href={`${appUrl}/login`} className="rounded-lg px-2 py-3 font-semibold text-ink-700 hover:bg-slate-50">Artist sign in</a>
            {onApply ? (
              <button type="button" {...apply} className="btn-primary mt-2">Apply for access</button>
            ) : (
              <a {...apply} className="btn-primary mt-2">Apply for access</a>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
