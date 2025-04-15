import { z } from 'zod';

export const productSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    category: z.string().min(1, "Category is required"),
    price: z.number().min(0, "Price must be a positive number"),
    description: z.string().min(1, "Description is required")
}); 