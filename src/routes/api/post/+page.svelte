<script lang="ts">
  import axios from 'axios';
  import type { Post } from './+page.ts';
  let posts = $state<Post[]>([]);
  let error = $state<string | null>(null);

  // Si usas Vite/SvelteKit, importa la variable de entorno así:
  const VITE_LETRAS_URL_POST = import.meta.env.VITE_LETRAS_URL_POST 

  // 'https://jsonplaceholder.typicode.com/posts'

  $effect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get<Post[]>(VITE_LETRAS_URL_POST);
        posts = res.data;
      } catch (e: any) {
        error = e.message ?? 'Error al cargar los posts';
      }
    };
    fetchPosts();
  });
</script>

{#if error}
  <p>{error}</p>
{:else}
  <ul>
    {#each posts as post}
      <li><strong>{post.title}</strong></li>
    {/each}
  </ul>
{/if}

<style>
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    margin: 0.5rem 0;
    font-size: 1.2rem;
  }
  strong {
    color: #333;
  }
</style>