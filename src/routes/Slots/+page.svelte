<script>
import LayoutPersonalizado from './LayoutPersonalizado.svelte';
</script>

<h1>Slots</h1>

<LayoutPersonalizado>
<p>Este contenido se inyecta dentro del slot del layout.</p>
<button>Acción dentro del slot</button>
<p>{Date()}</p>
</LayoutPersonalizado>
