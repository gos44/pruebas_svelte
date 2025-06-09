<script>
  import Header from '$lib/components/ui/Header.svelte';
  import Counter from '$lib/components/ui/Contador.svelte';
  import TextInput from '$lib/components/ui/ContenedorTexto.svelte';
  import ToggleVisibility from '$lib/components/ui/ContenedorVisible.svelte';
  import Card from '$lib/components/compGenericos/Card.svelte';
</script>


<main>
  <Header />
  
  <div class="container">
    <Counter />
    <TextInput />
    <ToggleVisibility />
    
  </div>

  
</main>

<style>
:global(body) {
    margin: 0;
    padding: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  :global(*) {
    box-sizing: border-box;
  }

  :global(main) {
    min-height: 100vh;
    padding: 2rem 1rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  .container {
    max-width: 800px;
    margin: 0 auto;
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  @media (max-width: 768px) {
    .container {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }
</style>