import Link from 'next/link'
import { cn } from '@/lib/utils'

export function SiteFooter({ variant = 'dark' }: { variant?: 'dark' | 'paper' }) {
  const onPaper = variant === 'paper'
  return (
    <footer
      className={cn(
        'border-t',
        onPaper ? 'border-ink/15 bg-paper text-paper-foreground' : 'border-border bg-background text-foreground',
      )}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <Link href="/" className="label text-[0.7rem] text-red">
          Dumpmap — Personal Roadmaps From Raw Ideas
        </Link>
        <span className={cn('label text-[0.7rem]', onPaper ? 'text-ink/50' : 'text-muted-foreground')}>
          © 2026 / Build Your Next Move
        </span>
      </div>
    </footer>
  )
}
