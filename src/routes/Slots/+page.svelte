<script>
import Slot from './Slot.svelte';
</script>

<h1>Slots</h1>

<Slot>
<p>Este contenido se inyecta dentro del slot del layout.</p>
<button>Acción dentro del slot</button>
</Slot>