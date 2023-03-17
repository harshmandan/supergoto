<script lang="ts">
	import type { SupergotoOptions } from '$lib/supergoto';
	import Button from '$components/button/Button.svelte';
	import Checkbox from '$components/checkbox/Checkbox.svelte';
	import Divider from '$components/divider/Divider.svelte';

	const options: Record<
		keyof SupergotoOptions,
		{
			name: string;
			description: string;
		}
	> = {
		replaceState: {
			name: 'Replace state',
			description:
				'If enabled, will replace the current `history` entry rather than creating a new one with `pushState`'
		},
		noScroll: {
			name: 'No scroll',
			description:
				'If enabled, the browser will maintain its scroll position rather than scrolling to the top of the page after navigation'
		},
		keepFocus: {
			name: 'Keep focus',
			description:
				'If enabled, the currently focused element will retain focus after navigation. Otherwise, focus will be reset to the body'
		},
		state: {
			name: 'State',
			description: 'The state of the new/updated history entry'
		},
		invalidateAll: {
			name: 'Invalidate all',
			description:
				'If enabled, all `load` functions of the page will be rerun. See https://kit.svelte.dev/docs/load#rerunning-load-functions for more info on invalidation.'
		},
		external: {
			name: 'External',
			description:
				'If enabled, navigation will be allowed to external host URLs. By default navigation to other host/origin URLs is blocked'
		},
		preserveUrlForRedirection: {
			name: 'Preserve current URL for redirection later',
			description:
				'If enabled, the current URL will be added as a search param with the key `redirectTo` which can be retrieved after navigation'
		},
		hashParams: {
			name: 'Update hash params',
			description: 'Supplied object will be serialized and stored as hash parameter'
		},
		preserveHashParams: {
			name: 'Preserve current hash parameters',
			description:
				' If enabled, the current hash parameters will be preserved and will remain after navigation. By default, hash parameters are cleared on navigation'
		},
		searchParams: {
			name: 'URL Search parameters',
			description: 'Supplied record/map will be serialized and stored as url search parameter'
		},
		preserveSearchParams: {
			name: 'Preserve current URL search parameters',
			description:
				'If enabled, the current search parameters will be preserved and will remain after navigation. By default, search parameters are cleared on navigation'
		}
	};
</script>

<div class="flex flex-col w-full items-center space-y-10 px-4">
	<img alt="Supergoto" src="/logo.svg" />
	<div class="text-lg">
		Extension of sveltekit's <code>goto</code> module with more navigation options and URL Search parameters
		management.
	</div>
	<Divider />
	<div class="text-2xl">Demo</div>
	<Button>Navigate</Button>
	<div class="flex flex-col space-y-2 items-start w-1/3">
		<div class="text-lg">Options:</div>
		{#each Object.values(options) as { name, description }}
			<div class="flex items-center w-full space-x-8 justify-between">
				<div class="flex flex-col space-y-1">
					<div class="text-md">{name}</div>
					<div class="text-xs">{description}</div>
				</div>
				<Checkbox />
			</div>
		{/each}
	</div>
	<button class="px-4 py-2 rounded-md border-2 border-orange-500 hover:bg-orange-800">
		Navigate
	</button>
</div>
