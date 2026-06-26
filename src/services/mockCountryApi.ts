import { type CountriesResponse, type Country } from '@/types/CountryModel';
import { CountriesResponseSchema, type Country as CountrySchema } from '@/types/CountrySchema';
import z from 'zod';

export const mockJson: unknown = {
  countries: [
    {
      code: 'CA',
      name: 'Canada',
      provinces: [
        { code: 'ON', name: 'Ontario' },
        { code: 'QC', name: 'Quebec' },
      ],
    },
    {
      code: 'GB',
      name: 'United Kingdom',
      provinces: [],
    },
    {
      code: 'US',
      name: 'United States',
      provinces: [
        { code: 'CA', name: 'California' },
        { code: 'NY', name: 'New York' },
      ],
    },
  ],
};

export async function getCountries(
  signal?: AbortSignal,
  delayMilliseconds: number = 700,
): Promise<Country[]> {
  await mockDelay(delayMilliseconds, signal);
  const countriesResponse = mockJson as CountriesResponse;
  return countriesResponse.countries;
}

export async function getCountriesZod(
  signal?: AbortSignal,
  delayMilliseconds: number = 700,
): Promise<CountrySchema[]> {
  await mockDelay(delayMilliseconds, signal);

  const result = CountriesResponseSchema.safeParse(mockJson);

  if (!result.success) {
    console.error(z.treeifyError(result.error));
    throw new Error('Country API response failed validation.');
  }

  return result.data.countries;
}

function mockDelay(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException('Request aborted', 'AbortError'));
      return;
    }

    const timeoutId = window.setTimeout(resolve, ms);

    signal?.addEventListener(
      'abort',
      () => {
        window.clearTimeout(timeoutId);
        reject(new DOMException('Request aborted', 'AbortError'));
      },
      { once: true },
    );
  });
}
