const SearchBar = ({ filters, setFilters }) => {

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value })
    }

    const handleReset = () => {
        setFilters({ make: '', model: '', category: '', minPrice: '', maxPrice: '' })
    }

    return (
        <div className="bg-[#141620] border border-white/10 p-8 rounded-3xl mb-12 shadow-sm font-sans-clean">
            <div className="flex items-center justify-between mb-6">
                <p className="text-[#d90429] text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <span>🔍</span> Search & Filter Inventory
                </p>
                <button
                    onClick={handleReset}
                    className="text-xs text-gray-400 hover:text-[#d90429] transition uppercase tracking-wider font-semibold"
                >
                    ✕ Reset Filters
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div>
                    <label className="block text-gray-400 text-[11px] font-bold uppercase tracking-wider mb-2">Make</label>
                    <input
                        name="make"
                        value={filters.make}
                        onChange={handleChange}
                        placeholder="e.g. Porsche"
                        className="w-full px-4 py-2.5 bg-[#0b0c10] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#d90429] focus:bg-[#141620] transition text-xs font-medium"
                    />
                </div>
                <div>
                    <label className="block text-gray-400 text-[11px] font-bold uppercase tracking-wider mb-2">Model</label>
                    <input
                        name="model"
                        value={filters.model}
                        onChange={handleChange}
                        placeholder="e.g. 911 GT3"
                        className="w-full px-4 py-2.5 bg-[#0b0c10] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#d90429] focus:bg-[#141620] transition text-xs font-medium"
                    />
                </div>
                <div>
                    <label className="block text-gray-400 text-[11px] font-bold uppercase tracking-wider mb-2">Category</label>
                    <select
                        name="category"
                        value={filters.category}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-[#0b0c10] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#d90429] focus:bg-[#141620] transition text-xs font-medium"
                    >
                        <option value="">All Categories</option>
                        <option value="sedan">Sedan</option>
                        <option value="suv">SUV</option>
                        <option value="truck">Truck</option>
                        <option value="coupe">Coupe</option>
                        <option value="hatchback">Hatchback</option>
                        <option value="convertible">Convertible</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-400 text-[11px] font-bold uppercase tracking-wider mb-2">Min Price (₹)</label>
                    <input
                        name="minPrice"
                        value={filters.minPrice}
                        onChange={handleChange}
                        placeholder="0"
                        type="number"
                        className="w-full px-4 py-2.5 bg-[#0b0c10] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#d90429] focus:bg-[#141620] transition text-xs font-medium"
                    />
                </div>
                <div>
                    <label className="block text-gray-400 text-[11px] font-bold uppercase tracking-wider mb-2">Max Price (₹)</label>
                    <input
                        name="maxPrice"
                        value={filters.maxPrice}
                        onChange={handleChange}
                        placeholder="50,00,000"
                        type="number"
                        className="w-full px-4 py-2.5 bg-[#0b0c10] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#d90429] focus:bg-[#141620] transition text-xs font-medium"
                    />
                </div>
            </div>
        </div>
    )
}

export default SearchBar