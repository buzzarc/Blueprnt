import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { PREMADE_ROADMAPS } from '@/lib/premade-roadmaps'

export function RoadmapsPage() {
  const featured = PREMADE_ROADMAPS.find((r) => r.featured) ?? PREMADE_ROADMAPS[0]
  const rest = PREMADE_ROADMAPS

  return (
    <div className="flex min-h-dvh flex-col bg-paper text-paper-foreground">
      <SiteNav variant="paper" />

      {/* Giant title */}
      <section className="mx-auto w-full max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <h1 className="headline text-[19vw] leading-[0.78] text-ink lg:text-[11rem]">Roadmaps</h1>
      </section>

      {/* Generate + Featured */}
      <section className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-10 sm:px-6 md:grid-cols-2 lg:px-8">
        <div className="grain flex flex-col justify-between gap-8 border border-ink/15 bg-ink p-6 text-foreground sm:p-8">
          <div>
            <span className="label text-xs text-muted-foreground">Generate / Personal</span>
            <h2 className="headline mt-3 text-4xl sm:text-5xl">Paste the dump.</h2>
            <p className="mt-4 max-w-sm text-sm font-medium leading-relaxed text-muted-foreground">
              Not sure which path fits? Feed your own idea to the AI and get a roadmap built only
              for you.
            </p>
          </div>
          <Link
            href="/generate"
            className="group inline-flex w-fit items-center gap-2 bg-red px-6 py-4 text-sm font-bold uppercase tracking-widest text-red-foreground transition-transform hover:-translate-y-0.5"
          >
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            Generate Roadmap
          </Link>
        </div>

        <Link
          href={`/roadmaps/${featured.slug}`}
          className="group grain flex flex-col justify-between gap-8 border border-red bg-red p-6 text-red-foreground transition-transform hover:-translate-y-1 sm:p-8"
        >
          <span className="label text-xs">Featured Premade</span>
          <div>
            <h2 className="headline text-5xl sm:text-6xl">{featured.title}</h2>
            <p className="mt-4 max-w-md text-sm font-medium leading-relaxed">{featured.tagline}</p>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
            Open Path <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </section>

      {/* Premade grid */}
      <section className="mx-auto w-full max-w-7xl flex-1 px-4 pb-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between border-b-2 border-ink/20 pb-4">
          <h2 className="headline text-4xl text-ink sm:text-5xl">Premade paths</h2>
          <span className="label hidden text-[0.7rem] text-ink/50 sm:block">Browse first. Remix later.</span>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((r) => (
            <Link
              key={r.slug}
              href={`/roadmaps/${r.slug}`}
              className="group grain flex flex-col gap-4 border border-ink/15 bg-background p-6 text-foreground transition-transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="label text-[0.65rem] text-muted-foreground">{r.category}</span>
                <span className={`h-3 w-3 ${r.accent === 'red' ? 'bg-red' : 'bg-blue'}`} />
              </div>
              <h3 className="headline text-3xl leading-[0.9]">{r.title}</h3>
              <p className="text-sm font-medium leading-relaxed text-muted-foreground">
                {r.tagline}
              </p>
              <div className="mt-auto flex items-center justify-between pt-4">
                <span className="label text-[0.7rem] text-foreground">{r.totalDuration}</span>
                <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-red">
                  View <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter variant="paper" />
    </div>
  )
}
