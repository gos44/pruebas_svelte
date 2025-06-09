<script>
  let { tabs = [], activeTab = 0 } = $props();
</script>

<div class="tabs">
  {#each tabs as tab, index}
    <button
      class:active={activeTab === index}
      on:click={() => activeTab = index}
    >
      {tab}
    </button>
  {/each}
</div>
<div class="content">
  <slot {activeTab} />
</div>

<style>
  .tabs {
    display: flex;
    gap: 0.5rem;
    border-bottom: 1px solid #ddd;
  }
  .tabs button {
    padding: 0.5rem 1rem;
    background: none;
    border: none;
    cursor: pointer;
  }
  .tabs button.active {
    border-bottom: 2px solid #3b82f6;
  }
</style>