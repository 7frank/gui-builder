<script lang="ts">
	const defaultImage =
		'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';
	/**
	 * The source property of our image. use a valid URL
	 */
	export let src = 'https://pbs.twimg.com/profile_images/971055567035883520/8uCAWl8v_400x400.jpg';
</script>

<img src={!!src ? src : defaultImage} alt="" />
