import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'

const Home = () => {
    const tyreRef = useRef(null)
    const [showSignInPrompt, setShowSignInPrompt] = useState(false)
    const [scrollY, setScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const tyre = tyreRef.current
        let position = -180
        let rotation = 0
        let animId

        const animate = () => {
            position += 6.5
            rotation += 15.0
            
            if (tyre) {
                tyre.style.transform = `translateX(${position}px) rotate(${rotation}deg)`
            }

            // When tyre reaches near the right edge of the screen, automatically trigger sign-in prompt!
            if (position >= window.innerWidth - 220 && !showSignInPrompt) {
                setShowSignInPrompt(true)
            }

            if (position > window.innerWidth + 200) {
                position = -180
                rotation = 0
            }
            
            animId = requestAnimationFrame(animate)
        }

        animId = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animId)
    }, [])

    return (
        <div className="min-h-screen bg-[#0b0c10] text-[#f1f5f9] flex flex-col font-sans-clean">
            
            {/* Top Navigation */}
            <Navbar />

            {/* Hero Section */}
            <section className="relative min-h-[85vh] flex items-center overflow-hidden px-6 lg:px-12 py-12">
                
                {/* Background ambient lighting */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-red-600/15 rounded-full blur-[140px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                    
                    {/* Left Column: Editorial Content */}
                    <div className="lg:col-span-6 animate-fade-up">
                        
                        {/* Tagline Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#141620] border border-white/10 rounded-full shadow-sm mb-6 animate-vault-glow">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#d90429] animate-ping"></span>
                            <span className="text-[#d90429] font-black text-xs uppercase tracking-widest animate-autovault-red">AUTOVAULT</span>
                            <span className="text-gray-600">•</span>
                            <span className="text-gray-300 text-xs font-medium">Engineering & Mobility Science</span>
                        </div>

                        {/* Main Editorial Headline with Animated App Name */}
                        <h1 className="font-serif-luxury text-6xl sm:text-7xl lg:text-8xl font-black text-white leading-[1.05] tracking-tight mb-6">
                            We Advance <br />
                            <span className="font-sans-clean font-black tracking-tight text-white inline-block">
                                AUTO<span className="font-serif-luxury font-black italic text-[#d90429] animate-autovault-red">VAULT</span>
                            </span> <br />
                            <span className="italic font-normal text-[#d90429]">Mobility.</span>
                        </h1>

                        <p className="text-gray-400 text-sm sm:text-base max-w-md mb-10 leading-relaxed font-normal">
                            We advance automotive engineering through design, performance architecture, and material science. Discover certified luxury vehicles.
                        </p>

                        {/* Dual CTA Buttons */}
                        <div className="flex flex-wrap items-center gap-4 mb-12">
                            <Link 
                                to="/dashboard"
                                className="px-8 py-4 bg-[#d90429] text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#b8001f] transition shadow-xl hover:shadow-red-500/20 active:scale-95 flex items-center gap-2"
                            >
                                <span>Browse Inventory</span>
                                <span className="text-base leading-none">→</span>
                            </Link>
                            <Link 
                                to="/register"
                                className="px-8 py-4 bg-white/5 border border-white/20 text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-white hover:text-black transition shadow-sm"
                            >
                                Get Started
                            </Link>
                        </div>

                        {/* Social / Direct Contacts Bar */}
                        <div className="flex items-center gap-6 pt-6 border-t border-white/10">
                            <div>
                                <p className="text-2xl font-bold font-serif-luxury text-white">500+</p>
                                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Available Stock</p>
                            </div>
                            <div className="h-8 w-px bg-white/10"></div>
                            <div>
                                <p className="text-2xl font-bold font-serif-luxury text-white">100%</p>
                                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Certified Inspection</p>
                            </div>
                            <div className="h-8 w-px bg-white/10"></div>
                            <div>
                                <p className="text-2xl font-bold font-serif-luxury text-white">4.9★</p>
                                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Customer Rating</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Featured Supercar */}
                    <div className="lg:col-span-6 relative flex items-center justify-center">
                        
                        {/* Floating Certificate Badge */}
                        <div className="absolute -top-4 right-4 sm:right-10 z-20 bg-[#141620]/90 backdrop-blur-md border border-white/15 p-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-car-float">
                            <div className="w-10 h-10 rounded-full bg-red-950/60 text-[#d90429] flex items-center justify-center font-bold text-lg border border-red-800/30">
                                🏎️
                            </div>
                            <div>
                                <p className="text-xs font-bold text-white uppercase tracking-wider">Premium Grade 5.0</p>
                                <p className="text-[11px] text-gray-400">Verified Quality Inspection</p>
                            </div>
                        </div>

                        {/* Main Car Showcase Container */}
                        <div className="relative w-full max-w-xl animate-car-float">
                            
                            {/* Realistic Car Image */}
                            <img 
                                src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80"
                                alt="AutoVault Supercar"
                                className="w-full h-auto object-contain rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-700"
                            />

                            {/* Soft Ground Reflection Overlay */}
                            <div className="w-4/5 h-6 bg-red-950/40 rounded-full mx-auto blur-md -mt-4"></div>
                        </div>

                        {/* Floating Specs Pill */}
                        <div className="absolute -bottom-6 left-4 sm:left-8 z-20 bg-[#141620] border border-white/15 px-5 py-3 rounded-full shadow-xl flex items-center gap-4">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#d90429] animate-pulse"></span>
                            <span className="text-xs font-bold text-white uppercase tracking-wider">Ferrari F8 Tributo • 2024</span>
                            <span className="text-xs font-semibold text-[#d90429] bg-red-950/60 px-2.5 py-1 rounded-full border border-red-800/30">Available</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Rolling Category Marquee Banner */}
            <div className="relative border-y border-white/10 bg-[#0e1017] overflow-hidden py-4">
                <div className="flex gap-12 animate-marquee whitespace-nowrap">
                    {['PREMIUM INVENTORY', 'CERTIFIED SUPER VEHICLES', 'PORSCHE', 'FERRARI', 'NISSAN GT-R', 'TOYOTA SUPRA', 'BMW M POWER', 'MERCEDES AMG', 'PREMIUM INVENTORY', 'CERTIFIED SUPER VEHICLES'].map((cat, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <span className="text-[#d90429] text-xs font-bold">⚡</span>
                            <span className="text-xs uppercase tracking-[0.25em] font-bold text-gray-300">{cat}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 🏎️ DYNAMIC SCROLL SHOWCASE: Featured Supercar Cards */}
            <section className="px-6 lg:px-12 py-24 max-w-7xl mx-auto w-full relative">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#141620] border border-white/10 rounded-full mb-3">
                            <span className="w-2 h-2 rounded-full bg-[#d90429] animate-pulse"></span>
                            <span className="text-[#d90429] font-bold text-[11px] uppercase tracking-widest">CURATED VAULT SELECTION</span>
                        </div>
                        <h2 className="font-serif-luxury text-4xl sm:text-5xl font-black text-white tracking-tight">
                            Featured Certified Supercars.
                        </h2>
                    </div>
                    <Link
                        to="/dashboard"
                        className="px-6 py-3 bg-white/5 border border-white/15 text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#d90429] hover:border-[#d90429] transition shadow-lg shrink-0 self-start md:self-auto"
                    >
                        Explore Entire Vault (500+) →
                    </Link>
                </div>

                {/* 3D Dynamic Card Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
                    {[
                        {
                            name: 'Porsche 911 GT3 RS',
                            category: 'Coupe',
                            year: 2024,
                            price: '₹3,50,00,000',
                            hp: '525 HP',
                            acc: '3.2s (0-100)',
                            topSpeed: '296 km/h',
                            img: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80',
                            badge: 'LIMITED EDITION'
                        },
                        {
                            name: 'Ferrari F8 Tributo',
                            category: 'Supercar',
                            year: 2024,
                            price: '₹4,02,00,000',
                            hp: '710 HP',
                            acc: '2.9s (0-100)',
                            topSpeed: '340 km/h',
                            img: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80',
                            badge: 'GRADE 5.0 A+'
                        },
                        {
                            name: 'Mercedes-AMG GT 63 S',
                            category: 'Sedan',
                            year: 2023,
                            price: '₹2,70,00,000',
                            hp: '639 HP',
                            acc: '3.2s (0-100)',
                            topSpeed: '315 km/h',
                            img: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
                            badge: 'V8 BITURBO'
                        }
                    ].map((car, idx) => (
                        <div
                            key={car.name}
                            style={{ animationDelay: `${idx * 0.15}s` }}
                            className="bg-[#141620] border border-white/10 rounded-3xl p-6 hover-glow-card flex flex-col justify-between group cursor-pointer relative overflow-hidden"
                        >
                            {/* Card Glow Ambient Overlay */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-600/10 rounded-full blur-3xl pointer-events-none group-hover:bg-red-600/25 transition-all"></div>

                            <div>
                                {/* Vehicle Card Image with Auto-Alignment & Hover Zoom */}
                                <div className="relative w-full h-56 bg-[#0b0c10] rounded-2xl overflow-hidden mb-6 border border-white/10 shadow-inner">
                                    <img
                                        src={car.img}
                                        alt={car.name}
                                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#141620] via-transparent to-transparent opacity-70"></div>
                                    
                                    {/* Category Pill */}
                                    <div className="absolute top-3 left-3 px-3 py-1 bg-black/80 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-wider text-white">
                                        {car.category} • {car.year}
                                    </div>
                                    
                                    {/* Special Grade Badge */}
                                    <div className="absolute top-3 right-3 px-3 py-1 bg-[#d90429] rounded-full text-[9px] font-black uppercase tracking-widest text-white shadow-lg">
                                        {car.badge}
                                    </div>
                                </div>

                                {/* Vehicle Header */}
                                <h3 className="font-serif-luxury font-black text-2xl text-white mb-2 group-hover:text-[#d90429] transition-colors leading-tight">
                                    {car.name}
                                </h3>

                                {/* Dynamic Performance Specs Pills */}
                                <div className="flex flex-wrap items-center gap-2 mb-6">
                                    <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-gray-300">
                                        ⚡ {car.hp}
                                    </span>
                                    <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-gray-300">
                                        ⏱️ {car.acc}
                                    </span>
                                    <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-gray-300">
                                        🏁 {car.topSpeed}
                                    </span>
                                </div>
                            </div>

                            {/* Card Footer: Price & CTA */}
                            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-[10px] uppercase font-semibold tracking-wider mb-0.5">Price</p>
                                    <p className="font-serif-luxury text-2xl font-black text-[#d90429] tracking-tight">
                                        {car.price}
                                    </p>
                                </div>
                                <Link
                                    to="/dashboard"
                                    className="px-5 py-2.5 bg-[#d90429] text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#b8001f] transition shadow-md active:scale-95 group-hover:px-6"
                                >
                                    Inspect →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Category Cards Section */}
            <section className="px-6 lg:px-12 py-20 max-w-7xl mx-auto w-full">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <p className="text-[#d90429] text-xs font-bold uppercase tracking-widest mb-3">Our Offerings</p>
                    <h2 className="font-serif-luxury text-4xl sm:text-5xl font-black text-white tracking-tight">
                        Browse by Category.
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { name: 'Coupe & Sports', icon: '🏎️', desc: 'High performance sports models and GT icons.' },
                        { name: 'Luxury Sedans', icon: '🚗', desc: 'Ultra-smooth comfort for executive travel.' },
                        { name: 'SUVs & All-Terrain', icon: '🚙', desc: 'Powerful 4x4 vehicles built for any journey.' },
                        { name: 'Supercars', icon: '🏁', desc: 'Exotic imports certified with full service history.' },
                        { name: 'Hatchback & City', icon: '🚘', desc: 'Compact, high-efficiency daily drivers.' },
                        { name: 'Convertibles', icon: '🏎️', desc: 'Open-top freedom for coastal drives.' },
                    ].map((cat) => (
                        <div 
                            key={cat.name}
                            className="bg-[#141620] border border-white/10 p-8 rounded-3xl hover-glow-card group cursor-pointer relative overflow-hidden"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-red-950/40 text-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#d90429] transition-all border border-red-800/30">
                                {cat.icon}
                            </div>
                            <h3 className="font-serif-luxury font-bold text-2xl text-white mb-2 group-hover:text-[#d90429] transition">
                                {cat.name}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{cat.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-6 lg:px-12 py-16 bg-[#141620] border-y border-white/10 text-white">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <span className="text-[#d90429] text-xs font-bold uppercase tracking-widest block mb-2">Ready to order?</span>
                        <h2 className="font-serif-luxury text-4xl font-bold">Find your dream car today.</h2>
                        <p className="text-gray-400 text-sm mt-2 max-w-md">Browse our verified stock or contact our automotive specialists directly.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link 
                            to="/dashboard"
                            className="px-8 py-4 bg-[#d90429] text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#b8001f] transition shadow-lg"
                        >
                            Browse Inventory →
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#0b0c10] border-t border-white/10 px-6 lg:px-12 py-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-2 font-sans-clean font-black text-white text-sm tracking-wider">
                    <span className="text-[#d90429]">⚡</span> AUTO<span className="font-serif-luxury italic text-[#d90429] animate-autovault-red">VAULT</span>
                </div>
                <p>© 2026 AutoVault Automotive Gallery. All rights reserved.</p>
            </footer>

            {/* 🏎️ Background Floating Rolling Car Tyre */}
            <div className="fixed top-1/3 left-0 z-0 pointer-events-none opacity-30 select-none overflow-hidden w-full">
                <div ref={tyreRef} className="relative w-28 h-28 rounded-full bg-black border-4 border-gray-700 shadow-2xl flex items-center justify-center p-2">
                    <div className="w-full h-full rounded-full border-4 border-dashed border-gray-600 bg-[#141620] flex items-center justify-center relative">
                        <div className="w-9 h-9 rounded-full border-2 border-[#d90429] bg-black flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-[#d90429]"></div>
                        </div>
                        <div className="absolute w-full h-1 bg-gray-500 rotate-0"></div>
                        <div className="absolute w-full h-1 bg-gray-500 rotate-45"></div>
                        <div className="absolute w-full h-1 bg-gray-500 rotate-90"></div>
                        <div className="absolute w-full h-1 bg-gray-500 rotate-[135deg]"></div>
                    </div>
                </div>
            </div>

            {/* 🔔 Automatic "Sign in to check for best cars" Floating Prompt */}
            {showSignInPrompt && (
                <div className="fixed bottom-6 right-6 z-50 animate-fade-up max-w-sm bg-[#141620]/95 backdrop-blur-xl border border-red-800/40 p-5 rounded-3xl shadow-2xl shadow-red-950/40 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-red-950/60 text-[#d90429] flex items-center justify-center text-xl font-bold border border-red-800/40 shrink-0 animate-bounce">
                        🏎️
                    </div>
                    <div>
                        <span className="text-[10px] font-bold text-[#d90429] uppercase tracking-widest block mb-0.5 animate-autovault-red">
                            ⚡ AUTOVAULT INVITATION
                        </span>
                        <h4 className="font-serif-luxury text-sm font-bold text-white leading-snug">
                            Sign in to check for best cars!
                        </h4>
                        <div className="flex items-center gap-2 mt-3">
                            <Link 
                                to="/login"
                                className="px-4 py-2 bg-[#d90429] text-white text-[11px] font-bold uppercase tracking-wider rounded-full hover:bg-[#b8001f] transition shadow-md"
                            >
                                Sign In Now →
                            </Link>
                            <button
                                onClick={() => setShowSignInPrompt(false)}
                                className="text-[11px] text-gray-400 font-semibold hover:text-white px-2 py-1"
                            >
                                Dismiss
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Home