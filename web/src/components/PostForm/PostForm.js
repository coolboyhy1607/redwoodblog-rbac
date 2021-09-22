import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'
import Editor from 'rich-markdown-editor'
import React, { useState } from 'react'

const PostForm = (props) => {
  const [title, setTitle] = useState('Title')
  const [body, setBody] = useState('Body')
  const onSubmit = () => {
    props.onSave({ title: title, body: body }, props?.post?.id)
    console.log('data:', title, body)
  }
  const handleChangedTitle = (event) => {
    setTitle(event.target.value)
  }
  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="title"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Title
        </Label>
        <input type="title" value={title} onChange={handleChangedTitle} />
        {/* <TextField
          name="title"
          defaultValue={props.post?.title}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        /> */}
        <FieldError name="title" className="rw-field-error" />

        <Label
          name="body"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Body
        </Label>
        {/* <TextField
          name="body"
          defaultValue={props.post?.body}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        /> */}

        <Editor
          defaultValue="# Welcome

                      Just an easy to use **Markdown** editor with `slash commands`"
          disableExtensions={[]}
          onBlur={() => {}}
          onCancel={function noRefCheck() {}}
          onClickHashtag={function noRefCheck() {}}
          onClickLink={function noRefCheck() {}}
          onFocus={function noRefCheck() {}}
          onHoverLink={function noRefCheck() {}}
          onSave={function noRefCheck() {}}
          onShowToast={function noRefCheck() {}}
          onChange={function noRefCheck(getEditorText) {
            setBody(getEditorText)
          }}
        />
        <FieldError name="body" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default PostForm
