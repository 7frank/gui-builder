<script lang="ts">


    import type monaco from 'monaco-editor';
    import { onMount } from 'svelte';
    import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
    import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
    import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
    import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
    import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

    let divEl: HTMLDivElement = null;
    let editor: monaco.editor.IStandaloneCodeEditor;
    let Monaco;

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


    onMount(async () => {
    
        // https://dev.to/lawrencecchen/monaco-editor-svelte-kit-572
    
        // @ts-ignore
        self.MonacoEnvironment = {
            getWorker: function (_moduleId: any, label: string) {
                if (label === 'json') {
                    return new jsonWorker();
                }
                if (label === 'css' || label === 'scss' || label === 'less') {
                    return new cssWorker();
                }
                if (label === 'html' || label === 'handlebars' || label === 'razor') {
                    return new htmlWorker();
                }
                if (label === 'typescript' || label === 'javascript') {
                    return new tsWorker();
                }
                return new editorWorker();
            }
        };

        Monaco = await import('monaco-editor');
        const myEditor = Monaco.editor.create(divEl, {
            value,
            language: 'typescript',
            automaticLayout: true
        });

        return () => {
            editor.dispose();
        };
    });
</script>

<div bind:this={divEl} class="monaco" />

<style>

.monaco{ 
height:600px;

}

</style>