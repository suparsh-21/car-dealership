const Vehicle = require('../models/Vehicle')

const defaultVehicles = [
    // ₹14 - ₹20 Lakh Segment
    {
        make: 'Tata',
        model: 'Nexon EV Max',
        category: 'suv',
        year: 2024,
        price: 1450000,
        quantity: 10,
        description: '40.5 kWh battery, 453 km range, high-tech electric compact SUV.',
        imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80'
    },
    {
        make: 'Hyundai',
        model: 'Verna 1.5 Turbo',
        category: 'sedan',
        year: 2024,
        price: 1780000,
        quantity: 10,
        description: '160 PS Turbo GDi petrol engine with ADAS Level 2 safety suite.',
        imageUrl: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80'
    },
    {
        make: 'Honda',
        model: 'City e:HEV Hybrid',
        category: 'sedan',
        year: 2024,
        price: 1950000,
        quantity: 10,
        description: 'Self-charging strong hybrid electric sedan delivering 27.1 km/l efficiency.',
        imageUrl: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=800&q=80'
    },
    {
        make: 'Mahindra',
        model: 'Thar LX 4x4',
        category: 'suv',
        year: 2024,
        price: 1680000,
        quantity: 10,
        description: '2.0L mStallion TGDi Turbo petrol 4x4 with convertible hardtop.',
        imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80'
    },
    {
        make: 'Volkswagen',
        model: 'Virtus GT 1.5 TSI',
        category: 'sedan',
        year: 2024,
        price: 1920000,
        quantity: 10,
        description: '150 PS TSI engine with 7-speed DSG transmission and 5-star GNCAP safety.',
        imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80'
    },

    // ₹25 - ₹36 Lakh Segment
    {
        make: 'Mahindra',
        model: 'XUV700 AX7 Luxury',
        category: 'suv',
        year: 2024,
        price: 2550000,
        quantity: 10,
        description: '200 PS mStallion Turbo, dual 10.25-inch displays, AWD and ADAS.',
        imageUrl: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80'
    },
    {
        make: 'Toyota',
        model: 'Innova Hycross Hybrid',
        category: 'suv',
        year: 2024,
        price: 3050000,
        quantity: 10,
        description: '2.0L Strong Hybrid TNGA architecture with Ottoman lounge seats.',
        imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80'
    },
    {
        make: 'Skoda',
        model: 'Octavia RS 245',
        category: 'sedan',
        year: 2023,
        price: 3600000,
        quantity: 10,
        description: '245 HP TSI performance sedan with Virtual Cockpit and VAQ differential.',
        imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80'
    },

    // ₹58 - ₹68 Lakh Segment
    {
        make: 'BMW',
        model: '3 Series 330Li',
        category: 'sedan',
        year: 2024,
        price: 5800000,
        quantity: 10,
        description: 'Long-wheelbase executive luxury sedan with 258 HP TwinPower Turbo.',
        imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80'
    },
    {
        make: 'Mercedes-Benz',
        model: 'C-Class C300 d',
        category: 'sedan',
        year: 2024,
        price: 6100000,
        quantity: 10,
        description: '265 HP mild-hybrid diesel with Burmester 3D surround sound.',
        imageUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80'
    },
    {
        make: 'Audi',
        model: 'Q5 45 TFSI',
        category: 'suv',
        year: 2024,
        price: 6500000,
        quantity: 10,
        description: '249 HP 2.0L TFSI Quattro AWD with Matrix LED headlights.',
        imageUrl: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80'
    },
    {
        make: 'Volvo',
        model: 'XC60 B5 Mild Hybrid',
        category: 'suv',
        year: 2024,
        price: 6800000,
        quantity: 10,
        description: '250 HP Google built-in mild-hybrid SUV with Bowers & Wilkins audio.',
        imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80'
    },

    // ₹85 Lakh - ₹1.5 Crore Segment
    {
        make: 'Toyota',
        model: 'GR Supra 3.0',
        category: 'coupe',
        year: 2024,
        price: 8500000,
        quantity: 10,
        description: '382 HP 3.0L Inline-6 Twin-Scroll Turbo sports coupe.',
        imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80'
    },
    {
        make: 'Land Rover',
        model: 'Defender 110 P400',
        category: 'suv',
        year: 2024,
        price: 12500000,
        quantity: 10,
        description: '400 HP 3.0L MHEV 6-cylinder AWD off-road icon.',
        imageUrl: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80'
    },
    {
        make: 'BMW',
        model: 'M4 Competition xDrive',
        category: 'coupe',
        year: 2024,
        price: 14800000,
        quantity: 10,
        description: '510 HP M TwinPower Turbo inline-6 with M xDrive AWD.',
        imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80'
    },
    {
        make: 'Porsche',
        model: 'Macan GTS',
        category: 'suv',
        year: 2024,
        price: 15000000,
        quantity: 10,
        description: '440 HP 2.9L Twin-Turbo V8 high performance SUV.',
        imageUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80'
    },

    // ₹2.15 Crore - ₹4.02 Crore Supercar Segment
    {
        make: 'Nissan',
        model: 'GT-R Nismo',
        category: 'coupe',
        year: 2024,
        price: 21500000,
        quantity: 10,
        description: '600 HP VR38DETT Twin-Turbo V6 carbon track supercar.',
        imageUrl: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=800&q=80'
    },
    {
        make: 'Mercedes-Benz',
        model: 'AMG GT 63 S 4-Door',
        category: 'sedan',
        year: 2023,
        price: 27000000,
        quantity: 10,
        description: '639 HP 4.0L V8 Biturbo executive supercar.',
        imageUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80'
    },
    {
        make: 'Porsche',
        model: '911 GT3 RS',
        category: 'coupe',
        year: 2024,
        price: 35000000,
        quantity: 10,
        description: '525 HP naturally aspirated flat-six track weapon.',
        imageUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80'
    },
    {
        make: 'Ferrari',
        model: 'F8 Tributo',
        category: 'convertible',
        year: 2024,
        price: 40200000,
        quantity: 10,
        description: '710 HP 3.9L Twin-Turbo V8 Italian supercar.',
        imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80'
    }
]

const seedVehicles = async () => {
    try {
        for (const item of defaultVehicles) {
            const existing = await Vehicle.findOne({ make: item.make, model: item.model })
            if (!existing) {
                await Vehicle.create(item)
                console.log(`🏎️ Seeded default vehicle: ${item.make} ${item.model} (Qty: ${item.quantity})`)
            } else {
                existing.quantity = Math.max(10, existing.quantity || 10)
                existing.imageUrl = item.imageUrl
                await existing.save()
                console.log(`🏎️ Updated vehicle stock & image: ${item.make} ${item.model} (Qty: ${existing.quantity})`)
            }
        }
    } catch (error) {
        console.error('Error seeding vehicles:', error.message)
    }
}

module.exports = seedVehicles
