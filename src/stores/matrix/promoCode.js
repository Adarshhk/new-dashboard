import { ref } from "vue"
import { defineStore } from "pinia"
import { makeRequest } from "../../request/request"

export const usePromoCodeStore = defineStore("promoCode", () => {
  const endpoint = "promoCode"
  const promoCode = ref([])
  const offerByUserId = ref({})
  const promoError = ref(null)

  const getOfferByPromoCode = async data => {
    try {
      const response = await makeRequest("promoCode", "POST", { data }, {}, {})
      if (response.data) {
        promoCode.value = response.data
      } else {
        promoCode.value = []
      }
    } catch (error) {
      throw error
    }
  }

  return {
    promoCode,
    offerByUserId,
    promoError,
    getOfferByPromoCode,
    endpoint
  }
})
