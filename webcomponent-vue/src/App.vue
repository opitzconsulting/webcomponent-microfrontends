<script setup lang="ts">
import { ref } from "vue";
import Frontend from "./components/Frontend.ce.vue"

const count = ref(0)

</script>


<template>
  <Frontend :count="count" @count="(e: number) => count = e"  />
</template>

<style>
body {
  margin: 0
}
</style>


