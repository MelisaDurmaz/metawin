<template>
  <input
    type="text"
    v-model="searchKey"
    placeholder="Search winner by name"
    @input="filterWinners"
    class="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(["search"]);
const searchKey = ref<string>("");

const filterWinners = (): void =>
  emit("search", searchKey.value.trim().toLowerCase());
</script>
