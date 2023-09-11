<script lang="ts">

// https://pbs.twimg.com/profile_images/971055567035883520/8uCAWl8v_400x400.jpg
export let src:string="https://pbs.twimg.com/profile_images/971055567035883520/8uCAWl8v_400x400.jpg" 


type Type={name:string}
export let test:Type={name:"y"}


export let test2:{name2:Type}={name:{name2:"123"}}


console.log("Rendering Image",src)

</script>


<img
  style="width: 100px; height: 100px" src="{src}"
  alt=""
/>