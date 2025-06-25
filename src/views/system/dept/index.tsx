import { BasicContent } from "~/components";

import { useState } from "react";

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
				<button onClick={() => setCount(count + 1)}>Increase</button>
				<button onClick={() => setCount(count - 1)}>Decrease</button>
			</div>
		</BasicContent>
	);
}
