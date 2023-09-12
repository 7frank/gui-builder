# overview

(WIP) POC of a gui builder with svelte & grapesjs, that uses some kind of ast transformer to connect custom components to grapesjs by automatically generating grapesjs components from svelte components or react components.

Goals:

- connect react | svelte "views" to grapesjs automatically
- showcase AST capabilities

## how to use this?

- create a new svelte component inside the "components" folder
  - it must use `lang=ts` otherwise the compiler ignores it
- add the newly created component to `whiteList.ts` (currently the way we only transform files that are part of the dependency tree of the application)
- (optional) restart your application and you should be able to select your component from the toolbar

## Developing

Once you've created a project and installed dependencies with `pnpm install` , start a development server:

```bash
pnpm dev

# or start the server and open the app in a new browser tab
pnpm dev -- --open
```

- run `pnpm ast --ẁatch` if you want to make changes to the typescript transformers.

## Building

To create a production version of your app:

```bash
pnpm build
```

You can preview the production build with `pnpm preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
