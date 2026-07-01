import { InfoBox } from '@/components/MessageBox';
import { useRenderCounter } from '@/hooks/useRenderCounter';
import { getProductsInfinite } from '@/services/mock.api';
import { useInfiniteQuery } from '@tanstack/react-query';

function TanStackQueryPage() {
  useRenderCounter('TanStackQueryPage');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: ({ pageParam, signal }) => getProductsInfinite(pageParam, signal),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.hasNextPage ? lastPage.nextPage : undefined),
  });

  const products = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <>
      <h1>TanStack Query</h1>

      <InfoBox>
        <p>
          <strong>TanStack Query</strong> simplifies asynchronous data fetching, caching, and
          server-state management.
        </p>
        <p>
          This example demonstrates the <code>useInfiniteQuery</code> hook, which loads additional
          pages of data while preserving previously fetched results.
        </p>
      </InfoBox>

      <ul className="section">
        {products.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong>

            <div>{product.description}</div>

            <small>
              ${product.price} · Stock {product.stock}
            </small>
          </li>
        ))}
      </ul>

      {hasNextPage && (
        <div className="section">
          <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}

      <div className="alert section">
        <hr />
        <p>Pages: {data?.pages.length ?? 0}</p>
        <p>Products: {products.length}</p>
        <p>Has next page: {String(hasNextPage)}</p>
        <p>Fetching: {String(isFetchingNextPage)}</p>
      </div>
    </>
  );
}

export default TanStackQueryPage;
