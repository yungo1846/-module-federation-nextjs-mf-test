import { useState } from "react";

interface Todo {
  key: number;
  description: string;
  isDone: boolean;
}

let key: number = 0;
export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [description, setDescription] = useState<string>("");

  return (
    <div>
      {todos.map(({ key, description, isDone }) => {
        return <div key={key}>{description}</div>;
      })}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (description === "") return;

          setTodos((todos) => {
            return [...todos, { key: key++, description, isDone: false }];
          });

          setDescription("");
        }}
      >
        <input
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
        />
        <button>추가</button>
      </form>
    </div>
  );
}
