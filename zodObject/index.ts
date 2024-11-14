import { z } from "zod";

export const zodProject = z.object({
  name: z.string().optional(),
});

export const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
});
export type searchParamsSchemaType = z.infer<typeof searchParamsSchema>;
