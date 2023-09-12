<script lang="ts">
 
 import { onMount } from 'svelte';
 
  /**
  * The source property of our image. use a valid URL
  */
  export let src="https://pbs.twimg.com/profile_images/971055567035883520/8uCAWl8v_400x400.jpg" 



 const defaultImage="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"

 let childElement;

// Function to observe parent element size
function observeParentElementSize( child:HTMLElement) {

    let parent=child.parentElement?.parentElement;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;

        // Update the child element's dimensions
        child.style.width = `${width-20}px`;
        child.style.height = `${height-20}px`;
      }
    });

    // Start observing the parent element
    resizeObserver.observe(parent);
  }


  onMount(() => {
    // Initialize the observation when the component is mounted
    setTimeout(() => {
      observeParentElementSize( childElement);
    }, 1);
  });



</script>

<img bind:this={childElement} class="image"
  style="background-image:url({!!src?src:defaultImage});background-position:center;background-size:cover"
  alt=""
/>


<style>

.image{
  
  overflow:hidden;
  top:0;
  left:0;

}


</style>