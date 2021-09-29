import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { navigate, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import PostForm from 'src/components/PostForm'

export const QUERY = gql`
  query FIND_EDIT_POST_BY_ID($id: Int!) {
    post: post(id: $id) {
      id
      createdAt
      title
      body
    }
  }
`
const UPDATE_POST_MUTATION = gql`
  mutation UpdatePostMutation($id: Int!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      id
      createdAt
      updatedAt
      publishedAt
      title
      body
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ post }) => {
  const { hasRole } = useAuth()
  const [updatePost, { loading, error }] = useMutation(UPDATE_POST_MUTATION, {
    onCompleted: () => {
      navigate(routes.posts())
      toast.success('Post updated.')
    },
    onError: () => {
      toast.error('Post cannot be edited.')
    },
  })

  const onSave = (input, id) => {
    updatePost({ variables: { id, input } })
  }

  return (
    (hasRole('admin') ||
      hasRole('author') ||
      hasRole('editor') ||
      hasRole('publisher')) && (
      <div>
        <PostForm post={post} onSave={onSave} error={error} loading={loading} />
      </div>
    )
  )
}
