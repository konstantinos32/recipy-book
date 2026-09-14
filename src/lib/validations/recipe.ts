import { z } from "zod";

export const recipeSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  ingredients: z.string().min(1, "Ingredients are required"),
  duration: z
    .number({ message: "Duration is required" })
    .int("Duration must be a whole number")
    .positive("Duration must be greater than 0"),
  servings: z
    .number({ message: "Servings is required" })
    .int("Servings must be a whole number")
    .positive("Servings must be greater than 0"),
  category: z.string().min(1, "Category is required"),
  image: z.string().url().optional(),

});

export type RecipeInput = z.infer<typeof recipeSchema>;