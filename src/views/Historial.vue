<template>
  <div class="container">
    <h2>Historial de Movimientos</h2>

    <button @click="cargarHistorial">Cargar Historial</button>

    <p class="error" v-if="error">{{ error }}</p>

    <p v-if="transacciones.length === 0 && cargado">
      No hay transacciones registradas.
    </p>

    <table v-if="transacciones.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Criptomoneda</th>
          <th>Cantidad</th>
          <th>Monto (ARS)</th>
          <th>Acción</th>
          <th>Fecha y hora</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="t in transacciones" :key="t.id">
          <td>{{ t.id }}</td>
          <td>{{ t.cryptoCode.toUpperCase() }}</td>
          <td>{{ t.cryptoAmount }}</td>
          <td>$ {{ t.money.toFixed(2) }}</td>
          <td>{{ t.action === 'purchase' ? 'Compra' : 'Venta' }}</td>
          <td>{{ new Date(t.dateTime).toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const transacciones = ref([])
const error = ref('')
const cargado = ref(false)

async function cargarHistorial() {
  error.value = ''
  try {
    const response = await fetch('https://localhost:7014/Transactions')
    if (!response.ok) {
      error.value = 'Error al obtener el historial.'
      return
    }
    transacciones.value = await response.json()
    cargado.value = true
  } catch (e) {
    error.value = 'No se pudo conectar con el servidor.'
  }
}
</script>

<style scoped>
body{
    background-image: url('https://images.unsplash.com/photo-1621504450181-5d356f61d307?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
}
.container {
  max-width: 900px;
  margin: 40px auto;
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

h2 {
  margin-bottom: 24px;
  color: #333;
}

button {
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 15px;
}

button:hover {
  background-color: #34495e;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px 14px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background-color: #f0f0f0;
  font-weight: bold;
  color: #444;
}

tr:hover {
  background-color: #fafafa;
}

.error {
  color: red;
  margin-bottom: 10px;
}

</style>