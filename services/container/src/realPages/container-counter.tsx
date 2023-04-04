import dynamic from "next/dynamic";
import CounterPageType from "@mf-types/counter/counterPage";
import CounterProviderType, {
  useCounter as UseCounter,
} from "@mf-types/counter/counterProvider";

const Counter = dynamic(() => import("counter/counter"), {
  ssr: false,
}) as unknown as typeof CounterPageType;
const CounterProvider = dynamic(
  async () => await import("counter/counterProvider"),
  {
    ssr: false,
  }
) as unknown as typeof CounterProviderType;

const { useCounter } = (await import("counter/counterProvider")) as unknown as {
  useCounter: typeof UseCounter;
};
/* 리액트 컴포넌트가 아닌 일반 객체 or 원시 데이터를 import 하고 싶을 때는 es2020의 dynamic import를 사용한다.
 *  @example
 *  ```tsx
 *  const useCounter = await import('counter/counterProvider');
 *  이 때 topLevel await이 필요하므로 next.config.js에 다음과 같은 설정을 추가해준다. `config.experiments = { ...config.experiments, topLevelAwait: true };`
 */

export default function CounterPage() {
  return (
    <CounterProvider>
      <div>container's counter</div>
      <Counter />
      <HostCounter />
    </CounterProvider>
  );
}

function HostCounter() {
  const { count } = useCounter();

  return <div>{<div>host counter: {count}</div>}</div>;
}
