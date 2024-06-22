import { useState, useEffect } from "react"
import { useNavigate, Form, useParams } from "react-router-dom"
import Info from "../info.js"
import { v4 as uuidv4} from 'uuid'
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
            <Form className="h-screen w-8/12 mx-auto my-auto grid grid-rows-7 rounded-3xl bg-gray-600">
                <label className="self-end text-white ml-8 text-2xl" htmlFor="title">Title</label>
                <input className="h-10 row-span-2 bg-gray-400 ml-8 w-11/12 border-black border-4" id="title" type="text" value={title} onChange={e => {setTitle(e.target.value)}} required/>
                <label className="self-end text-white ml-8 text-2xl" htmlFor="postContent">Post Content</label>
                <input className="h-10 row-span-2 bg-gray-400 ml-8 w-11/12 border-black border-4" id="postContent" type="text" value={postContent} onChange={e => {setPostContent(e.target.value)}} required/>
                <button className="bg-gray-400 border-black border-4 rounded-2xl w-40 h-20 justify-self-center transition ease-in-out hover:scale-110" onClick={async (click) => {
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
                        return <li key={uuidv4()} hidden></li>
                    } else {
                        return <li key={uuidv4()}>{error.msg}</li>
                    }
                })}
            </ul>
        </>
    }
}
export default Update