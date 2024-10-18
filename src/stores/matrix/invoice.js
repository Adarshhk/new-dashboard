import { ref } from "vue"
import { defineStore } from "pinia"
import { makeRequest, state } from "../../request/request"

export const useInvoicesStore = defineStore("invoices", () => {
  const endpoint = "invoices"
  const invoices = ref([])
  const wait = 0

  const showAddEditModal = ref(false)
  const addEditInvoiceData = ref({})
  const showDeleteConfirmationModal = ref(false)
  const idForDelete = ref(0)

  const searchInputText = ref("")
  const currentPageNumber = ref(1)
  const totalPages = ref(0)
  const showStartRecords = ref(1)
  const showEndRecords = ref(0)
  const totalRecords = ref(1)

  const showPaymentProofModal = ref(false)
  const paymentData = ref({})
  // showInvoiceReceiptModal, invoiceData
  const showInvoiceReceiptModal = ref(false)
  const invoiceData = ref({})

  const page_id = 1
  const page_size = 100
  const search = ""

  const getInvoices = async () => {
    try {
      const response = await makeRequest(
        endpoint,
        "GET",
        {},
        {},
        { page_id, page_size, search },
        wait
      )
      if (response.data) {
        invoices.value = response.data.sort((a, b) => a.id - b.id)
      } else {
        invoices.value = []
      }
    } catch (error) {
      throw error
    }
  }

  // deleteInvoices function delete invoices from db
  async function deleteInvoices(id) {
    try {
      idForDelete.value = 0
      await makeRequest(endpoint, "DELETE", {}, {}, {}, 0, id)
      getInvoices()
    } catch (error) {
      throw error
    }
  }

  // addEditInvoice function edit invoices
  async function addEditInvoice(id, formdata) {
    try {
      if (id) {
        await makeRequest(endpoint, "PUT", formdata, {}, {}, id, 0)
      } else {
        await makeRequest(endpoint, "POST", formdata, {}, {}, 0)
      }
      getInvoices()
    } catch (error) {
      throw error
    }
  }

  getInvoices()

  return {
    endpoint,
    state,
    invoices,
    getInvoices,
    addEditInvoice,
    deleteInvoices,

    showAddEditModal,
    addEditInvoiceData,
    showDeleteConfirmationModal,
    idForDelete,
    showPaymentProofModal,
    paymentData,
    showInvoiceReceiptModal,
    invoiceData,

    searchInputText,
    currentPageNumber,
    totalPages,
    showStartRecords,
    showEndRecords,
    totalRecords
  }
})
