import { z } from "zod";

export const recipeSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  ingredients: z.string().min(1, "Ingredients are required"),
  duration: z.string().min(1, "Duration is required"),
  category: z.string().min(1, "Category is required"),
  image: z.string().url().optional(),

});

export type RecipeInput = z.infer<typeof recipeSchema>;