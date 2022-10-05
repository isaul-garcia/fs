import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const clearToken = () => {
  token = null
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then((response) => response.data)
}

const remove = (id) => {
  axios.delete(`${baseUrl}/${id}`)
}

const addComment = async (id, comment) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(
    `${baseUrl}/${id}/comments`,
    comment,
    config,
  )
  return response.data
}

const exportedObject = {
  getAll,
  create,
  update,
  remove,
  setToken,
  clearToken,
  addComment
}

export default exportedObject
