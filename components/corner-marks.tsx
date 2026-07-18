import { cn } from '@/lib/utils'

/** Brutalist corner arrow/tick marks (EVEREST poster style). */
export function CornerMarks({ className }: { className?: string }) {
  const base = 'absolute h-5 w-5 border-current'
  return (
    <div className={cn('pointer-events-none absolute inset-3 text-current/70', className)} aria-hidden>
      <span className={cn(base, 'left-0 top-0 border-l-2 border-t-2')} />
      <span className={cn(base, 'right-0 top-0 border-r-2 border-t-2')} />
      <span className={cn(base, 'bottom-0 left-0 border-b-2 border-l-2')} />
      <span className={cn(base, 'bottom-0 right-0 border-b-2 border-r-2')} />
    </div>
  )
}
