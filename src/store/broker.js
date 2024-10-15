import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useBrokerStore = defineStore('broker', () => {
  const brokers = ref([
    { id: 1, name: 'Angel', userId: 'A537412', tokenDate: '2024-08-24 09:57:39', active: false },
    { id: 2, name: 'IIFL', userId: 'AB046230', tokenDate: '2024-08-20 16:32:31', active: false },
    { id: 3, name: 'Zerodha', userId: 'A5374126123344', tokenDate: '2024-08-13 06:56:59', active: true },
  ])

  const getBrokers = computed(() => brokers.value)

  const addBroker = (broker) => {
    brokers.value.push({
      id: Date.now(),
      ...broker,
      tokenDate: new Date().toISOString().replace('T', ' ').substr(0, 19)
    })
  }

  const updateBroker = (id, updatedBroker) => {
    const index = brokers.value.findIndex(b => b.id === id)
    if (index !== -1) {
      brokers.value[index] = { ...brokers.value[index], ...updatedBroker }
    }
  }

  const deleteBroker = (id) => {
    brokers.value = brokers.value.filter(b => b.id !== id)
  }

  const toggleBrokerActive = (id) => {
    const broker = brokers.value.find(b => b.id === id)
    if (broker) {
      broker.active = !broker.active
    }
  }

  const getOrders = (brokerId) => {
    // This would typically be an API call
    return [
      { id: 1, time: '2023-05-01 10:00:00', ticker: 'AAPL', side: 'Buy', orderType: 'Market', price: 150, avgPrice: 150, qty: 10, status: 'Executed' },
      { id: 2, time: '2023-05-01 11:30:00', ticker: 'GOOGL', side: 'Sell', orderType: 'Limit', price: 2500, avgPrice: 2498, qty: 5, status: 'Executed' },
    ]
  }

  const getPositions = (brokerId) => {
    // This would typically be an API call
    return [
      { id: 1, symbol: 'AAPL', qty: 10, avgPrice: 150, ltp: 155, pnl: 50 },
      { id: 2, symbol: 'GOOGL', qty: -5, avgPrice: 2498, ltp: 2490, pnl: 40 },
    ]
  }

  return {
    brokers,
    getBrokers,
    addBroker,
    updateBroker,
    deleteBroker,
    toggleBrokerActive,
    getOrders,
    getPositions
  }
})