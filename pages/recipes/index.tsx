import Link from 'next/link'
import action from '../../lib/recipes/action'

export const getStaticProps = async () => {
  const data = await action.index()
  return { props: { data } }
}

const Index = ({ data }: any) => {
  const recipes: Recipe[] = data['data']['recipes']
  const image_urls: string[] = data['data']['image_urls']
  if (data['status'] == 'SUCCESS') {
    return (
      <>
        <div className="mb-2">
          <Link href={`/recipes/${encodeURIComponent(recipes[0].uuid)}`}>
            <a>
              <img title={recipes[0].title} src={image_urls[0]} className="object-cover object-center mb-1 w-full h-[28rem] rounded-lg" />
              {/* <div className="font-bold text-slate-700">
                {recipes[0].title}
              </div> */}
            </a>
          </Link>
        </div>
        <ul className="grid grid-cols-3 gap-2">
          {recipes.map((recipe: Recipe, index: number) => {
            if (index == 0) return
            return (
              <li key={recipe.id}>
                <Link href={`/recipes/${encodeURIComponent(recipe.uuid)}`}>
                  <a>
                    <img title={recipe.title} src={image_urls[index]} className="object-cover object-center w-full h-44 rounded-lg" />
                    {/* <div className="font-bold text-slate-700">
                      {recipe.title}
                    </div> */}
                  </a>
                </Link>
              </li>
            )
          }).filter(e => e)}
        </ul>
      </>
    )
  }
}

export default Index
