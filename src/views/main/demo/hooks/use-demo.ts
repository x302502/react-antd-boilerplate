import { useCallback, useEffect, useState } from 'react';
import { ExampleItemDto } from '~/api/example/types';
import { exampleApi } from '~/api/example';
import { PageRequest } from '~/api/@common';

export const useDemo = () => {
  const [data, setData] = useState<ExampleItemDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState<PageRequest>({
    pageIndex: 1,
    pageSize: 10,
  });

  const loadData = useCallback(() => {
    setIsLoading(true);
    exampleApi
      .list(page)
      .then(result => {
        setData(result.data);
        setTotal(result.total);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    data,
    setData,
    isLoading,
    setIsLoading,
    total,
    setTotal,
    page,
    setPage,
  };
};
