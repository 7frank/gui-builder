<script lang="ts">
	// Props to receive user data
	export let userName = 'John Doe';
	export let userEmail = 'johndoe@example.com';
	export let userImageUrl =
		'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg';
</script>

<div class="profile-card">
	<img src={userImageUrl} alt={userName} class="profile-image" />
	<div class="profile-details">
		<h3 class="profile-name">{userName}</h3>
		<p class="profile-email">{userEmail}</p>
	</div>
</div>

<style>
	.profile-card {
		display: flex;
		align-items: center;
		border: 1px solid #ccc;
		padding: 16px;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.profile-image {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		margin-right: 16px;
	}

	.profile-name {
		font-size: 1.2rem;
		margin: 0;
	}

	.profile-email {
		color: #777;
		margin: 0;
	}
</style>
