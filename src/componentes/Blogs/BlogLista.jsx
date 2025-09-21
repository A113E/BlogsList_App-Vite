import Blog from './Blog'

const BlogLista = ({ blogs, manejadorLikesChange, onDelete, usuario }) => (
  <div>
    {blogs.map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
        manejadorLikesChange={manejadorLikesChange}
        onDelete={onDelete}
        usuario={usuario}
      />
    ))}
  </div>
)


export default BlogLista