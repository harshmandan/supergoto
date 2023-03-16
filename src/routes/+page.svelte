<script lang="ts">
	import { supergoto, updateURLHashParams, updateURLSearchParams } from '$lib/supergoto';
</script>

<h1>Supergoto</h1>

<button
	on:click={() => supergoto('/about', { preserveHashParams: true, preserveSearchParams: true })}
>
	Navigate to the About page
</button>

<button on:click={() => updateURLHashParams({ foo: 'bar' }, { replace: true })}>
	Update hash params
</button>

<button on:click={() => updateURLSearchParams({ foo: 'bar' }, { replace: true })}>
	Update search params
</button>
