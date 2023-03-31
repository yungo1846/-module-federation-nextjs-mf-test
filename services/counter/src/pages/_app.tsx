import type { AppProps } from "next/app";
import { CounterProvider } from "../context/count";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CounterProvider>
      <Component {...pageProps} />
    </CounterProvider>
  );
}
