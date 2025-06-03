<script>
    import BarChart from "$lib/components/BarChart.svelte";
    
    // Datos más completos y realistas
    let meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'];
    let usuarios = [1250, 1850, 1620, 2100, 2450, 2280];
    let ventas = [45000, 52000, 48500, 61000, 58500, 67000];
    
    // Configuración de colores personalizados
    let colorAzul = '#F39213FF';
    let colorVerde = '#10b981';
</script>

<div class="dashboard">
    <h1>Dashboard de Métricas</h1>
    
    <div class="charts-grid">
        <!-- Gráfico de usuarios activos -->
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

        <BarChart
        etiquetas={['Q1', 'Q2', 'Q3', 'Q4']} 
        datos={[100, 150, 120, 180]}
        titulo="Ventas 2024"
        colorPrimario="#FF0000FF"
        mostrarValores={true}
        />

        <BarChart
        etiquetas={['A1', 'A2', 'A3', 'A4']} 
        datos={[1, 2, 3, 4]}
        titulo="Ventas segundo trimestre"
        colorPrimario="#00E71FFF"
        mostrarValores={true}
        />
    </div>
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
</style>