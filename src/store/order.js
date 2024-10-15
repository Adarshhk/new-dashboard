import { defineStore } from 'pinia'

export const useOrderStore = defineStore('order', {
  state: () => ({
    orders: []
  }),
  actions: {
    async fetchOrders() {
      // In a real application, you would fetch this data from an API
      // For now, we'll use dummy data that matches the image provided
      this.orders = [
        {
          id: 1,
          time: '09:13:54',
          broker: 'Angel (A537412)',
          strategy: 'DOMAIN PRICE ACTION (BANKNIFTY)',
          script: 'NIFTY15FEB24C21000 (NFO)',
          quantity: 502,
          price: 0,
          status: 'REJECTED @ SELL',
          productType: 'MIS',
          img : 'Angel'
        },
        {
          id: 2,
          time: '09:13:54',
          broker: '-',
          strategy: 'DOMAIN TREND (NIFTY)',
          script: 'NIFTY15FEB24P21150 (NFO)',
          quantity: 500,
          price: 0,
          status: 'COMPLETE @ SELL',
          productType: 'MIS',
          img : '-'
        },
        {
          id: 3,
          time: '09:13:54',
          broker: 'iifl (AB046230)',
          strategy: 'DOMAIN TREND (BANKNIFTY)',
          script: 'NIFTY15FEB24P21150 (NFO)',
          quantity: 500,
          price: 0,
          status: 'COMPLETE @ BUY',
          productType: 'MIS',
          img : 'IIFL'
        },
        {
          id: 4,
          time: '09:13:54',
          broker: 'iifl (AB046230)',
          strategy: 'DOMAIN RANGE BREAKOUT (NIFTY)',
          script: 'NIFTY15FEB24P20000 (NFO)',
          quantity: 50,
          price: 1.2,
          status: 'COMPLETE @ BUY',
          productType: 'MIS',
          img : 'IIFL'
        },
        {
          id: 5,
          time: '09:13:54',
          broker: 'iifl (AB046230)',
          strategy: 'DOMAIN RANGE BREAKOUT (BANKNIFTY)',
          script: 'NIFTY15FEB24C22000 (NFO)',
          quantity: 50,
          price: 0,
          status: 'REJECTED @ SELL',
          productType: 'MIS',
          img : 'IIFL'
        },
        {
          id: 6,
          time: '09:13:54',
          broker: 'iifl (AB046230)',
          strategy: 'kuldeepsawrdr (BANKNIFTY)',
          script: 'FDGTVDSAA (NFO)',
          quantity: 1,
          price: 1,
          status: 'SUCCESS @ buy',
          productType: 'MARKET',
          img : 'IIFL'
        },
        {
          id: 7,
          time: '09:13:54',
          broker: 'Angel (A537412)',
          strategy: 'DOMAIN TREND (NIFTY)',
          script: 'hfhdh (fdhdfh)',
          quantity: 2,
          price: 2,
          status: 'OPEN @ dfhgfdhfd',
          productType: 'hrty',
          img : 'Angel'
        },
        {
          id: 8,
          time: '09:13:54',
          broker: 'iifl (AB046230)',
          strategy: 'DOMAIN PRICE ACTION (BANKNIFTY)',
          script: 'SBILIFE24JUNFUT (NFO)',
          quantity: 2,
          price: 2,
          status: 'PENDING @ BUY',
          productType: 'MIS',
          img : 'IIFL'
        },
        {
          id: 9,
          time: '09:13:54',
          broker: 'Angel (A537412612)',
          strategy: 'DOMAIN RANGE BREAKOUT (BANKNIFTY)',
          script: 'hfhdh (fdhdfh)',
          quantity: 2,
          price: 2,
          status: 'CLOSE @ dfhgfdhfd',
          productType: 'hrty',
          img : 'Angel'
        }
      ]
    },
    addOrder(order) {
      this.orders.push(order)
    },
    updateOrder(id, updatedOrder) {
      const index = this.orders.findIndex(order => order.id === id)
      if (index !== -1) {
        this.orders[index] = { ...this.orders[index], ...updatedOrder }
      }
    },
    deleteOrder(id) {
      this.orders = this.orders.filter(order => order.id !== id)
    }
  }
})