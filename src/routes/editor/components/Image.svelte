<svelte:options customElement="my-element" />

<script lang="ts">

// https://pbs.twimg.com/profile_images/971055567035883520/8uCAWl8v_400x400.jpg
export let src:string="https://giphy.com/embed/G1vplGMypxBcp7kx32" 


</script>


<img
  style="width: 100%; height: 100%" src="{src}"
  alt=""
/>