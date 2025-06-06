// src/routes/+page.ts
export type Post = {
  id: number;
  title: string;
  body: string;
};

export async function load({ fetch }) {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!res.ok) throw new Error('Error cargando posts');
  const posts: Post[] = await res.json();
  return { posts };
}
