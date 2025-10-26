

import { z } from "zod";


export const BlogSchema = z.object({
  id: z.number().optional(), 
    authorId: z.string().uuid().optional(),
  content: z.string().min(10, "Content must be at least 10 characters"),
  description: z.string().optional().nullable(),
 category: z.string().min(1, "Category is required").max(100, "Category name too long"),
  source: z.object({
      id: z.string().nullable(),
      name: z.string().min(1, "Source name required"),
    }).optional().nullable(),  
  title: z.string().min(5, "Title must be at least 5 characters"),
  url: z.string().url("Invalid URL").optional().nullable(),
  urlToImage: z.string().url("Invalid image URL").optional().nullable(),
  createdAt: z.date().optional(),
});


export type BlogType = z.infer<typeof BlogSchema>;
