# sveltekit does not load the example plugin

`vite dev` will fail if example-transformer is used in tsconfig

> does not have an export "default": {}

but

`./node_modules/.bin/tspc --outDir .out`

will work
