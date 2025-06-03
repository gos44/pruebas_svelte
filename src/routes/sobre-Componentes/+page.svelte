<script>
import BarChart from "$lib/components/BarChart.svelte";
import Button from "$lib/components/componentesGenericos/Button.svelte";
import Card from "$lib/components/componentesGenericos/Card.svelte";
import Input from "$lib/components/componentesGenericos/Input.svelte";
import List from "$lib/components/componentesGenericos/List.svelte";
import Modal from "$lib/components/componentesGenericos/Modal.svelte";
import Tabs from "$lib/components/componentesGenericos/Tabs.svelte";
import Crud from "$lib/components/Crud.svelte";
import Footer from "$lib/components/Footer.svelte";
import NavBar from "$lib/components/NavBar.svelte";
import TodoList from "$lib/components/TodoList.svelte";

    let showModal = false;
    const fruits = ['Manzana', 'Plátano', 'Naranja'];
    
    // Datos más completos y realistas
    let meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'];
    let usuarios = [1250, 1850, 1620, 2100, 2450, 2280];
    let ventas = [45000, 52000, 48500, 61000, 58500, 67000];
    
    // Configuración de colores personalizados
    let colorAzul = '#F63B3BFF';
    let colorVerde = '#10b981';

</script>

<div class="dashboard">
    <h1>Dashboard de Métricas</h1>
    <div class="charts-grid">
    <!-- Gráfico de usuarios activos  -->
        <BarChart
            etiquetas={meses}
            datos={usuarios}
            titulo="Usuarios Activos por Mes"
            colorPrimario={colorAzul}
            colorSecundario="#1d4ed8"
            mostrarValores={true}
            animacion={true}
        />
        <!-- Gráfico de ventas -->
        <BarChart
            etiquetas={meses}
            datos={ventas}
            titulo="Ventas Mensuales (USD)"
            colorPrimario={colorVerde}
            colorSecundario="#059669"
            mostrarValores={true}
            animacion={true}
        />
    </div>
    <Crud/>

    
<div>
    <TodoList />
</div>

</div>

<div>
<Button variant="primary">Guardar</Button>
<br>
<Button variant="danger" disabled>Eliminar</Button>
</div>


<button onclick={() => showModal = true}>Abrir Modal</button>
<Modal isOpen={showModal} title="Mi Modal">
<p>Contenido del modal aquí.</p>
</Modal>

<div class="card">
<Card title="Usuario">
<p>Nombre: Juan Pérez</p>
</Card>
</div>

<div class="input">
<Input type="email" placeholder="Correo electrónico" />
</div>
<List items={fruits} let:item>
🍎 {item}
</List>

<div class="tabs">
<Tabs tabs={['Perfil', 'Configuración']} let:activeTab>
{#if activeTab === 0}
    <p>Contenido del perfil...</p>
{:else}
    <p>Ajustes de configuración...</p>
{/if}
</Tabs>
</div>


<style>
    .dashboard {
        padding: 2rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
    }
    
    h1 {
        text-align: center;
        color: white;
        font-size: 2.5rem;
        margin-bottom: 2rem;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
    
    .charts-grid {
        display: grid;
        gap: 2rem;
        max-width: 1200px;
        margin: 0 auto;
    }
    
    @media (min-width: 1024px) {
        .charts-grid {
            grid-template-columns: 1fr 1fr;
        }
    }
    button{
        background-color: #4CAF50;
        border: none;
        color: white;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
    }
    .card {
        margin: 1rem;
        padding: 1rem;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .input {
        margin: 1rem;
    }
    .tabs {
        margin: 1rem;
        background-color: #f8f9fa;
        border-radius: 8px;
        padding: 1rem;
    }
</style>