<script lang="ts">
  import { onMount } from 'svelte';
  
  type Persona = { 
    id: string;
    nombre: string; 
    edad: number;
    fechaCreacion: Date;
  };
  
  let nombre = '';
  let edad: number | string = '';
  let personas: Persona[] = [];
  let editando = false;
  let indiceEditando: string | null = null;
  let busqueda = '';
  let mostrarFormulario = true;
  let animandoEliminacion = '';

  // Validación
  let errores = {
    nombre: '',
    edad: ''
  };

  // Filtrar personas por búsqueda
  $: personasFiltradas = personas.filter(p => 
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.edad.toString().includes(busqueda)
  );

  function generarId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  function validarFormulario(): boolean {
    errores = { nombre: '', edad: '' };
    let valido = true;

    if (!nombre.trim()) {
      errores.nombre = 'El nombre es requerido';
      valido = false;
    } else if (nombre.trim().length < 2) {
      errores.nombre = 'El nombre debe tener al menos 2 caracteres';
      valido = false;
    }

    if (!edad) {
      errores.edad = 'La edad es requerida';
      valido = false;
    } else if (Number(edad) < 0 || Number(edad) > 150) {
      errores.edad = 'La edad debe estar entre 0 y 150 años';
      valido = false;
    }

    return valido;
  }

  function agregarPersona(e: Event) {
    e.preventDefault();
    
    if (!validarFormulario()) return;

    if (editando && indiceEditando !== null) {
      const index = personas.findIndex(p => p.id === indiceEditando);
      if (index !== -1) {
        personas[index] = { 
          ...personas[index],
          nombre: nombre.trim(), 
          edad: Number(edad)
        };
        personas = [...personas];
      }
      editando = false;
      indiceEditando = null;
    } else {
      const nuevaPersona: Persona = {
        id: generarId(),
        nombre: nombre.trim(),
        edad: Number(edad),
        fechaCreacion: new Date()
      };
      personas = [...personas, nuevaPersona];
    }
    
    limpiarFormulario();
  }

  function editarPersona(persona: Persona) {
    nombre = persona.nombre;
    edad = persona.edad;
    editando = true;
    indiceEditando = persona.id;
    mostrarFormulario = true;
    errores = { nombre: '', edad: '' };
    
    // Scroll al formulario
    document.querySelector('.form-container')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  }

  function eliminarPersona(persona: Persona) {
    animandoEliminacion = persona.id;
    
    setTimeout(() => {
      personas = personas.filter(p => p.id !== persona.id);
      animandoEliminacion = '';
    }, 300);
  }

  function limpiarFormulario() {
    nombre = '';
    edad = '';
    errores = { nombre: '', edad: '' };
  }

  function cancelarEdicion() {
    limpiarFormulario();
    editando = false;
    indiceEditando = null;
  }

  function formatearFecha(fecha: Date): string {
    return fecha.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
</script>

<div class="container">
  <div class="header">
    <h1>Gestión de Personas</h1>
    <div class="stats">
      <div class="stat-card">
        <span class="stat-number">{personas.length}</span>
        <span class="stat-label">Total</span>
      </div>
      <div class="stat-card">
        <span class="stat-number">{personas.length > 0 ? Math.round(personas.reduce((sum, p) => sum + p.edad, 0) / personas.length) : 0}</span>
        <span class="stat-label">Edad Promedio</span>
      </div>
    </div>
  </div>

  <!-- Formulario -->
  <div class="form-container" class:hidden={!mostrarFormulario}>
    <div class="form-header">
      <h2>{editando ? '✏️ Editar Persona' : '➕ Agregar Nueva Persona'}</h2>
      <button 
        type="button" 
        class="toggle-btn"
        on:click={() => mostrarFormulario = !mostrarFormulario}
      >
        {mostrarFormulario ? '🔼' : '🔽'}
      </button>
    </div>

    <form on:submit={agregarPersona} class="form">
      <div class="form-group">
        <label for="nombre">Nombre completo</label>
        <input
          id="nombre"
          type="text"
          bind:value={nombre}
          placeholder="Ingresa el nombre completo"
          class:error={errores.nombre}
        />
        {#if errores.nombre}
          <span class="error-message">{errores.nombre}</span>
        {/if}
      </div>

      <div class="form-group">
        <label for="edad">Edad</label>
        <input
          id="edad"
          type="number"
          bind:value={edad}
          placeholder="Ingresa la edad"
          min="0"
          max="150"
          class:error={errores.edad}
        />
        {#if errores.edad}
          <span class="error-message">{errores.edad}</span>
        {/if}
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary">
          {editando ? '💾 Actualizar' : '➕ Agregar'}
        </button>
        {#if editando}
          <button type="button" class="btn btn-secondary" on:click={cancelarEdicion}>
            ❌ Cancelar
          </button>
        {/if}
      </div>
    </form>
  </div>

  <!-- Búsqueda y Lista -->
  <div class="list-container">
    <div class="search-container">
      <div class="search-wrapper">
        <span class="search-icon">🔍</span>
        <input
          type="text"
          bind:value={busqueda}
          placeholder="Buscar por nombre o edad..."
          class="search-input"
        />
        {#if busqueda}
          <button class="clear-search" on:click={() => busqueda = ''}>✕</button>
        {/if}
      </div>
      <button 
        class="toggle-form-btn"
        on:click={() => mostrarFormulario = !mostrarFormulario}
      >
        {mostrarFormulario ? 'Ocultar Formulario' : 'Mostrar Formulario'}
      </button>
    </div>

    {#if personasFiltradas.length === 0}
      <div class="empty-state">
        {#if personas.length === 0}
          <div class="empty-icon">👥</div>
          <h3>No hay personas registradas</h3>
          <p>Agrega la primera persona usando el formulario de arriba</p>
        {:else}
          <div class="empty-icon">🔍</div>
          <h3>No se encontraron resultados</h3>
          <p>Intenta con otro término de búsqueda</p>
        {/if}
      </div>
    {:else}
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Fecha de Registro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {#each personasFiltradas as persona (persona.id)}
              <tr 
                class="table-row"
                class:deleting={animandoEliminacion === persona.id}
              >
                <td class="name-cell">
                  <div class="avatar">{persona.nombre.charAt(0).toUpperCase()}</div>
                  <span>{persona.nombre}</span>
                </td>
                <td>
                  <span class="age-badge">{persona.edad} años</span>
                </td>
                <td class="date-cell">
                  {formatearFecha(persona.fechaCreacion)}
                </td>
                <td class="actions-cell">
                  <button
                    class="btn btn-edit"
                    on:click={() => editarPersona(persona)}
                    title="Editar persona"
                  >
                    ✏️
                  </button>
                  <button
                    class="btn btn-delete"
                    on:click={() => eliminarPersona(persona)}
                    title="Eliminar persona"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </div>
</div>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
  }

  .header {
    text-align: center;
    margin-bottom: 2rem;
    color: white;
  }

  .header h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .stats {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 1rem;
  }

  .stat-card {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    padding: 1rem 1.5rem;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }

  .stat-number {
    display: block;
    font-size: 2rem;
    font-weight: bold;
    color: white;
  }

  .stat-label {
    font-size: 0.875rem;
    opacity: 0.9;
  }

  .form-container {
    background: white;
    border-radius: 16px;
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
  }

  .form-container.hidden {
    max-height: 60px;
    overflow: hidden;
    padding: 1rem 2rem;
  }

  .form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .form-header h2 {
    margin: 0;
    color: #1e293b;
    font-size: 1.5rem;
  }

  .toggle-btn {
    background: #f1f5f9;
    border: none;
    border-radius: 8px;
    padding: 0.5rem;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.2s ease;
  }

  .toggle-btn:hover {
    background: #e2e8f0;
    transform: scale(1.05);
  }

  .form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    align-items: start;
  }

  .form-group {
    display: flex;
    flex-direction: column;
  }

  .form-group label {
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
  }

  .form-group input {
    padding: 0.75rem 1rem;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.2s ease;
    background: white;
  }

  .form-group input:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  .form-group input.error {
    border-color: #ef4444;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
  }

  .error-message {
    color: #ef4444;
    font-size: 0.75rem;
    margin-top: 0.25rem;
    font-weight: 500;
  }

  .form-actions {
    grid-column: 1 / -1;
    display: flex;
    gap: 1rem;
    justify-content: flex-start;
    margin-top: 1rem;
  }

  .btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.875rem;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  .btn-primary {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
  }

  .btn-secondary {
    background: #f8fafc;
    color: #64748b;
    border: 1px solid #e2e8f0;
  }

  .btn-secondary:hover {
    background: #f1f5f9;
  }

  .list-container {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .search-container {
    padding: 1.5rem;
    background: linear-gradient(135deg, #f8fafc, #f1f5f9);
    border-bottom: 1px solid #e2e8f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  .search-wrapper {
    position: relative;
    flex: 1;
    max-width: 400px;
  }

  .search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
  }

  .search-input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 1rem;
    background: white;
    transition: all 0.2s ease;
  }

  .search-input:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  .clear-search {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #9ca3af;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 4px;
    transition: all 0.2s ease;
  }

  .clear-search:hover {
    background: #f3f4f6;
    color: #374151;
  }

  .toggle-form-btn {
    background: #6366f1;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .toggle-form-btn:hover {
    background: #5856eb;
    transform: translateY(-1px);
  }

  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
    color: #6b7280;
  }

  .empty-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  .empty-state h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: #374151;
  }

  .table-wrapper {
    overflow-x: auto;
  }

  .table {
    width: 100%;
    border-collapse: collapse;
  }

  .table th {
    background: #f8fafc;
    padding: 1rem;
    text-align: left;
    font-weight: 600;
    color: #374151;
    border-bottom: 2px solid #e5e7eb;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .table-row {
    transition: all 0.3s ease;
    border-bottom: 1px solid #f1f5f9;
  }

  .table-row:hover {
    background: #f8fafc;
    transform: scale(1.01);
  }

  .table-row.deleting {
    opacity: 0;
    transform: translateX(-100%);
  }

  .table td {
    padding: 1rem;
    vertical-align: middle;
  }

  .name-cell {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-weight: 500;
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1rem;
  }

  .age-badge {
    background: #dbeafe;
    color: #1e40af;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 500;
  }

  .date-cell {
    color: #6b7280;
    font-size: 0.875rem;
  }

  .actions-cell {
    display: flex;
    gap: 0.5rem;
  }

  .btn-edit {
    background: #fef3c7;
    color: #d97706;
    border: 1px solid #fcd34d;
    padding: 0.5rem;
    border-radius: 6px;
    font-size: 0.875rem;
  }

  .btn-edit:hover {
    background: #fde68a;
    transform: scale(1.1);
  }

  .btn-delete {
    background: #fecaca;
    color: #dc2626;
    border: 1px solid #f87171;
    padding: 0.5rem;
    border-radius: 6px;
    font-size: 0.875rem;
  }

  .btn-delete:hover {
    background: #fca5a5;
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    .container {
      padding: 1rem;
    }

    .form {
      grid-template-columns: 1fr;
    }

    .search-container {
      flex-direction: column;
      align-items: stretch;
    }

    .search-wrapper {
      max-width: none;
    }

    .stats {
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }

    .stat-card {
      width: 100%;
      max-width: 200px;
    }

    .header h1 {
      font-size: 2rem;
    }

    .table {
      font-size: 0.875rem;
    }

    .name-cell {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }

    .actions-cell {
      flex-direction: column;
    }
  }
</style>