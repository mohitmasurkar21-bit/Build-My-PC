export const commonProducts = [
    {
        name: 'Intel Core i3-12100',
        category: 'CPU',
        section: 'General',
        price: 10500,
        brand: 'Intel',
        stock: 25,
        image: '/uploads/GENERAL/Intel Core i3-12100.jpg',
        specs: {
            socket: 'LGA1700',
            cores: 4,
            threads: 8,
            baseClock: '3.3 GHz',
            boostClock: '4.3 GHz',
            tdp: 60,
            description: 'The Intel Core i3-12100 is a 12th Gen "Alder Lake" processor featuring 4 cores (4 performance cores) and 8 threads, designed for budget-friendly gaming and office PCs. Operating at 3.30 GHz base to 4.30 GHz boost with 12MB Smart Cache, it supports DDR5 (4800MHz) and DDR4 (3200MHz) memory, LGA1700 sockets, and integrated Intel UHD Graphics 730.'
        },
        rating: 4.5
    },
    {
        name: 'AMD Ryzen 5 5600',
        category: 'CPU',
        section: 'General',
        price: 15000,
        brand: 'AMD',
        stock: 30,
        image: '/uploads/GENERAL/AMD Ryzen 5 5600.jpg',
        specs: {
            socket: 'AM4',
            cores: 6,
            threads: 12,
            baseClock: '3.5 GHz',
            boostClock: '4.4 GHz',
            tdp: 65,
            description: 'The AMD Ryzen 5 5600 is a 6-core, 12-thread budget-friendly desktop processor based on the "Zen 3" architecture, operating on the AM4 socket. It features a 3.5GHz base clock (up to 4.4GHz boost), 35MB total cache, 65W TDP, and supports PCIe 4.0, making it an excellent, high-value choice for 1080p/1440p gaming.'
        },
        rating: 4.7
    },
    {
        name: 'Intel Core i5-13400',
        category: 'CPU',
        section: 'General',
        price: 22000,
        brand: 'Intel',
        stock: 20,
        image: '/uploads/GENERAL/Intel Core i5-13400.jpg',
        specs: {
            socket: 'LGA1700',
            cores: 10,
            threads: 16,
            baseClock: '2.5 GHz',
            boostClock: '4.6 GHz',
            tdp: 65,
            description: 'The Intel Core i5-13400 is a 13th Gen "Raptor Lake" desktop processor featuring 10 cores (6 Performance + 4 Efficient) and 16 threads, reaching up to 4.6 GHz. It uses the LGA 1700 socket and supports both DDR4/DDR5 RAM, making it a versatile, mid-range choice for gaming, content creation, and general productivity.'
        },
        rating: 4.8
    },
    {
        name: 'AMD Ryzen 7 7700X',
        category: 'CPU',
        section: 'General',
        price: 35000,
        brand: 'AMD',
        stock: 25,
        image: '/uploads/GENERAL/AMD Ryzen 7 7700X.jpg',
        specs: {
            socket: 'AM5',
            cores: 8,
            threads: 16,
            baseClock: '4.5 GHz',
            boostClock: '5.4 GHz',
            tdp: 105,
            description: 'The AMD Ryzen 7 7700X is a high-performance 8-core, 16-thread desktop processor based on the 5nm "Zen 4" architecture, operating at a 4.5GHz base clock and up to 5.4GHz boost. Designed for the AM5 socket, it features PCIe 5.0 and DDR5 support for gaming and content creation, with integrated Radeon graphics and no included cooler.'
        },
        rating: 4.8
    },
    {
        name: 'Intel Core i9-13900K',
        category: 'CPU',
        section: 'General',
        price: 58000,
        brand: 'Intel',
        stock: 10,
        image: '/uploads/GENERAL/Intel Core i9-13900K.jpg',
        specs: {
            socket: 'LGA1700',
            cores: 24,
            threads: 32,
            baseClock: '3.0 GHz',
            boostClock: '5.8 GHz',
            tdp: 125,
            description: 'The Intel Core i9-13900K is a top-tier 13th Gen Raptor Lake desktop processor featuring 24 cores (8 Performance, 16 Efficient) and 32 threads, designed for extreme gaming and content creation. It offers speeds up to 5.8 GHz via Thermal Velocity Boost, utilizes the LGA 1700 socket, and supports both DDR4/DDR5 RAM and PCIe 5.0/4.0.'
        },
        rating: 4.9
    },
    {
        name: 'NVIDIA RTX 3060',
        category: 'GPU',
        section: 'General',
        price: 32000,
        brand: 'NVIDIA',
        stock: 18,
        image: '/uploads/GENERAL/NVIDIA RTX 3060.jpg',
        specs: {
            vram: 12,
            description: 'The NVIDIA GeForce RTX 3060 is a versatile, mid-range graphics card based on the 2nd Gen Ampere architecture, featuring 12GB GDDR6 memory, 3584 CUDA cores, and 2nd-gen Ray Tracing cores. Designed for 1080p and 1440p gaming, it offers AI-driven DLSS, excellent Ray Tracing, and is ideal for content creation.'
        },
        rating: 4.7
    },
    {
        name: 'NVIDIA RTX 4070',
        category: 'GPU',
        section: 'General',
        price: 58000,
        brand: 'NVIDIA',
        stock: 15,
        image: '/uploads/GENERAL/NVIDIA RTX 4070.jpg',
        specs: {
            vram: 12,
            description: 'The NVIDIA GeForce RTX 4070 is a high-performance graphics card designed primarily for 1440p gaming, featuring the Ada Lovelace architecture, 12GB of GDDR6X VRAM, and support for DLSS 3 frame generation. It was launched in April 2023 as a power-efficient alternative to previous-generation cards, often compared to the RTX 3080 in performance while consuming significantly less power.'
        },
        rating: 4.8
    },
    {
        name: 'NVIDIA RTX 4090',
        category: 'GPU',
        section: 'General',
        price: 185000,
        brand: 'NVIDIA',
        stock: 5,
        image: '/uploads/GENERAL/NVIDIA RTX 4090.jpg',
        specs: {
            vram: 24,
            description: 'The NVIDIA GeForce RTX 4090 is a high-end, enthusiast-class graphics card released in October 2022, representing the flagship model of the RTX 40-series. Based on the Ada Lovelace architecture and a TSMC 4N process, it is designed for maximum performance in 4K/8K gaming, AI, and content creation, offering roughly double the performance of the RTX 3090 Ti while maintaining a similar power footprint.'
        },
        rating: 5.0
    },
    {
        name: 'ASUS Prime B450M-A',
        category: 'Motherboard',
        section: 'General',
        price: 10000,
        brand: 'ASUS',
        stock: 20,
        image: '/uploads/GENERAL/ASUS Prime B450M-A.jpg',
        specs: {
            socket: 'AM4',
            chipset: 'B450',
            ramType: 'DDR4',
            formFactor: 'Micro-ATX',
            description: 'The ASUS Prime B450M-A is a budget-friendly Micro-ATX AM4 motherboard designed for AMD Ryzen processors, featuring the B450 chipset, DDR4 support, M.2 slot, and Aura Sync RGB headers. It offers 5X Protection III hardware safeguards, Fan Xpert 2+ cooling, and USB 3.1 Gen 2 for reliable, efficient performance.'
        },
        rating: 4.3
    },
    {
        name: 'Gigabyte B760 Aorus Elite',
        category: 'Motherboard',
        section: 'General',
        price: 22000,
        brand: 'Gigabyte',
        stock: 15,
        image: '/uploads/GENERAL/Gigabyte B760 Aorus Elite.jpg',
        specs: {
            socket: 'LGA1700',
            chipset: 'B760',
            ramType: 'DDR5',
            formFactor: 'ATX',
            description: 'The Gigabyte B760 Aorus Elite is a high-performance, ATX-format motherboard designed for 12th, 13th, and 14th Gen Intel Core processors, utilizing the LGA 1700 socket and Intel B760 chipset. It is primarily targeted at gamers and power users seeking a robust, feature-rich, and durable platform, often featuring DDR5 memory support, advanced cooling, and fast networking.'
        },
        rating: 4.6
    },
    {
        name: 'AMD Ryzen 7 7800X3D',
        category: 'CPU',
        section: 'General',
        price: 42000,
        brand: 'AMD',
        stock: 12,
        image: '/uploads/GENERAL/AMD Ryzen 7 7800X3D.jpg',
        specs: {
            socket: 'AM5',
            cores: 8,
            threads: 16,
            description: 'The AMD Ryzen 7 7800X3D is a high-performance 8-core, 16-thread desktop processor specifically designed for elite gaming performance, utilizing AMD’s innovative 3D V-Cache™ technology. Released in early 2023, it sits on the AM5 socket and is widely considered the "undisputed king of gaming CPUs" due to its massive 96MB of L3 cache, which significantly boosts frame rates in cache-sensitive games.'
        },
        rating: 5.0
    },
    {
        name: 'G.Skill Trident Z5 RGB 64GB',
        category: 'RAM',
        section: 'General',
        price: 24000,
        brand: 'G.Skill',
        stock: 15,
        image: '/uploads/GENERAL/G.Skill Trident Z5 RGB 64GB.jpg',
        specs: {
            capacity: 64,
            ramType: 'DDR5',
            description: 'Trident Z5 RGB series DDR5 memory is the latest G.SKILL flagship memory kits designed for ultra-high extreme performance on next-gen DDR5 platforms. Featuring a sleeker and streamlined aluminum heatspreader design, available in metallic silver or matte black, the Trident Z5 RGB series DDR5 memory is the ideal choice for gamers, overclockers, content creators, and enthusiasts to build a high-performance system.'
        },
        rating: 4.9
    }
];
