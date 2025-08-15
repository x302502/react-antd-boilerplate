import { defineFakeRoute } from 'vite-plugin-fake-server/client';

export default defineFakeRoute([
  {
    url: '/notifications',
    timeout: 1000,
    method: 'get',
    response: () => [
      {
        avatar: 'https://avatar.vercel.sh/vercel.svg?text=VC',
        date: '3 hours ago',
        isRead: true,
        message: 'description information description information description information',
        title: 'Received 14 new weekly reports',
      },
      {
        avatar: 'https://avatar.vercel.sh/1',
        date: 'just now',
        isRead: false,
        message: 'description information description information description information',
        title: 'Tom replied to you',
      },
      {
        avatar: 'https://avatar.vercel.sh/2',
        date: '2024-10-10',
        isRead: false,
        message: 'description information description information description information',
        title: 'Jack commented on you',
      },
      {
        avatar: 'https://avatar.vercel.sh/Jack',
        date: '1 day ago',
        isRead: false,
        message: 'description information description information description information',
        title: 'To-Do Reminder',
      },
    ],
  },
]);
