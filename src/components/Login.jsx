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
        <Form className="h-screen w-8/12 mx-auto my-auto grid grid-rows-7 rounded-3xl bg-gray-600">
            <label className="self-end text-white ml-8 text-2xl" htmlFor="username">Username</label>
            <input className="h-10 row-span-2 bg-gray-400 ml-8 w-11/12 border-black border-4" id="username" type="text" value={user} onChange={e => {setUser(e.target.value)}} required/>
            <label className="self-end text-white ml-8 text-2xl" htmlFor="password">Password</label>
            <input className="h-10 row-span-2 bg-gray-400 ml-8 w-11/12 border-black border-4" id="password" type="text" value={pass} onChange={e => {setPass(e.target.value)}} required/>
            <button className="bg-gray-400 border-black border-4 rounded-2xl w-40 h-20 justify-self-center transition ease-in-out hover:scale-110" onClick={async (click) => {
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