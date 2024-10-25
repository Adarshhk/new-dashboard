import { ref } from "vue"
import { defineStore } from "pinia"
import { makeRequest } from "../../request/request"

export const useMatrixDemoPapersStore = defineStore("matrixDemoPapers", () => {
  const endpoint = "matrixDemoPapers"
  const matrixDemoPapers = ref([])

  const matrixDemoPapersById = ref([])

  const showAddEditModal = ref(false)
  const addEditMatrixDemoPaperData = ref({})
  const showDeleteConfirmationModal = ref(false)
  const idForDelete = ref(0)

  const searchInputText = ref("")
  const currentPageNumber = ref(1)
  const totalPages = ref(0)
  const showStartRecords = ref(1)
  const showEndRecords = ref(0)
  const totalRecords = ref(1)

  const getMatrixDemoPapersById = async (id, subEndpoint) => {
    var page_id = currentPageNumber.value
    var page_size = 10
    try {
      const response = await makeRequest(
        endpoint,
        "GET",
        {},
        {},
        { page_id, page_size, strategy_id: id },
        (id = 0),
        subEndpoint
      )
      if (response.data) {
        matrixDemoPapersById.value = response.data.data || []

        totalRecords.value = response.data.count
        showStartRecords.value = 1 + (currentPageNumber.value - 1) * page_size
        showEndRecords.value =
          matrixDemoPapersById.value.length +
          (currentPageNumber.value - 1) * page_size
        if (totalRecords.value % page_size == 0) {
          totalPages.value = totalRecords.value / page_size
        } else {
          totalPages.value = Math.floor(totalRecords.value / page_size) + 1
        }
      } else {
        matrixDemoPapersById.value = []
      }
    } catch (error) {
      throw error
    }
  }

  // deleteMatrixDemoPaper function delete MatrixDemoPaper from db
  async function deleteMatrixDemoPaper(id) {
    try {
      idForDelete.value = 0
      await makeRequest(endpoint, "DELETE", {}, {}, {}, id)
    } catch (error) {
      throw error
    }
  }

  // addEditMatrixDemoPaper function edit MatrixDemoPaper
  async function addEditMatrixDemoPaper(id, formdata) {
    try {
      if (id) {
        await makeRequest(endpoint, "PUT", formdata, {}, {}, id)
      } else {
        await makeRequest(endpoint, "POST", formdata, {}, {})
      }
    } catch (error) {
      throw error
    }
  }

  return {
    matrixDemoPapers,
    matrixDemoPapersById,
    getMatrixDemoPapersById,
    addEditMatrixDemoPaper,
    deleteMatrixDemoPaper,

    showAddEditModal,
    addEditMatrixDemoPaperData,
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
