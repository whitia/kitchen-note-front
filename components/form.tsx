import uuid from 'uuidjs'
import { useRouter } from 'next/router'
import { useRef, useEffect } from 'react'
import { toast, Theme } from 'react-toastify'
import action from '../lib/recipes/action'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'

const Form = (props: any) => {
  let recipe: Recipe | undefined = undefined
  let image_url: string | undefined = undefined
  let file_name: string | undefined = undefined
  let ingredients: string[] | undefined = undefined
  if (props.data != undefined) {
    recipe = props.data['data']['recipe']
    image_url = props.data['data']['image_url']
    file_name = image_url?.substring(image_url.lastIndexOf('/')+1)
    ingredients = props.data['data']['ingredients']
  }

  useEffect(() => {
    if (inputFile.current && props.action === 'Create') {
      inputFile.current.required = true
    }

    ingredients?.forEach((ingredient: string, index: number) => {
      const inputText = document.createElement('input')
      inputText.classList.add('flex-part-input')
      inputText.type = 'text'
      inputText.placeholder = 'Ingredient'
      inputText.defaultValue = ingredient

      const removeButton = document.createElement('button')
      removeButton.classList.add('flex-part-btn')
      removeButton.innerText = '✗'
      removeButton.setAttribute('onclick', 'javascript:{ event.preventDefault(); event.target.parentElement.remove(); }');

      const flexContainer = document.createElement('div')
      flexContainer.classList.add('flex')
      flexContainer.append(inputText)
      flexContainer.append(removeButton)

      ingredientList.current?.append(flexContainer)
    })
  }, []);

  const inputFile = useRef<HTMLInputElement>(null)
  const inputText = useRef<HTMLInputElement>(null)
  const handleSelectImage = (event: any): void => {
    event.preventDefault()
    inputFile.current?.click()
  }

  const selectImage = useRef<HTMLInputElement>(null)
  const handleSelectedImage = (event: any): void => {
    const files: FileList | null | undefined = inputFile.current?.files as FileList
    if (inputText.current != undefined && files[0] != (null || undefined)) {
      inputText.current.value = files[0].name
    }

    if (typeof files[0] === 'object') {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(files[0])
      fileReader.onload = (event: any) => {
        const result = fileReader.result
        if (typeof result === 'string') {
          const img = document.createElement('img')
          img.setAttribute('src', result)
          img.setAttribute('id', 'previewImage')
          img.classList.add('img-cover', 'h-64', 'md:h-[28rem]', 'mt-2')

          if (selectImage.current) {
            while (selectImage.current.firstChild) {
              selectImage.current.removeChild(selectImage.current.firstChild);
            }
          }
          selectImage.current?.prepend(img)
        }
      }
    }
  }

  const ingredientList = useRef<HTMLInputElement>(null)
  const submitButton = useRef<HTMLInputElement>(null)
  const handleAddIngredient = (event: any): void => {
    event.preventDefault()

    const inputText = document.createElement('input')
    inputText.classList.add('flex-part-input')
    inputText.type = 'text'
    inputText.placeholder = 'Ingredient'

    const removeButton = document.createElement('button')
    removeButton.classList.add('flex-part-btn')
    removeButton.innerText = '✗'
    removeButton.setAttribute('onclick', 'javascript:{ event.preventDefault(); event.target.parentElement.remove(); }');

    const flexContainer = document.createElement('div')
    flexContainer.classList.add('flex')
    flexContainer.append(inputText)
    flexContainer.append(removeButton)

    ingredientList.current?.append(flexContainer)
    inputText.focus()
    submitButton.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const router = useRouter()
  const handleCreateSubmit = async (event: any) => {
    event.preventDefault()

    const ingredients = new Array()
    const elements = ingredientList.current?.children
    if (elements != undefined) {
      Array.from(elements).forEach((element, index: number) => {
        ingredients.push(element.querySelector('input')?.value)
      })
    }

    const formData = new FormData()
    formData.append('title', event.target.title.value)
    formData.append('uuid', uuid.generate())
    formData.append('category', event.target.category.value)
    formData.append('external_title', event.target.externalTitle.value)
    formData.append('external_url', event.target.externalURL.value)
    formData.append('image', event.target.image.files[0])
    formData.append('ingredients', ingredients.join(','))

    const data = await action.create(formData)
    let mode = 'light' as Theme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      mode = 'dark'
    }
    toast('🎉 Have just created item.', { theme: mode })
    router.push(`/recipes/${data['data']['recipe']['uuid']}`)
  }

  const handleUpdateSubmit = async (event: any) => {
    event.preventDefault()

    const ingredients = new Array()
    const elements = ingredientList.current?.children
    if (elements != undefined) {
      Array.from(elements).forEach((element, index: number) => {
        ingredients.push(element.querySelector('input')?.value)
      })
    }

    const formData = new FormData()
    formData.append('title', event.target.title.value)
    formData.append('uuid', recipe!.uuid)
    formData.append('category', event.target.category.value)
    formData.append('external_title', event.target.externalTitle.value)
    formData.append('external_url', event.target.externalURL.value)
    formData.append('ingredients', ingredients.join(','))
    const file = event.target.image.files[0]
    if (file) formData.append('image', file)

    const data = await action.update(recipe!.uuid, formData)
    let mode = 'light' as Theme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      mode = 'dark'
    }
    toast('🎉 Have just updated item.', { theme: mode })
    router.push(`/recipes/${recipe!.uuid}`)
  }

  return (
    <>
      <h2 className="text-3xl mb-8 mt-2">{props.action}</h2>
      <form onSubmit={props.action == 'Create' ? handleCreateSubmit : handleUpdateSubmit}>
        <div className="mb-8">
          <label htmlFor="coverImage" className="label">Cover Image</label>
          <div ref={selectImage}></div>
          {image_url && (
            <img title={recipe?.title} src={image_url} className="img-cover h-64 md:h-[28rem] mt-2" />
          )}
          <div className="flex">
            <input className="flex-part-input" type="text" placeholder="Cover Image" defaultValue={file_name} disabled ref={inputText} />
            <button className="flex-part-btn" onClick={handleSelectImage}>
              <FontAwesomeIcon icon={faImage} />
            </button>
          </div>
          <input className="block mx-auto opacity-0 h-[1px] w-[1px]" accept="image/*" id="image" type="file" onChange={handleSelectedImage} ref={inputFile} />
        </div>

        <div className="mb-8">
          <label htmlFor="title" className="label">Title</label>
          <input className="input-text" type="text" id="title" name="title" placeholder="Title" defaultValue={recipe?.title} required />
        </div>

        <div className="mb-8">
          <label htmlFor="category" className="label">Category</label>
          <input className="input-text" type="text" id="category" name="category" placeholder="Category" defaultValue={recipe?.category} />
        </div>

        <div className="flex mb-8 justify-between">
          <div className="basis-[49%]">
            <label htmlFor="externalTitle" className="label">External Title</label>
            <input className="input-text" type="text" id="externalTitle" name="externalTitle" placeholder="External Title" defaultValue={recipe?.external_title} required />
          </div>
          <div className="basis-[49%]">
            <label htmlFor="externalURL" className="label">External URL</label>
            <input className="input-text" type="text" id="externalURL" name="externalURL" placeholder="External URL" defaultValue={recipe?.external_url} required />
          </div>
        </div>

        <div className="mb-8">
          <label htmlFor="ingredients" className="label">Ingredients</label>
          <div ref={ingredientList} id="ingredients"></div>
          <p className="mt-2 text-xs text-neutral-400 dark:text-neutral-500">You can click a below link to add any number of ingredient.</p>
          <div className="mt-2">
            <a className="text-sm" href="#" onClick={handleAddIngredient}>Add ingredient</a>
          </div>
        </div>

        <div ref={submitButton} className='flex items-center justify-center'>
          <button type="submit" className="btn">{props.action}</button>
        </div>
      </form>
    </>
  )
}

export default Form
