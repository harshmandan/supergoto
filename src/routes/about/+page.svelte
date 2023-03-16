<script lang="ts">
	import { supergoto } from '$lib/supergoto';
</script>

<h1>About</h1>

<button on:click={async () => supergoto('/', { preserveUrlForRedirection: true })}>
	Navigate to Home
</button>
