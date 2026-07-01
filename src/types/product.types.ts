import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number().positive(),
  stock: z.number().int().nonnegative(),
});

export const ProductsPageSchema = z.object({
  items: z.array(ProductSchema),
  hasNextPage: z.boolean(),
  nextPage: z.number().optional(),
  totalCount: z.number().int().nonnegative(),
});

export type Product = z.infer<typeof ProductSchema>;
export type ProductsPage = z.infer<typeof ProductsPageSchema>;
