import { useState } from 'react'
import API from '../api/axios'

const VehicleForm = ({ existingVehicle, onSuccess, onCancel }) => {
    const [formData, setFormData] = useState({
        make: existingVehicle?.make || '',
        model: existingVehicle?.model || '',
        category: existingVehicle?.category || 'sedan',
        price: existingVehicle?.price || '',
        quantity: existingVehicle?.quantity || '',
        year: existingVehicle?.year || '',
        description: existingVehicle?.description || ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            if (existingVehicle) {
                await API.put(`/vehicles/${existingVehicle._id}`, formData)
            } else {
                await API.post('/vehicles', formData)
            }
            onSuccess()
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-[#141620] border border-white/10 rounded-3xl p-8 shadow-2xl font-sans-clean">
            <h2 className="font-serif-luxury text-3xl font-bold text-white mb-6">
                {existingVehicle ? '✏️ Edit Vehicle Record' : '➕ Import New Vehicle'}
            </h2>

            {error && (
                <div className="mb-6 p-4 rounded-2xl bg-red-950/40 border border-red-800/40 text-[#d90429] text-xs font-semibold">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Make</label>
                    <input
                        name="make"
                        value={formData.make}
                        onChange={handleChange}
                        placeholder="Porsche"
                        required
                        className="w-full px-4 py-3 bg-[#0b0c10] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#d90429] focus:bg-[#141620] transition text-xs font-medium"
                    />
                </div>

                <div>
                    <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Model</label>
                    <input
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        placeholder="911 Carrera"
                        required
                        className="w-full px-4 py-3 bg-[#0b0c10] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#d90429] focus:bg-[#141620] transition text-xs font-medium"
                    />
                </div>

                <div>
                    <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#0b0c10] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#d90429] focus:bg-[#141620] transition text-xs font-medium"
                    >
                        <option value="sedan">Sedan</option>
                        <option value="suv">SUV</option>
                        <option value="truck">Truck</option>
                        <option value="coupe">Coupe</option>
                        <option value="hatchback">Hatchback</option>
                        <option value="convertible">Convertible</option>
                    </select>
                </div>

                <div>
                    <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Year</label>
                    <input
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        placeholder="2024"
                        type="number"
                        required
                        className="w-full px-4 py-3 bg-[#0b0c10] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#d90429] focus:bg-[#141620] transition text-xs font-medium"
                    />
                </div>

                <div>
                    <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Price (₹)</label>
                    <input
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="1200000"
                        type="number"
                        required
                        className="w-full px-4 py-3 bg-[#0b0c10] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#d90429] focus:bg-[#141620] transition text-xs font-medium"
                    />
                </div>

                <div>
                    <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Quantity Stock</label>
                    <input
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        placeholder="5"
                        type="number"
                        required
                        className="w-full px-4 py-3 bg-[#0b0c10] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#d90429] focus:bg-[#141620] transition text-xs font-medium"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Import condition notes, grade, specs..."
                        className="w-full px-4 py-3 bg-[#0b0c10] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#d90429] focus:bg-[#141620] transition text-xs font-medium resize-none"
                    />
                </div>

                {/* Buttons */}
                <div className="md:col-span-2 flex gap-4 pt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 py-3.5 bg-[#d90429] text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#b8001f] transition shadow-lg active:scale-95 disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : existingVehicle ? 'Update Vehicle' : 'Save & Import Vehicle →'}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-3.5 bg-white/10 border border-white/10 text-gray-300 text-xs font-bold uppercase tracking-wider rounded-full hover:bg-white/20 transition"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default VehicleForm