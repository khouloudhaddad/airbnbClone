import { useContext, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import axios from 'axios'
import { UserContext } from "../components/UserContect"

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState('')

    const {setUser} = useContext(UserContext)
    async function handleLogin(e) {
        e.preventDefault()
        try {
            const {data} = await axios.post('/login', { email, password }, { withCredentials: true });
            setUser(data);

            alert('loggedIn sucessfully');

            setRedirect(true);
        } catch (e) {
            console.log(e)
            alert('login failed')
        }

    }

    if (redirect) {
        return <Navigate to='/' />
    }

    return (
        <>
            <div className="mt-8 grow flex items-center justify-center">
                <div className="-mt-64">
                    <h1 className="text-4xl text-center mb-4">Login</h1>
                    <form className="max-w-md mx-auto" onSubmit={handleLogin}>

                        <input type="email" placeholder="joe@doe.com"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                        />
                        <input type="password" placeholder="password"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                        />

                        <button className="primary mt-2">Login</button>

                        <div className="text-center py-2 text-gray-500">Don't have an account yet? <Link to="/register" className="underline text-black">Register now</Link></div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginPage