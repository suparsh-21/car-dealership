import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import API from '../api/axios'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const { login } = useAuth()
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const res = await API.post('/auth/register', { name, email, password })
            login(res.data.user, res.data.token)
            navigate('/dashboard')
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f]">
            <div className="w-full max-w-md p-8 rounded-2xl bg-[#1a1a1a] border border-purple-900 shadow-xl shadow-purple-900/20">

                {/* header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        🚗 CarDealer
                    </h1>
                    <p className="text-gray-400 mt-2">Create your account</p>
                </div>

                {/* error message */}
                {error && (
                    <div className="mb-4 p-3 rounded-lg bg-red-900/30 border border-red-500 text-red-400 text-sm">
                        {error}
                    </div>
                )}

                {/* form */}
                <form onSubmit={handleRegister} className="space-y-5">
                    <div>
                        <label className="block text-gray-400 text-sm mb-1">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Suparsh Pandita"
                            required
                            className="w-full px-4 py-3 rounded-lg bg-[#0f0f0f] border border-gray-700 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-400 text-sm mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            className="w-full px-4 py-3 rounded-lg bg-[#0f0f0f] border border-gray-700 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-400 text-sm mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="w-full px-4 py-3 rounded-lg bg-[#0f0f0f] border border-gray-700 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:from-purple-700 hover:to-blue-700 transition disabled:opacity-50"
                    >
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                {/* login link */}
                <p className="text-center text-gray-500 mt-6 text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-purple-400 hover:text-purple-300">
                        Sign in here
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Register