import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { CornerMarks } from '@/components/corner-marks'
import { Marquee } from '@/components/marquee'

const STEPS = [
  {
    n: '01',
    tag: 'Dump',
    body: '“I want to build an AI app but don’t know where to begin.”',
    accent: false,
  },
  {
    n: '02',
    tag: 'Context',
    body: 'Goal, time, level, blockers, budget, and learning style get translated into constraints.',
    accent: true,
  },
  {
    n: '03',
    tag: 'Roadmap',
    body: 'A staged path with weekly milestones, tools, practice tasks, and decision checkpoints.',
    accent: false,
  },
]

export function IntroPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteNav />

      {/* HERO */}
      <section className="bg-blue text-blue-foreground">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="flex items-center justify-between">
            <span className="label text-[0.7rem] sm:text-xs">AI Roadmap Engine — 2026</span>
            <span className="label text-[0.7rem] sm:text-xs">Idea Dump → Personal Plan</span>
          </div>

          <h1 className="headline mt-8 text-[22vw] leading-[0.8] sm:mt-10 sm:text-[16vw] lg:text-[13rem]">
            Blueprnt
          </h1>

          <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-xl text-pretty text-base font-medium leading-relaxed sm:text-lg">
              Type the chaos in your head. Blueprnt turns it into a personalized, staged roadmap
              with milestones, learning loops, tools, and next actions — or lets you browse proven
              premade paths.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/generate"
                className="group inline-flex items-center gap-2 bg-red px-6 py-4 text-sm font-bold uppercase tracking-widest text-red-foreground transition-transform hover:-translate-y-0.5"
              >
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                Start Mapping
              </Link>
              <Link
                href="/roadmaps"
                className="group inline-flex items-center gap-2 bg-ink px-6 py-4 text-sm font-bold uppercase tracking-widest text-foreground transition-transform hover:-translate-y-0.5"
              >
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                Browse Paths
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Marquee
        items={['Milestones', 'Weekly Tasks', 'Tools', 'Decision Checkpoints', 'Learning Loops', 'Next Move']}
        className="border-y border-border bg-background py-3 text-foreground"
      />

      {/* THREE STEPS */}
      <section className="bg-background">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className={`grain flex flex-col gap-6 border p-6 sm:p-8 ${
                s.accent
                  ? 'border-transparent bg-red text-red-foreground'
                  : 'border-border bg-card text-card-foreground'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="label text-xs opacity-80">
                  {s.n} / {s.tag}
                </span>
                <span className={`h-3 w-3 ${s.accent ? 'bg-red-foreground' : 'bg-blue'}`} />
              </div>
              <p className="text-balance text-lg font-bold leading-snug sm:text-xl">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BIG STATEMENT */}
      <section className="bg-background pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="headline text-balance text-[10vw] leading-[0.85] text-foreground sm:text-6xl lg:text-8xl">
            No generic advice. No endless browsing.{' '}
            <span className="text-red">One messy thought</span> becomes a next move.
          </h2>
        </div>
      </section>

      {/* SUMMIT POSTER (EVEREST-style) */}
      <section className="bg-blue text-blue-foreground">
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <CornerMarks />
          <div className="relative grid items-center gap-8 lg:grid-cols-2">
            <div>
              <span className="label text-xs">The Metaphor</span>
              <h2 className="headline mt-4 text-[16vw] leading-[0.8] sm:text-8xl lg:text-9xl">
                Map<br />The<br />Climb
              </h2>
              <p className="mt-6 max-w-md text-pretty font-medium leading-relaxed">
                Every big goal is a summit. We break the route into base camps you can actually
                reach — one staged milestone at a time.
              </p>
              <Link
                href="/choose"
                className="mt-8 inline-flex items-center gap-2 bg-ink px-6 py-4 text-sm font-bold uppercase tracking-widest text-foreground transition-transform hover:-translate-y-0.5"
              >
                <ArrowRight className="h-4 w-4" />
                Choose Your Route
              </Link>
            </div>
            <div className="grain relative aspect-square w-full overflow-hidden border-2 border-ink/20">
              <img
                src="/summit-halftone.png"
                alt="Halftone illustration of a mountain summit representing a goal to reach"
                className="h-full w-full object-cover mix-blend-multiply"
              />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
