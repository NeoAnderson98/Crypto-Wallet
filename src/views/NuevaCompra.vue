<template>
  <div class="container">
    <h2>Nueva Compra</h2>
    <form @submit.prevent="enviarCompra">

      <div class="campo">
        <label>Criptomoneda</label>
        <select v-model="form.cryptoCode">
          <option value="">-- Seleccioná una --</option>
          <option value="btc">Bitcoin (BTC)</option>
          <option value="eth">Ethereum (ETH)</option>
          <option value="usdc">USDC</option>
        </select>
      </div>

      <div class="campo">
        <label>Cantidad</label>
        <input type="number" step="any" v-model="form.cryptoAmount" />
      </div>

      <div class="campo">
        <label>Fecha y hora</label>
        <input type="datetime-local" v-model="form.dateTime" />
      </div>

      <p class="error" v-if="error">{{ error }}</p>
      <p class="exito" v-if="exito">{{ exito }}</p>

      <button type="submit">Registrar Compra</button>

    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// ref() crea una variable "reactiva", es decir que cuando cambia,
// Vue actualiza automáticamente lo que se muestra en pantalla
const form = ref({
  cryptoCode: '',
  cryptoAmount: '',
  dateTime: ''
})

const error = ref('')
const exito = ref('')

async function enviarCompra() {
  // Limpiamos mensajes anteriores
  error.value = ''
  exito.value = ''

  // Validaciones
  if (!form.value.cryptoCode) {
    error.value = 'Seleccioná una criptomoneda.'
    return
  }
  if (!form.value.cryptoAmount || form.value.cryptoAmount <= 0) {
    error.value = 'La cantidad debe ser mayor a 0.'
    return
  }
  if (!form.value.dateTime) {
    error.value = 'Ingresá la fecha y hora.'
    return
  }

  // Llamada al backend
  try {
    const response = await fetch('https://localhost:7014/Transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cryptoCode: form.value.cryptoCode,
        cryptoAmount: parseFloat(form.value.cryptoAmount),
        dateTime: form.value.dateTime
      })
    })

    if (!response.ok) {
      error.value = 'Hubo un error al registrar la compra.'
      return
    }

    exito.value = '¡Compra registrada exitosamente!'
    form.value = { cryptoCode: '', cryptoAmount: '', dateTime: '' }

  } catch (e) {
    error.value = 'No se pudo conectar con el servidor.'
  }
}
</script>

<style scoped>
.container {
  max-width: 500px;
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

.campo {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  font-weight: bold;
  color: #555;
}

input, select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 15px;
}

button:hover {
  background-color: #45a049;
}

.error {
  color: red;
  margin-bottom: 10px;
}

.exito {
  color: green;
  margin-bottom: 10px;
}
</style>