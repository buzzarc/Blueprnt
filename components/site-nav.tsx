'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const LINKS = [
  { href: '/', label: 'Intro' },
  { href: '/choose', label: 'Choose' },
  { href: '/generate', label: 'Generate' },
  { href: '/roadmaps', label: 'Roadmaps' },
  { href: '/about', label: 'About' },
]

export function SiteNav({ variant = 'dark' }: { variant?: 'dark' | 'paper' | 'blue' }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const onLight = variant === 'paper' || variant === 'blue'
  const text = onLight ? 'text-ink' : 'text-foreground'
  const border = onLight ? 'border-ink/15' : 'border-border'
  const muted = onLight ? 'text-ink/55' : 'text-muted-foreground'

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b backdrop-blur-sm',
        border,
        variant === 'paper' && 'bg-paper/85',
        variant === 'blue' && 'bg-blue/85',
        variant === 'dark' && 'bg-background/85',
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label="DUMPMAP home">
          <span className="h-4 w-4 bg-red" aria-hidden />
          <span className={cn('label text-sm tracking-[0.22em]', text)}>Dumpmap</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => {
            const active = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'label text-xs transition-colors',
                    active ? (onLight ? 'text-red' : 'text-red') : cn(muted, 'hover:text-red'),
                  )}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cn('md:hidden', text)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div
          className={cn(
            'border-t md:hidden',
            border,
            variant === 'paper' && 'bg-paper',
            variant === 'blue' && 'bg-blue',
            variant === 'dark' && 'bg-background',
          )}
        >
          <ul className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6">
            {LINKS.map((link) => {
              const active = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'label block py-3 text-sm',
                      active ? 'text-red' : text,
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </header>
  )
}
