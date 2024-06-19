import { useState, useEffect } from 'react'
import Info from '../info.js'
function App() {
  const [content, setContent] = useState(['loading'])
  const [errors, setErrors] = useState([''])
  useEffect(() => {
    const getItem = async () => {
      const request = await fetch(Info + '/posts')
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
      <a href="/addpost">
        <button>Add New Post</button>
      </a>
      {content.map(post => {
        if (post === 'loading') {
          return <>
            <h1 className='text-6xl'>Loading</h1>
          </>
        } else {
          return <div>
            <h2>{post.title}</h2>
            <p>{post.postContent}</p>
            <a href={"/updatepost/" + post._id}>
              <button>Update</button>
            </a>
            <button onClick={async (click) => {
              click.preventDefault()
              const request = await fetch (Info + '/posts/' + post._id, {
                method: 'DELETE',
                mode: "cors",
                headers: {"Content-Type": "application/json",'Authorization': `Bearer ${localStorage.getItem('token')}`}
              })
              const response = await request.json()
              if (response.error) {
                setErrors(response.error)
              } else {
                  const request = await fetch(Info + '/posts')
                  const info = await request.json()
                  setContent(info.posts)
              }
            }}>Delete</button>
          </div>
        }
      })}
      <ul>
        {errors.map(error => {
          if (error === '') {
            return <> </>
          } else {
            return <li>{error.msg}</li>  
          }
        })}
      </ul>
    </>
  }
}

export default App
