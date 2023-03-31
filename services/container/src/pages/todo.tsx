import dynamic from "next/dynamic";

const Todo = dynamic(() => import("todo/todoPage"), { ssr: false });

export default function CounterPage() {
  return <Todo />;
}
