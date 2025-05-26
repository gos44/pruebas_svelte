<script lang="ts">

export let usuario:{ nombre:string;edad:number}

</script>

<div>
<p><strong>Nombre:</strong>{usuario.nombre}</p>
<p><strong>Edad:</strong>{usuario.edad}</p>
</div>

<style>
    div {
        border: 1px solid #ccc;
        padding: 10px;
        margin: 10px;
        border-radius: 5px;
        background-color: #f9f9f9;
    }
  p {
    font-size: 20px;
    color: #333;
  }
  strong {
    font-weight: bold;
  }
</style>  