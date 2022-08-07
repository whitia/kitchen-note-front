import client from '../axios'

module action {
  export const index = async (offset: number | null = null, limit: number | null = null) => {
    const response = await client.get('/recipes', {
      params: {
        offset: offset,
        limit: limit,
      }
    })
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

  export const search = async (type: string, keyword: string) => {
    const response = await client.get('/recipes/search', {
      params: {
        type: type,
        keyword: keyword,
      }
    })
    return response.data
  }
}

export default action
