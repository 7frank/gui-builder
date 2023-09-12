# monaco

monaco is the code editor behind vs-code. We could use that to create code snippets.
Which we could then select in the gui and assign an event.
e.g. `click` `helloService`

- one editor for a whole page or dashboard would be enough
- it would share similarities with "embarcadero delphi"

[goto the 'hello world' - example](https://microsoft.github.io/monaco-editor/playground.html?source=v0.43.0#example-creating-the-editor-hello-world)

copy and paste the cod below

```javascript
const value =
	/* set from `myEditor.getModel()`: */
	`// in case we want to reuse services, we will have to add a mapping for request and response but that is overkill
// type Req={value:string,src:string}[]
type Res={key:number,value:string}[]
async function helloService(dashboard,fetch):Promise<void> {


	// dashboard could relate to a typescript interface that is generated / updated 
	// when assigning ids to a widget
	// enabling possible autocomplete

	const val=dashboard.get("#user-name","value")
	const src= dashboard.get("#theImage","src")
   
   const res= await fetch({val,src})

	dashboard.set("#theResult",res)

}`;

// Hover on each property to see its docs!
const myEditor = monaco.editor.create(document.getElementById('container'), {
	value,
	language: 'typescript',
	automaticLayout: true
});
```
