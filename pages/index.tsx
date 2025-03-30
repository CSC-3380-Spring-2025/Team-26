// pages/index.js
import useStore from '../src/store';

export default function Home() {
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);

  return (
    <div>
      <h1>Current count: {count}</h1>
      <button onClick={increment}>Increment</button>
    </div>
  );
}


