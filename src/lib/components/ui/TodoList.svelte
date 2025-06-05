<script lang="ts">
    import { onMount } from 'svelte';
    
    type Tarea = {
        id: string;
        texto: string;
        completada: boolean;
        prioridad: 'baja' | 'media' | 'alta';
        categoria: string;
        fechaCreacion: Date;
        fechaVencimiento?: Date;
    };

    type Filtro = 'todas' | 'pendientes' | 'completadas';
    type OrdenarPor = 'fecha' | 'prioridad' | 'alfabetico';

    let nuevaTarea = $state('');
    let nuevaPrioridad = $state<'baja' | 'media' | 'alta'>('media');
    let nuevaCategoria = $state('');
    let nuevaFechaVencimiento = $state('');
    let tareas = $state<Tarea[]>([]);
    let filtroActual = $state<Filtro>('todas');
    let ordenarPor = $state<OrdenarPor>('fecha');
    let busqueda = $state('');
    let modoOscuro = $state(false);
    let editandoId = $state<string | null>(null);
    let textoEditando = $state('');
    let mostrarFormulario = $state(false);
    let animandoEliminacion = $state('');

    // Categorías predefinidas
    const categoriasPredefinidas = ['Personal', 'Trabajo', 'Estudios', 'Hogar', 'Salud', 'Compras'];

    // Computed properties usando $derived
    const tareasFiltradas = $derived(filtrarYOrdenarTareas(tareas, filtroActual, ordenarPor, busqueda));
    const estadisticas = $derived(calcularEstadisticas(tareas));
    const progreso = $derived(tareas.length > 0 ? (tareas.filter(t => t.completada).length / tareas.length) * 100 : 0);

    function generarId(): string {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    function filtrarYOrdenarTareas(tareas: Tarea[], filtro: Filtro, orden: OrdenarPor, busqueda: string): Tarea[] {
        let resultado = [...tareas];

        // Filtrar por búsqueda
        if (busqueda) {
            resultado = resultado.filter(t =>
                t.texto.toLowerCase().includes(busqueda.toLowerCase()) ||
                t.categoria.toLowerCase().includes(busqueda.toLowerCase())
            );
        }

        // Filtrar por estado
        switch (filtro) {
            case 'pendientes':
                resultado = resultado.filter(t => !t.completada);
                break;
            case 'completadas':
                resultado = resultado.filter(t => t.completada);
                break;
        }

        // Ordenar
        switch (orden) {
            case 'prioridad':
                const prioridadPeso = { alta: 3, media: 2, baja: 1 };
                resultado.sort((a, b) => prioridadPeso[b.prioridad] - prioridadPeso[a.prioridad]);
                break;
            case 'alfabetico':
                resultado.sort((a, b) => a.texto.localeCompare(b.texto));
                break;
            case 'fecha':
            default:
                resultado.sort((a, b) => b.fechaCreacion.getTime() - a.fechaCreacion.getTime());
                break;
        }

        return resultado;
    }

    function calcularEstadisticas(tareas: Tarea[]) {
        return {
            total: tareas.length,
            completadas: tareas.filter(t => t.completada).length,
            pendientes: tareas.filter(t => !t.completada).length,
            vencidas: tareas.filter(t => 
                t.fechaVencimiento && 
                new Date(t.fechaVencimiento) < new Date() && 
                !t.completada
            ).length,
            porPrioridad: {
                alta: tareas.filter(t => t.prioridad === 'alta' && !t.completada).length,
                media: tareas.filter(t => t.prioridad === 'media' && !t.completada).length,
                baja: tareas.filter(t => t.prioridad === 'baja' && !t.completada).length,
            }
        };
    }

    function agregarTarea() {
        if (nuevaTarea.trim() === '') return;

        const nuevaTareaObj: Tarea = {
            id: generarId(),
            texto: nuevaTarea.trim(),
            completada: false,
            prioridad: nuevaPrioridad,
            categoria: nuevaCategoria || 'General',
            fechaCreacion: new Date(),
            fechaVencimiento: nuevaFechaVencimiento ? new Date(nuevaFechaVencimiento) : undefined
        };

        tareas = [...tareas, nuevaTareaObj];
        limpiarFormulario();
        guardarEnLocalStorage();
    }

    function limpiarFormulario() {
        nuevaTarea = '';
        nuevaPrioridad = 'media';
        nuevaCategoria = '';
        nuevaFechaVencimiento = '';
        mostrarFormulario = false;
    }

    function eliminarTarea(id: string) {
        animandoEliminacion = id;
        
        setTimeout(() => {
            tareas = tareas.filter(t => t.id !== id);
            animandoEliminacion = '';
            guardarEnLocalStorage();
        }, 300);
    }

    function toggleCompletada(id: string) {
        tareas = tareas.map(t => 
            t.id === id ? { ...t, completada: !t.completada } : t
        );
        guardarEnLocalStorage();
    }

    function iniciarEdicion(tarea: Tarea) {
        editandoId = tarea.id;
        textoEditando = tarea.texto;
    }

    function guardarEdicion() {
        if (textoEditando.trim() === '') return;
        
        tareas = tareas.map(t => 
            t.id === editandoId ? { ...t, texto: textoEditando.trim() } : t
        );
        
        editandoId = null;
        textoEditando = '';
        guardarEnLocalStorage();
    }

    function cancelarEdicion() {
        editandoId = null;
        textoEditando = '';
    }

    function eliminarCompletadas() {
        tareas = tareas.filter(t => !t.completada);
        guardarEnLocalStorage();
    }

    function marcarTodasCompletadas() {
        const todasCompletadas = tareas.every(t => t.completada);
        tareas = tareas.map(t => ({ ...t, completada: !todasCompletadas }));
        guardarEnLocalStorage();
    }

    function obtenerColorPrioridad(prioridad: string): string {
        switch (prioridad) {
            case 'alta': return '#ef4444';
            case 'media': return '#f59e0b';
            case 'baja': return '#10b981';
            default: return '#6b7280';
        }
    }

    function estaVencida(tarea: Tarea): boolean {
        return !!(tarea.fechaVencimiento && 
                new Date(tarea.fechaVencimiento) < new Date() && 
                !tarea.completada);
    }

    function formatearFecha(fecha: Date): string {
        return fecha.toLocaleDateString('es-ES', { 
            day: 'numeric', 
            month: 'short' 
        });
    }

    function guardarEnLocalStorage() {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('tareas-todo', JSON.stringify(tareas));
            localStorage.setItem('modo-oscuro', JSON.stringify(modoOscuro));
        }
    }

    function cargarDeLocalStorage() {
        if (typeof localStorage !== 'undefined') {
            const tareasGuardadas = localStorage.getItem('tareas-todo');
            const modoOscuroGuardado = localStorage.getItem('modo-oscuro');
            
            if (tareasGuardadas) {
                try {
                    const tareasParseadas = JSON.parse(tareasGuardadas);
                    tareas = tareasParseadas.map((t: any) => ({
                        ...t,
                        fechaCreacion: new Date(t.fechaCreacion),
                        fechaVencimiento: t.fechaVencimiento ? new Date(t.fechaVencimiento) : undefined
                    }));
                } catch (e) {
                    console.error('Error al cargar tareas:', e);
                }
            }
            
            if (modoOscuroGuardado) {
                modoOscuro = JSON.parse(modoOscuroGuardado);
            }
        }
    }

    onMount(() => {
        cargarDeLocalStorage();
    });

    // Effect para el modo oscuro usando $effect
    $effect(() => {
        if (typeof window !== 'undefined') {
            document.body.classList.toggle('dark-mode', modoOscuro);
        }
    });
</script>

<div class="app" class:dark={modoOscuro}>
    <div class="container">
        <!-- Header -->
        <header class="header">
            <div class="header-content">
                <div class="title-section">
                    <h1>✨ Mi Lista de Tareas</h1>
                    <p>Organiza tu día de manera inteligente</p>
                </div>
                <div class="header-controls">
                    <button 
                        class="mode-toggle"
                        onclick={() => { modoOscuro = !modoOscuro; guardarEnLocalStorage(); }}
                        title={modoOscuro ? 'Modo claro' : 'Modo oscuro'}
                    >
                        {modoOscuro ? '☀️' : '🌙'}
                    </button>
                </div>
            </div>

            <!-- Progress Bar -->
            <div class="progress-container">
                <div class="progress-bar">
                    <div 
                        class="progress-fill" 
                        style="width: {progreso}%"
                    ></div>
                </div>
                <span class="progress-text">
                    {Math.round(progreso)}% completado ({estadisticas.completadas}/{estadisticas.total})
                </span>
            </div>
        </header>

        <!-- Stats -->
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon">📋</div>
                <div class="stat-content">
                    <div class="stat-number">{estadisticas.total}</div>
                    <div class="stat-label">Total</div>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">⏳</div>
                <div class="stat-content">
                    <div class="stat-number">{estadisticas.pendientes}</div>
                    <div class="stat-label">Pendientes</div>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">✅</div>
                <div class="stat-content">
                    <div class="stat-number">{estadisticas.completadas}</div>
                    <div class="stat-label">Completadas</div>
                </div>
            </div>
            <div class="stat-card priority-high">
                <div class="stat-icon">🔥</div>
                <div class="stat-content">
                    <div class="stat-number">{estadisticas.porPrioridad.alta}</div>
                    <div class="stat-label">Alta Prioridad</div>
                </div>
            </div>
        </div>

        <!-- Add Task Form -->
        <div class="form-container">
            <div class="form-header">
                <button 
                    class="add-task-btn"
                    onclick={() => mostrarFormulario = !mostrarFormulario}
                >
                    <span class="btn-icon">{mostrarFormulario ? '−' : '+'}</span>
                    {mostrarFormulario ? 'Ocultar formulario' : 'Agregar nueva tarea'}
                </button>
            </div>

            {#if mostrarFormulario}
                <form onsubmit={(e) => { e.preventDefault(); agregarTarea(); }} class="task-form">
                    <div class="form-row">
                        <div class="form-group flex-2">
                            <label for="nueva-tarea">Descripción de la tarea</label>
                            <input
                                id="nueva-tarea"
                                type="text"
                                bind:value={nuevaTarea}
                                placeholder="¿Qué necesitas hacer?"
                                required
                            />
                        </div>
                        <div class="form-group">
                            <label for="prioridad">Prioridad</label>
                            <select id="prioridad" bind:value={nuevaPrioridad}>
                                <option value="baja">🟢 Baja</option>
                                <option value="media">🟡 Media</option>
                                <option value="alta">🔴 Alta</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="categoria">Categoría</label>
                            <input
                                id="categoria"
                                type="text"
                                bind:value={nuevaCategoria}
                                placeholder="Ej: Trabajo, Personal..."
                                list="categorias"
                            />
                            <datalist id="categorias">
                                {#each categoriasPredefinidas as categoria}
                                    <option value={categoria}></option>
                                {/each}
                            </datalist>
                        </div>
                        <div class="form-group">
                            <label for="fecha-vencimiento">Fecha límite (opcional)</label>
                            <input
                                id="fecha-vencimiento"
                                type="date"
                                bind:value={nuevaFechaVencimiento}
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </div>
                    </div>

                    <div class="form-actions">
                        <button type="submit" class="btn btn-primary">
                            ➕ Agregar Tarea
                        </button>
                        <button type="button" class="btn btn-secondary" onclick={limpiarFormulario}>
                            🔄 Limpiar
                        </button>
                    </div>
                </form>
            {/if}
        </div>

        <!-- Controls -->
        <div class="controls">
            <div class="search-container">
                <div class="search-wrapper">
                    <span class="search-icon">🔍</span>
                    <input
                        type="text"
                        bind:value={busqueda}
                        placeholder="Buscar tareas..."
                        class="search-input"
                    />
                    {#if busqueda}
                        <button class="clear-search" onclick={() => busqueda = ''}>✕</button>
                    {/if}
                </div>
            </div>

            <div class="filters">
                <div class="filter-group">
                    <label>Mostrar:</label>
                    <select bind:value={filtroActual}>
                        <option value="todas">📋 Todas</option>
                        <option value="pendientes">⏳ Pendientes</option>
                        <option value="completadas">✅ Completadas</option>
                    </select>
                </div>

                <div class="filter-group">
                    <label>Ordenar por:</label>
                    <select bind:value={ordenarPor}>
                        <option value="fecha">📅 Fecha</option>
                        <option value="prioridad">🎯 Prioridad</option>
                        <option value="alfabetico">🔤 Alfabético</option>
                    </select>
                </div>
            </div>

            <div class="bulk-actions">
                {#if estadisticas.completadas > 0}
                    <button class="btn btn-outline" onclick={eliminarCompletadas}>
                        🗑️ Limpiar completadas
                    </button>
                {/if}
                {#if estadisticas.pendientes > 0}
                    <button class="btn btn-outline" onclick={marcarTodasCompletadas}>
                        ✅ Marcar todas
                    </button>
                {/if}
            </div>
        </div>

        <!-- Tasks List -->
        <div class="tasks-container">
            {#if tareasFiltradas.length === 0}
                <div class="empty-state">
                    <div class="empty-icon">
                        {#if busqueda}
                            🔍
                        {:else if filtroActual === 'completadas'}
                            🎯
                        {:else if tareas.length === 0}
                            📝
                        {:else}
                            ✨
                        {/if}
                    </div>
                    <h3>
                        {#if busqueda}
                            No se encontraron tareas
                        {:else if filtroActual === 'completadas'}
                            No hay tareas completadas
                        {:else if tareas.length === 0}
                            ¡Comienza agregando tu primera tarea!
                        {:else}
                            No hay tareas pendientes
                        {/if}
                    </h3>
                    <p>
                        {#if busqueda}
                            Intenta con otro término de búsqueda
                        {:else if filtroActual === 'completadas'}
                            Las tareas completadas aparecerán aquí
                        {:else if tareas.length === 0}
                            Usa el botón de arriba para crear una nueva tarea
                        {:else}
                            ¡Felicidades! Has completado todas tus tareas
                        {/if}
                    </p>
                </div>
            {:else}
                <div class="tasks-list">
                    {#each tareasFiltradas as tarea (tarea.id)}
                        <div 
                            class="task-item" 
                            class:completed={tarea.completada}
                            class:overdue={estaVencida(tarea)}
                            class:deleting={animandoEliminacion === tarea.id}
                        >
                            <div class="task-checkbox">
                                <input
                                    type="checkbox"
                                    checked={tarea.completada}
                                    onchange={() => toggleCompletada(tarea.id)}
                                    id="task-{tarea.id}"
                                />
                                <label for="task-{tarea.id}" class="checkbox-custom"></label>
                            </div>
                            <div class="task-content">
                                {#if editandoId === tarea.id}
                                    <div class="edit-form">
                                        <input
                                            type="text"
                                            bind:value={textoEditando}
                                            class="edit-input"
                                            onkeydown={(e) => {
                                                if (e.key === 'Enter') guardarEdicion();
                                                if (e.key === 'Escape') cancelarEdicion();
                                            }}
                                            autofocus
                                        />
                                        <div class="edit-actions">
                                            <button class="btn-small btn-success" onclick={guardarEdicion}>✓</button>
                                            <button class="btn-small btn-cancel" onclick={cancelarEdicion}>✕</button>
                                        </div>
                                    </div>
                                {:else}
                                    <div class="task-main">
                                        <div class="task-text">{tarea.texto}</div>
                                        <div class="task-meta">
                                            <span 
                                                class="priority-badge"
                                                style="background-color: {obtenerColorPrioridad(tarea.prioridad)}20; color: {obtenerColorPrioridad(tarea.prioridad)}"
                                            >
                                                {tarea.prioridad}
                                            </span>
                                            <span class="category-badge">{tarea.categoria}</span>
                                            {#if tarea.fechaVencimiento}
                                                <span class="due-date" class:overdue={estaVencida(tarea)}>
                                                    📅 {formatearFecha(tarea.fechaVencimiento)}
                                                </span>
                                            {/if}
                                        </div>
                                    </div>
                                {/if}
                            </div>

                            <div class="task-actions">
                                {#if editandoId !== tarea.id}
                                    <button
                                        class="btn-action btn-edit"
                                        onclick={() => iniciarEdicion(tarea)}
                                        title="Editar tarea"
                                    >
                                        ✏️
                                    </button>
                                {/if}
                                <button
                                    class="btn-action btn-delete"
                                    onclick={() => eliminarTarea(tarea.id)}
                                    title="Eliminar tarea"
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
</div>
    <style>
    :global(body.dark-mode) {
        background: #0f172a;
        color: #f1f5f9;
    }

    .app {
        min-height: 100vh;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        transition: all 0.3s ease;
    }

    .app.dark {
        background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
    }

    .container {
        max-width: 900px;
        margin: 0 auto;
        padding: 2rem;
    }

    .header {
        text-align: center;
        margin-bottom: 2rem;
        color: white;
    }

    .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
    }

    .title-section h1 {
        font-size: 2.5rem;
        margin: 0 0 0.5rem 0;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }

    .title-section p {
        font-size: 1.1rem;
        opacity: 0.9;
        margin: 0;
    }

    .mode-toggle {
        background: rgba(255, 255, 255, 0.2);
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 1.5rem;
        cursor: pointer;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
    }

    .mode-toggle:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: scale(1.1);
    }

    .progress-container {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .progress-bar {
        flex: 1;
        height: 8px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 4px;
        overflow: hidden;
    }

    .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #10b981, #34d399);
        border-radius: 4px;
        transition: width 0.5s ease;
    }

    .progress-text {
        font-size: 0.875rem;
        font-weight: 500;
        white-space: nowrap;
    }

    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin-bottom: 2rem;
    }

    .stat-card {
        background: rgba(255, 255, 255, 0.95);
        border-radius: 16px;
        padding: 1.5rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        transition: all 0.3s ease;
    }

    .stat-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    }

    .app.dark .stat-card {
        background: rgba(30, 41, 59, 0.8);
        color: #f1f5f9;
    }

    .stat-card.priority-high {
        background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05));
        border-color: rgba(239, 68, 68, 0.2);
    }

    .stat-icon {
        font-size: 2rem;
    }

    .stat-number {
        font-size: 2rem;
        font-weight: bold;
        color: #1e293b;
    }

    .app.dark .stat-number {
        color: #f1f5f9;
    }

    .stat-label {
        font-size: 0.875rem;
        color: #64748b;
    }

    .app.dark .stat-label {
        color: #94a3b8;
    }

    .form-container {
        background: rgba(255, 255, 255, 0.95);
        border-radius: 16px;
        padding: 1.5rem;
        margin-bottom: 2rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .app.dark .form-container {
        background: rgba(30, 41, 59, 0.8);
        color: #f1f5f9;
    }

    .form-header {
        margin-bottom: 1rem;
    }

    .add-task-btn {
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white;
        border: none;
        border-radius: 12px;
        padding: 1rem 2rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-size: 1rem;
        width: 100%;
        justify-content: center;
    }

    .add-task-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(99, 102, 241, 0.3);
    }

    .btn-icon {
        font-size: 1.25rem;
        font-weight: bold;
    }

    .task-form {
        margin-top: 1rem;
    }

    .form-row {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .form-group {
        display: flex;
        flex-direction: column;
    }

    .form-group.flex-2 {
        grid-column: span 2;
    }

    .form-group label {
        font-weight: 600;
        color: #374151;
        margin-bottom: 0.5rem;
        font-size: 0.875rem;
    }

    .app.dark .form-group label {
        color: #f1f5f9;
    }

    .form-group input,
    .form-group select {
        padding: 0.75rem 1rem;
        border: 2px solid #e5e7eb;
        border-radius: 8px;
        font-size: 1rem;
        transition: all 0.2s ease;
        background: white;
    }

    .app.dark .form-group input,
    .app.dark .form-group select {
        background: #1e293b;
        border-color: #475569;
        color: #f1f5f9;
    }

    .form-group input:focus,
    .form-group select:focus {
        outline: none;
        border-color: #6366f1;
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }

    .form-actions {
        display: flex;
        gap: 1rem;
        margin-top: 1.5rem;
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
        background: linear-gradient(135deg, #10b981, #34d399);
        color: white;
    }

    .btn-primary:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
    }

    .btn-secondary {
        background: #f8fafc;
        color: #64748b;
        border: 1px solid #e2e8f0;
    }

    .btn-secondary:hover {
        background: #f1f5f9;
    }

    .btn-outline {
        background: transparent;
        color: white;
        border: 2px solid rgba(255, 255, 255, 0.3);
    }

    .btn-outline:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.5);
    }

    .controls {
        background: rgba(255, 255, 255, 0.95);
        border-radius: 16px;
        padding: 1.5rem;
        margin-bottom: 2rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        align-items: center;
        justify-content: space-between;
    }
    .app.dark .controls {
    background: rgba(30, 41, 59, 0.8);
    color: #f1f5f9;
  }

  .search-container {
    flex: 1;
    min-width: 250px;
  }

  .search-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .search-icon {
    position: absolute;
    left: 1rem;
    color: #64748b;
    z-index: 1;
  }

  .search-input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.2s ease;
    background: white;
  }

  .app.dark .search-input {
    background: #1e293b;
    border-color: #475569;
    color: #f1f5f9;
  }

  .search-input:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  .clear-search {
    position: absolute;
    right: 0.75rem;
    background: none;
    border: none;
    color: #64748b;
    cursor: pointer;
    font-size: 1rem;
    padding: 0.25rem;
    border-radius: 4px;
    transition: all 0.2s ease;
  }

  .clear-search:hover {
    background: #f1f5f9;
    color: #374151;
  }

  .filters {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .filter-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .filter-group label {
    font-weight: 600;
    color: #374151;
    font-size: 0.875rem;
    white-space: nowrap;
  }

  .app.dark .filter-group label {
    color: #f1f5f9;
  }

  .filter-group select {
    padding: 0.5rem 0.75rem;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 0.875rem;
    background: white;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .app.dark .filter-group select {
    background: #1e293b;
    border-color: #475569;
    color: #f1f5f9;
  }

  .filter-group select:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  .bulk-actions {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .tasks-container {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    overflow: hidden;
  }

  .app.dark .tasks-container {
    background: rgba(30, 41, 59, 0.8);
  }

  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
    color: #64748b;
  }

  .app.dark .empty-state {
    color: #94a3b8;
  }

  .empty-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  .empty-state h3 {
    font-size: 1.25rem;
    margin: 0 0 0.5rem 0;
    color: #374151;
  }

  .app.dark .empty-state h3 {
    color: #f1f5f9;
  }

  .empty-state p {
    margin: 0;
    font-size: 0.875rem;
  }

  .tasks-list {
    padding: 1rem;
  }

  .task-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem;
    border-radius: 12px;
    border: 2px solid transparent;
    margin-bottom: 0.75rem;
    background: #f8fafc;
    transition: all 0.3s ease;
    position: relative;
  }

  .app.dark .task-item {
    background: #1e293b;
  }

  .task-item:hover {
    border-color: #e2e8f0;
    transform: translateX(4px);
  }

  .app.dark .task-item:hover {
    border-color: #475569;
  }

  .task-item.completed {
    opacity: 0.7;
    background: #f0f9ff;
  }

  .app.dark .task-item.completed {
    background: #0f172a;
  }

  .task-item.overdue {
    border-color: #fecaca;
    background: #fef2f2;
  }

  .app.dark .task-item.overdue {
    border-color: #7f1d1d;
    background: #1f1415;
  }

  .task-item.deleting {
    animation: slideOut 0.3s ease-out forwards;
  }

  @keyframes slideOut {
    0% {
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      transform: translateX(100%);
      opacity: 0;
    }
  }

  .task-checkbox {
    display: flex;
    align-items: center;
    margin-top: 0.125rem;
  }

  .task-checkbox input[type="checkbox"] {
    display: none;
  }

  .checkbox-custom {
    width: 20px;
    height: 20px;
    border: 2px solid #d1d5db;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .checkbox-custom:hover {
    border-color: #6366f1;
  }

  .task-checkbox input[type="checkbox"]:checked + .checkbox-custom {
    background: #10b981;
    border-color: #10b981;
  }

  .task-checkbox input[type="checkbox"]:checked + .checkbox-custom::after {
    content: '✓';
    color: white;
    font-size: 0.75rem;
    font-weight: bold;
  }

  .task-content {
    flex: 1;
    min-width: 0;
  }

  .task-main {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .task-text {
    font-weight: 500;
    color: #1e293b;
    line-height: 1.5;
    word-wrap: break-word;
  }

  .app.dark .task-text {
    color: #f1f5f9;
  }

  .task-item.completed .task-text {
    text-decoration: line-through;
    opacity: 0.7;
  }

  .task-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
  }

  .priority-badge,
  .category-badge,
  .due-date {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    border-radius: 6px;
    font-weight: 600;
    text-transform: capitalize;
  }

  .category-badge {
    background: #e0e7ff;
    color: #3730a3;
  }

  .app.dark .category-badge {
    background: #312e81;
    color: #c7d2fe;
  }

  .due-date {
    background: #ecfdf5;
    color: #166534;
  }

  .due-date.overdue {
    background: #fef2f2;
    color: #dc2626;
  }

  .app.dark .due-date {
    background: #064e3b;
    color: #6ee7b7;
  }

  .app.dark .due-date.overdue {
    background: #7f1d1d;
    color: #fca5a5;
  }

  .edit-form {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
  }

  .edit-input {
    flex: 1;
    padding: 0.5rem 0.75rem;
    border: 2px solid #6366f1;
    border-radius: 6px;
    font-size: 1rem;
    background: white;
  }

  .app.dark .edit-input {
    background: #1e293b;
    color: #f1f5f9;
  }

  .edit-input:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  .edit-actions {
    display: flex;
    gap: 0.5rem;
  }

  .task-actions {
    display: flex;
    gap: 0.5rem;
    align-items: flex-start;
    margin-top: 0.125rem;
  }

  .btn-action {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 6px;
    transition: all 0.2s ease;
    font-size: 1rem;
    opacity: 0.7;
  }

  .btn-action:hover {
    opacity: 1;
    background: rgba(0, 0, 0, 0.05);
  }

  .app.dark .btn-action:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .btn-action.btn-delete:hover {
    background: #fef2f2;
    color: #dc2626;
  }

  .app.dark .btn-action.btn-delete:hover {
    background: #7f1d1d;
    color: #fca5a5;
  }

  .btn-action.btn-edit:hover {
    background: #eff6ff;
    color: #2563eb;
  }

  .app.dark .btn-action.btn-edit:hover {
    background: #1e3a8a;
    color: #93c5fd;
  }

  .btn-small {
    padding: 0.375rem 0.75rem;
    border: none;
    border-radius: 4px;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s ease;
    font-weight: 600;
  }

  .btn-success {
    background: #10b981;
    color: white;
  }

  .btn-success:hover {
    background: #059669;
  }

  .btn-cancel {
    background: #f87171;
    color: white;
  }

  .btn-cancel:hover {
    background: #ef4444;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .container {
      padding: 1rem;
    }

    .header-content {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }

    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .form-row {
      grid-template-columns: 1fr;
    }

    .form-group.flex-2 {
      grid-column: span 1;
    }

    .controls {
      flex-direction: column;
      align-items: stretch;
    }

    .filters {
      justify-content: center;
    }

    .bulk-actions {
      justify-content: center;
    }

    .task-item {
      flex-direction: column;
      gap: 0.75rem;
    }

    .task-actions {
      align-self: flex-end;
    }

    .edit-form {
      flex-direction: column;
      align-items: stretch;
    }

    .edit-actions {
      justify-content: center;
    }
  }

  @media (max-width: 480px) {
    .title-section h1 {
      font-size: 2rem;
    }

    .stats-grid {
      grid-template-columns: 1fr;
    }

    .form-actions {
      flex-direction: column;
    }

    .filters {
      flex-direction: column;
      gap: 0.75rem;
    }

    .filter-group {
      justify-content: space-between;
    }
  }

    </style>