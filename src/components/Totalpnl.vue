<template>

    <div v-if="totalProfit" class="intro-y text-3xl mb-4 font-bold" :class="totalProfit < 0 ? 'text-red-500' :totalProfit >0 ? 'text-green-500':''">
    {{ totalProfit>0?'+':'' }}{{ totalProfit }}
    </div>
    
    
    </template>
    
    <script setup>
    import { computed,ref } from 'vue';
    import {usePositionsStore} from '../stores/matrix/position'
    import { useTickerStore } from '../stores/matrix/ticker/ticker';
    
    const tickerStore = useTickerStore();
    
    const positionsStore=usePositionsStore()
    
    
    function getLtp(position){
      let ltp = tickerStore.getLastPrice(position.instrument_token)
    return  ltp || position.last_price
    }
    
    let totalProfit=0
     totalProfit = computed(() => {
      let tp = 0;
      if (positionsStore.positions.length > 0) {
        positionsStore.positions.forEach((position) => {
          let pnl = 0;
          let ltp = getLtp(position);
          if (position.status !== "OPEN" ) {
            if(position.sell_price && position.buy_price){
              pnl = position.sell_price * position.quantity - position.buy_price * position.quantity;
            }
          } else if (position.side === 'BUY' ) {
            if(position.buy_price && ltp){
              pnl = (ltp - position.buy_price) * position.quantity;
            }
          } else if (position.side === 'SELL' ) {
            
            if(position.sell_price && ltp){
              pnl = (position.sell_price - ltp) * position.quantity;
            }
          }
          tp += pnl;
        });
      }
      return tp.toFixed(2); 
    });
    
    </script>
    
    