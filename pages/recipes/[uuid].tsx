import Link from 'next/link'
import { useRouter } from 'next/router'
import { toast, Theme } from 'react-toastify'
import action from '../../lib/recipes/action'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUpRightFromSquare, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'

const Recipe = ({ data }: any) => {
  const recipe: Recipe = data['data']['recipe']
  const image_url: string = data['data']['image_url']
  const ingredients: string[] = data['data']['ingredients']

  const router = useRouter()
  const handleDelete = async (event: any, uuid: string) => {
    event.preventDefault()

    if (window.confirm('Do you really want to delete?')) {
      const data = await action.destroy(uuid)
      let mode: Theme = 'light'
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        mode = 'dark'
      }
      toast('🎉 Have just deleted item.', { theme: mode })
      router.push('/recipes')
    }
  }

  return (
    <>
      <img title={recipe.title} src={image_url} className="img-cover h-64 md:h-[28rem] mb-8" />
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-3xl">{recipe.title}</h2>
          <span className="text-sm text-neutral-400">{recipe.category}</span>
          {recipe.sub_category && (
            <span className="text-sm text-neutral-400"> / {recipe.sub_category}</span>
          )}
        </div>
        <p>
          <Link href={`/recipes/edit/${encodeURIComponent(recipe.uuid)}`}>
            <a><FontAwesomeIcon icon={faPenToSquare} /></a>
          </Link>
          &nbsp;/&nbsp;
          <a href="#" onClick={(event) => handleDelete(event, recipe.uuid)}>
            <FontAwesomeIcon icon={faTrashCan} />
          </a>
        </p>
      </div>
      <div className="mb-8">
        <h3 className="mb-2 font-bold">Ingredients</h3>
        <ul className="flex flex-wrap">
          {ingredients.map((ingredient: string, index: number) => {
            return (
              <li key={index} className="mr-3 my-3">
                <Link href={{
                  pathname: '/recipes/search',
                  query: { query: encodeURIComponent(ingredient) },
                }}>
                  <a className="badge">
                    {ingredient}
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="mb-8">
        <h3 className="mb-2 font-bold">External Link</h3>
        <p className="text-sm">
          <a href={recipe.external_url} target="_blank" rel="noopener noreferrer">
            {recipe.external_title}
            &nbsp;
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </a>
        </p>
      </div>
    </>
  )
}

export default Recipe

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
