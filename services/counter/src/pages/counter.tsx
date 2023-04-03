import CounterProvider, { useCounter } from "counter/counterProvider";

export function CounterPage() {
  const { count, setCount, reset } = useCounter();

  return (
    <div>
      <div>counter's counter</div>
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

export default function Page() {
  return (
    <CounterProvider>
      <CounterPage />
    </CounterProvider>
  );
}
