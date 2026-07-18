import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { RoadmapStages } from '@/components/roadmap-stages'
import { PREMADE_ROADMAPS, getPremadeBySlug } from '@/lib/premade-roadmaps'

export function generateStaticParams() {
  return PREMADE_ROADMAPS.map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const roadmap = getPremadeBySlug(slug)
  if (!roadmap) return { title: 'Roadmap not found — DUMPMAP' }
  return {
    title: `${roadmap.title} — DUMPMAP`,
    description: roadmap.summary,
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const roadmap = getPremadeBySlug(slug)
  if (!roadmap) notFound()

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteNav />

      {/* Header */}
      <section className="bg-blue text-blue-foreground">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <Link
            href="/roadmaps"
            className="label inline-flex items-center gap-2 text-xs text-blue-foreground/70 transition-colors hover:text-red"
          >
            <ArrowLeft className="h-4 w-4" /> All Roadmaps
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="label bg-ink px-2 py-1 text-[0.65rem] text-foreground">
              {roadmap.category}
            </span>
            <span className="label bg-ink px-2 py-1 text-[0.65rem] text-foreground">
              {roadmap.difficulty}
            </span>
            <span className="label text-[0.7rem]">{roadmap.totalDuration}</span>
          </div>

          <h1 className="headline mt-4 text-[13vw] leading-[0.82] sm:text-7xl lg:text-8xl">
            {roadmap.title}
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-base font-medium leading-relaxed sm:text-lg">
            {roadmap.summary}
          </p>
        </div>
      </section>

      {/* Stages */}
      <section className="bg-background">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between border-b border-border pb-3">
            <span className="label text-xs text-red">The Route — {roadmap.stages.length} Stages</span>
          </div>
          <RoadmapStages stages={roadmap.stages} />

          {/* CTA */}
          <div className="grain mt-8 flex flex-col items-start gap-5 border border-border bg-red p-6 text-red-foreground sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <h2 className="headline text-3xl sm:text-4xl">Want it tuned to you?</h2>
              <p className="mt-2 max-w-md text-sm font-medium leading-relaxed">
                Remix this path with your own idea dump and constraints. The AI rebuilds it around
                your reality.
              </p>
            </div>
            <Link
              href="/generate"
              className="group inline-flex shrink-0 items-center gap-2 bg-ink px-6 py-4 text-sm font-bold uppercase tracking-widest text-foreground transition-transform hover:-translate-y-0.5"
            >
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              Remix With AI
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
