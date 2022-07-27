
import { useRouter } from 'next/router'
import action from '../../../lib/recipes/action'

export const getStaticPaths = async () => {
  const data = await action.index()
  const paths = data['data'].map((recipe: Recipe) => ({
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
  const router = useRouter()
  const recipe: Recipe = data['data']['recipe']
  const ingredients: string[] = data['data']['ingredients']

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    const body = JSON.stringify({
      title: event.target.title.value,
      external_title: event.target.externalTitle.value,
      external_url: event.target.externalURL.value,
    })

    const data = await action.update(recipe.uuid, body)

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

        <button type="submit">送信</button>
      </form>
      </div>
    )
  }
}

export default Edit
