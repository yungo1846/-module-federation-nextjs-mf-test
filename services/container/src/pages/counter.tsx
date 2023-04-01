import dynamic from "next/dynamic";

const Counter = dynamic(() => import("counter/counterPage"), { ssr: false });

export default function CounterPage() {
  return <Counter />;
}
