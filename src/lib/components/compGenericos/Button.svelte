<script lang="ts">
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let disabled: boolean = false;
  export let variant: 'primary' | 'secondary' | 'danger' = 'primary';
</script>

<button
  type={type}
  disabled={disabled}
  class:primary={variant === 'primary'}
  class:secondary={variant === 'secondary'}
  class:danger={variant === 'danger'}
>
  <slot>Botón</slot>
</button>

<style>
  button {
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    border: none;
    margin: auto;
    display: flex;
  }
  .primary { background: #3b82f6; color: white; }
  .secondary { background: #e2e8f0; color: #1e293b; }
  .danger { background: #ef4444; color: white; }
  button:disabled { opacity: 0.5; cursor: not-allowed; }
</style>