<script setup lang="ts">
import { ref } from 'vue';


defineProps<{ count: number }>()
defineEmits<{ (e:"count", count: number): void}>()

const localCount = ref(0)

</script>

<template>
<div class="root">
  <div>

    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="../assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>

  <h1>Vite + Vue3</h1>

  <div class="card">
    <button type="button" @click="$emit('count', count+1)">Übermittelter Zustand: {{ count }}</button>
    <button type="button" @click="localCount++">Lokaler Zustand: {{ localCount }}</button>
  </div>

  <div>
    Diese Komponente ist eine Vue App, welche von einem anderen Server geladen wird.
  </div>
</div>
</template>

<style lang="scss">
* {
  margin: 0
}
.root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  padding: 1em;

  display: flex;
  flex-direction: column;

  align-items: center;
  gap: 1em;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  a {
    font-weight: 500;
    color: #646cff;
    text-decoration: inherit;
  }
  a:hover {
    color: #535bf2;
  }



  h1 {
    font-size: 2.2em;
    line-height: 1.1;
  }

  button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    cursor: pointer;
    transition: border-color 0.25s;
  }
  button:hover {
    border-color: #646cff;
  }
  button:focus,
  button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }

  @media (prefers-color-scheme: light) {
    :root {
      color: #213547;
      background-color: #ffffff;
    }
    a:hover {
      color: #747bff;
    }
    button {
      background-color: #f9f9f9;
    }
  }
}

</style>
