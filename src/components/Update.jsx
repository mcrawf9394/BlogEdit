import { useState, useEffect } from "react"
import { useNavigate, Form, useParams } from "react-router-dom"
function Update () {
    const navigate = useNavigate()
    const params = useParams()
    const [content, setContent] = useState('loading')
    const [title, setTitle] = useState('')
    const [postContent, setPostContent] = useState('')
    const [errors, setErrors] = useState([''])
    useEffect(() => {
        const getInfo = async () => {
            const request = await fetch(`http://localhost:3000/api/posts/${params.postId}`, {
                method: 'PUT',
                mode: 'cors',
                headers: '',             
            })
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
                <label htmlFor="title"></label>
                <input name="title" type="text" value={title} onChange={e => {setTitle(e.target.value)}} required/>
                <label htmlFor="postContent"></label>
                <input name="postContent" type="text" value={postContent} onChange={e => {setPostContent(e.target.value)}} required/>
                <button onClick={async (click) => {
                    click.preventDefault()

                }}>Submit</button>
            </Form>
            <ul>
                {errors.map(error => {
                    if (error === '') {
                        return <>
                        </>
                    } else {
                        <li>{error}</li>
                    }
                })}
            </ul>
        </>
    }
}
export default Update