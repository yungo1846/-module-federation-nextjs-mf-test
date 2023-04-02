import { Dispatch, ReactNode, SetStateAction } from "react";
interface CounterContextProps {
    count: number;
    setCount: Dispatch<SetStateAction<number>>;
    reset: () => void;
}
export declare const CounterContext: import("react").Context<CounterContextProps | null>;
interface CounterProviderProps {
    children: ReactNode;
}
export default function CounterProvider({ children }: CounterProviderProps): JSX.Element;
export declare function useCounter(): CounterContextProps;
export {};
