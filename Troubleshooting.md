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
