import { z } from 'zod'

export const roadmapSchema = z.object({
  title: z.string().describe('A punchy, specific title for this roadmap. Max 6 words.'),
  summary: z
    .string()
    .describe('A 1-2 sentence overview of the journey and the outcome the user will reach.'),
  totalDuration: z.string().describe('Estimated total time, e.g. "8 weeks" or "3 months".'),
  difficulty: z
    .enum(['Beginner', 'Intermediate', 'Advanced'])
    .describe('Overall difficulty based on the user\'s stated skill level.'),
  stages: z
    .array(
      z.object({
        title: z.string().describe('Short name for this stage.'),
        duration: z.string().describe('Time for this stage, e.g. "Week 1-2".'),
        goal: z.string().describe('The single main outcome of this stage in one sentence.'),
        milestones: z
          .array(z.string())
          .describe('2-4 concrete, verifiable milestones for this stage.'),
        tools: z.array(z.string()).describe('2-4 specific tools, resources, or technologies.'),
        tasks: z
          .array(z.string())
          .describe('2-4 concrete practice tasks or actions to take this stage.'),
        checkpoint: z
          .string()
          .describe('A decision checkpoint: how to know if you should proceed or adjust.'),
      }),
    )
    .describe('4 to 6 ordered stages that build on each other.'),
})

export type Roadmap = z.infer<typeof roadmapSchema>

export type RoadmapInput = {
  idea: string
  timeframe: string
  level: string
  outcome: string
}
