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

export const CounterContext = createContext<null | CounterContextProps>(null);

interface CounterProviderProps {
  children: ReactNode;
}

export default function CounterProvider({ children }: CounterProviderProps) {
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
