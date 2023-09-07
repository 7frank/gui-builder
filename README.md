# overview

(WIP) POC of a gui builder with svelte & grapesjs, that uses some kind of ast transformer to connect custom components to grapesjs by automatically generating grapesjs components from svelte components or react components.

Goals:

- connect react | svelte "views" to grapesjs automatically
- showcase AST capabilities

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
