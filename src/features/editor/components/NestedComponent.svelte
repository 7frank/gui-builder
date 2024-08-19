<script lang="ts">
	/**
	 * The Caption.
	 */
	export let data = {foo:1,bar:"baz"};
</script>

<code class="foo">{JSON.stringify(data,null, "  ")}</code>

<style>
  .foo{ 
	min-height:30px;
	min-width:100px;
  }

</style>
