import { CounterContext } from "@/context/count";
import { useContext } from "react";

export function useCounter() {
  const context = useContext(CounterContext);

  if (context == null) {
    throw new Error("Counter Provider를 사용해주세요");
  }

  return context;
}
