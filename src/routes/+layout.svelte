<script>
  let { children } = $props();
  import toast, { Toaster } from 'svelte-french-toast';
  import "../app.css";
</script>

{@render children()}

<Toaster />