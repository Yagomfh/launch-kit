import { dockerPlopAction, dockerPlopPrompts } from "./src/add/docker/index.js";

export default function (plop) {
  plop.setGenerator("add docker", {
    description: "application controller logic",
    prompts: dockerPlopPrompts,
    actions: dockerPlopAction,
  });
}
