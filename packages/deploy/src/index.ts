import { $ } from "zx";

async function Command() {
  await $`yarn build`;
}

Command();
