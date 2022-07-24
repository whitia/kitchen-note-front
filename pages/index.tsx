import axios from 'axios'
import Link from 'next/link'

type Recipe = {
  id: number
  title: string
  path: string
}

export const getServerSideProps = async () => {
  const response = await axios.get('http://localhost:3001/api/v1/recipes')
  const data = response.data
  return { props: { data } }
}

const Home = ({ data }: any) => {
  const recipes: Recipe[] = data
  return (
    <ul>
      {recipes.map((recipe: Recipe) => {
        return (
          <li key={recipe.id}>
            <Link href={`/recipes/${encodeURIComponent(recipe.path)}`}>
              <a>{recipe.title}</a>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default Home
