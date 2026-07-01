import { z } from 'zod';

export const ProvinceSchema = z.object({
  code: z.string().min(1),
  name: z.string().min(1),
});

export const CountrySchema = z.object({
  code: z.string().min(1),
  name: z.string().min(1),
  provinces: z.array(ProvinceSchema),
});

export type Province = z.infer<typeof ProvinceSchema>;
export type Country = z.infer<typeof CountrySchema>;

/*
 * Alternatively, use TypeScript Interfaces instead of Zod
 */

// export interface Province {
//   code: string;
//   name: string;
// }

// export interface Country {
//   code: string;
//   name: string;
//   provinces: Province[];
// }
