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
        <div className="min-h-screen bg-[#0b0c10] text-[#f1f5f9] flex flex-col justify-between font-sans-clean">
            
            {/* Header Navbar */}
            <nav className="flex items-center justify-between px-6 lg:px-12 py-6 border-b border-white/10 bg-[#0b0c10]">
                <Link to="/" className="flex items-center gap-3.5 group">
                    <div className="relative w-9 h-9 rounded-xl bg-[#12141c] p-0.5 shadow-md animate-vault-glow group-hover:rotate-6 transition-transform border border-white/15">
                        <div className="w-full h-full bg-[#12141c] rounded-[10px] flex items-center justify-center text-white font-serif-luxury font-black text-xs">
                            <span className="text-[#d90429] font-sans-clean font-bold">A</span>V
                        </div>
                    </div>
                    <span className="font-sans-clean text-xl font-black tracking-tight text-white">
                        AUTO<span className="font-serif-luxury font-black italic text-[#d90429] animate-autovault-red">VAULT</span>
                    </span>
                </Link>

                <div className="flex items-center gap-4">
                    <Link to="/login" className="px-3 py-1.5 bg-red-950/50 text-[#d90429] border border-red-800/40 text-xs font-bold rounded-full hover:bg-[#d90429] hover:text-white transition uppercase tracking-wider">
                        🔑 Admin Login
                    </Link>
                    <Link to="/" className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/15 text-xs font-bold text-gray-300 hover:border-[#d90429] hover:text-white transition shadow-sm bg-white/5">
                        ← Back to Home
                    </Link>
                    <Link to="/login" className="hidden sm:inline-block text-xs font-bold text-gray-400 hover:text-[#d90429] transition uppercase tracking-wider">
                        Have an account? Sign In →
                    </Link>
                </div>
            </nav>

            {/* Main Auth Card Container */}
            <div className="flex-1 flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-md bg-[#141620] border border-white/10 p-8 sm:p-12 rounded-3xl shadow-2xl">
                    <div className="flex items-center justify-between mb-4">
                        <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-[#d90429] transition">
                            ← Back to Home
                        </Link>
                        <span className="text-[#d90429] text-xs font-bold uppercase tracking-widest">Get Started</span>
                    </div>
                    <h1 className="font-serif-luxury text-4xl sm:text-5xl font-black text-white mb-8 leading-tight">
                        Create <span className="italic font-normal text-[#d90429]">Account.</span>
                    </h1>

                    {error && (
                        <div className="mb-6 p-4 border border-red-800/40 bg-red-950/40 text-[#d90429] text-xs font-semibold rounded-2xl">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleRegister} className="space-y-6">
                        <div>
                            <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Full Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Suparsh Pandita"
                                required
                                className="w-full px-4 py-3 bg-[#0b0c10] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#d90429] focus:bg-[#141620] transition text-sm font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                                className="w-full px-4 py-3 bg-[#0b0c10] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#d90429] focus:bg-[#141620] transition text-sm font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="w-full px-4 py-3 bg-[#0b0c10] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#d90429] focus:bg-[#141620] transition text-sm font-medium"
                            />
                        </div>
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-[#d90429] text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-[#b8001f] transition shadow-lg hover:shadow-red-500/20 active:scale-95 disabled:opacity-50"
                            >
                                {loading ? 'Creating...' : 'Create Account →'}
                            </button>
                        </div>
                    </form>

                    <p className="text-center text-gray-400 mt-8 text-xs">
                        Already have an account?{' '}
                        <Link to="/login" className="text-[#d90429] font-bold hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>

            {/* Footer */}
            <div className="px-6 lg:px-12 py-6 border-t border-white/10 bg-[#0b0c10] text-center sm:text-left text-xs text-gray-500">
                <p>© 2026 AutoVault Automotive Gallery. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Register