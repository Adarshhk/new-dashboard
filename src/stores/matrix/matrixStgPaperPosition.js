import { ref } from "vue"
import { defineStore } from "pinia"
import { makeRequest } from "@/request/request"

export const useMatrixStgPapersStore = defineStore("matrixStgPapers", () => {
  const endpoint = "matrixStgPapers"
  const matrixStgPapers = ref([])

  const matrixStgPapersById = ref([])

  const showAddEditModal = ref(false)
  const addEditMatrixStgPaperData = ref({})
  const showDeleteConfirmationModal = ref(false)
  const idForDelete = ref(0)

  const searchInputText = ref("")
  const currentPageNumber = ref(1)
  const totalPages = ref(0)
  const showStartRecords = ref(1)
  const showEndRecords = ref(0)
  const totalRecords = ref(1)

  const getMatrixStgPapersById = async (id, subEndpoint) => {
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
        matrixStgPapersById.value = response.data.data || []

        totalRecords.value = response.data.count
        showStartRecords.value = 1 + (currentPageNumber.value - 1) * page_size
        showEndRecords.value =
          matrixStgPapersById.value.length +
          (currentPageNumber.value - 1) * page_size
        if (totalRecords.value % page_size == 0) {
          totalPages.value = totalRecords.value / page_size
        } else {
          totalPages.value = Math.floor(totalRecords.value / page_size) + 1
        }
      } else {
        matrixStgPapersById.value = []
      }
    } catch (error) {
      throw error
    }
  }

  // deleteMatrixStgPaper function delete MatrixStgPaper from db
  async function deleteMatrixStgPaper(id) {
    try {
      idForDelete.value = 0
      await makeRequest(endpoint, "DELETE", {}, {}, {}, id)
    } catch (error) {
      throw error
    }
  }

  // addEditMatrixStgPaper function edit MatrixStgPaper
  async function addEditMatrixStgPaper(id, formdata) {
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
    matrixStgPapers,
    matrixStgPapersById,
    getMatrixStgPapersById,
    addEditMatrixStgPaper,
    deleteMatrixStgPaper,

    showAddEditModal,
    addEditMatrixStgPaperData,
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
