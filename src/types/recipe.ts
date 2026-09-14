export type Recipe = {
   id: string;
   title: string;
   description: string;
   ingredients: string;
   duration: number;
   servings: number;
   category: string;
   image?: string;
}