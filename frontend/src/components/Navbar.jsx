import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <header className="sticky top-0 z-50 px-4 md:px-10 py-4 bg-[#0b0c10]/90 backdrop-blur-md border-b border-white/10 transition-all">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                
                {/* Brand Logo - Animated AutoVault Company Grade */}
                <Link to="/" className="flex items-center gap-3.5 group">
                    <div className="relative w-10 h-10 rounded-2xl bg-[#12141c] p-0.5 shadow-lg animate-vault-glow group-hover:rotate-6 transition-transform duration-300 border border-white/15">
                        <div className="w-full h-full bg-[#12141c] rounded-[14px] flex items-center justify-center text-white font-serif-luxury font-black text-lg group-hover:scale-95 transition-transform">
                            <span className="text-[#d90429] font-sans-clean font-bold">A</span>V
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#d90429] rounded-full border-2 border-[#0b0c10] animate-ping"></div>
                        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#d90429] rounded-full border-2 border-[#0b0c10]"></div>
                    </div>
                    <div>
                        <span className="font-sans-clean text-xl sm:text-2xl font-black tracking-tight text-white block leading-none">
                            AUTO<span className="font-serif-luxury font-black italic text-[#d90429] animate-autovault-red">VAULT</span>
                        </span>
                        <span className="font-sans-clean font-bold text-[9px] text-gray-400 tracking-[0.3em] block uppercase mt-1">
                            AUTOMOTIVE GALLERY
                        </span>
                    </div>
                </Link>

                {/* Navigation Links & Action Button */}
                <div className="flex items-center gap-4">
                    <Link to="/dashboard" className="hidden sm:inline-block text-xs uppercase tracking-wider font-semibold text-gray-300 hover:text-[#d90429] transition">
                        Inventory
                    </Link>

                    {user?.role === 'admin' && (
                        <Link
                            to="/admin"
                            className="px-3 py-1.5 text-xs font-semibold text-[#d90429] bg-red-950/40 rounded-full border border-red-800/40 hover:bg-red-900/60 transition uppercase tracking-wider"
                        >
                            Admin Panel
                        </Link>
                    )}

                    {user ? (
                        <div className="flex items-center gap-3">
                            <span className="hidden md:inline-block text-xs font-medium text-gray-300">
                                {user.name}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-white/10 text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#d90429] transition shadow-md border border-white/10"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link to="/login" className="px-4 py-2 text-xs font-bold text-gray-300 uppercase tracking-wider hover:text-white transition">
                                Sign In
                            </Link>
                            <Link
                                to="/register"
                                className="px-5 py-2.5 bg-[#d90429] text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#b8001f] transition shadow-lg hover:shadow-red-500/25 active:scale-95"
                            >
                                Explore Offer →
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Navbar