<script>
    import { onMount } from "svelte";
    import axios from 'axios';

    let editor;

    let output = {
        time: null,
        blocks: [],
        version: ""
    };

    onMount(async () => {
        editor = await new EditorJS({
            holder: 'editorjs',
            tools: {
                header: Header,
                paragraph: Paragraph,
                image: {
                    class: ImageTool,
                    config: {
                        field: 'photo',
                        endpoints: {
                            byFile: 'http://localhost:8000/upload',   // Your backend file uploader endpoint
                            byUrl: 'http://localhost:8000/upload',    // Your endpoint that provides uploading by Url
                        }
                    }
                },
            },
        });
    })

    const save = async() => {
        await editor
        .save()
        .then((outputData) => {
            output = outputData;
        })
        .catch ((error) => {
            console.log("Saving failed! ", error);
        });
    }

    const submit = () => {};
</script>

<svelte:head>
    <title>EditorJS</title>
</svelte:head>

<div class="flex justify-center">
    <div class="p-4 w-1/2">
        <div class="border rounded p-8" id="editorjs"></div>
        <div class="flex justify-center p-2">
            <button on:click={save} class="px-4 py-2 w-60 text-lg text-white bg-purple-600 rounded">Preview</button>
        </div>
    </div>
    <div class="p-4 w-1/2">
        <div class="border rounded">
            {#if output.time !== null}
                {#each output.blocks as block}
                    {#if block.type === "header"}
                        <div class="text-xl font-bold p-2">{block.data.text}</div>
                    {:else if block.type === "paragraph"}
                        <div class="text-lg p-2">{block.data.text}</div>
                    {/if}
                {/each}
            {/if}
        </div>
        <div class="flex justify-center p-2">
            <button on:click={submit} class="px-4 py-2 w-60 text-lg text-white bg-purple-600 rounded">Submit</button>
        </div>
    </div>    
</div>
