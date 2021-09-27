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
const PostForm = (props) => {
  const [documentTitleState, setDocumentTitleState] = useAtom(documentTitle)
  const [documentTextState, setDocumentTextState] = useAtom(documentText)
  // const [isEditingState, setIsEditingState] = useAtom(isEditing)
  useEffect(() => {
    setDocumentTitleState(() => {
      return props?.post ? props.post.title : 'This is Title'
    })
    setDocumentTextState(() => {
      return props?.post ? props.post.body : 'Write something cool'
    })
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
    <div>
      <Editor onChange={onChange} value={documentTextState} />
      <Button
        onClick={onSubmit}
        // disabled={savingIsDisabled}
        // neutral={isDraft}
      >
        Save
      </Button>
    </div>
  )
}

export default PostForm
