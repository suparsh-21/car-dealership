import { useState, useEffect } from 'react'
import API from '../api/axios'
import Navbar from '../components/Navbar'
import VehicleCard from '../components/VehicleCard'
import SearchBar from '../components/SearchBar'
import VehicleForm from '../components/VehicleForm'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
    const { user } = useAuth()
    const [vehicles, setVehicles] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [showForm, setShowForm] = useState(false)
    const [editingVehicle, setEditingVehicle] = useState(null)
    const [filters, setFilters] = useState({
        make: '', model: '', category: '', minPrice: '', maxPrice: ''
    })

    const isAdmin = user?.role === 'admin'

    useEffect(() => {
        fetchVehicles()
    }, [filters])

    const fetchVehicles = async (silent = false) => {
        if (!silent) setLoading(true)
        setError('')
        try {
            const hasFilters = Object.values(filters).some(val => val !== '')
            let res
            if (hasFilters) {
                const params = new URLSearchParams()
                if (filters.make) params.append('make', filters.make)
                if (filters.model) params.append('model', filters.model)
                if (filters.category) params.append('category', filters.category)
                if (filters.minPrice) params.append('minPrice', filters.minPrice)
                if (filters.maxPrice) params.append('maxPrice', filters.maxPrice)
                res = await API.get(`/vehicles/search?${params.toString()}`)
            } else {
                res = await API.get('/vehicles')
            }
            setVehicles(res.data.vehicles)
        } catch (err) {
            setError('Failed to load vehicles')
        } finally {
            if (!silent) setLoading(false)
        }
    }

    const handleVehicleUpdate = (updatedVehicle) => {
        if (updatedVehicle && updatedVehicle._id) {
            setVehicles(prev => prev.map(v => v._id === updatedVehicle._id ? updatedVehicle : v))
        }
        fetchVehicles(true)
    }

    const handleFormSuccess = () => {
        setShowForm(false)
        setEditingVehicle(null)
        fetchVehicles()
    }

    const handleEditVehicle = (vehicle) => {
        setEditingVehicle(vehicle)
        setShowForm(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div className="min-h-screen bg-[#0b0c10] text-[#f1f5f9] font-sans-clean flex flex-col justify-between">
            <div>
                <Navbar />

                <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
                    
                    {/* Header Banner */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 mb-10 gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/50 text-[#d90429] rounded-full text-xs font-bold uppercase tracking-widest mb-3 border border-red-800/30">
                                {isAdmin ? '🔑 Admin Live Control Portal' : '🏎️ Curated Inventory'}
                            </div>
                            <h1 className="font-serif-luxury text-5xl font-black text-white">
                                Available <span className="italic font-normal text-[#d90429]">Vehicles.</span>
                            </h1>
                        </div>

                        <div className="flex items-center gap-4">
                            {isAdmin && (
                                <button
                                    onClick={() => { setEditingVehicle(null); setShowForm(!showForm); }}
                                    className="px-6 py-3 bg-[#d90429] text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#b8001f] transition shadow-lg active:scale-95"
                                >
                                    {showForm ? '✕ Close Form' : '+ Import New Vehicle'}
                                </button>
                            )}
                            <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider hidden sm:block">
                                Showing <span className="text-white font-bold">{vehicles.length}</span> Verified Models
                            </div>
                        </div>
                    </div>

                    {/* Admin Add/Edit Form Modal */}
                    {isAdmin && showForm && (
                        <div className="mb-12 animate-fade-up">
                            <VehicleForm
                                existingVehicle={editingVehicle}
                                onSuccess={handleFormSuccess}
                                onCancel={() => { setShowForm(false); setEditingVehicle(null); }}
                            />
                        </div>
                    )}

                    {/* Filter Component */}
                    <SearchBar filters={filters} setFilters={setFilters} />

                    {/* Main Vehicles Grid / Loading / Error / Empty States */}
                    {loading ? (
                        <div className="py-24 text-center">
                            <div className="w-10 h-10 border-4 border-[#d90429] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">Loading AutoVault Inventory...</p>
                        </div>
                    ) : error ? (
                        <div className="p-8 text-center bg-red-950/30 border border-red-800/40 text-[#d90429] text-sm font-semibold rounded-3xl max-w-lg mx-auto">
                            {error}
                        </div>
                    ) : vehicles.length === 0 ? (
                        <div className="p-16 text-center bg-[#141620] border border-white/10 rounded-3xl max-w-lg mx-auto shadow-2xl">
                            <p className="text-4xl mb-4">🔍</p>
                            <p className="font-serif-luxury text-xl font-bold text-white mb-2">No Vehicles Match Your Search</p>
                            <p className="text-gray-400 text-xs mb-6">Try adjusting your filters or search keywords to explore more models.</p>
                            {isAdmin && (
                                <button
                                    onClick={() => { setEditingVehicle(null); setShowForm(true); }}
                                    className="px-6 py-3 bg-[#d90429] text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#b8001f] transition"
                                >
                                    + Add First Vehicle
                                </button>
                            )}
                        </div>
                    ) : (
                        <div>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-6">
                                Showing {vehicles.length} certified vehicle{vehicles.length !== 1 ? 's' : ''}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {vehicles.map((vehicle) => (
                                    <VehicleCard 
                                        key={vehicle._id} 
                                        vehicle={vehicle} 
                                        onUpdate={handleVehicleUpdate} 
                                        onEdit={handleEditVehicle}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

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

export default Dashboard