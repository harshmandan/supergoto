<script lang="ts">
	import { supergoto, updateURLHashParams, updateURLSearchParams } from '$lib/supergoto';
	import Button from '$components/button/Button.svelte';
</script>

<div class="flex flex-col items-center">
	<img alt="Supergoto" src="/logo.svg" />
</div>
<div>
	<Button
		on:click={() => supergoto('/about', { preserveHashParams: true, preserveSearchParams: true })}
	>
		Navigate to the About page
	</Button>

	<Button on:click={() => updateURLHashParams({ foo: 'bar' }, { replace: true })}>
		Update hash params
	</Button>

	<Button on:click={() => updateURLSearchParams({ foo: 'bar' }, { replace: true })}>
		Update search params
	</Button>
</div>
