import { ref } from "vue"
import { defineStore } from "pinia"
import { makeRequest } from "../../request/request"

export const useInvoiceItemsStore = defineStore("invoiceItems", () => {
  const endpoint = "invoiceItems"
  const invoiceItems = ref([])

  const showAddEditModal = ref(false)
  const addEditInvoiceItemData = ref({})
  const showDeleteConfirmationModal = ref(false)
  const idForDelete = ref(0)

  const searchInputText = ref("")
  const currentPageNumber = ref(1)
  const totalPages = ref(0)
  const showStartRecords = ref(1)
  const showEndRecords = ref(0)
  const totalRecords = ref(1)

  const page_id = 1
  const page_size = 100

  const getInvoiceItems = async () => {
    try {
      const response = await makeRequest(
        endpoint,
        "GET",
        {},
        {},
        { page_id, page_size }
      )
      if (response.data) {
        invoiceItems.value = response.data.sort((a, b) => a.id - b.id)
      } else {
        invoiceItems.value = []
      }
    } catch (error) {
      throw error
    }
  }

  // deleteInvoiceItems function delete invoiceItems from db
  async function deleteInvoiceItems(id) {
    try {
      idForDelete.value = 0
      await makeRequest(endpoint, "DELETE", {}, {}, {}, id)
      getInvoiceItems()
    } catch (error) {
      throw error
    }
  }

  // addEditInvoiceItem function edit invoiceItems
  async function addEditInvoiceItem(id, formdata) {
    try {
      if (id) {
        await makeRequest(endpoint, "PUT", formdata, {}, {}, id)
      } else {
        await makeRequest(endpoint, "POST", formdata, {}, {})
      }
      getInvoiceItems()
    } catch (error) {
      throw error
    }
  }

  getInvoiceItems()

  return {
    invoiceItems,
    getInvoiceItems,
    addEditInvoiceItem,
    deleteInvoiceItems,

    showAddEditModal,
    addEditInvoiceItemData,
    showDeleteConfirmationModal,
    idForDelete,

    searchInputText,
    currentPageNumber,
    totalPages,
    showStartRecords,
    showEndRecords,
    totalRecords
  }
})