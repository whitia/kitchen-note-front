
import action from '../../../lib/recipes/action'
import Form from '../../../components/form'

export const getStaticProps = async (params: any) => {
  const uuid = params['params']['uuid']
  const data = await action.show(uuid)
  return { props: { data } }
}

const Edit = ({ data }: any) => {
  return (
    <>
      <Form action="Update" data={data} />
    </>
  )
}

export default Edit

export const getStaticPaths = async () => {
  const data = await action.index()
  const paths = data['data']['recipes'].map((recipe: Recipe) => ({
    params: { uuid: recipe.uuid }
  }))
  return { paths, fallback: false }
}
