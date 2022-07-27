import Link from 'next/link'
import action from '../../lib/recipes/action'

export const getStaticProps = async () => {
  const data = await action.index()
  return { props: { data } }
}

const Index = ({ data }: any) => {
  const recipes: Recipe[] = data['data']
  if (data['status'] == 'SUCCESS') {
    return (
      <div>
        <Link href='/recipes/new'>
          <a>新規作成</a>
        </Link>
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
      </div>
    )
  }
}

export default Index
