import { defineStore } from "pinia";

interface WinnersState {
  winners: [];
}

export const useWinnersStore = defineStore({
  id: "winners-store",
  state: (): WinnersState => ({
    winners: [],
  }),
  actions: {
    async getWinnersData(): Promise<void> {
      const { data, error } = await useFetch(
        "https://api.dev.platform.metawin.com/sweepstake/winner"
      );
      error.value && console.error("Error fetching winners list", error.value);
      this.winners = data;
    },
  },
});
