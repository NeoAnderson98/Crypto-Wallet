<template>
  <div>
    <nav>
      <RouterLink to="/">Nueva Compra</RouterLink>
      <RouterLink to="/historial">Historial</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<script setup>
</script>

<style>
nav {
  display: flex;
  gap: 16px;
  padding: 16px 24px;
  background-color: #2c3e50;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

nav a:hover {
  text-decoration: underline;
}
</style>