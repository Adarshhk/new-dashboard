import { defineStore } from 'pinia'

export const usePositionStore = defineStore('position', {
  state: () => ({
    positions: [
      {
        id: 1,
        strategy: 'DOMAIN TREND(NIFTY)',
        broker: 'Angel (A537412)',
        script: 'NIFTY15FEB2420000PE(NFO)',
        product: 'INTRADAY',
        side: 'SELL',
        quantity: 500,
        buyPrice: '09:13:54@ 0',
        sellPrice: '09:13:54@ 0',
        status: 'CLOSED',
        pnl: 0
      },
      {
        id: 2,
        strategy: 'DOMAIN PRICE ACTION(BANKNIFTY)',
        broker: 'Angel (A537412)',
        script: 'NIFTY15FEB2422000CE(NFO)',
        product: 'INTRADAY',
        side: 'BUY',
        quantity: 500,
        buyPrice: '09:13:54@ 0',
        sellPrice: '09:13:54@ 7',
        status: 'CLOSED',
        pnl: 0
      },
      {
        id: 3,
        strategy: 'DOMAIN TREND(NIFTY)',
        broker: 'Angel (A537412)',
        script: 'NIFTY15FEB2420000PE(NFO)',
        product: 'INTRADAY',
        side: 'SELL',
        quantity: 551,
        buyPrice: '_',
        sellPrice: '09:13:54@ 5',
        status: 'OPEN',
        pnl: 1653
      },
      // Add the remaining positions here...
    ]
  }),
  actions: {
    async fetchPositions() {
      // In a real application, you would fetch the positions from an API
      // For now, we'll just use the hardcoded data
      // this.positions = await api.getPositions()
    }
  }
})