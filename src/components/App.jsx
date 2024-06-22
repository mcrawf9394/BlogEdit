import { useState, useEffect } from 'react'
import Info from '../info.js'
import {v4 as uuidv4} from 'uuid'
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
    return <div className='h-screen w-8/12 mx-auto my-auto rounded-3xl bg-gray-600'>
        <h1 className='text-2xl text-white'>This page is for editing Sam's Blog, while this will let you login if you have an account on the blog viewing page, it will not give you any add benefit in this case, as only the admin account can add, update or delete posts for the site</h1>
        <a href="/login">
          <button className="bg-gray-600 border-black border-solid border-4 rounded-xl w-2/12 hover:scale-110 text-white">Login</button>
        </a>
      </div>
  } else {
    return <div className='h-screen w-8/12 mx-auto my-auto rounded-3xl bg-gray-600'>
      <a className='mx-32 my-4' href="/addpost">
        <button className="bg-gray-600 border-black border-solid border-4 rounded-xl w-2/12 hover:scale-110 text-white">Add New Post</button>
      </a>
      {content.map(post => {
        if (post === 'loading') {
          return <>
            <h1 className='text-6xl'>Loading</h1>
          </>
        } else {
          return <div className='mx-32' key={uuidv4()}>
            <h2 className='text-white my-4'>{post.title}</h2>
            <p className='text-white my-4'>{post.postContent}</p>
            <a className='my-4 mr-4' href={"/updatepost/" + post._id}>
              <button className="bg-gray-600 border-black border-solid border-4 rounded-xl w-2/12 hover:scale-110 text-white">Update</button>
            </a>
            <button className="my-4 bg-gray-600 border-black border-solid border-4 rounded-xl w-2/12 hover:scale-110 text-white" onClick={async (click) => {
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
            return <li key={uuidv4()} hidden></li>
          } else {
            return <li key={uuidv4()}>{error.msg}</li>  
          }
        })}
      </ul>
    </div>
  }
}

export default App
