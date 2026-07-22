import { useState, useEffect } from 'react'
import API from '../api/axios'
import Navbar from '../components/Navbar'
import VehicleForm from '../components/VehicleForm'

const AdminPanel = () => {
    const [vehicles, setVehicles] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [editingVehicle, setEditingVehicle] = useState(null)
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        fetchVehicles()
    }, [])

    const fetchVehicles = async () => {
        setLoading(true)
        try {
            const res = await API.get('/vehicles')
            setVehicles(res.data.vehicles)
        } catch (err) {
            setError('Failed to fetch inventory')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to remove this vehicle from inventory?')) return
        try {
            await API.delete(`/vehicles/${id}`)
            fetchVehicles()
        } catch (err) {
            alert('Failed to delete vehicle')
        }
    }

    const handleFormSuccess = () => {
        setShowForm(false)
        setEditingVehicle(null)
        fetchVehicles()
    }

    const totalVehicles = vehicles.reduce((sum, v) => sum + (v.quantity || 0), 0)
    const totalInventoryValue = vehicles.reduce((sum, v) => sum + ((v.price || 0) * (v.quantity || 0)), 0)

    return (
        <div className="min-h-screen bg-[#0b0c10] text-[#f1f5f9] font-sans-clean flex flex-col justify-between">
            <div>
                <Navbar />

                <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
                    
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 mb-10 gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/50 text-[#d90429] rounded-full text-xs font-bold uppercase tracking-widest mb-3 border border-red-800/30">
                                🔑 Admin Management Portal
                            </div>
                            <h1 className="font-serif-luxury text-5xl font-black text-white">
                                Stock <span className="italic font-normal text-[#d90429]">Control.</span>
                            </h1>
                        </div>

                        <button
                            onClick={() => { setEditingVehicle(null); setShowForm(!showForm); }}
                            className="px-6 py-3.5 bg-[#d90429] text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#b8001f] transition shadow-lg active:scale-95 self-start md:self-auto"
                        >
                            {showForm ? '✕ Close Form' : '+ Import New Vehicle'}
                        </button>
                    </div>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                        <div className="bg-[#141620] border border-white/10 p-6 rounded-3xl shadow-sm">
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Total Models Listed</p>
                            <p className="font-serif-luxury text-4xl font-bold text-white">{vehicles.length}</p>
                        </div>
                        <div className="bg-[#141620] border border-white/10 p-6 rounded-3xl shadow-sm">
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Available Units</p>
                            <p className="font-serif-luxury text-4xl font-bold text-[#d90429]">{totalVehicles}</p>
                        </div>
                        <div className="bg-[#141620] border border-white/10 p-6 rounded-3xl shadow-sm">
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Total Portfolio Value</p>
                            <p className="font-serif-luxury text-4xl font-bold text-emerald-400">₹{totalInventoryValue.toLocaleString()}</p>
                        </div>
                    </div>

                    {/* Form Modal / Section */}
                    {showForm && (
                        <div className="mb-12 animate-fade-up">
                            <VehicleForm
                                existingVehicle={editingVehicle}
                                onSuccess={handleFormSuccess}
                                onCancel={() => { setShowForm(false); setEditingVehicle(null); }}
                            />
                        </div>
                    )}

                    {/* Inventory Table */}
                    <div className="bg-[#141620] border border-white/10 rounded-3xl overflow-hidden shadow-xl">
                        <div className="px-8 py-6 border-b border-white/10 flex items-center justify-between">
                            <h2 className="font-serif-luxury text-2xl font-bold text-white">Inventory Directory</h2>
                            <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{vehicles.length} Records</span>
                        </div>

                        {loading ? (
                            <div className="py-20 text-center">
                                <div className="w-8 h-8 border-3 border-[#d90429] border-t-transparent rounded-full animate-spin mx-auto"></div>
                            </div>
                        ) : error ? (
                            <div className="p-8 text-center text-[#d90429] text-sm font-semibold">{error}</div>
                        ) : vehicles.length === 0 ? (
                            <div className="p-12 text-center text-gray-400 text-sm">No vehicles found. Click "+ Import New Vehicle" to add one.</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead className="bg-[#0b0c10] text-gray-400 uppercase tracking-wider border-b border-white/10 font-bold">
                                        <tr>
                                            <th className="px-8 py-4">Vehicle</th>
                                            <th className="px-6 py-4">Category</th>
                                            <th className="px-6 py-4">Year</th>
                                            <th className="px-6 py-4">Price</th>
                                            <th className="px-6 py-4">Stock</th>
                                            <th className="px-8 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/10">
                                        {vehicles.map((v) => (
                                            <tr key={v._id} className="hover:bg-[#0b0c10]/50 transition">
                                                <td className="px-8 py-5 font-bold text-white">
                                                    <span className="font-serif-luxury text-base block text-white">{v.make} {v.model}</span>
                                                    <span className="text-gray-400 font-normal text-[11px] truncate max-w-xs block">{v.description || 'No notes'}</span>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <span className="px-2.5 py-1 rounded-full bg-red-950/60 text-[#d90429] border border-red-800/30 font-bold uppercase tracking-wider text-[10px]">
                                                        {v.category}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5 font-semibold text-gray-300">{v.year}</td>
                                                <td className="px-6 py-5 font-bold font-serif-luxury text-base text-[#d90429]">₹{v.price?.toLocaleString()}</td>
                                                <td className="px-6 py-5 font-semibold">
                                                    <span className={v.quantity > 0 ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                                                        {v.quantity} units
                                                    </span>
                                                </td>
                                                <td className="px-8 py-5 text-right space-x-3">
                                                    <button
                                                        onClick={() => { setEditingVehicle(v); setShowForm(true); }}
                                                        className="px-3.5 py-1.5 rounded-full bg-white/10 text-white font-bold hover:bg-white hover:text-black transition"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(v._id)}
                                                        className="px-3.5 py-1.5 rounded-full bg-red-950/60 text-[#d90429] font-bold border border-red-800/30 hover:bg-[#d90429] hover:text-white transition"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-[#0b0c10] border-t border-white/10 px-6 lg:px-12 py-8 mt-20 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-2 font-sans-clean font-black text-white text-sm tracking-wider">
                    <span className="text-[#d90429]">⚡</span> AUTO<span className="font-serif-luxury italic text-[#d90429] animate-autovault-red">VAULT</span>
                </div>
                <p>© 2026 AutoVault Automotive Gallery. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default AdminPanel