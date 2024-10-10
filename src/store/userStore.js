import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    userName: "Sourabh",
    userRole: "Admin",
    profileUrl: "/path/to/profile/pic",
    totalCustomer : 1547,
    totalStrategies : 5,
    totalOrders : 12
  }),
  actions: {
    setUserName(name) {
      this.userName = name;
    },
    setUserRole(role) {
      this.userRole = role;
    },
    setProfileUrl(url) {
      this.profileUrl = url;
    }
  }
});
