<script lang="ts">
    let size = $state(50);
    let color = $state('#ff3e00');
    let canvas: HTMLCanvasElement | null = null;
    let ctx: CanvasRenderingContext2D | null = null;

    $effect(() => {
        if (canvas) {
        ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, size, size);
        }
        }
    });
</script>

<canvas bind:this={canvas} width="100" height="100"></canvas>
