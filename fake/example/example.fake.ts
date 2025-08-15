import { defineFakeRoute } from 'vite-plugin-fake-server';
import { listResponse } from './response';

export default defineFakeRoute([
  {
    url: '/mock/example/list',
    timeout: 1000,
    method: 'get',
    response: ({ query }) => {
      const pageIndex = Number(query?.pageIndex) || 1;
      const pageSize = Number(query?.pageSize) || 10;
      const keyword = (query?.keyword as string) || '';
      const result = listResponse.data.filter(item => keyword === '' || item.stringValue.includes(keyword));
      const data = [...result].slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
      return {
        data,
        total: result.length,
      };
    },
  },
]);
