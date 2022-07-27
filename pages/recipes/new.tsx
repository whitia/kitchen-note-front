import uuid from 'uuidjs'
import { useRouter } from 'next/router'
import action from '../../lib/recipes/action'

const New = () => {
  const router = useRouter()
  const handleSubmit = async (event: any) => {
    event.preventDefault()

    const body = JSON.stringify({
      title: event.target.title.value,
      uuid: uuid.generate(),
      external_title: event.target.externalTitle.value,
      external_url: event.target.externalURL.value,
      ingredients: null,
    })

    const data = await action.create(body)
    const recipe = await data['data']['recipe']

    router.push(`/recipes/${recipe['uuid']}`)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">タイトル</label>
        <input type="text" id="title" name="title" required />

        <label htmlFor="externalTitle">外部リンクタイトル</label>
        <input type="text" id="externalTitle" name="externalTitle" required />

        <label htmlFor="externalURL">外部リンクURL</label>
        <input type="text" id="externalURL" name="externalURL" required />

        <button type="submit">送信</button>
      </form>
    </div>
  )
}

export default New
