import { Link } from "react-router-dom"

const LoginPage = () => {
  return (
    <>
    <div className="mt-8 grow flex items-center justify-center">
        <div className="-mt-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto">

            <input type="email" placeholder="joe@doe.com" />
            <input type="password" placeholder="password" />

            <button className="primary mt-2">Login</button>

            <div className="text-center py-2 text-gray-500">Don't have an account yet? <Link to="/register" className="underline text-black">Register now</Link></div>
        </form>
        </div>
    </div>
    </>
  )
}

export default LoginPage