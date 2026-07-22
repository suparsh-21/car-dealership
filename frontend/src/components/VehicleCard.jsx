import { useState } from 'react'
import API from '../api/axios'
import { useAuth } from '../context/AuthContext'

const VehicleCard = ({ vehicle, onUpdate, onEdit }) => {
    const { user } = useAuth()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const isAdmin = user?.role === 'admin'

    const handlePurchase = async () => {
        setLoading(true)
        setMessage('')
        try {
            await API.post(`/vehicles/${vehicle._id}/purchase`)
            setMessage('Purchased successfully!')
            onUpdate()
        } catch (err) {
            setMessage(err.response?.data?.message || 'Purchase failed')
        } finally {
            setLoading(false)
        }
    }

    const handleModifyQuantity = async (delta) => {
        setLoading(true)
        setMessage('')
        try {
            const newQuantity = Math.max(0, (vehicle.quantity || 0) + delta)
            await API.put(`/vehicles/${vehicle._id}`, { quantity: newQuantity })
            setMessage(`Quantity updated to ${newQuantity}`)
            onUpdate()
        } catch (err) {
            setMessage(err.response?.data?.message || 'Failed to update quantity')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        if (!window.confirm(`Are you sure you want to delete ${vehicle.make} ${vehicle.model}?`)) return
        setLoading(true)
        setMessage('')
        try {
            await API.delete(`/vehicles/${vehicle._id}`)
            onUpdate()
        } catch (err) {
            setMessage(err.response?.data?.message || 'Failed to delete vehicle')
            setLoading(false)
        }
    }

    return (
        <div className="bg-[#141620] border border-white/10 p-6 rounded-3xl hover-glow-card animate-card-reveal flex flex-col justify-between group font-sans-clean relative overflow-hidden">
            {/* Card Glow Ambient Overlay */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-600/10 rounded-full blur-3xl pointer-events-none group-hover:bg-red-600/25 transition-all"></div>

            <div>
                {/* Custom Vehicle Image with Auto-Alignment & Fallback */}
                <div className="relative w-full h-52 bg-[#0b0c10] rounded-2xl overflow-hidden mb-6 flex items-center justify-center border border-white/10 group-hover:border-white/25 transition-all shadow-inner">
                    <img 
                        src={vehicle.imageUrl || 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80'}
                        alt={`${vehicle.make} ${vehicle.model}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141620] via-transparent to-transparent opacity-60"></div>
                    <div className="absolute top-3 right-3 px-3 py-1 bg-[#0b0c10]/90 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-wider text-[#d90429] shadow-md">
                        {vehicle.category || 'IMPORT'}
                    </div>
                </div>

                {/* Top Row: Year & Title */}
                <div className="mb-4">
                    <p className="text-[#d90429] text-xs font-bold uppercase tracking-widest mb-1">{vehicle.year} • CERTIFIED GRADE 5.0</p>
                    <h3 className="font-serif-luxury text-2xl font-bold text-white tracking-tight group-hover:text-[#d90429] transition">
                        {vehicle.make} {vehicle.model}
                    </h3>
                </div>

                {vehicle.description && (
                    <p className="text-gray-400 text-xs mb-5 line-clamp-2 leading-relaxed">{vehicle.description}</p>
                )}

                {/* Divider */}
                <div className="border-t border-white/10 my-4"></div>

                {/* Price and Stock */}
                <div className="flex items-end justify-between mb-6">
                    <div>
                        <p className="text-gray-400 text-[10px] uppercase tracking-wider font-semibold mb-0.5">Price</p>
                        <p className="font-serif-luxury text-3xl font-black text-[#d90429] tracking-tight">
                            ₹{vehicle.price?.toLocaleString()}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-white text-[11px] uppercase tracking-widest font-black mb-1">Stock</p>
                        <div className="flex items-center gap-2 justify-end">
                            {isAdmin && (
                                <button
                                    onClick={() => handleModifyQuantity(-1)}
                                    disabled={loading || vehicle.quantity === 0}
                                    title="Decrease stock quantity by 1"
                                    className="w-7 h-7 rounded-lg bg-white/15 text-white font-black text-sm flex items-center justify-center hover:bg-[#d90429] transition disabled:opacity-30 active:scale-95 shadow-md"
                                >
                                    -
                                </button>
                            )}
                            <span className={`text-sm font-black px-3.5 py-1.5 rounded-xl uppercase tracking-wider border-2 shadow-lg ${vehicle.quantity > 0 ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500 shadow-emerald-950/50' : 'bg-red-950/90 text-red-300 border-red-500 shadow-red-950/50'}`}>
                                {vehicle.quantity > 0 ? `${vehicle.quantity} Units` : 'Sold Out'}
                            </span>
                            {isAdmin && (
                                <button
                                    onClick={() => handleModifyQuantity(1)}
                                    disabled={loading}
                                    title="Increase stock quantity by 1"
                                    className="w-7 h-7 rounded-lg bg-white/15 text-white font-black text-sm flex items-center justify-center hover:bg-emerald-600 transition active:scale-95 shadow-md"
                                >
                                    +
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div>
                {message && (
                    <p className={`text-xs mb-3 font-semibold text-center ${message.includes('success') || message.includes('updated') ? 'text-emerald-400' : 'text-red-400'}`}>
                        {message}
                    </p>
                )}

                {/* Admin Actions vs Customer Purchase Button */}
                {isAdmin ? (
                    <div className="flex gap-2">
                        <button
                            onClick={() => onEdit && onEdit(vehicle)}
                            className="flex-1 py-3 bg-white/10 text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-white hover:text-black transition"
                        >
                            ✏️ Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={loading}
                            className="py-3 px-4 bg-red-950/60 text-[#d90429] border border-red-800/40 text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#d90429] hover:text-white transition disabled:opacity-50"
                        >
                            🗑️ Delete
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handlePurchase}
                        disabled={vehicle.quantity === 0 || loading}
                        className="w-full py-3.5 bg-[#d90429] text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#b8001f] transition shadow-md hover:shadow-red-500/20 disabled:bg-white/5 disabled:text-gray-600 disabled:cursor-not-allowed active:scale-95"
                    >
                        {loading ? 'Processing...' : vehicle.quantity === 0 ? 'Sold Out' : 'Purchase Vehicle →'}
                    </button>
                )}
            </div>
        </div>
    )
}

export default VehicleCard