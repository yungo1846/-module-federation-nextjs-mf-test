import dynamic from "next/dynamic";

const Page = dynamic(() => import("../realPages/container-counter"), {
  ssr: false,
});

export default function CounterPage() {
  return <Page />;
}
