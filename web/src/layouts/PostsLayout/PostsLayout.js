import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'
import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'
import { useAtom } from 'jotai'
import { isEditing } from 'src/stores/stores'
import EditButton from 'src/components/button/EditButton'

const PostsLayout = (props) => {
  const { hasRole } = useAuth()
  const [isEditingState, setIsEditingState] = useAtom(isEditing)

  return (
    <>
      <MetaTags title="Manage Posts" />
      <Toaster />

      <div className="rw-scaffold">
        <header className="rw-header">
          <h1 className="rw-heading rw-heading-primary">
            <Link to={routes.posts()} className="rw-link">
              Posts
            </Link>
          </h1>
          {(hasRole('admin') || hasRole('author')) && <EditButton />}
        </header>
        <main className="rw-main">{props.children}</main>
      </div>
    </>
  )
}

export default PostsLayout
