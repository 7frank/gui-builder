# sveltekit does not load the example plugin

`vite dev` will fail if example-transformer is used in tsconfig

> does not have an export "default": {}

but

`./node_modules/.bin/tspc --outDir .out`

will work

## solution (intermediate)

- compile the transformer to commonjs (module.exports=fn transformer) and rename the file to ".cjs"
- this way `does not have an export "default": {}` goes away and vite will use the transformer

## transformer not used in svelte files <script lang=ts></script>

https://stackoverflow.com/questions/71012943/svelte-preprocess-does-not-transform-typescript-into-javascript
https://github.com/sveltejs/svelte-preprocess/issues/488

## solution

we might be able to [create a preprocessor ourselves](https://sveltesociety.dev/recipes/build-setup/writing-your-own-preprocessors) butfor now it will be easier to patch the source files that it uses our compiler

- svelte-gui-builder/node_modules/svelte-preprocess/dist/transformers/typescript.js

> // const typescript_1 = **importDefault(require("typescript"));
> const typescript_1 = **importDefault(require('ts-patch/compiler'));;
