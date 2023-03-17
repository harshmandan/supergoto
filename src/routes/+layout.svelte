<script lang="ts">
	import Footer from '$components/footer/Footer.svelte';
	import Navbar from '$components/navbar/Navbar.svelte';
	import '../app.css';
</script>

<Navbar />
<div class="my-8">
	<slot />
</div>
<Footer />
