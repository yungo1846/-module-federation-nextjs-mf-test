import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface CounterContextProps {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
  reset: () => void;
}

const CounterContext = createContext<null | CounterContextProps>(null);

interface CounterProviderProps {
  children: ReactNode;
}

export function CounterProvider({ children }: CounterProviderProps) {
  const [count, setCount] = useState(0);

  const reset = () => {
    setCount(0);
  };

  return (
    <CounterContext.Provider
      value={{
        count,
        setCount,
        reset,
      }}
    >
      {children}
    </CounterContext.Provider>
  );
}

export function useCounter() {
  const context = useContext(CounterContext);

  if (context == null) {
    throw new Error("Counter Provider를 사용해주세요");
  }

  return context;
}
