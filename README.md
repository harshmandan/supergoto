<img align="center" src="https://github.com/harshmandan/supergoto/blob/main/static/logo.svg?raw=true"></img>

# Supergoto

Extension of svelte's `goto` module with additional navigation options and URL Search parameters management.

# What it does

Supergoto builds upon Svelte's inbuilt `goto` module to better handle the navigation actions. Since it's built on top of the existing module and uses the same options and API you do not have to un-learn anything. It adds functionality on top of the existing API to handle URL search and has parameters and adds safe ways to manipulate those parameters along with some other additional features!

# Features

- Navigate while keeping your URL parameters intact
- Update search parameters without navigation
- Update hash parameters without navigation
- Easily manage the redirect option
- Prevent external navigation by default
- Prevent XSS attacks by preventing navigating to `javascript:` and `script:` URLs.

# Upcoming Features:

- [ ] Simplify API by merging hash and search params options
- [ ] Use JSON.parse() & JSON.stringify() to support serializing/deserializing value types other than `string`
- [ ] Interactive demo
- [ ] Add JSDocs reference to all definitions
- [ ] Make this library framework agnostic

# API

Since `supergoto` uses `goto` under the hood the existing options remain the same, but now you have other useful functions as well

```

function supergoto(
  url: string | URL,
  options?: {
    /**
     * If `true`, will replace the current `history` entry rather than creating a new one with `pushState`
    */
    replaceState?: boolean;
    /**
     * If `true`, the browser will maintain its scroll position rather than scrolling to the top of the page after navigation
    */
    noScroll?: boolean;
    /**
     * If `true`, the currently focused element will retain focus after navigation. Otherwise, focus will be reset to the body
    */
    keepFocus?: boolean;
    /**
     * The state of the new/updated history entry
    */
    state?: any;
    /**
     * If `true`, all `load` functions of the page will be rerun. See https://kit.svelte.dev/docs/load#rerunning-load-functions for more info on invalidation.
    */
    invalidateAll?: boolean;
    /**
    * If `true`, navigation will be allowed to external host URLs. Otherwise navigation to other host/origin URLs will be blocked
    */
    external?: boolean;
    /**
     * If `true`, the current URL will be added as a search param with the key `redirectTo` which can be retrieved after navigation
    */
    preserveUrlForRedirection?: boolean;
    /**
     * Supplied object will be serialized and stored as hash parameter. See https://developer.mozilla.org/en-US/docs/Web/API/URL/hash
    */
    hashParams?: object;
    /**
     * If `true`, the current hash parameters will be preserved and will remain after navigation. Otherwise, hash parameters will get cleared
    */
    preserveHashParams?: boolean;
    /**
     * Supplied record/map will be serialized and stored as url search parameter. See https://developer.mozilla.org/en-US/docs/Web/API/URL/search
    */
    searchParams?: SearchParams;
     /**
     * If `true`, the current search parameters will be preserved and will remain after navigation. Otherwise, search parameters will get cleared
    */
    preserveSearchParams?: boolean;
  }
)
```

# DEMO

Coming Soon
