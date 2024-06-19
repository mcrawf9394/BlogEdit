import { useState, useEffect } from "react"
import { useNavigate, Form, useParams } from "react-router-dom"
import Info from "../info.js"
function Update () {
    const navigate = useNavigate()
    const params = useParams()
    const [content, setContent] = useState('loading')
    const [title, setTitle] = useState('')
    const [postContent, setPostContent] = useState('')
    const [errors, setErrors] = useState([''])
    useEffect(() => {
        const getInfo = async () => {
            const request = await fetch(`${Info}/posts/${params.postId}`)
            const info = await request.json()
            setContent(info)
            setTitle(info.post.title)
            setPostContent(info.post.postContent)
        }
        getInfo()
    },[])
    if (content === 'loading') {
        return <>
            <h1 className="text-6xl">Loading</h1>
        </>
    } else {
        return <>
            <Form>
                <label htmlFor="title">Title</label>
                <input name="title" type="text" value={title} onChange={e => {setTitle(e.target.value)}} required/>
                <label htmlFor="postContent">Post Content</label>
                <input name="postContent" type="text" value={postContent} onChange={e => {setPostContent(e.target.value)}} required/>
                <button onClick={async (click) => {
                    click.preventDefault()
                    const request = await fetch(`${Info}/posts/${params.postId}`, {
                        method: 'PUT',
                        mode: "cors",
                        headers: {"Content-Type": "application/json",'Authorization': `Bearer ${localStorage.getItem('token')}`},
                        body: JSON.stringify({
                            "title": title,
                            "postContent": postContent
                        })
                    })
                    const response = await request.json()
                    if (response.error) {
                        setErrors(response.error)
                    } else {
                        navigate('/')
                    }
                }}>Submit</button>
            </Form>
            <ul>
                {errors.map(error => {
                    if (error === '') {
                        return <>
                        </>
                    } else {
                        <li>{error.msg}</li>
                    }
                })}
            </ul>
        </>
    }
}
export default Update