import { defineStore } from 'pinia';

export const useProfitStore = defineStore('profitStore', {
  state: () => ({
    todaysProfit: 109000,    
    strategies: [            
      { name: "DOMAIN OCILLATOR", profit: 1000 },
      { name: "DOMAIN RANGE BREAKOUT", profit: 1500 },
      { name: "DOMAIN TREND", profit: 1500 },
      { name: "DOMAIN PRICE ACTION", profit: 1500 },
      { name: "SUPER HERO STRATEGY", profit: 1500 }
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
