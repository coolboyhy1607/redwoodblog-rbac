import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'
import Editor from 'rich-markdown-editor'
import React, { useEffect } from 'react'
import { useAtom } from 'jotai'
import { documentTitle, documentText, isEditing } from 'src/stores/stores'
import { Button } from '@chakra-ui/react'
import EditButton from '../button/EditButton'
const PostForm = (props) => {
  const [documentTitleState, setDocumentTitleState] = useAtom(documentTitle)
  const [documentTextState, setDocumentTextState] = useAtom(documentText)
  const [isEditingState, setIsEditingState] = useAtom(isEditing)

  // const [isEditingState, setIsEditingState] = useAtom(isEditing)
  useEffect(() => {
    setDocumentTitleState(() => {
      return props?.post ? props.post.title : 'This is Title'
    })
    setDocumentTextState(() => {
      return props?.post ? props.post.body : 'Write something cool'
    })
    setIsEditingState(true)
  }, [])

  const onChange = (getEditorText) => setDocumentTextState(getEditorText)
  const onSubmit = () => {
    props.onSave(
      { title: documentTitleState, body: documentTextState },
      props?.post?.id
    )
  }
  // const handleChangedTitle = (event) => {
  //   setTitle(event.target.value)
  // }
  return (
    <section className="container mx-auto px-5 w-full">
      <div className="flex flex-col items-center py-8">
        <div className="flex flex-col w-full mb-12 text-left">
          <div className="w-full mx-auto lg:w-1/2"></div>
          <label
            htmlFor="other"
            className="block w-full space-y-1 text-gray-700 text-5xl px-4 py-3 transition border-0"
          >
            <input
              type="text"
              id="title"
              value={documentTitleState}
              onChange={(e) => setDocumentTitleState(e.target.value)}
              className="text-5xl w-full p-3 transition duration-200 border-0"
            ></input>
          </label>
          <Editor
            onChange={onChange}
            value={documentTextState}
            readOnly={!isEditingState}
          />
          <Button
            onClick={onSubmit}
            // disabled={savingIsDisabled}
            // neutral={isDraft}
          >
            Save
          </Button>
        </div>
      </div>
    </section>
  )
}

export default PostForm
