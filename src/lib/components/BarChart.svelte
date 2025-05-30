<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import Chart from 'chart.js/auto';
    import ChartDataLabels from 'chartjs-plugin-datalabels';

    export let etiquetas: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril'];
    export let datos: number[] = [10, 20, 15, 25];
    export let titulo: string = 'Ventas del trimestre';
    export let colorPrimario: string = '#6366f1';
    export let colorSecundario: string = '#a855f7';
    export let mostrarValores: boolean = true;
    export let animacion: boolean = true;
    Chart.register(ChartDataLabels);
    let canvas: HTMLCanvasElement | null = null;
    let grafico: Chart | null = null;

    // Generar gradiente de colores
    const generarColores = (cantidad: number) => {
        const colores = [];
        const colorFondo = [];
        
        for (let i = 0; i < cantidad; i++) {
            const hue = (i * 360) / cantidad + 220; // Comenzar desde azul-violeta
            colores.push(`hsla(${hue}, 70%, 60%, 0.9)`);
            colorFondo.push(`hsla(${hue}, 70%, 60%, 0.2)`);
        }
        
        return { colores, colorFondo };
    };

    onMount(() => {
        if (canvas) {
            const ctx = canvas.getContext('2d');
            const { colores, colorFondo } = generarColores(datos.length);
            
            // Crear gradiente para las barras
            const gradiente = ctx?.createLinearGradient(0, 0, 0, 400);
            gradiente?.addColorStop(0, colorPrimario);
            gradiente?.addColorStop(1, colorSecundario);

            grafico = new Chart(canvas, {
                type: 'bar',
                data: {
                    labels: etiquetas,
                    datasets: [{
                        label: titulo,
                        data: datos,
                        backgroundColor: colores,
                        borderColor: colores.map(color => color.replace('0.9', '1')),
                        borderWidth: 2,
                        borderRadius: 8,
                        borderSkipped: false,
                        hoverBackgroundColor: colores.map(color => color.replace('0.9', '1')),
                        hoverBorderWidth: 3,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        duration: animacion ? 1500 : 0,
                        easing: 'easeInOutQuart'
                    },
                    interaction: {
                        intersect: false,
                        mode: 'index'
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            titleColor: '#fff',
                            bodyColor: '#fff',
                            borderColor: colorPrimario,
                            borderWidth: 1,
                            cornerRadius: 8,
                            displayColors: false,
                            callbacks: {
                                title: function(context) {
                                    return etiquetas[context[0].dataIndex];
                                },
                                label: function(context) {
                                    return `${titulo}: ${context.parsed.y.toLocaleString()}`;
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                color: '#6b7280',
                                font: {
                                    size: 12,
                                    weight: 500
                                }
                            }
                        },
                        y: {
                            beginAtZero: true,
                            grid: {
                            color: 'rgba(107, 114, 128, 0.1)'
                            },
                            ticks: {
                                color: '#6b7280',
                                font: {
                                    size: 11
                                },
                                callback: function(value) {
                                    return value.toLocaleString();
                                }
                            }
                        }
                    },
                    onHover: (event, elements) =>{ if (canvas) {
                    canvas.style.cursor = elements.length > 0 ? 'pointer' : 'default';
                }
                }
            }});

            if (mostrarValores && grafico) {
    // Asegura que plugins exista
    if (!grafico.options.plugins) {
        grafico.options.plugins = {};
    }
    grafico.options.plugins.datalabels = {
        display: true,
        anchor: 'end',
        align: 'top',
        color: '#374151',
        font: {
        weight: 'bold',
        size: 11
        },
        formatter: (value) => value.toLocaleString()
        };
        }
            }
        });

        onDestroy(() => {
            grafico?.destroy();
        });
</script>

<div class="chart-container">
    <div class="chart-header">
        <h3 class="chart-title">{titulo}</h3>
        <div class="chart-stats">
            <span class="stat-item">
                <span class="stat-label">Total:</span>
                <span class="stat-value">{datos.reduce((a, b) => a + b, 0).toLocaleString()}</span>
            </span>
            <span class="stat-item">
                <span class="stat-label">Promedio:</span>
                <span class="stat-value">{Math.round(datos.reduce((a, b) => a + b, 0) / datos.length).toLocaleString()}</span>
            </span>
        </div>
    </div>
    <div class="chart-wrapper">
        <canvas bind:this={canvas}></canvas>
    </div>
</div>

<style>
    .chart-container {
        background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        border-radius: 16px;
        padding: 1.5rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        border: 1px solid rgba(148, 163, 184, 0.2);
        max-width: 800px;
        margin: 1rem auto;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .chart-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
        gap: 1rem;
    }

    .chart-title {
        margin: 0;
        font-size: 1.5rem;
        font-weight: 700;
        color: #1e293b;
        background: linear-gradient(135deg, #6366f1, #a855f7);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .chart-stats {
        display: flex;
        gap: 1.5rem;
        align-items: center;
    }

    .stat-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: white;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(148, 163, 184, 0.2);
    }

    .stat-label {
        font-size: 0.75rem;
        color: #64748b;
        font-weight: 500;
        margin-bottom: 0.25rem;
    }

    .stat-value {
        font-size: 1rem;
        font-weight: 700;
        color: #1e293b;
    }

    .chart-wrapper {
        position: relative;
        height: 400px;
        background: white;
        border-radius: 12px;
        padding: 1rem;
        box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
        border: 1px solid rgba(148, 163, 184, 0.1);
    }

    canvas {
        width: 100% !important;
        height: 100% !important;
    }

    @media (max-width: 640px) {
        .chart-container {
            padding: 1rem;
            margin: 0.5rem;
        }
        
        .chart-header {
            flex-direction: column;
            align-items: flex-start;
        }
        
        .chart-stats {
            width: 100%;
            justify-content: space-around;
        }
        
        .chart-title {
            font-size: 1.25rem;
        }
        
        .chart-wrapper {
            height: 300px;
        }
    }
</style>