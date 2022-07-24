import axios from 'axios'
import Link from 'next/link'

type Recipe = {
  id: number
  title: string
  uuid: string
  external_title: string
  external_url: string
}

export const getServerSideProps = async () => {
  const response = await axios.get('http://localhost:3001/api/v1/recipes')
  const data = response.data
  let body = null
  if (data.status == 'SUCCESS') {
    body = JSON.parse(data.body)
  }
  return { props: { body } }
}

const Home = ({ body }: any) => {
  if (body) {
    const recipes: Recipe[] = body
    return (
      <ul>
        {recipes.map((recipe: Recipe) => {
          return (
            <li key={recipe.id}>
              <Link href={`/recipes/${encodeURIComponent(recipe.uuid)}`}>
                <a>{recipe.title}</a>
              </Link>
            </li>
          )
        })}
      </ul>
    )
  }
}

export default Home
