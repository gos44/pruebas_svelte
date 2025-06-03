<script>
  let { type = 'text', placeholder = '', value = '' } = $props();
</script>

<input {type} {placeholder} bind:value />

<style>
  input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
  }
</style>