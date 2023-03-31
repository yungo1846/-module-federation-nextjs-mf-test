import { useCounter } from "../../context/count";

export default function CounterPage() {
  const { count, setCount, reset } = useCounter();

  return (
    <div>
      <button
        onClick={() => {
          setCount((count) => count + 1);
        }}
      >
        +
      </button>
      <div>counter: {count}</div>
      <button
        onClick={() => {
          setCount((count) => count - 1);
        }}
      >
        -
      </button>
      <button
        onClick={() => {
          reset();
        }}
      >
        reset
      </button>
    </div>
  );
}
