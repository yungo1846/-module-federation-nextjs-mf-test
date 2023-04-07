#!/usr/bin/env node
import { $ } from "zx";

async function Command() {
  await $`cat package.json | grep name`;

  let branch = await $`git branch --show-current`;
  await $`dep deploy --branch=${branch}`;

  await Promise.all([
    $`sleep 1; echo 1`,
    $`sleep 2; echo 2`,
    $`sleep 3; echo 3`,
  ]);
}

Command();
