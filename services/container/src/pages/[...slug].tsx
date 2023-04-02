import dynamic from "next/dynamic";
const page = await import("../realPages/[...slug]");
const Page = dynamic(() => import("../realPages/[...slug]"));
Page.getInitialProps = async (ctx) => {
  const getInitialProps = (await page).default?.getInitialProps;

  console.log(page);
  if (getInitialProps) {
    return getInitialProps(ctx);
  }
  return {};
};
export default Page;
