<script>
  let { isOpen = false, title = 'Modal' } = $props();

  function close() {
    isOpen = false;
  }
</script>

{#if isOpen}
  <div class="modal-backdrop" on:click={close}>
    <div class="modal" on:click|stopPropagation>
      <div class="modal-header">
        <h3>{title}</h3>
        <button on:click={close}>×</button>
      </div>
      <div class="modal-body">
        <slot />
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal {
    background: white;
    padding: 1rem;
    border-radius: 8px;
    min-width: 300px;
  }
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>