<script>
import A from '$lib/components/A.svelte';
import B from '$lib/components/B.svelte';

let contador = $state(0)

function incremento(){
    contador += 1
}
</script>

<h1>Stores Globales</h1>

<A />
<B />

<button onclick={incremento}>Contador:{contador}</button>

