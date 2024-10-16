import { defineStore } from "pinia";

export const userStore = defineStore("user", () => {
    const mockData = {
        "status": "failed",
        "message": "",
        "data": {
            "email": "kuldeep@gmail.com",
            "expire_at": "2024-11-12T00:00:00Z",
            "user_role": "Trader",
            "gender": "Male",
            "trading": true,
            "message": "message",
            "mobile": "9689898958",
            "mobile_prefix": "+91",
            "name": "kuldeep",
            "plan_id": 4,
            "plan_name": "Elite",
            "profile_picture_url": "",
            "created_at": "2023-12-09T13:13:59Z",
            "updated_at": "2024-08-20T09:31:28Z",
            "address": {
                "address_1": "",
                "address_2": "",
                "district": "",
                "state": "",
                "pincode": ""
            },
            "quote_of_the_day": "\"Success is not final, failure is not fatal: It is the courage to continue that counts.\" - Winston Churchill"
        }
    }

    return {mockData}
})