import { ref } from "vue"
import { defineStore } from "pinia"
import { makeRequest } from "../../request/request"

export const useMatrixPapersStore = defineStore("matrixPapers", () => {
  const endpoint = "matrixPapers"
  const matrixPapers = ref([])

  const matrixPapersById = ref([])

  const showAddEditModal = ref(false)
  const addEditMatrixPaperData = ref({})
  const showDeleteConfirmationModal = ref(false)
  const idForDelete = ref(0)

  const searchInputText = ref("")
  const currentPageNumber = ref(1)
  const totalPages = ref(0)
  const showStartRecords = ref(1)
  const showEndRecords = ref(0)
  const totalRecords = ref(1)

  const getMatrixPapersById = async (id, subEndpoint) => {
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
        matrixPapersById.value = response.data.data || []

        totalRecords.value = response.data.count
        showStartRecords.value = 1 + (currentPageNumber.value - 1) * page_size
        showEndRecords.value =
          matrixPapersById.value.length +
          (currentPageNumber.value - 1) * page_size
        if (totalRecords.value % page_size == 0) {
          totalPages.value = totalRecords.value / page_size
        } else {
          totalPages.value = Math.floor(totalRecords.value / page_size) + 1
        }
      } else {
        matrixPapersById.value = []
      }
    } catch (error) {
      throw error
    }
  }

  // deleteMatrixPaper function delete MatrixPaper from db
  async function deleteMatrixPaper(id) {
    try {
      idForDelete.value = 0
      await makeRequest(endpoint, "DELETE", {}, {}, {}, id)
    } catch (error) {
      throw error
    }
  }

  // addEditMatrixPaper function edit MatrixPaper
  async function addEditMatrixPaper(id, formdata) {
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
    matrixPapers,
    matrixPapersById,
    getMatrixPapersById,
    addEditMatrixPaper,
    deleteMatrixPaper,

    showAddEditModal,
    addEditMatrixPaperData,
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
