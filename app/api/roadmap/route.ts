import { createTextStreamResponse, Output, streamText, toTextStream } from 'ai'
import { roadmapSchema, type RoadmapInput } from './schema'
process.env.GROQ_API_KEY = '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'

export const maxDuration = 60

export async function POST(req: Request) {
  const input = (await req.json()) as RoadmapInput

  const idea = (input.idea ?? '').trim()
  if (!idea) {
    return new Response(JSON.stringify({ error: 'Missing idea dump.' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    })
  }

  const result = streamText({
    model: 'llama-3.3-70b-versatile',
    output: Output.object({ schema: roadmapSchema }),
    system:
      'You are Blueprnt, an expert planner that turns messy, unstructured ideas into a clear, ' +
      'staged, personalized roadmap. Be concrete and specific — name real tools and real actions. ' +
      'Never give vague filler advice. Tailor difficulty, pacing, and tool choices to the user\'s ' +
      'stated skill level and timeframe. Keep every string tight and scannable.',
    prompt: [
      `IDEA DUMP:\n${idea}`,
      input.timeframe ? `TIMEFRAME: ${input.timeframe}` : '',
      input.level ? `SKILL LEVEL: ${input.level}` : '',
      input.outcome ? `DREAM OUTCOME: ${input.outcome}` : '',
      '',
      'Produce a personalized roadmap with 4-6 stages that build on each other. ' +
        'Each stage needs a clear goal, concrete milestones, specific tools, practice tasks, ' +
        'and a decision checkpoint.',
    ]
      .filter(Boolean)
      .join('\n'),
  })

  return createTextStreamResponse({
    stream: toTextStream({ stream: result.stream }),
  })
}
