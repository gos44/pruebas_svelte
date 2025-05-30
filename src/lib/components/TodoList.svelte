    <script lang="ts">
    let nuevaTarea = '';
    
    type Tarea = {
    texto: string;
    completada: boolean;
    };

    let tareas: Tarea[] = [];
    
    function agregarTarea() {
        if (nuevaTarea.trim() === '') return;
        tareas = [...tareas, { texto: nuevaTarea, completada: false }];
        nuevaTarea = '';
    }
    function eliminarTarea(index: number) {
    tareas.splice(index, 1);
    tareas = [...tareas];
    }
    function toggleCompletada(index: number) {
    tareas[index].completada = !tareas[index].completada;
    tareas = [...tareas];
    }
    </script>

    <h2>Lista de Tareas</h2>

    <input
    type="text"
    bind:value={nuevaTarea}
    placeholder="Escribe una tarea..."
    on:keydown={(e) => e.key === 'Enter' && agregarTarea()}
    />
    <button on:click={agregarTarea}>Agregar</button>

    <ul>
    {#each tareas as tarea, index}
        <li>
        <input
            type="checkbox"
            checked={tarea.completada}
            on:change={() => toggleCompletada(index)}
        />
        <span style:text-decoration={tarea.completada ? 'line-through' : 'none'}>
    {tarea.texto}
    </span>
        <button on:click={() => eliminarTarea(index)}>🗑️</button>
        </li>
    {/each}
    </ul>

    <style>
    input[type="text"] {
        margin-right: 0.5em;
    }

    li {
        margin-bottom: 0.4em;
        list-style: none;
    }

    span {
        margin: 0 0.5em;
    }

    button {
        margin-left: 0.5em;
    }
    </style>
