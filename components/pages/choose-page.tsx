import Link from 'next/link'
import { ArrowRight, Sparkles, Library } from 'lucide-react'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'

const VARIANTS = [
  {
    title: 'Custom',
    body: 'Best when your goal is personal, weird, or still blurry.',
    theme: 'paper',
  },
  {
    title: 'Premade',
    body: 'Best when you want speed and a strong starting structure.',
    theme: 'red',
  },
  {
    title: 'Hybrid',
    body: 'Pick a premade path first, then remix it with your own idea dump.',
    theme: 'paper',
  },
] as const

export function ChoosePage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteNav variant="blue" />

      {/* HERO on blue */}
      <section className="bg-blue text-blue-foreground">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <h1 className="headline text-[15vw] leading-[0.82] sm:text-[12vw] lg:text-[9.5rem]">
            Choose<br />Your Route
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-balance text-center text-base font-semibold leading-relaxed sm:text-lg">
            Start from your own messy idea, or jump into a premade roadmap that already has
            milestones, tools, and weekly tasks.
          </p>

          {/* Two option cards */}
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <Link
              href="/generate"
              className="group grain flex flex-col justify-between gap-10 border-2 border-ink/20 bg-ink p-6 text-foreground transition-transform hover:-translate-y-1 sm:p-8"
            >
              <div className="flex items-start justify-between">
                <Sparkles className="h-7 w-7 text-red" />
                <span className="label text-xs text-muted-foreground">Option 01</span>
              </div>
              <div>
                <h2 className="headline text-4xl sm:text-5xl">
                  Custom AI<br />Roadmap
                </h2>
                <p className="mt-4 max-w-sm text-sm font-medium leading-relaxed text-muted-foreground">
                  Paste your idea dump, constraints, skill level, and dream outcome. The AI shapes
                  a roadmap around you.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-red">
                  Start <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>

            <Link
              href="/roadmaps"
              className="group grain flex flex-col justify-between gap-10 border-2 border-ink/20 bg-ink p-6 text-foreground transition-transform hover:-translate-y-1 sm:p-8"
            >
              <div className="flex items-start justify-between">
                <Library className="h-7 w-7 text-red" />
                <span className="label text-xs text-muted-foreground">Option 02</span>
              </div>
              <div>
                <h2 className="headline text-4xl sm:text-5xl">
                  Premade<br />Roadmaps
                </h2>
                <p className="mt-4 max-w-sm text-sm font-medium leading-relaxed text-muted-foreground">
                  Browse ready paths for popular goals — startup MVPs, AI automation, design
                  careers, study sprints, and more.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-red">
                  Browse <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Three variant strips */}
      <section className="grid flex-1 md:grid-cols-3">
        {VARIANTS.map((v) => (
          <div
            key={v.title}
            className={`grain flex flex-col gap-4 p-8 sm:p-10 ${
              v.theme === 'red'
                ? 'bg-red text-red-foreground'
                : 'bg-paper text-paper-foreground'
            }`}
          >
            <h3 className="headline text-4xl sm:text-5xl">{v.title}</h3>
            <p className="max-w-xs text-sm font-medium leading-relaxed opacity-90">{v.body}</p>
          </div>
        ))}
      </section>

      <SiteFooter />
    </div>
  )
}
