import { defineStore } from "pinia";

export const refreshStore = defineStore("refresh", {
  state: () => {
    return { refreshNum: 0 };
  },
  getters: {
    queryRefresh() {
      return this.refreshNum;
    },
  },
  actions: {
    upRefresh(st) {
      this.refreshNum = st;
    },
  },
});
