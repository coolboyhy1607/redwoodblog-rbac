import { useMutation } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import { QUERY } from 'src/components/PostsCell'
import { toast } from '@redwoodjs/web/toast'
import RichMarkdownEditor from 'rich-markdown-editor'
import { useAtom } from 'jotai'
import { documentTitle, documentText, isEditing } from 'src/stores/stores'
import { useAuth } from '@redwoodjs/auth'

const CREATE_POST_MUTATION = gql`
  mutation CreatePostMutation($input: CreatePostInput!) {
    createPost(input: $input) {
      id
    }
  }
`

const Editor = (props) => {
  const { hasRole } = useAuth()
  const [documentTitleState, setDocumentTitleState] = useAtom(documentTitle)
  const [documentTextState, setDocumentTextState] = useAtom(documentText)
  const [isEditingState, setIsEditingState] = useAtom(isEditing)
  setIsEditingState(true)
  const onChange = (getEditorText) => setDocumentTextState(getEditorText)
  const [createPost, { loading, error }] = useMutation(CREATE_POST_MUTATION, {
    onCompleted: () => {
      navigate(routes.posts())
      toast.success('Post created.')
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })
  const onSave = () => {
    createPost({
      variables: {
        input: { title: documentTitleState, body: documentTextState },
      },
    })
  }

  return (
    (hasRole('admin') || hasRole('author') || hasRole('publisher')) && (
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={onSave}
          // disabled={savingIsDisabled}
          // neutral={isDraft}
        >
          Save
        </button>
        <p>Loading: {loading}</p>
        <p>Error: {error}</p>
        <RichMarkdownEditor
          // id={document.id}
          // key={disableEmbeds ? "disabled" : "enabled"}
          // innerRef={this.editor}
          // multiplayer={collaborativeEditing}
          // shareId={shareId}
          // isDraft={document.isDraft}
          // template={document.isTemplate}
          title={documentTitleState}
          // document={document}
          // value={readOnly ? value : undefined}
          defaultValue={documentTextState}
          // disableEmbeds={disableEmbeds}
          // onImageUploadStart={this.onImageUploadStart}
          // onImageUploadStop={this.onImageUploadStop}
          // onSearchLink={this.props.onSearchLink}
          // onCreateLink={this.props.onCreateLink}
          // onChangeTitle={this.onChangeTitle}
          onChange={onChange}
          // onSave={onSave}
          // onPublish={this.onPublish}
          // onCancel={this.goBack}
          readOnly={props.readOnly}
          // readOnlyWriteCheckboxes={readOnly && abilities.update}
          // ui={this.props.ui}
        >
          {/* {shareId && (
            <ReferencesWrapper isOnlyTitle={document.isOnlyTitle}>
              <PublicReferences
                shareId={shareId}
                documentId={document.id}
                sharedTree={this.props.sharedTree}
              />
            </ReferencesWrapper>
          )}
          {!isShare && !revision && (
            <>
              <MarkAsViewed document={document} />
              <ReferencesWrapper isOnlyTitle={document.isOnlyTitle}>
                <References document={document} />
              </ReferencesWrapper>
            </>
          )} */}
        </RichMarkdownEditor>
      </div>
    )
  )
}
export default Editor
