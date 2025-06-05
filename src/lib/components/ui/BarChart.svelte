<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import Chart from 'chart.js/auto';
    import ChartDataLabels from 'chartjs-plugin-datalabels';

    interface Props {
        etiquetas?: string[];
        datos?: number[];
        titulo?: string;
        colorPrimario?: string;
        colorSecundario?: string;
        mostrarValores?: boolean;
        animacion?: boolean;
    }

    let {
        etiquetas = ['Enero', 'Febrero', 'Marzo', 'Abril'],
        datos = [10, 20, 15, 25],
        titulo = 'Ventas del trimestre',
        colorPrimario = '#6366f1',
        colorSecundario = '#a855f7',
        mostrarValores = true,
        animacion = true
    }: Props = $props();

    Chart.register(ChartDataLabels);
    
    let canvas = $state<HTMLCanvasElement | null>(null);
    let grafico = $state<Chart | null>(null);

    // Computed values usando $derived
    const total = $derived(datos.reduce((a, b) => a + b, 0));
    const promedio = $derived(Math.round(total / datos.length));

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

    const crearGrafico = () => {
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        const { colores, colorFondo } = generarColores(datos.length);
        
        // Crear gradiente para las barras
        const gradiente = ctx.createLinearGradient(0, 0, 0, 400);
        gradiente.addColorStop(0, colorPrimario);
        gradiente.addColorStop(1, colorSecundario);

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
                    },
                    ...(mostrarValores && {
                        datalabels: {
                            display: true,
                            anchor: 'end',
                            align: 'top',
                            color: '#374151',
                            font: {
                                weight: 'bold',
                                size: 11
                            },
                            formatter: (value: number) => value.toLocaleString()
                        }
                    })
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
                                return (value as number).toLocaleString();
                            }
                        }
                    }
                },
                onHover: (event, elements) => {
                    if (canvas) {
                        canvas.style.cursor = elements.length > 0 ? 'pointer' : 'default';
                    }
                }
            }
        });
    };

    const actualizarGrafico = () => {
        if (!grafico) return;
        
        const { colores } = generarColores(datos.length);
        
        // Actualizar datos
        grafico.data.labels = etiquetas;
        grafico.data.datasets[0].data = datos;
        grafico.data.datasets[0].backgroundColor = colores;
        grafico.data.datasets[0].borderColor = colores.map(color => color.replace('0.9', '1'));
        grafico.data.datasets[0].hoverBackgroundColor = colores.map(color => color.replace('0.9', '1'));
        grafico.data.datasets[0].label = titulo;
        
        // Actualizar opciones de colores
        if (grafico.options.plugins?.tooltip) {
            grafico.options.plugins.tooltip.borderColor = colorPrimario;
        }
        
        // Actualizar callbacks del tooltip
        if (grafico.options.plugins?.tooltip?.callbacks) {
            grafico.options.plugins.tooltip.callbacks.title = function(context) {
                return etiquetas[context[0].dataIndex];
            };
            grafico.options.plugins.tooltip.callbacks.label = function(context) {
                return `${titulo}: ${context.parsed.y.toLocaleString()}`;
            };
        }
        
        // Actualizar configuración de datalabels
        if (grafico.options.plugins) {
            if (mostrarValores) {
                grafico.options.plugins.datalabels = {
                    display: true,
                    anchor: 'end',
                    align: 'top',
                    color: '#374151',
                    font: {
                        weight: 'bold',
                        size: 11
                    },
                    formatter: (value: number) => value.toLocaleString()
                };
            } else {
                grafico.options.plugins.datalabels = {
                    display: false
                };
            }
        }
        
        grafico.update();
    };

    // Efecto para crear el gráfico cuando se monta el componente
    onMount(() => {
        crearGrafico();
    });

    // Efecto para actualizar el gráfico cuando cambian las props
    $effect(() => {
        // Este efecto se ejecuta cuando cambian las dependencias
        if (grafico) {
            actualizarGrafico();
        }
        // Dependencias: etiquetas, datos, titulo, colorPrimario, colorSecundario, mostrarValores
        etiquetas;
        datos;
        titulo;
        colorPrimario;
        colorSecundario;
        mostrarValores;
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
                <span class="stat-value">{total.toLocaleString()}</span>
            </span>
            <span class="stat-item">
                <span class="stat-label">Promedio:</span>
                <span class="stat-value">{promedio.toLocaleString()}</span>
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