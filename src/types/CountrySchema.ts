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

export const CountriesResponseSchema = z.object({
  countries: z.array(CountrySchema),
});

export type Province = z.infer<typeof ProvinceSchema>;
export type Country = z.infer<typeof CountrySchema>;
export type CountriesResponse = z.infer<typeof CountriesResponseSchema>;
