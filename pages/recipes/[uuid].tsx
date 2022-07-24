import axios from 'axios'

export const getServerSideProps = async (context: any) => {
  const uuid = context.query.uuid
  const response = await axios.get(`http://localhost:3001/api/v1/recipes/${uuid}`)
  const data = response.data
  let body = null
  if (data.status == 'SUCCESS') {
    body = JSON.parse(data.body)
  }
  return { props: { body } }
}

const Recipe = ({ body }: any) => {
  if (body) {
    const recipe = body
    return (
      <div>
        <h2>{recipe.title}</h2>
        <a href={recipe.external_url} target="_blank" rel="noopener noreferrer">{recipe.external_title}</a>
      </div>
    )
  }
}

export default Recipe
