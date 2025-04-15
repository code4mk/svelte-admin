import { z } from 'zod';

export const productSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    sku: z.string().min(1, "SKU is required"),
    category: z.string().min(1, "Category is required"),
    price: z.number().min(0, "Price must be a positive number"),
    description: z.string().min(1, "Description is required"),
    inventory: z.number().min(0, "Inventory must be a positive number"),
    status: z.enum(["In Stock", "Low Stock", "Out of Stock"]),
    images: z.array(z.string()).optional(),
    features: z.array(z.string()).optional(),
    specifications: z.array(z.object({
        name: z.string(),
        value: z.string()
    })).optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    weight: z.number().optional(),
    dimensions: z.object({
        length: z.number(),
        width: z.number(),
        height: z.number()
    }).optional()
}); 