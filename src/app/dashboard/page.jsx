import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../Redux/exampleSlice'; // Import your slice actions

export default function Home() {
  const count = useSelector((state) => state.example.count);
  const dispatch = useDispatch();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1>Home Page</h1>
        <div>
          <button onClick={() => dispatch(increment())}>Increment</button>
          <span>{count}</span>
          <button onClick={() => dispatch(decrement())}>Decrement</button>
        </div>
      </div>
    </main>
  );
}