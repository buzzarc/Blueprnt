import { Wrench, Flag, ListChecks, GitBranch } from 'lucide-react'
import type { Roadmap } from '@/app/api/roadmap/schema'

function DetailList({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode
  title: string
  items: string[]
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="label inline-flex items-center gap-1.5 text-[0.65rem] text-red">
        {icon} {title}
      </span>
      <ul className="flex flex-col gap-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
            <span className="mt-2 h-1 w-1 shrink-0 bg-red" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function RoadmapStages({ stages }: { stages: Roadmap['stages'] }) {
  return (
    <ol className="flex flex-col gap-4">
      {stages.map((stage, index) => (
        <li key={index} className="grain border border-border bg-card">
          <div className="flex items-center gap-4 border-b border-border px-6 py-4">
            <span className="headline text-3xl text-red">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div>
              <h3 className="text-lg font-extrabold leading-tight text-card-foreground">
                {stage.title}
              </h3>
              <span className="label text-[0.65rem] text-muted-foreground">{stage.duration}</span>
            </div>
          </div>
          <div className="flex flex-col gap-5 px-6 py-5">
            <p className="text-pretty text-sm font-semibold leading-relaxed text-card-foreground">
              {stage.goal}
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              <DetailList icon={<Flag className="h-4 w-4" />} title="Milestones" items={stage.milestones} />
              <DetailList icon={<Wrench className="h-4 w-4" />} title="Tools" items={stage.tools} />
              <DetailList icon={<ListChecks className="h-4 w-4" />} title="Tasks" items={stage.tasks} />
              <div className="flex flex-col gap-2">
                <span className="label inline-flex items-center gap-1.5 text-[0.65rem] text-blue">
                  <GitBranch className="h-4 w-4" /> Checkpoint
                </span>
                <p className="text-sm leading-relaxed text-muted-foreground">{stage.checkpoint}</p>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ol>
  )
}
