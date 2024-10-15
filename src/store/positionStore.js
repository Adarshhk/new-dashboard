import { defineStore } from 'pinia';

export const usePositionsStore = defineStore('positionsStore', {
  state: () => ({
    positions: [
      {
        strategyName: "DOMAIN OCILLATOR",
        qty: 15,
        type: "Buy",
        time: "08:56 am",
        broker: "Angel-A29999",
        buyPrice: 256.09,
        sellPrice: 456.09,
        status: "CLOSED",
      },
      {
        strategyName: "DOMAIN PRICE ACTION",
        qty: 15,
        type: "Buy",
        time: "08:56 am",
        broker: "Angel-A29999",
        buyPrice: 256.09,
        sellPrice: 456.09,
        status: "CLOSED",
      },
      {
        strategyName: "DOMAIN TREND",
        qty: 15,
        type: "Buy",
        time: "08:56 am",
        broker: "Angel-A29999",
        buyPrice: 256.09,
        sellPrice: 456.09,
        status: "CLOSED",
      },
      {
        strategyName: "DOMAIN RANGE BREAKOUT",
        qty: 15,
        type: "Buy",
        time: "08:56 am",
        broker: "Angel-A29999",
        buyPrice: 256.09,
        sellPrice: 456.09,
        status: "CLOSED",
      },
      {
        strategyName: "Super Hero Strategy",
        qty: 15,
        type: "Buy",
        time: "08:56 am",
        broker: "Angel-A29999",
        buyPrice: 256.09,
        sellPrice: 456.09,
        status: "CLOSED",
      }
    ]
  }),
  actions: {
    setPositions(positions) {
      this.positions = positions;
    },
    addPosition(position) {
      this.positions.push(position);
    }
  }
});
