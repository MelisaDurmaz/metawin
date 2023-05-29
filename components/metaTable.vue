<template>
  <div class="flex justify-center my-4">
    <SharedMetaSearch @search="onSearch" />
  </div>
  <div class="container mx-auto">
    <table class="min-w-full bg-white border border-gray-300">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-6 py-3 border-b">Avatar</th>
          <th class="px-6 py-3 border-b">Name</th>
          <th class="px-6 py-3 border-b">Timestamp</th>
          <th class="px-6 py-3 border-b">Prize</th>
          <th class="px-6 py-3 border-b">Prize Value</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(winner, index) in filteredWinners" :key="index">
          <tr>
            <td class="px-6 py-4 border-b">
              <div class="flex justify-center">
                <img
                  class="h-10 w-10 rounded-full"
                  :src="winner.avatarUrl"
                  :alt="`winner-${index}`"
                />
              </div>
            </td>
            <td class="px-6 py-4 border-b text-center">
              {{ winner.displayName }}
            </td>
            <td class="px-6 py-4 border-b text-center">
              {{ new Date(winner.date).toLocaleString() }}
            </td>
            <td class="px-6 py-4 border-b text-center">
              <template v-if="winner.prize.imageUrl">
                <div class="flex justify-center">
                  <img
                    class="h-10 w-10 rounded"
                    :src="winner.prize.imageUrl"
                    :alt="`winner-${index}`"
                  />
                </div>
              </template>
            </td>
            <td class="px-6 py-4 border-b text-center">
              {{ winner.prize.value || "-" }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useWinnersStore } from "@/store/winners";

interface Winner {
  avatarUrl: string;
  displayName: string;
  date: string;
  prize: {
    imageUrl: string;
    value: string;
  };
  value: string;
}

const searchKey = ref<string>("");
const onSearch = (query: string) => (searchKey.value = query);

const winnersStore = useWinnersStore();
const winnersList = ref<Winner[]>(winnersStore.winners);

const getWinnersData = async (): Promise<void> => {
  await winnersStore.getWinnersData();
  winnersList.value = winnersStore.winners;
};

onMounted(getWinnersData);

const filteredWinners = computed<Winner[]>(() => {
  if (searchKey.value) {
    return winnersList.value.filter((winner) =>
      winner.displayName.toLowerCase().includes(searchKey.value)
    );
  }

  return winnersList.value;
});
</script>
