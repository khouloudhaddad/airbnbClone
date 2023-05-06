import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"

const RegisterPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleRegister(event){
        event.preventDefault();
        axios.get("http://localhost:4000/test");
    }
    return (
        <>
            <div className="mt-8 grow flex items-center justify-center">
                <div className="-mt-64">
                    <h1 className="text-4xl text-center mb-4">Register</h1>
                    <form className="max-w-md mx-auto" onSubmit={handleRegister}>

                        <input type="text" placeholder="Name" 
                        value={name} 
                        onChange={event => setName(event.target.value)} 
                        />
                        <input type="email" placeholder="joe@doe.com"
                        value={email} 
                        onChange={event => setEmail(event.target.value)}
                         />
                        <input type="password" placeholder="password" 
                        value={password} 
                        onChange={event => setPassword(event.target.value)}
                        />

                        <button className="primary mt-2">Register</button>

                        <div className="text-center py-2 text-gray-500">Already have an account? <Link to="/login" className="underline text-black">Login now</Link></div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default RegisterPage