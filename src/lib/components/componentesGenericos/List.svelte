<script>
  let { items = [] } = $props();
</script>

<ul>
  {#each items as item}
    <li>
      <slot {item}>{item}</slot>
    </li>
  {/each}
</ul>

<style>
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    padding: 0.5rem;
    border-bottom: 1px solid #eee;
  }
</style>