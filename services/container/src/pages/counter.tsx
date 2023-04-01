import dynamic from "next/dynamic";

const Counter = dynamic(() => import("counter/counterPage"), { ssr: false });
const CounterProvider = dynamic(() => import("counter/counterProvider"), {
  ssr: false,
});

export default function CounterPage() {
  return (
    <CounterProvider>
      <Counter />
    </CounterProvider>
  );
}
