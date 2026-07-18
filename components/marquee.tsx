import { cn } from '@/lib/utils'

export function Marquee({
  items,
  className,
}: {
  items: string[]
  className?: string
}) {
  const doubled = [...items, ...items]
  return (
    <div className={cn('flex overflow-hidden whitespace-nowrap', className)}>
      <div className="flex min-w-full shrink-0 animate-[marquee_28s_linear_infinite] items-center">
        {doubled.map((item, i) => (
          <span key={i} className="label flex items-center text-sm">
            {item}
            <span className="mx-6 inline-block h-2 w-2 bg-red" aria-hidden />
          </span>
        ))}
      </div>
      <div
        aria-hidden
        className="flex min-w-full shrink-0 animate-[marquee_28s_linear_infinite] items-center"
      >
        {doubled.map((item, i) => (
          <span key={i} className="label flex items-center text-sm">
            {item}
            <span className="mx-6 inline-block h-2 w-2 bg-red" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  )
}
