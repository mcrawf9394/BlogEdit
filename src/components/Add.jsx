import { useState } from "react"
import { useNavigate, Form } from "react-router-dom"
import Info from '../info.js'
function Add () {
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [postContent, setPostContent] = useState('')
    const [error, setError] = useState([''])
    return <>
        <Form>
            <label htmlFor="title">Title</label>
            <input name="title" type="text" value={title} onChange={e => {setTitle(e.target.value)}} required/>
            <label htmlFor="postContent">Post Content</label>
            <input name="postContent" type="text" value={postContent} onChange={e => {setPostContent(e.target.value)}} required />
            <button onClick={async (click) => {
                click.preventDefault()
                const request = await fetch (Info + '/posts', {
                    method: 'POST',
                    mode: 'cors',
                    headers: {"Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem('token')}`},
                    body: JSON.stringify({
                        "title": title,
                        "postContent": postContent
                    })
                })
                const response = await request.json()
                if (response.error) {
                    console.log(response.error)
                    setError(response.error)
                } else {
                    navigate('/')
                }
            }}>Submit</button>
        </Form>
        {error.map(err => {
            if (err === '') {
                return <> </>
            } else {
                return <>
                    <p>{err.msg}</p>
                </>
            }
        })}
    </>
}
export default Add