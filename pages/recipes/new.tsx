import uuid from 'uuidjs'
import { useRouter } from 'next/router'
import React, { useRef } from 'react';
import action from '../../lib/recipes/action'

const New = () => {
  const inputFile = useRef<HTMLInputElement>(null)
  const inputText = useRef<HTMLInputElement>(null)
  const handleSelectImage = (event: any): void => {
    event.preventDefault()
    inputFile.current?.click()
  }
  const handleSelectedImage = (event: any): void => {
    const imageName: string | null | undefined = inputFile.current?.files && inputFile.current?.files[0].name as string
    if (inputText.current != undefined && imageName != (null || undefined)) {
      inputText.current.value = imageName
    }
  }

  const containRef = useRef<HTMLInputElement>(null)
  const handleAddIngredient = (event: any): void => {
    const inputText = document.createElement('input')
    inputText.classList.add('flex-part-input', 'w-11/12')
    inputText.type = 'text'
    inputText.placeholder = '材料'

    const removeButton = document.createElement('button')
    removeButton.classList.add('flex-part-btn', 'w-1/12')
    removeButton.innerText = '✗'
    removeButton.setAttribute('onclick', 'javascript:{ event.preventDefault(); event.target.parentElement.remove(); }');

    const flexContainer = document.createElement('div')
    flexContainer.classList.add('flex')
    flexContainer.append(inputText)
    flexContainer.append(removeButton)

    containRef.current?.append(flexContainer)
  }

  const handleRemoveIngredient = (event: any): void => {
    event.preventDefault()
    alert()
  }

  const router = useRouter()
  const handleSubmit = async (event: any) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('title', event.target.title.value)
    formData.append('uuid', uuid.generate())
    formData.append('external_title', event.target.externalTitle.value)
    formData.append('external_url', event.target.externalURL.value)
    formData.append('image', event.target.image.files[0])

    const data = await action.create(formData)
    router.push(`/recipes/${data['data']['recipe']['uuid']}`)
  }

  return (
    <>
      <h2 className="text-4xl font-bold my-8">新規作成</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <input accept="image/*" id="image" type="file" onChange={handleSelectedImage} ref={inputFile} hidden />
          <label htmlFor="image_name" className="label">画像を選択</label>
          <div className="flex">
            <input className="flex-part-input w-4/5" type="text" placeholder="画像を選択してください" disabled ref={inputText} />
            <button className="flex-part-btn w-1/5" onClick={handleSelectImage}>画像を選択</button>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="title" className="label">タイトル</label>
          <input className="input-text" type="text" id="title" name="title" placeholder="タイトル" required />
        </div>

        <div className="mb-6">
          <label htmlFor="externalTitle" className="label">外部サイトタイトル</label>
          <input className="input-text" type="text" id="externalTitle" name="externalTitle" placeholder="外部サイトタイトル" required />
        </div>

        <div className="mb-6">
          <label htmlFor="externalURL" className="label">外部サイトURL</label>
          <input className="input-text" type="text" id="externalURL" name="externalURL" placeholder="外部サイトURL" required />
        </div>

        <div className="mb-6">
          <label htmlFor="ingredients" className="label">材料</label>
          <div ref={containRef} id="ingredients">
            <div className="flex hidden">
              <input className="flex-part-input w-11/12" type="text" placeholder="材料" />
              <button className="flex-part-btn w-1/12" onClick={handleRemoveIngredient}>✗</button>
            </div>
          </div>
          <div className="mt-2">
            <a className="text-sm" href="#" onClick={handleAddIngredient}>材料を追加</a>
          </div>
        </div>

        <div className='flex items-center justify-center'>
          <button type="submit" className="btn">送　信</button>
        </div>
      </form>
    </>
  )
}

export default New
