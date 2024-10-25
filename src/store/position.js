import { defineStore } from "pinia";

export const positionStore = defineStore("position", {
    state: () => (
        {
            res: {
                "status": "success",
                "message": "Positions fetched Successfully",
                "data": [
                    {
                        "id": 1,
                        "domain_id": 1,
                        "user_id": 1,
                        "broker_id": 2,
                        "strategy_id": 5,
                        "order_id": {
                            "Int32": 599,
                            "Valid": true
                        },
                        "tradingsymbol": "NIFTY15FEB242000000PE",
                        "strategy_type": 1,
                        "exchange": "NFO",
                        "instrument_token": 9908482,
                        "quantity": 51,
                        "last_price": 0,
                        "buy_quantity": 50,
                        "multiplier": 1,
                        "sell_quantity": 1,
                        "side": "BUY",
                        "buy_price": 1.2,
                        "sell_price": 0,
                        "product": "INTRADAY",
                        "status": "OPEN",
                        "message": "OK",
                        "created_at": "2024-08-30T09:13:54Z",
                        "updated_at": "2024-08-30T09:13:54Z"
                    },
                    {
                        "id": 2,
                        "domain_id": 1,
                        "user_id": 1,
                        "broker_id": 2,
                        "strategy_id": 5,
                        "order_id": {
                            "Int32": 617,
                            "Valid": true
                        },
                        "tradingsymbol": "NIFTY15FEB24200000PE",
                        "strategy_type": 1,
                        "exchange": "NFO",
                        "instrument_token": 9908482,
                        "quantity": 551,
                        "last_price": 2,
                        "buy_quantity": 502,
                        "multiplier": 1,
                        "sell_quantity": 500,
                        "side": "SELL",
                        "buy_price": 0,
                        "sell_price": 5,
                        "product": "INTRADAY",
                        "status": "OPEN",
                        "message": "OK",
                        "created_at": "2024-08-30T09:13:54Z",
                        "updated_at": "2024-08-30T09:13:54Z"
                    },
                    {
                        "id": 3,
                        "domain_id": 1,
                        "user_id": 1,
                        "broker_id": 2,
                        "strategy_id": 4,
                        "order_id": {
                            "Int32": 618,
                            "Valid": true
                        },
                        "tradingsymbol": "NIFTY15FEB2422000CE",
                        "strategy_type": 1,
                        "exchange": "NFO",
                        "instrument_token": 11921666,
                        "quantity": 500,
                        "last_price": 0,
                        "buy_quantity": 500,
                        "multiplier": 1,
                        "sell_quantity": 500,
                        "side": "BUY",
                        "buy_price": 0,
                        "sell_price": 7,
                        "product": "INTRADAY",
                        "status": "CLOSED",
                        "message": "Algorithmic trading attempts to strip emotions out of trades, ensures the most efficient execution of a trade, places orders instantaneously and may lower trading fees ..",
                        "created_at": "2024-08-30T09:13:54Z",
                        "updated_at": "2024-08-30T09:13:54Z"
                    },
                    {
                        "id": 5,
                        "domain_id": 1,
                        "user_id": 1,
                        "broker_id": 2,
                        "strategy_id": 5,
                        "order_id": {
                            "Int32": 2,
                            "Valid": true
                        },
                        "tradingsymbol": "NIFTY15FEB2420000PE",
                        "strategy_type": 1,
                        "exchange": "NFO",
                        "instrument_token": 9908482,
                        "quantity": 500,
                        "last_price": 8,
                        "buy_quantity": 501,
                        "multiplier": 1,
                        "sell_quantity": 501,
                        "side": "SELL",
                        "buy_price": 0,
                        "sell_price": 0,
                        "product": "INTRADAY",
                        "status": "CLOSED",
                        "message": "OK",
                        "created_at": "2024-08-30T09:13:54Z",
                        "updated_at": "2024-08-30T09:13:54Z"
                    }
                ]
            }
        }
    ),

    getters : {
        getPositions : (state) => {
            return state.res.data
        }
    }
})