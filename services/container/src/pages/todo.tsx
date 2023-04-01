import dynamic from "next/dynamic";

const Todo = dynamic(() => import("todo/todoPage"), { ssr: false });
import consoleHi from "todo/console";

export default function CounterPage() {
  consoleHi();
  return <Todo />;
}
