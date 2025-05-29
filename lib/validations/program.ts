import { z } from "zod"

// Βασικό schema για το πρόγραμμα
export const programSchema = z.object({
  name: z.string().min(1, "Program name is required"),
  description: z.string().optional(),
  type: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  is_template: z.boolean().default(false),
})

export type ProgramFormData = z.infer<typeof programSchema>

// Schema για την άσκηση στο πρόγραμμα
export const programExerciseSchema = z.object({
  id: z.string().optional(),
  exercise_id: z.string(),
  block_id: z.string(),
  sets: z.number().min(1).default(3),
  reps: z.string().default("10"),
  weight: z.number().optional(),
  percentage: z.number().optional(),
  tempo: z.string().optional(),
  rest: z.number().optional(),
  velocity: z.number().optional(),
  exercise_order: z.number(),
  notes: z.string().optional(),
})

// Schema για το block στο πρόγραμμα
export const programBlockSchema = z.object({
  id: z.string().optional(),
  day_id: z.string(),
  name: z.string().min(1, { message: "Block name is required" }),
  description: z.string().optional(),
  block_order: z.number(),
  exercises: z.array(programExerciseSchema).optional(),
})

// Schema για την ημέρα στο πρόγραμμα
export const programDaySchema = z.object({
  id: z.string().optional(),
  week_id: z.string(),
  name: z.string().min(1, { message: "Day name is required" }),
  day_number: z.number(),
  blocks: z.array(programBlockSchema).optional(),
})

// Schema για την εβδομάδα στο πρόγραμμα
export const programWeekSchema = z.object({
  id: z.string().optional(),
  program_id: z.string(),
  name: z.string().min(1, { message: "Week name is required" }),
  week_number: z.number(),
  days: z.array(programDaySchema).optional(),
})

// Πλήρες schema για το πρόγραμμα με όλα τα nested δεδομένα
export const fullProgramSchema = programSchema.extend({
  weeks: z.array(programWeekSchema).optional(),
})

// Schema για την ανάθεση προγράμματος
export const programAssignmentSchema = z.object({
  program_id: z.string(),
  user_id: z.string().optional(),
  group_id: z.string().optional(),
  start_date: z.string(),
  end_date: z.string().optional(),
  status: z.enum(["active", "completed", "cancelled"]).default("active"),
})
