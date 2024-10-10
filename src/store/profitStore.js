import { defineStore } from 'pinia';

export const useProfitStore = defineStore('profitStore', {
  state: () => ({
    todaysProfit: 109000,    
    strategies: [            
      { name: "Super Hero Strategy", profit: 1000 },
      { name: "Super Hero Strategy", profit: 1500 },
      { name: "Super Hero Strategy", profit: 1500 },
      { name: "Super Hero Strategy", profit: 1500 },
      { name: "Super Hero Strategy", profit: 1500 }
    ],
  }),
  actions: {
    setTodaysProfit(value) {
      this.todaysProfit = value;
    },
    setStrategies(strategies) {
      this.strategies = strategies;
    }
  }
});
