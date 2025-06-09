<script>
  let { title = '', padding = '3rem' } = $props();
</script>

<div class="card" style="padding: {padding}">
  {#if title}
    <h3>{title}</h3>
  {/if}
  <slot />
</div>

<style>
  .card {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
</style>