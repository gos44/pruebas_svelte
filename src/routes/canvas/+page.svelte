<script>
	import Canvas from '$lib/components/ui/Canva.svelte';
  import NavBar from '$lib/components/ui/NavBar.svelte';
	import { trapFocus } from '$lib/stores/accion.svelte';

	const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'white', 'black'];

	let selected = $state(colors[0]);
	let size = $state(10);
	let showMenu = $state(true);
</script>

<NavBar/>
<div class="container">
	<Canvas color={selected} size={size} />

	{#if showMenu}
		<div
			role="presentation"
			class="modal-background"
			onclick={(event) => {
				if (event.target === event.currentTarget) {
					showMenu = false;
				}
			}}
			onkeydown={(e) => {
				if (e.key === 'Escape') {
					showMenu = false;
				}
			}}
		>
			<div class="menu" use:trapFocus>
				<div class="colors">
					{#each colors as color}
						<button
							class="color"
							aria-label={color}
							aria-current={selected === color}
							style="--color: {color}"
							onclick={() => {
								selected = color;
							}}
						></button>
					{/each}
				</div>

				<label>
					small
					<input type="range" bind:value={size} min="1" max="50" />
					large
				</label>
			</div>
		</div>
	{/if}

	<div class="controls">
		<button class="show-menu" onclick={() => showMenu = !showMenu}>
			{showMenu ? 'close' : 'menu'}
		</button>
	</div>
</div>


<style>
	.container {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}

	.controls {
		position: absolute;
		left: 0;
		top: 0;
		padding: 1em;
	}

	.show-menu {
        position: absolute;
        top: 350%;
		width: 100px;
        height: 40px;
        background-color: var(--color, #fff);
        border-color: black;
        border-radius: 0.5em;
        font-size: 1.2em;
        cursor: pointer;

	}

	.modal-background {
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		backdrop-filter: blur(20px);
	}

	.menu {
		position: relative;
		background: var(--color, #fff);
		width: calc(100% - 2em);
		max-width: 28em;
		padding: 1em 1em 0.5em 1em;
		border-radius: 1em;
		box-sizing: border-box;
		user-select: none;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        transition: all 0.2s;
        
	}

	.colors {
		display: grid;
		align-items: center;
		grid-template-columns: repeat(9, 1fr);
		grid-gap: 0.5em;
	}

	.color {
		aspect-ratio: 1;
		border-radius: 50%;
		background: var(--color, #fff);
		transform: none;
		filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.2));
		transition: all 0.1s;
	}

	.color[aria-current="true"] {
		transform: translate(1px, 1px);
		filter: none;
		box-shadow: inset 3px 3px 4px rgba(0,0,0,0.2);
	}

	.menu label {
		display: flex;
		width: 100%;
		margin: 1em 0 0 0;
	}

	.menu input {
		flex: 1;
	}
</style>
