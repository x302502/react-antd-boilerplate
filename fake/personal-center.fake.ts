import { defineFakeRoute } from 'vite-plugin-fake-server/client';

export default defineFakeRoute([
  {
    url: '/upload',
    timeout: 1000,
    method: 'post',
    response: () => 'https://avatar.vercel.sh/blur.svg?text=%F0%9F%91%8D',
  },
]);
