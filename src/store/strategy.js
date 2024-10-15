import { defineStore } from 'pinia'

export const useStrategyStore = defineStore('strategy', {
  state: () => ({
    strategies: []
  }),
  actions: {
    async fetchStrategies() {
      // In a real application, you would fetch this data from an API
      this.strategies = [
        { id: 1, name: 'DOMAIN RANGE BREAKOUT(NIFTY)', broker: 'iifl (A5345647412)', lotSize: 1, reEntry: 1, reEntryTriggered: 0, active: false, joinedAt: '2024-08-30 09:13:54' , broker_symbol : 'IIFL' },
        { id: 2, name: 'DOMAIN RANGE BREAKOUT(NIFTY)', broker: 'mhtrade (ryerye)', lotSize: 1, reEntry: 1, reEntryTriggered: 0, active: false, joinedAt: '2024-08-30 09:13:54' , broker_symbol : 'Matrade' },
        { id: 3, name: 'DOMAIN RANGE BREAKOUT(NIFTY)', broker: 'iifl (rqwerwerwer)', lotSize: 1, reEntry: 1, reEntryTriggered: 0, active: false, joinedAt: '2024-08-30 09:13:54' , broker_symbol : 'IIFL' },
        { id: 4, name: 'DOMAIN RANGE BREAKOUT(NIFTY)', broker: 'angel (A537412612)', lotSize: 1, reEntry: 1, reEntryTriggered: 0, active: false, joinedAt: '2024-08-30 09:13:54' , broker_symbol : 'Angel' },
        { id: 5, name: 'DOMAIN RANGE BREAKOUT(NIFTY)', broker: 'zerodha (A53741261233)', lotSize: 1, reEntry: 1, reEntryTriggered: 0, active: true, joinedAt: '2024-08-30 09:13:54' , broker_symbol : 'Zerodha' },
        { id: 6, name: 'Example Strategy(BANKNIFTY)', broker: 'iifl (A5345647412)', lotSize: 1, reEntry: 1, reEntryTriggered: 0, active: false, joinedAt: '2024-08-30 09:13:54' , broker_symbol : 'IIFL' },
        { id: 7, name: 'Example Strategy(BANKNIFTY)', broker: 'mhtrade (ryerye)', lotSize: 1, reEntry: 1, reEntryTriggered: 0, active: false, joinedAt: '2024-08-30 09:13:54' , broker_symbol : 'Matrade' },
        { id: 8, name: 'Example Strategy(BANKNIFTY)', broker: 'angel (A537412612)', lotSize: 1, reEntry: 1, reEntryTriggered: 0, active: false, joinedAt: '2024-08-30 09:13:54' , broker_symbol : 'Angel'  },
        { id: 9, name: 'Example Strategy(BANKNIFTY)', broker: 'angel (A537412)', lotSize: 2, reEntry: 2, reEntryTriggered: 0, active: true, joinedAt: '2024-08-30 09:13:54' , broker_symbol : 'Angel' },
      ]
    },
    updateStrategy(id, updatedStrategy) {
      const index = this.strategies.findIndex(strategy => strategy.id === id)
      if (index !== -1) {
        this.strategies[index] = { ...this.strategies[index], ...updatedStrategy }
      }
    },
    deleteStrategy(id) {
      this.strategies = this.strategies.filter(strategy => strategy.id !== id)
    }
  }
})