<script lang="ts">
type Persona = { nombre: string; edad: string };
let nombre = '';
let edad = '';
let personas: Persona[] = [];
let editando = false;
let indiceEditando: number | null = null;


function agregarPersona(e: Event) {
  e.preventDefault();
  if (editando && indiceEditando !== null) {
    personas[indiceEditando] = { nombre, edad };
    personas = [...personas]; // forzar reactividad
    editando = false;
    indiceEditando = null;
  } else {
    personas = [...personas, { nombre, edad }];
  }
  nombre = '';
  edad = '';
}

  function editarPersona(index: number) {
  nombre = personas[index].nombre;
  edad = personas[index].edad;
  editando = true;
  indiceEditando = index;
}

function eliminarPersona(index: number) {
  personas.splice(index, 1);
  personas = [...personas];
}
</script>

<form on:submit|preventDefault={agregarPersona}>
  <input type="text" bind:value={nombre} placeholder="Nombre" required />
  <input type="number" bind:value={edad} placeholder="Edad" required />
  <button type="submit">{editando ? 'Actualizar' : 'Agregar'}</button>
</form>

<table>
  <thead>
    <tr><th>Nombre</th><th>Edad</th><th>Acciones</th></tr>
  </thead>
  <tbody>
    {#each personas as persona, index}
      <tr>
        <td>{persona.nombre}</td>
        <td>{persona.edad}</td>
        <td>
          <button on:click={() => editarPersona(index)}>✏️</button>
          <button on:click={() => eliminarPersona(index)}>🗑️</button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  form {
    margin-bottom: 1em;
  }

  input {
    margin-right: 0.5em;
  }

  table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
    padding: 0.5em;
  }

  button {
    margin-right: 0.3em;
  }
</style>