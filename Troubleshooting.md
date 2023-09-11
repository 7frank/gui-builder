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

```txt
createSchemaFromNodes [
  <ref *1> NodeObject {
    pos: 381,
    end: 411,
    flags: 0,
    modifierFlagsCache: 536870913,
    transformFlags: 1,
    parent: SourceFileObject {
      pos: 0,
      end: 412,
      flags: 0,
      modifierFlagsCache: 0,
      transformFlags: 4457473,
      parent: undefined,
      kind: 311,
      statements: [Array],
      endOfFileToken: [TokenObject],
      text: "import { Type } from './Type';\n" +
        '\n' +
        'type Bar = { name: string };\n' +
        'type Foo = { id: number; bar: Bar };\n' +
        "export const foo: Foo = { bar: { name: 'asd' }, id: 1 };\n" +
        '\n' +
        '// https://pbs.twimg.com/profile_images/971055567035883520/8uCAWl8v_400x400.jpg\n' +
        'export let src: string =\n' +
        "\t'https://pbs.twimg.com/profile_images/971055567035883520/8uCAWl8v_400x400.jpg';\n" +
        '\n' +
        "export let test: Type = { name: 'y' };\n" +
        '\n' +
        'export type String = string;\n',
      fileName: '/home/freimann/Projects/temedica/meetup/gui-builder/test.ts',
      path: '/home/freimann/Projects/temedica/meetup/gui-builder/test.ts',
      resolvedPath: '/home/freimann/Projects/temedica/meetup/gui-builder/test.ts',
      originalFileName: '/home/freimann/Projects/temedica/meetup/gui-builder/test.ts',
      languageVersion: 1,
      languageVariant: 0,
      scriptKind: 3,
      isDeclarationFile: false,
      hasNoDefaultLib: false,
      locals: [Map],
      nextContainer: [NodeObject],
      endFlowNode: [Object],
      nodeCount: 63,
      identifierCount: 17,
      symbolCount: 24,
      parseDiagnostics: [],
      bindDiagnostics: [],
      bindSuggestionDiagnostics: undefined,
      lineMap: undefined,
      externalModuleIndicator: [NodeObject],
      setExternalModuleIndicator: [Function: callback],
      pragmas: Map(0) {},
      checkJsDirective: undefined,
      referencedFiles: [],
      typeReferenceDirectives: [],
      libReferenceDirectives: [],
      amdDependencies: [],
      commentDirectives: undefined,
      identifiers: [Map],
      packageJsonLocations: undefined,
      packageJsonScope: undefined,
      imports: [Array],
      moduleAugmentations: [],
      ambientModuleNames: [],
      resolvedModules: [Object],
      classifiableNames: [Set],
      impliedNodeFormat: undefined,
      resolvedTypeReferenceDirectiveNames: undefined,
      symbol: [SymbolObject],
      id: 23825
    },
    kind: 264,
    symbol: SymbolObject {
      id: 21652,
      mergeId: 0,
      flags: 524288,
      escapedName: 'String',
      declarations: [Array],
      parent: [SymbolObject],
      tags: []
    },
    localSymbol: SymbolObject {
      id: 0,
      mergeId: 0,
      flags: 0,
      escapedName: 'String',
      declarations: [Array],
      parent: undefined,
      exportSymbol: [SymbolObject]
    },
    modifiers: [
      [TokenObject],
      pos: 381,
      end: 389,
      hasTrailingComma: false,
      transformFlags: 0
    ],
    name: IdentifierObject {
      pos: 394,
      end: 401,
      flags: 0,
      modifierFlagsCache: 0,
      transformFlags: 0,
      parent: [Circular *1],
      kind: 80,
      escapedText: 'String',
      jsDoc: undefined,
      flowNode: [Object],
      symbol: undefined
    },
    typeParameters: undefined,
    type: TokenObject {
      pos: 403,
      end: 410,
      flags: 0,
      modifierFlagsCache: 0,
      transformFlags: 1,
      parent: [Circular *1],
      kind: 154
    },
    jsDoc: [ jsDocCache: [] ],
    locals: Map(0) {},
    nextContainer: undefined
  }
]
{ rootTypes: [ DefinitionType { name: 'String', type: [AliasType] } ] }
{ rootTypeDefinition: { '$ref': '#/definitions/String' } }
{
  "$ref": "#/definitions/String",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "definitions": {
    "String": {
      "type": "string"
    }
  }
}

```
