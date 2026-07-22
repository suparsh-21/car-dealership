import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'

const Home = () => {
    const tyreRef = useRef(null)
    const [scrollY, setScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const tyre = tyreRef.current
        let position = -150
        let rotation = 0
        let animId

        const animate = () => {
            position += 1.2
            rotation += 2.5
            if (tyre) {
                tyre.style.transform = `translateX(${position}px) rotate(${rotation}deg)`
            }
            if (position > window.innerWidth + 150) {
                position = -150
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
                            <span className="w-2 h-2 rounded-full bg-[#d90429] animate-ping"></span>
                            <span className="text-[#d90429] font-bold text-xs uppercase tracking-widest">AUTOVAULT</span>
                            <span className="text-gray-600">•</span>
                            <span className="text-gray-300 text-xs font-medium">Premium Automotive Collection</span>
                        </div>

                        {/* Main Editorial Headline */}
                        <h1 className="font-serif-luxury text-6xl sm:text-7xl lg:text-8xl font-black text-white leading-[1.05] tracking-tight mb-6">
                            Drive Your <br />
                            <span className="italic font-normal text-[#d90429]">Dream Vehicle.</span>
                        </h1>

                        <p className="text-gray-400 text-sm sm:text-base max-w-md mb-10 leading-relaxed font-normal">
                            Authorized dealer for luxury and high-performance vehicles. Curated selection of certified sedans, coupes, SUVs, and supercars.
                        </p>

                        {/* Dual CTA Buttons */}
                        <div className="flex flex-wrap items-center gap-4 mb-12">
                            <Link 
                                to="/dashboard"
                                className="px-8 py-4 bg-[#d90429] text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#b8001f] transition shadow-xl hover:shadow-red-500/20 active:scale-95"
                            >
                                Browse Inventory →
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

                    {/* Right Column: Featured Red Supercar */}
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
                            className="bg-[#141620] border border-white/10 p-8 rounded-3xl hover:border-[#d90429] hover:shadow-2xl hover:shadow-red-950/30 transition-all duration-300 group cursor-pointer"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-red-950/40 text-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#d90429] transition-all border border-red-800/30">
                                {cat.icon}
                            </div>
                            <h3 className="font-serif-luxury font-bold text-xl text-white mb-2 group-hover:text-[#d90429] transition">
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
        </div>
    )
}

export default Home