import { useState, useEffect } from 'react'
function App() {
  const [content, setContent] = useState(['loading'])
  useEffect(() => {
    const getItem = async () => {
      const request = await fetch('http://localhost:3000/api/posts')
      const info = await request.json()
      setContent(info.posts)
    }
    getItem()
  }, [])
  if (!localStorage.getItem('token')) {
    return <>
        <h1 className='text-2xl'>This page is for editing Sam's Blog, while this will let you login if you have an account on the blog viewing page, it will not give you any add benefit in this case, as only the admin account can add, update or delete posts for the site</h1>
        <a href="/login">
          <button>Login</button>
        </a>
      </>
  } else {
    return <>
      {content.map(post => {
        if (post === 'loading') {
          return <>
            <h1 className='text-6xl'>Loading</h1>
          </>
        } else {
          return <div>
          <h2>{post.title}</h2>
          <p>{post.postContent}</p>
          <a href="/updatepost">
            <button>Update</button>
          </a>
          <button>Delete</button>
          </div>
        }
      })}
    </>
  }
}

export default App
