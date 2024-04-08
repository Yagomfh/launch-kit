# embedded-hygen-example
A quick example of how to embed hygen into your own CLI tool to have templates embedded within it, for example. It's not perfect, but it gets the job done.
## Setup
1. Run `yarn install`
2. Run `yarn build`
3. Run `yarn generate project new`

For the sake of simplicity as a proof of concept, I set the `cwd` option in the `src/bin.ts` file to be `path.join(process.cwd(), '.tmp')`. This way, for the sake of testing, I can just call the bin file with node from the root folder of this package, without it trying to dump the generated files in this very same root folder, and instead generating them all into a separate `.tmp` folder. 

After the files have been generated, you can see the generated structure in the `.tmp` folder. This "project generator" outputs more template files to scaffold components within this new project. You can call them as follows.

1. Make sure you're in the `.tmp` folder, the new project that just generated
2. Run `yarn install` (Could perhaps look at a way to automate this after successful generation?)
3. Run `yarn generate component new`

You'll see that on top of scaffolding the base structure of the project, it scaffolded some generators to continue expanding the project with a defined structure. It's entirely optional, of course, but since I highlighted the possibility in my original comment, I figured I'd include it.

### How to convert this PoC into a working product
1. Remove the `.tmp` folder from the `cwd` parameter in the bin file.
2. Publish the package on a package feed
3. Install it as a global package or use `npx` to install + run it on demand.

### Caveats
As mentioned in the intro its not perfect. For example when you trigger an error by calling a generator that doesn't exist, hygen will still reference the `init self` generators, which don't exist anymore because we overrode the defaultTemplates from hygen.

To get around this you could potentially embed these into your own project as well for full feature parity with the only addition being more default templates alongside the `init self` ones provided by hygen (perhaps a build step that copies them from `node_modules/hygen/src/templates` to your own default templates directory?). You're essentially just extending hygen with more built in templates this way.
