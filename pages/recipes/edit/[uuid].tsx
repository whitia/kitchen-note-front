
import { useRouter } from 'next/router'
import action from '../../../lib/recipes/action'

export const getStaticPaths = async () => {
  const data = await action.index()
  const paths = data['data']['recipes'].map((recipe: Recipe) => ({
    params: { uuid: recipe.uuid }
  }))
  return { paths, fallback: false }
}

export const getStaticProps = async (params: any) => {
  const uuid = params['params']['uuid']
  const data = await action.show(uuid)
  return { props: { data } }
}

const Edit = ({ data }: any) => {
  const recipe: Recipe = data['data']['recipe']
  const ingredients: string[] = data['data']['ingredients']

  const router = useRouter()
  const handleSubmit = async (event: any) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('title', event.target.title.value)
    formData.append('uuid', recipe.uuid)
    formData.append('external_title', event.target.externalTitle.value)
    formData.append('external_url', event.target.externalURL.value)
    formData.append('image', event.target.image.files[0])

    const data = await action.update(recipe.uuid, formData)

    router.push(`/recipes/${recipe.uuid}`)
  }

  if (data['status'] == 'SUCCESS') {
    return (
      <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">タイトル</label>
        <input type="text" id="title" name="title" defaultValue={recipe.title} required />

        <label htmlFor="externalTitle">外部リンクタイトル</label>
        <input type="text" id="externalTitle" name="externalTitle" defaultValue={recipe.external_title} required />

        <label htmlFor="externalURL">外部リンクURL</label>
        <input type="text" id="externalURL" name="externalURL" defaultValue={recipe.external_url} required />

        <label htmlFor="image">
          <input
            accept="image/*"
            id="image"
            type="file"
            hidden
          />
          画像選択
        </label>

        <button type="submit">送信</button>
      </form>
      </div>
    )
  }
}

export default Edit
