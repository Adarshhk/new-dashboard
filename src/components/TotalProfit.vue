<template>
<h1 class="text-bold text-green-600">
    + ₹{{totalProfit}}
</h1>
</template>

<script setup>
import { computed } from 'vue';
import { positionStore } from '../store/position';


const positions = positionStore().getPositions;

let totalProfit = 0;

totalProfit = computed(() => {
    let tp = 0;
    if (positions.length > 0) {
        positions.forEach((position) => {
        let pnl = 0;
        let ltp = position.last_price;
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
    return tp; // Returns string representation of tp with two decimal places
  });
</script>