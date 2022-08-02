import client from '../axios'

module action {
  export const index = async () => {
    const response = await client.get('/recipes')
    return response.data
  }

  export const show = async (uuid: string) => {
    const response = await client.get(`/recipes/${uuid}`)
    return response.data
  }

  export const create = async (data: any) => {
    const response = await client.post('/recipes', data)
    return response.data
  }

  export const update = async (uuid: string, data: any) => {
    const response = await client.patch(`/recipes/${uuid}`, data)
    return response.data
  }

  export const destroy = async (uuid: string) => {
    const response = await client.delete(`/recipes/${uuid}`)
    return response.data
  }

  export const search = async (query: string) => {
    const response = await client.get(`/recipes/search?query=${query}`)
    return response.data
  }
}

export default action
