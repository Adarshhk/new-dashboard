import { ref } from "vue"
import { defineStore } from "pinia"
import { makeRequest } from "../../request/request"

export const useUsersStore = defineStore("users", () => {
  const users = ref([])
  const endpoint = "users"

  const requested = ref([])
  const ignoreId = ref([])

  const showAddEditModal = ref(false)
  const addEditUserData = ref({})

  const showDeleteConfirmationModal = ref(false)
  const idForDelete = ref(null)

  const showBrokersModal = ref(false)
  const showPositionsModal = ref(false)
  const storeUserId = ref(0)

  const showOrderOptionModal = ref(false)
  const showWebhookOrdersModal = ref(false)
  const showMatrixOrdersModal = ref(false)

  const showJoinerOptionModal = ref(false)
  const showWebhookJoinersModal = ref(false)
  const showMatrixJoinersModal = ref(false)

  const showOrdersModal = ref(false)
  const showStrategiesModal = ref(false)

  const searchInputText = ref("")
  const currentPageNumber = ref(1)
  const totalPages = ref(0)
  const showStartRecords = ref(1)
  const showEndRecords = ref(0)
  const totalRecords = ref(1)

  const getUsers = async () => {
    var page_id = currentPageNumber.value
    var page_size = 10
    var search = searchInputText.value

    try {
      const response = await makeRequest(
        "users",
        "GET",
        {},
        {},
        { page_id, page_size, search }
      )
      if (response.data) {
        users.value = response.data
      } else {
        users.value = []
      }
    } catch (error) {
      throw error
    }
  }

  const getUsersById = async id => {
    return users.value.find(user => user.id === id)
  }

  // deleteuser function delete user from db
  async function deleteUser(id) {
    try {
      idForDelete.value = null
      await makeRequest(endpoint, "DELETE", {}, {}, {}, id)
      getUsers()
    } catch (error) {
      throw error
    }
  }

  // addEditUser function edit user
  async function addEditUser(id, formdata) {
    try {
      if (id) {
        await makeRequest(endpoint, "PUT", formdata, {}, {}, id)
        getUsers()
      }
    } catch (error) {
      throw error
    }
  }

  getUsers()

  return {
    endpoint,
    users,
    getUsers,
    getUsersById,
    addEditUser,
    deleteUser,

    showAddEditModal,
    addEditUserData,

    showDeleteConfirmationModal,
    idForDelete,

    showBrokersModal,

    storeUserId,
    showOrderOptionModal,
    showWebhookOrdersModal,
    showMatrixOrdersModal,

    showJoinerOptionModal,
    showWebhookJoinersModal,
    showMatrixJoinersModal,

    showOrdersModal,
    showPositionsModal,
    showStrategiesModal,

    searchInputText,
    currentPageNumber,
    totalPages,
    showStartRecords,
    showEndRecords,
    totalRecords
  }
})
