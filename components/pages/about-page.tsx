import { Globe, AtSign, Send } from 'lucide-react'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'

export function AboutPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteNav />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <span className="label text-xs text-muted-foreground">About / Dumpmap</span>
          <span className="label hidden text-xs text-blue sm:block">Built For People With Too Many Ideas</span>
        </div>

        <h1 className="headline mt-6 text-[15vw] leading-[0.82] text-red lg:text-[9rem]">
          Raw Ideas Need Maps
        </h1>

        {/* Mission + Connect */}
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="grain border border-border bg-card p-6 sm:p-8">
            <h2 className="headline text-4xl text-card-foreground">Mission</h2>
            <p className="mt-4 max-w-md text-sm font-medium leading-relaxed text-muted-foreground">
              Dumpmap exists for the moment between excitement and overwhelm — when you know the{' '}
              <span className="text-blue">direction</span>, but not the sequence. It converts
              scattered thoughts into actions you can actually follow.
            </p>
          </div>

          <div className="grain border border-ink/15 bg-paper p-6 text-paper-foreground sm:p-8">
            <h2 className="headline text-4xl">Connect</h2>
            <div className="mt-5 flex gap-3">
              <a
                href="#"
                aria-label="Website"
                className="flex h-11 w-11 items-center justify-center border border-ink/20 text-ink transition-colors hover:bg-red hover:text-red-foreground"
              >
                <Globe className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Social"
                className="flex h-11 w-11 items-center justify-center border border-ink/20 text-ink transition-colors hover:bg-red hover:text-red-foreground"
              >
                <AtSign className="h-5 w-5" />
              </a>
              <a
                href="mailto:hello@dumpmap.ai"
                aria-label="Email"
                className="flex h-11 w-11 items-center justify-center border border-ink/20 text-ink transition-colors hover:bg-red hover:text-red-foreground"
              >
                <Send className="h-5 w-5" />
              </a>
            </div>
            <a
              href="mailto:hello@dumpmap.ai"
              className="label mt-6 inline-block text-sm text-red hover:underline"
            >
              hello@dumpmap.ai
            </a>
          </div>
        </div>

        {/* How it works strip */}
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {[
            { n: '01', t: 'You dump', d: 'Every messy thought, constraint, and half-idea goes in — no structure required.' },
            { n: '02', t: 'AI translates', d: 'Context becomes constraints, and constraints become a staged, personal route.' },
            { n: '03', t: 'You move', d: 'Weekly milestones, tools, and checkpoints turn the plan into momentum.' },
          ].map((s) => (
            <div key={s.n} className="grain border border-border bg-card p-6">
              <span className="headline text-3xl text-blue">{s.n}</span>
              <h3 className="mt-3 text-lg font-extrabold text-card-foreground">{s.t}</h3>
              <p className="mt-2 text-sm font-medium leading-relaxed text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>

        {/* Big red statement */}
        <div className="grain mt-4 flex min-h-56 items-center justify-center bg-red p-8 text-center text-red-foreground sm:p-12">
          <h2 className="headline text-[9vw] leading-[0.85] sm:text-6xl lg:text-7xl">
            You bring the mess.<br />The map brings motion.
          </h2>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
