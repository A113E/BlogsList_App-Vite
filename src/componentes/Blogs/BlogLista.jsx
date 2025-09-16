import Blog from './Blog'

const BlogLista = ({ blogs, manejadorLikesChange, onDelete }) => (
  <div>
    {blogs.map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
        manejadorLikesChange={manejadorLikesChange}
        onDelete={onDelete}
      />
    ))}
  </div>
)


export default BlogLista