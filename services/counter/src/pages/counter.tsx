import dynamic from "next/dynamic";
const CounterProvider = dynamic(() => import("counter/counterProvider"), {
  ssr: false,
});
const Counter = dynamic(() => import("@/components/counter"), { ssr: false });

export default function CounterPage() {
  return (
    <CounterProvider>
      <Counter />
    </CounterProvider>
  );
}
