import { z } from "zod";

export const zodProject = z.object({
  name: z.string().optional(),
});
export const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
});
export const componentBodySchema = z.object({
  html: z.string(),
  css: z.string().default(""),
  imageUri: z.string(),
});
export type TcomponentBody = z.infer<typeof componentBodySchema>;
export type searchParamsSchemaType = z.infer<typeof searchParamsSchema>;

export const componentCategorySchema = z.enum(["COMPONENT", "SECTION", "PAGE"]);
export type TComponentCategoryEnum = z.infer<typeof componentCategorySchema>;

export const componentSchema = z.object({
  name: z.string().optional(),
  category: componentCategorySchema,
});
