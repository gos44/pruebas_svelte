<script lang="ts">
  import type { Post } from './+page.ts';
  let posts = $state<Post[]>([]);
  let error = $state<string | null>(null);

  $effect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!res.ok) throw new Error('Error al cargar los posts');
        posts = await res.json();
      } catch (e: any) {
        error = e.message;
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
      <li ><strong>{post.title}</strong></li>
    {/each}
  </ul>
{/if}
