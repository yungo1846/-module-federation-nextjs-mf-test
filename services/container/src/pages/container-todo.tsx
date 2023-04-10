import dynamic from "next/dynamic";
import TodoPageType from "@mf-types/todo/todoPage";

const Todo = dynamic(() => import("todo/todoPage"), {
  ssr: false,
}) as unknown as typeof TodoPageType;

export default function CounterPage() {
  return (
    <div>
      <div>container's todo 1234</div>
      <Todo />
    </div>
  );
}
