import dynamic from "next/dynamic";

const CounterProvider = dynamic(() => import("counter/counterProvider"), {
  ssr: false,
});
const Counter = dynamic(() => import("counter/counterPage"), { ssr: false });

export default function CounterPage() {
  return <CounterProvider.CounterProvider>hi</CounterProvider.CounterProvider>;
  // return (
  //   <CounterProvider.CounterProvider>
  //     <Counter />
  //   </CounterProvider.CounterProvider>
  // );
}
