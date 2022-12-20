import { acceptHMRUpdate, defineStore } from 'pinia';

export interface IAuth {
  credential: string | null;
  password: string | null;
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): IAuth => ({
    credential: null,
    password: null
  }),

  actions: {
    async getProfile(data: IAuth) {
      const profileRes = data;
      this.$patch({
        ...profileRes
      });
    },

    logout() {
      this.$reset();
    }
  },
  getters: {
    getInfo: (state) => {
      return state;
    }
  }
});
