<script>

  // Contador interactivo
  let count = $state(0);

  function increment() {
    count += 1;
  }

  function decrement() {
    count -= 1;
  }

  // Entrada de texto reactiva
  let text = $state("¡Escribe algo!");

  // Elemento con visibilidad alternable
  let visible = $state(true);

  function toggleVisibility() {
    visible = !visible;
  }
</script>

<main>
  <h1>Bienvenido a Svelte 5 Interactivo</h1>

  <hr>

  <section>
    <h2>Contador Simple</h2>
    <p>Valor actual: {count}</p>
    <button onclick={increment}>Incrementar +</button>
    <button onclick={decrement}>Decrementar -</button>
  </section>

  <hr>

  <section>
    <h2>Entrada de Texto Reactiva</h2>
    <input bind:value={text} />
    <p>Texto ingresado: {text}</p>
  </section>

  <hr>

  <section>
    <h2>Alternar Visibilidad</h2>
    <button onclick={toggleVisibility}>
      {visible ? "Ocultar" : "Mostrar"} Elemento
    </button>

    {#if visible}
      <p style="background-color: lightyellow; padding: 10px; border: 1px solid orange;">
        ¡Este elemento es visible! Haz clic en el botón para ocultarlo.
      </p>
    {/if}
  </section>

</main>

<style>
  main {
    font-family: Arial, sans-serif;
    max-width: 600px;
    margin: 2em auto;
    padding: 1em;
    border: 1px solid #E0E0E0FF;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
    text-align: center;
	background-color: #374151;
  }

  h1 {
    color: #457EF8FF; /* Color naranja característico de Svelte */
  }

  h2 {
    color: #333;
  }

  button {
    background-color: #2563eb;
    color: white;
    border: none;
    padding: 10px 15px;
    margin: 5px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
  }

  button:hover {
    background-color: #ff6a00;
  }

  input {
    padding: 8px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1em;
  }

  section {
    margin-bottom: 2em;
    padding: 1em;
    background-color: #f9f9f9;
    border-radius: 5px;
  }

  hr {
    border: 0;
    height: 1px;
    background: #ddd;
    margin: 2em 0;
  }
</style>