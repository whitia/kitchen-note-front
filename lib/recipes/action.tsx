import instance from '../axios'

module action {
  export const index = async () => {
    const response = await instance.get('/recipes')
    return response.data
  }

  export const show = async (uuid: string) => {
    const response = await instance.get(`/recipes/${uuid}`)
    return response.data
  }

  export const create = async (data: any) => {
    const response = await instance.post('/recipes', data)
    return response.data
  }

  export const update = async (uuid: string, data: any) => {
    const response = await instance.patch(`/recipes/${uuid}`, data)
    return response.data
  }

  export const destroy = async (uuid: string) => {
    const response = await instance.delete(`/recipes/${uuid}`)
    return response.data
  }
}

export default action
