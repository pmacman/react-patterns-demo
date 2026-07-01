import { CountrySchema, type Country } from '@/types/country.types';
import { ProductsPageSchema, type ProductsPage } from '@/types/product.types';
import z from 'zod';

export const mockJson: unknown = [
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
];

export async function getCountries(
  signal?: AbortSignal,
  delayMilliseconds: number = 700,
): Promise<Country[]> {
  await mockDelay(delayMilliseconds, signal);

  const result = CountrySchema.array().safeParse(mockJson);

  if (!result.success) {
    console.error(z.treeifyError(result.error));
    throw new Error('Country API response failed validation.');
  }

  return result.data;
}

// Mock products data for pagination example
const generateMockProducts = () => {
  const products = [];
  for (let i = 1; i <= 30; i++) {
    products.push({
      id: i,
      name: `Product #${i}`,
      description: `This is product number ${i} with full specifications and details.`,
      price: Math.floor(Math.random() * 1000) + 10,
      stock: Math.floor(Math.random() * 100),
    });
  }
  return products;
};

const mockProducts = generateMockProducts();
const ITEMS_PER_PAGE = 10;

export async function getProductsInfinite(
  page: number = 0,
  signal?: AbortSignal,
  delayMilliseconds: number = 500,
): Promise<ProductsPage> {
  await mockDelay(delayMilliseconds, signal);

  const startIndex = page * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const items = mockProducts.slice(startIndex, endIndex);

  const hasNextPage = endIndex < mockProducts.length;
  const nextPage = hasNextPage ? page + 1 : undefined;

  const response = {
    items,
    hasNextPage,
    nextPage,
    totalCount: mockProducts.length,
  };

  const result = ProductsPageSchema.safeParse(response);

  if (!result.success) {
    console.error(z.treeifyError(result.error));
    throw new Error('Paginated products API response failed validation.');
  }

  return result.data;
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
