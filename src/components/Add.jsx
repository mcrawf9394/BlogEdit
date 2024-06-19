import { useState } from "react"
import { useNavigate, Form } from "react-router-dom"
import Info from '../info.js'
import { v4 as uuidv4 } from "uuid"
function Add () {
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [postContent, setPostContent] = useState('')
    const [error, setError] = useState([''])
    return <>
        <Form>
            <label htmlFor="title">Title</label>
            <input id="title" type="text" value={title} onChange={e => {setTitle(e.target.value)}} required/>
            <label htmlFor="postContent">Post Content</label>
            <input id="postContent" type="text" value={postContent} onChange={e => {setPostContent(e.target.value)}} required />
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
        <ul>
            {error.map(err => {
                if (err === '') {
                    return <li key={uuidv4()} hidden> </li>
                } else {
                    return <>
                        <li key={uuidv4()}>{err.msg}</li>
                    </>
                }
            })}
        </ul>
    </>
}
export default Add