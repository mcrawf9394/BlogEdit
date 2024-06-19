import { useState } from "react";
import { useNavigate, Form } from "react-router-dom";
import Info from '../info.js'
import { v4 as uuidv4} from 'uuid'
function Login () {
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [error, setError] = useState([''])
    const navigate = useNavigate()
    return <>
        <Form>
            <label htmlFor="username">Username</label>
            <input id="username" type="text" value={user} onChange={e => {setUser(e.target.value)}} required/>
            <label htmlFor="password">Password</label>
            <input id="password" type="text" value={pass} onChange={e => {setPass(e.target.value)}} required/>
            <button onClick={async (click) => {
                  click.preventDefault()
                  try {const request = await fetch(Info + '/users/login', {
                      method: 'POST',
                      mode: "cors",
                      headers: {"Content-Type": "application/json"},
                      body: JSON.stringify({
                          "username": user,
                          "password": pass
                      })
                  })
                  const response = await request.json()
                  if (!response.token) {
                      setError(response.error[0].msg)
                  } else {
                      localStorage.setItem('token', response.token)
                      localStorage.setItem('id', response.id)
                      navigate('/')
                  }
                  } catch (err) {
                      console.error(err)
                  } 
            }}>Submit</button>
        </Form>
        <ul>
            {error.map(error => {
                if (error === '') {
                    return <li key={uuidv4()} hidden></li>
                }
                else {
                    return <li key={uuidv4()}>
                        {error.msg}
                    </li>
                }
            })}
        </ul>
    </>
}
export default Login