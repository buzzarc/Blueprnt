'use client'

import { useObject } from '@ai-sdk/react'
import { useState } from 'react'
import { ArrowRight, Loader2, Square, Wrench, Flag, ListChecks, GitBranch } from 'lucide-react'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { roadmapSchema } from '@/app/api/roadmap/schema'
import { cn } from '@/lib/utils'

const TIMEFRAMES = ['2 weeks', '1 month', '3 months', '6 months']
const LEVELS = ['Beginner', 'Intermediate', 'Advanced']

export function GeneratePage() {
  const [idea, setIdea] = useState('')
  const [timeframe, setTimeframe] = useState('1 month')
  const [level, setLevel] = useState('Beginner')
  const [outcome, setOutcome] = useState('')

  const { object, submit, isLoading, stop, error } = useObject({
    api: '/api/roadmap',
    schema: roadmapSchema,
  })

  const canSubmit = idea.trim().length > 8 && !isLoading

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    submit({ idea, timeframe, level, outcome })
  }

  const stages = object?.stages ?? []
  const hasResult = Boolean(object?.title) || stages.length > 0 || isLoading

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteNav />

      {/* Header */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 pb-8 pt-12 sm:px-6 lg:px-8">
          <span className="label text-xs text-red">Generate / Personal</span>
          <h1 className="headline mt-4 text-[16vw] leading-[0.8] text-foreground sm:text-7xl lg:text-8xl">
            Paste the dump.
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-base font-medium leading-relaxed text-muted-foreground">
            Empty your head into the box. Add a little context and the AI will translate the chaos
            into a staged roadmap with milestones, tools, tasks, and checkpoints.
          </p>
        </div>
      </section>

      <div className="mx-auto grid w-full max-w-7xl flex-1 gap-4 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,380px)_1fr] lg:px-8">
        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="grain flex h-fit flex-col gap-5 border border-border bg-card p-6 lg:sticky lg:top-20"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="idea" className="label text-xs text-muted-foreground">
              Your idea dump *
            </label>
            <textarea
              id="idea"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              rows={6}
              placeholder="I want to launch a tiny AI side business but I only have weekends and I get overwhelmed easily…"
              className="resize-y border border-input bg-background px-3 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/60 focus:border-red focus:outline-none"
            />
          </div>

          <fieldset className="flex flex-col gap-2">
            <legend className="label mb-1 text-xs text-muted-foreground">Timeframe</legend>
            <div className="flex flex-wrap gap-2">
              {TIMEFRAMES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTimeframe(t)}
                  className={cn(
                    'border px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors',
                    timeframe === t
                      ? 'border-red bg-red text-red-foreground'
                      : 'border-input bg-background text-muted-foreground hover:border-red',
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="flex flex-col gap-2">
            <legend className="label mb-1 text-xs text-muted-foreground">Skill level</legend>
            <div className="flex flex-wrap gap-2">
              {LEVELS.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLevel(l)}
                  className={cn(
                    'border px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors',
                    level === l
                      ? 'border-blue bg-blue text-blue-foreground'
                      : 'border-input bg-background text-muted-foreground hover:border-blue',
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="flex flex-col gap-2">
            <label htmlFor="outcome" className="label text-xs text-muted-foreground">
              Dream outcome (optional)
            </label>
            <input
              id="outcome"
              value={outcome}
              onChange={(e) => setOutcome(e.target.value)}
              placeholder="First paying customer"
              className="border border-input bg-background px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-red focus:outline-none"
            />
          </div>

          {isLoading ? (
            <button
              type="button"
              onClick={() => stop()}
              className="inline-flex items-center justify-center gap-2 bg-ink px-6 py-4 text-sm font-bold uppercase tracking-widest text-foreground"
            >
              <Square className="h-4 w-4" /> Stop
            </button>
          ) : (
            <button
              type="submit"
              disabled={!canSubmit}
              className="group inline-flex items-center justify-center gap-2 bg-red px-6 py-4 text-sm font-bold uppercase tracking-widest text-red-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
            >
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              Generate Roadmap
            </button>
          )}

          {error && (
            <p className="border border-red bg-red/10 px-3 py-2 text-xs font-medium text-red">
              Something went wrong. Please try again.
            </p>
          )}
        </form>

        {/* RESULT */}
        <div className="min-w-0">
          {!hasResult ? (
            <EmptyState />
          ) : (
            <div className="flex flex-col gap-5">
              {/* Result header */}
              <div className="grain border border-border bg-blue p-6 text-blue-foreground">
                <div className="flex flex-wrap items-center gap-3">
                  {object?.difficulty && (
                    <span className="label bg-ink px-2 py-1 text-[0.65rem] text-foreground">
                      {object.difficulty}
                    </span>
                  )}
                  {object?.totalDuration && (
                    <span className="label text-[0.7rem]">{object.totalDuration}</span>
                  )}
                  {isLoading && (
                    <span className="inline-flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-widest">
                      <Loader2 className="h-3.5 w-3.5 animate-spin" /> Mapping…
                    </span>
                  )}
                </div>
                <h2 className="headline mt-4 text-4xl sm:text-5xl">
                  {object?.title ?? 'Building your roadmap…'}
                </h2>
                {object?.summary && (
                  <p className="mt-4 max-w-2xl text-sm font-medium leading-relaxed">
                    {object.summary}
                  </p>
                )}
              </div>

              {/* Stages */}
              <ol className="flex flex-col gap-4">
                {stages.map((stage, i) => (
                  <StageCard key={i} index={i} stage={stage} />
                ))}
                {isLoading && stages.length === 0 && <StageSkeleton />}
              </ol>
            </div>
          )}
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}

function EmptyState() {
  return (
    <div className="grain flex h-full min-h-80 flex-col items-center justify-center border border-dashed border-border bg-card/40 p-8 text-center">
      <span className="mb-4 h-4 w-4 bg-red" aria-hidden />
      <p className="headline text-3xl text-foreground sm:text-4xl">Your roadmap<br />appears here</p>
      <p className="mt-4 max-w-sm text-sm font-medium leading-relaxed text-muted-foreground">
        Fill in the idea dump on the left and hit generate. Stages stream in live as the AI thinks.
      </p>
    </div>
  )
}

function StageCard({
  index,
  stage,
}: {
  index: number
  stage: any
}) {
  return (
    <li className="grain border border-border bg-card">
      <div className="flex items-center justify-between gap-4 border-b border-border px-6 py-4">
        <div className="flex items-center gap-4">
          <span className="headline text-3xl text-red">{String(index + 1).padStart(2, '0')}</span>
          <div>
            <h3 className="text-lg font-extrabold leading-tight text-card-foreground">
              {stage?.title ?? '…'}
            </h3>
            {stage?.duration && (
              <span className="label text-[0.65rem] text-muted-foreground">{stage.duration}</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 px-6 py-5">
        {stage?.goal && (
          <p className="text-pretty text-sm font-semibold leading-relaxed text-card-foreground">
            {stage.goal}
          </p>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <DetailList icon={<Flag className="h-4 w-4" />} title="Milestones" items={stage?.milestones} />
          <DetailList icon={<Wrench className="h-4 w-4" />} title="Tools" items={stage?.tools} />
          <DetailList icon={<ListChecks className="h-4 w-4" />} title="Tasks" items={stage?.tasks} />
          {stage?.checkpoint && (
            <div className="flex flex-col gap-2">
              <span className="label inline-flex items-center gap-1.5 text-[0.65rem] text-blue">
                <GitBranch className="h-4 w-4" /> Checkpoint
              </span>
              <p className="text-sm leading-relaxed text-muted-foreground">{stage.checkpoint}</p>
            </div>
          )}
        </div>
      </div>
    </li>
  )
}

function DetailList({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode
  title: string
  items?: (string | undefined)[]
}) {
  if (!items || items.length === 0) return null
  return (
    <div className="flex flex-col gap-2">
      <span className="label inline-flex items-center gap-1.5 text-[0.65rem] text-red">
        {icon} {title}
      </span>
      <ul className="flex flex-col gap-1.5">
        {items.filter(Boolean).map((item, i) => (
          <li key={i} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
            <span className="mt-2 h-1 w-1 shrink-0 bg-red" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function StageSkeleton() {
  return (
    <li className="grain border border-border bg-card p-6">
      <div className="flex items-center gap-3">
        <Loader2 className="h-5 w-5 animate-spin text-red" />
        <span className="label text-xs text-muted-foreground">Drafting stages…</span>
      </div>
    </li>
  )
}
