import { useLocation, routes, navigate } from '@redwoodjs/router'
import { isEditing } from 'src/stores/stores'
import { useAtom } from 'jotai'
import React, { useEffect } from 'react'

const EditButton = () => {
  const [isEditingState, setIsEditingState] = useAtom(isEditing)
  const { pathname } = useLocation()
  useEffect(() => {
    if (pathname !== '/admin/posts/edit') setIsEditingState(false)
  }, [pathname])
  const onClick = () => {
    setIsEditingState(!isEditingState)
    if (!isEditingState) navigate(routes.newPost())
  }
  return (
    <button
      type="button"
      className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      onClick={onClick}
    >
      {isEditingState ? 'Done Editing' : 'New Post'}
    </button>
  )
}
export default EditButton
