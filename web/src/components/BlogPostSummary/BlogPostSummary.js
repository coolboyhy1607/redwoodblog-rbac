import { Link, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import moment from 'moment'

const BlogPostSummary = ({ post, concise = false }) => {
  const { hasRole } = useAuth()

  return (
    <div className="bg-white  shadow-lg rounded-lg hover:shadow-xl transition duration-200 max-w-sm  justify-center items-center">
      <img
        className="rounded-t-lg"
        src="https://images.unsplash.com/photo-1622495894307-93143fc57155"
        alt=""
      />
      <div className="py-4 px-8">
        {/* <p className="text-sm leading-5 text-gray-500">
              <time
                dateTime={moment(post.createdAt).format(
                  'dddd, MMMM Do YYYY, h:mm a'
                )}
              >
                {moment(post.createdAt).format('dddd, MMMM Do YYYY, h:mm a')}
              </time>
            </p> */}
        <Link to={routes.blogPost({ id: post.id })} className="block">
          <h1 className="hover:cursor-pointer mt-2 text-gray-900 font-bold text-2xl tracking-tight leading-7">
            {post.title}
          </h1>
          <p className="overflow-ellipsis overflow-hidden hover:cursor-pointer py-3 text-gray-600 leading-6 text-base leading-6">
            {concise ? `${post.body.slice(0, 200)} ...` : post.body}
          </p>
        </Link>
        <div className="mt-3">
          {(hasRole('admin') || hasRole('editor')) && (
            <Link
              to={routes.editPost({ id: post.id })}
              className="text-base leading-6 font-semibold text-red-600 hover:text-red-500 transition ease-in-out duration-150"
            >
              Edit
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default BlogPostSummary
