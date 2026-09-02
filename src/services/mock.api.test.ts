import { getCountries, getProductsInfinite } from '@/services/mock.api';
import { describe, expect, it } from 'vitest';

describe('mock API service', () => {
  it('returns validated countries from the mock dataset', async () => {
    const countries = await getCountries(undefined, 0);

    expect(countries).toHaveLength(3);
    expect(countries[0]).toEqual({
      code: 'CA',
      name: 'Canada',
      provinces: [
        { code: 'ON', name: 'Ontario' },
        { code: 'QC', name: 'Quebec' },
      ],
    });
    expect(countries[2]?.provinces).toHaveLength(2);
  });

  it('returns the first page of products with pagination metadata', async () => {
    const page = await getProductsInfinite(0, undefined, 0);

    expect(page.items).toHaveLength(10);
    expect(page.items[0]).toEqual(expect.objectContaining({ id: 1, name: 'Product #1' }));
    expect(page.hasNextPage).toBe(true);
    expect(page.nextPage).toBe(1);
    expect(page.totalCount).toBe(30);
  });

  it('returns later product pages from the next slice of data', async () => {
    const page = await getProductsInfinite(2, undefined, 0);

    expect(page.items).toHaveLength(10);
    expect(page.items[0]).toEqual(expect.objectContaining({ id: 21, name: 'Product #21' }));
    expect(page.items.at(-1)).toEqual(expect.objectContaining({ id: 30, name: 'Product #30' }));
    expect(page.hasNextPage).toBe(false);
    expect(page.nextPage).toBeUndefined();
  });

  it('rejects with an abort error when the request is cancelled', async () => {
    const controller = new AbortController();
    const request = getCountries(controller.signal, 1000);

    controller.abort();

    await expect(request).rejects.toThrow('Request aborted');
  });
});
