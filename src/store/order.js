import { defineStore } from "pinia";

export const orderStore = defineStore("orders" , {
    state : () => ({
        res : {
            "status": "success",
            "message": "Orders fetched successfully",
            "data": [
                {
                    "id": 1,
                    "broker_id": 2,
                    "strategy_id": 4,
                    "position_id": {
                        "Int32": 0,
                        "Valid": false
                    },
                    "order_id": "24020900272035",
                    "status": "REJECTED",
                    "status_message": "Thank you for your order, placed on April 10, 2015. You will receive an email from us in 2-4 business days letting you know that your order has shipped..",
                    "created_at": "2024-08-30T09:13:54Z",
                    "updated_at": "2024-08-30T09:13:54Z",
                    "variety": "regular",
                    "exchange": "NFO",
                    "tradingsymbol": "NIFTY15FEB24C21000",
                    "instrument_token": 10307586,
                    "order_type": "MKT",
                    "transaction_type": "SELL",
                    "validity": "DAY",
                    "product": "MIS",
                    "quantity": 502,
                    "price": 0,
                    "trigger_price": 0,
                    "average_price": 0,
                    "filled_quantity": 0,
                    "pending_quantity": 0,
                    "cancelled_quantity": 0,
                    "tag": "20240209000017_1"
                },
                {
                    "id": 2,
                    "broker_id": 9,
                    "strategy_id": 5,
                    "position_id": {
                        "Int32": 0,
                        "Valid": false
                    },
                    "order_id": "24020900272037",
                    "status": "COMPLETE",
                    "status_message": "Ok",
                    "created_at": "2024-08-30T09:13:54Z",
                    "updated_at": "2024-08-30T09:13:54Z",
                    "variety": "regular",
                    "exchange": "NFO",
                    "tradingsymbol": "NIFTY15FEB24P21150",
                    "instrument_token": 10359554,
                    "order_type": "MKT",
                    "transaction_type": "SELL",
                    "validity": "DAY",
                    "product": "MIS",
                    "quantity": 500,
                    "price": 0,
                    "trigger_price": 0,
                    "average_price": 0,
                    "filled_quantity": 0,
                    "pending_quantity": 0,
                    "cancelled_quantity": 0,
                    "tag": "20240209000017_2"
                },
                {
                    "id": 3,
                    "broker_id": 3,
                    "strategy_id": 6,
                    "position_id": {
                        "Int32": 0,
                        "Valid": false
                    },
                    "order_id": "24020900272244",
                    "status": "COMPLETE",
                    "status_message": "",
                    "created_at": "2024-08-30T09:13:54Z",
                    "updated_at": "2024-08-30T09:13:54Z",
                    "variety": "regular",
                    "exchange": "NFO",
                    "tradingsymbol": "NIFTY15FEB24P21150",
                    "instrument_token": 10359554,
                    "order_type": "MKT",
                    "transaction_type": "BUY",
                    "validity": "DAY",
                    "product": "MIS",
                    "quantity": 500,
                    "price": 0,
                    "trigger_price": 0,
                    "average_price": 0,
                    "filled_quantity": 0,
                    "pending_quantity": 0,
                    "cancelled_quantity": 0,
                    "tag": "20240209000017_2"
                },
                {
                    "id": 11,
                    "broker_id": 3,
                    "strategy_id": 7,
                    "position_id": {
                        "Int32": 0,
                        "Valid": false
                    },
                    "order_id": "24020900288558",
                    "status": "COMPLETE",
                    "status_message": "Ok",
                    "created_at": "2024-08-30T09:13:54Z",
                    "updated_at": "2024-08-30T09:13:54Z",
                    "variety": "regular",
                    "exchange": "NFO",
                    "tradingsymbol": "NIFTY15FEB24P20000",
                    "instrument_token": 9908482,
                    "order_type": "MKT",
                    "transaction_type": "BUY",
                    "validity": "DAY",
                    "product": "MIS",
                    "quantity": 50,
                    "price": 0,
                    "trigger_price": 0,
                    "average_price": 1.2,
                    "filled_quantity": 50,
                    "pending_quantity": 0,
                    "cancelled_quantity": 0,
                    "tag": "20240209000021_1"
                },
                {
                    "id": 12,
                    "broker_id": 3,
                    "strategy_id": 8,
                    "position_id": {
                        "Int32": 0,
                        "Valid": false
                    },
                    "order_id": "24020900288565",
                    "status": "REJECTED",
                    "status_message": "Ok",
                    "created_at": "2024-08-30T09:13:54Z",
                    "updated_at": "2024-08-30T09:13:54Z",
                    "variety": "regular",
                    "exchange": "NFO",
                    "tradingsymbol": "NIFTY15FEB24C22000",
                    "instrument_token": 11921666,
                    "order_type": "MKT",
                    "transaction_type": "SELL",
                    "validity": "DAY",
                    "product": "MIS",
                    "quantity": 50,
                    "price": 0,
                    "trigger_price": 0,
                    "average_price": 0,
                    "filled_quantity": 0,
                    "pending_quantity": 0,
                    "cancelled_quantity": 0,
                    "tag": "20240209000021_2"
                },
                {
                    "id": 17,
                    "broker_id": 3,
                    "strategy_id": 18,
                    "position_id": {
                        "Int32": 1,
                        "Valid": true
                    },
                    "order_id": "3476457457",
                    "status": "SUCCESS",
                    "status_message": "ok",
                    "created_at": "2024-08-30T09:13:54Z",
                    "updated_at": "2024-08-30T09:13:54Z",
                    "variety": "SSD",
                    "exchange": "NFO",
                    "tradingsymbol": "FDGTVDSAA",
                    "instrument_token": 436343,
                    "order_type": "tget",
                    "transaction_type": "buy",
                    "validity": "DAY",
                    "product": "MARKET",
                    "quantity": 1,
                    "price": 1,
                    "trigger_price": 1,
                    "average_price": 1,
                    "filled_quantity": 1,
                    "pending_quantity": 1,
                    "cancelled_quantity": 1,
                    "tag": "NFO"
                }
            ]
          }
    }),

    getters : {
        getOrders : (state) => {
            return state.res.data
        },

        getOrdersCount : (state) => {
            return state.res.data.length
        }
    }
})