# trougbleshooting

## sveltekit does not load the example plugin

`vite dev` will fail if example-transformer is used in tsconfig

> does not have an export "default": {}

but

`./node_modules/.bin/tspc --outDir .out`

will work

### solution (intermediate)

- compile the transformer to commonjs (module.exports=fn transformer) and rename the file to ".cjs"
- this way `does not have an export "default": {}` goes away and vite will use the transformer

## transformer not used in svelte files <script lang=ts></script>

https://stackoverflow.com/questions/71012943/svelte-preprocess-does-not-transform-typescript-into-javascript
https://github.com/sveltejs/svelte-preprocess/issues/488

### solution

we might be able to [create a preprocessor ourselves](https://sveltesociety.dev/recipes/build-setup/writing-your-own-preprocessors) butfor now it will be easier to patch the source files that it uses our compiler

- [patch this file](./node_modules/svelte-preprocess/dist/transformers/typescript.js)

```javascript
// const typescript_1 = __importDefault(require("typescript"));
const typescript_1 = __importDefault(require('ts-patch/compiler'));
```

TODO create actual patch file

## ts-json-schema-generator does not export types that are not "exported"

e.g. create script and try to export types `ts-json-schema-generator --path test.ts --type Type`

we have two scenarios here

- one svelte does not export types in the script tag itself but in a context script tag, that we might have to reference instead to get the lookup of the actual type
  - for that we might have to run sveltePreprocess to get that thing
  - alternatively we could create a separate file for the types, if they are not primitive and import them from there
- sometimes we want to infer the type regardless of if it was exported

proper node of kind NodeObject that is used when parsing the structure with createSchema

### ...

for now we do not use complex types but might revisit that

## the components need to be part of the dependency tree

- for now this could be a good thing so we can import them only if we white list them
- in the future it would be probably nicer to batch import and thus auto detect, but that would require restructuring when the code gets generated
