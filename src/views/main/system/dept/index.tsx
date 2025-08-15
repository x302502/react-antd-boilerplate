import { BasicContent } from '~/components';

import { useState } from 'react';
import { Button } from 'antd';

export default function Dept() {
  const [count, setCount] = useState(0);

  return (
    <BasicContent>
      <h1>Counter</h1>
      <p>
        Current count:
        {count}
      </p>
      <div className="flex gap-5">
        <Button type="primary" onClick={() => setCount(count + 1)}>
          Increase
        </Button>
        <Button type="primary" onClick={() => setCount(count - 1)}>
          Decrease
        </Button>
      </div>
    </BasicContent>
  );
}
