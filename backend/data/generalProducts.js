export const generalProducts = [
    {
        name: 'Intel Core i5-12400',
        category: 'CPU',
        section: 'General',
        price: 15500,
        brand: 'Intel',
        stock: 20,
        image: '/uploads/GENERAL/Intel Core i5-12400.jpg',
        specs: {
            socket: 'LGA1700',
            cores: 6,
            threads: 12,
            baseClock: '2.5 GHz',
            boostClock: '4.4 GHz',
            tdp: 65,
            description: 'Excellent single-core performance and efficient multitasking for general computing.'
        },
        rating: 4.7
    },
    {
        name: 'AMD Ryzen 5 7600',
        category: 'CPU',
        section: 'General',
        price: 19000,
        brand: 'AMD',
        stock: 15,
        image: '/uploads/GENERAL/AMD Ryzen 5 7600.jpg',
        specs: {
            socket: 'AM5',
            cores: 6,
            threads: 12,
            baseClock: '3.8 GHz',
            boostClock: '5.1 GHz',
            tdp: 65,
            description: 'Next-generation AM5 performance for everyday users.'
        },
        rating: 4.6
    },
    {
        name: 'AMD Ryzen Threadripper 3960X',
        category: 'CPU',
        section: 'General',
        price: 125000,
        brand: 'AMD',
        stock: 5,
        image: '/uploads/GENERAL/AMD Ryzen Threadripper 3960X.jpg',
        specs: {
            socket: 'sTRX4',
            cores: 24,
            threads: 48,
            baseClock: '3.8 GHz',
            boostClock: '4.5 GHz',
            tdp: 280,
            description: 'The AMD Ryzen Threadripper 3960X is a high-end desktop (HEDT) processor from the 3rd Gen Ryzen family, featuring 24 cores and 48 threads based on the 7nm Zen 2 architecture. Designed for workstations, it offers a 3.8 GHz base clock, 4.5 GHz boost clock, 128MB L3 cache, and 280W TDP. It requires the TRX40 chipset (sTRX4 socket) and supports PCIe 4.0.'
        },
        rating: 4.9
    },
    {
        name: 'NVIDIA RTX 3050',
        category: 'GPU',
        section: 'General',
        price: 21000,
        brand: 'NVIDIA',
        stock: 25,
        image: '/uploads/GENERAL/NVIDIA RTX 3050.jpg',
        specs: {
            vram: 8,
            description: 'Step into the world of ray tracing and AI-accelerated performance.'
        },
        rating: 4.5
    },
    {
        name: 'NVIDIA GTX 1650',
        category: 'GPU',
        section: 'General',
        price: 14500,
        brand: 'NVIDIA',
        stock: 30,
        image: '/uploads/GENERAL/NVIDIA GTX 1650.jpg',
        specs: {
            vram: 4,
            description: 'The NVIDIA GeForce GTX 1650 is an entry-level dedicated graphics card designed for budget-conscious gamers and content creators, released in April 2019. It is built on the Turing architecture (TU117 chip) but lacks the dedicated Ray Tracing (RT) and Tensor (AI) cores found in the higher-end RTX series. It is aimed at 1080p resolution gaming, offering significant power efficiency and performance improvements over older cards like the GTX 1050 Ti.'
        },
        rating: 4.2
    },
    {
        name: 'AMD Radeon RX 6600',
        category: 'GPU',
        section: 'General',
        price: 24000,
        brand: 'AMD',
        stock: 20,
        image: '/uploads/GENERAL/AMD Radeon RX 6600.jpg',
        specs: {
            vram: 8,
            description: 'The AMD Radeon RX 6600 is a dedicated, mid-range desktop graphics card based on the RDNA 2 architecture, released in October 2021. It is specifically engineered to provide a high-performance, cost-effective 1080p gaming experience. It features 8GB of GDDR6 memory, 1,792 stream processors, and supports modern features like hardware ray tracing, DirectX 12 Ultimate, and AMD FidelityFX Super Resolution (FSR).'
        },
        rating: 4.5
    },
    {
        name: 'MSI B550 Tomahawk',
        category: 'Motherboard',
        section: 'General',
        price: 16500,
        brand: 'MSI',
        stock: 15,
        image: '/uploads/GENERAL/MSI B550 Tomahawk.jpg',
        specs: {
            socket: 'AM4',
            chipset: 'B550',
            ramType: 'DDR4',
            formFactor: 'ATX',
            description: 'The MSI MAG B550 TOMAHAWK is a high-performance ATX motherboard designed for AMD AM4 Ryzen 3000/5000 series processors, offering premium features for gaming at a competitive price point. Key features include PCIe 4.0 support, dual M.2 slots (with Shield Frozr), robust 10+2+1 digital power design, and dual 2.5G/1G LAN connectivity.'
        },
        rating: 4.8
    },
    {
        name: 'ASUS ROG Strix Z690-F',
        category: 'Motherboard',
        section: 'General',
        price: 35000,
        brand: 'ASUS',
        stock: 10,
        image: '/uploads/GENERAL/ASUS ROG Strix Z690-F.jpg',
        specs: {
            socket: 'LGA1700',
            chipset: 'Z690',
            ramType: 'DDR5',
            formFactor: 'ATX',
            description: 'The ASUS ROG Strix Z690-F Gaming WiFi is a premium LGA 1700 ATX motherboard designed for 12th Gen Intel Core processors, featuring DDR5 memory support, PCIe 5.0, WiFi 6E, and robust 16+1 power stages. It is optimized for high-performance gaming and overclocking, utilizing AI-driven cooling, networking, and, intelligent control systems.'
        },
        rating: 4.8
    },
    {
        name: 'MSI MEG Z790 Ace',
        category: 'Motherboard',
        section: 'General',
        price: 62000,
        brand: 'MSI',
        stock: 5,
        image: '/uploads/GENERAL/MSI MEG Z790 Ace.jpg',
        specs: {
            socket: 'LGA1700',
            chipset: 'Z790',
            ramType: 'DDR5',
            formFactor: 'E-ATX',
            description: 'The MSI MEG Z790 ACE is a flagship E-ATX motherboard designed for high-performance, offering a premium, black-and-gold aesthetic aimed at enthusiasts and extreme overclockers. It supports Intel’s 12th, 13th, and 14th Gen Core processors, utilizing the Z790 chipset and LGA 1700 socket.'
        },
        rating: 4.9
    },
    {
        name: 'ASUS ROG Maximus Z790 Extreme',
        category: 'Motherboard',
        section: 'General',
        price: 85000,
        brand: 'ASUS',
        stock: 3,
        image: '/uploads/GENERAL/ASUS ROG Maximus Z790 Extreme.jpg',
        specs: {
            socket: 'LGA1700',
            chipset: 'Z790',
            ramType: 'DDR5',
            formFactor: 'E-ATX',
            description: 'The ASUS ROG Maximus Z790 Extreme is a flagship E-ATX motherboard designed for 12th/13th/14th Gen Intel Core processors, featuring a 24+1 teamed power stage, PCIe 5.0, DDR5 support, and advanced cooling. It caters to enthusiasts with a 2-inch OLED LiveDash display, Wi-Fi 6E, 10Gb Ethernet, and Thunderbolt 4, offering maximum overclocking potential.'
        },
        rating: 5.0
    },
    {
        name: 'Corsair Vengeance 16GB DDR4',
        category: 'RAM',
        section: 'General',
        price: 4500,
        brand: 'Corsair',
        stock: 50,
        image: '/uploads/GENERAL/Corsair Vengeance 16GB DDR4.jpg',
        specs: {
            capacity: 16,
            ramType: 'DDR4',
            speed: '3200MHz',
            description: 'VENGEANCE® LPX 16GB (2 x 8GB) DDR4 DRAM 3200MHz C16 Memory Kit - Black. VENGEANCE LPX memory is designed for high-performance overclocking. The heatspreader is made of pure aluminum for faster heat dissipation, and the eight-layer PCB helps manage heat and provides superior overclocking headroom.'
        },
        rating: 4.7
    },
    {
        name: 'G.Skill Trident Z 32GB DDR4',
        category: 'RAM',
        section: 'General',
        price: 11000,
        brand: 'G.Skill',
        stock: 25,
        image: '/uploads/GENERAL/G.Skill Trident Z 32GB DDR4.jpg',
        specs: {
            capacity: 32,
            ramType: 'DDR4',
            description: 'Featuring a completely exposed light bar with vibrant RGB LEDs, merged with the award-winning Trident Z heatspreader design, and constructed with the highest quality components, the Trident Z RGB DDR4 memory kit combines the most vivid RGB lighting with uncompromised performance.'
        },
        rating: 4.8
    },
    {
        name: 'Corsair Dominator 32GB DDR5',
        category: 'RAM',
        section: 'General',
        price: 18000,
        brand: 'Corsair',
        stock: 20,
        image: '/uploads/GENERAL/Corsair Dominator 32GB DDR5.jpg',
        specs: {
            capacity: 32,
            ramType: 'DDR5',
            description: 'DOMINATOR® TITANIUM RGB 32GB (2x16GB) DDR5 DRAM 6000MT/s CL30 Intel XMP Memory Kit — Black. CORSAIR DOMINATOR TITANIUM RGB DDR5 Memory combines clean, refined styling with superior die-cast aluminum construction and advanced lighting design for a premium memory experience. Optimized for Intel® systems.'
        },
        rating: 4.9
    },
    {
        name: 'G.Skill Trident Z 64GB DDR5',
        category: 'RAM',
        section: 'General',
        price: 28000,
        brand: 'G.Skill',
        stock: 15,
        image: '/uploads/GENERAL/G.Skill Trident Z 64GB DDR5.jpg',
        specs: {
            capacity: 64,
            ramType: 'DDR5',
            description: 'G. SKILL Trident Z5 RGB series ddr5 ram is designed for ultra-high performance on DDR5 platforms. Featuring a sleek and streamlined aluminum heatspreader design, available in metallic silver, matte black, or matte white, the Trident Z5 RGB series DDR5 DRAM memory is the ideal choice to build a high-performance system.'
        },
        rating: 4.9
    },
    {
        name: 'Corsair Dominator Platinum 128GB DDR5',
        category: 'RAM',
        section: 'General',
        price: 55000,
        brand: 'Corsair',
        stock: 5,
        image: '/uploads/GENERAL/Corsair Dominator Platinum 128GB DDR5.jpg',
        specs: {
            capacity: 128,
            ramType: 'DDR5',
            description: 'CORSAIR DOMINATOR PLATINUM DDR5 This memory is hand-tested and made with custom circuit boards with onboard voltage regulation to ensure consistent signal integrity for stable overclocking. It is offered in clock speeds (or mega transfers) ranging from DDR5-5200 to DDR5-7800 in both 32GB and 64GB capacities.'
        },
        rating: 5.0
    },
    {
        name: 'Samsung 980 1TB SSD',
        category: 'Storage',
        section: 'General',
        price: 7500,
        brand: 'Samsung',
        stock: 35,
        image: '/uploads/GENERAL/Samsung 980 1TB SSD.jpg',
        specs: {
            storageCapacity: 1000,
            description: 'The Samsung 980 1TB is a high-performance, DRAM-less PCIe 3.0 NVMe M.2 (2280) SSD, offering speeds up to 3,500 MB/s read and 3,000 MB/s write. Designed for gaming and, and content creation, it uses Intelligent TurboWrite 2.0 and Host Memory Buffer (HMB) technology for cost-effective speed. It features advanced thermal management and a 5-year warranty.'
        },
        rating: 4.6
    },
    {
        name: 'WD Black SN770 1TB',
        category: 'Storage',
        section: 'General',
        price: 8000,
        brand: 'WD',
        stock: 30,
        image: '/uploads/GENERAL/WD Black SN770 1TB.jpg',
        specs: {
            storageCapacity: 1000,
            description: 'The WD_BLACK SN770 1TB NVMe SSD is a high-performance PCIe Gen4 M.2 2280 internal gaming drive offering speeds up to 5,150 MB/s (1TB-2TB models). It features 112-layer TLC NAND, optimized power efficiency, and a 600 TBW endurance rating, making it ideal for reducing load times and improving in-game responsiveness for gamers and creators.'
        },
        rating: 4.7
    },
    {
        name: 'Seagate FireCuda 4TB',
        category: 'Storage',
        section: 'General',
        price: 32000,
        brand: 'Seagate',
        stock: 10,
        image: '/uploads/GENERAL/Seagate FireCuda 4TB.jpg',
        specs: {
            storageCapacity: 4000,
            description: 'Based on the search results, there are two primary 4TB models within the Seagate FireCuda line. The most common "FireCuda 4TB" is the high-performance FireCuda 530 NVMe SSD, while a FireCuda 3.5" HDD also exists.'
        },
        rating: 4.8
    },
    {
        name: 'Samsung 870 QVO 8TB',
        category: 'Storage',
        section: 'General',
        price: 55000,
        brand: 'Samsung',
        stock: 5,
        image: '/uploads/GENERAL/Samsung 870 QVO 8TB.jpg',
        specs: {
            storageCapacity: 8000,
            description: 'The Samsung 870 QVO 8TB is a high-capacity 2.5-inch SATA III SSD designed for mainstream PCs and laptops, offering 560/530 MB/s read/write speeds. It features 4-bit MLC (QLC) V-NAND technology, an 8GB LPDDR4 DRAM cache, and 2,880 TBW endurance, making it ideal for massive storage upgrades.'
        },
        rating: 4.6
    },
    {
        name: 'Corsair CV550',
        category: 'PSU',
        section: 'General',
        price: 4500,
        brand: 'Corsair',
        stock: 40,
        image: '/uploads/GENERAL/Corsair CV550.jpg',
        specs: {
            wattage: 550,
            description: 'The Corsair CV550 is a 550-watt, 80 PLUS Bronze certified, non-modular ATX power supply designed for budget-conscious home or office PCs. It features a black, compact 125mm casing with 120mm thermally controlled low-noise cooling and, crucially, delivers full, continuous, and stable wattage for reliable performance.'
        },
        rating: 4.2
    },
    {
        name: 'Corsair RM750',
        category: 'PSU',
        section: 'General',
        price: 9500,
        brand: 'Corsair',
        stock: 20,
        image: '/uploads/GENERAL/Corsair RM750.jpg',
        specs: {
            wattage: 750,
            description: 'The Corsair RM750 is a highly regarded 750-watt, 80 PLUS Gold certified, fully modular ATX power supply designed for high-performance gaming PCs and workstation builds. It is known for its quiet operation, reliability, and efficient power delivery.'
        },
        rating: 4.8
    },
    {
        name: 'Corsair HX1000',
        category: 'PSU',
        section: 'General',
        price: 18000,
        brand: 'Corsair',
        stock: 12,
        image: '/uploads/GENERAL/Corsair HX1000.jpg',
        specs: {
            wattage: 1000,
            description: 'The Corsair HX1000 (specifically the 80+ Platinum version, often found with part number CP-9020139) is a premium, high-efficiency, fully modular power supply unit (PSU) designed for high-performance PCs and workstation builds. It offers 1000 watts of continuous power, making it ideal for systems with high-end CPUs and multiple GPUs.'
        },
        rating: 4.9
    },
    {
        name: 'Corsair AX1600i',
        category: 'PSU',
        section: 'General',
        price: 52000,
        brand: 'Corsair',
        stock: 5,
        image: '/uploads/GENERAL/Corsair AX1600i.jpg',
        specs: {
            wattage: 1600,
            description: 'The Corsair AX1600i is a premium 1600W 80 PLUS Titanium fully-modular digital ATX power supply, widely considered the flagship consumer PSU. It features advanced Gallium Nitride (GaN) transistors for over 94% efficiency, superior voltage stability, ultra-low ripple noise, and Corsair iCUE software monitoring.'
        },
        rating: 5.0
    },
    {
        name: 'Cooler Master MasterBox Q300L',
        category: 'Cabinet',
        section: 'General',
        price: 4500,
        brand: 'Cooler Master',
        stock: 25,
        image: '/uploads/GENERAL/Cooler Master MasterBox Q300L.jpg',
        specs: {
            description: 'The Cooler Master MasterBox Q300L is a highly modular and compact Micro-ATX mini-tower designed for flexibility and efficient thermal performance. Its standout features include a modular I/O panel that can be repositioned in six different locations and the ability for the case to be used in either a vertical or horizontal orientation.'
        },
        rating: 4.3
    },
    {
        name: 'NZXT H510',
        category: 'Cabinet',
        section: 'General',
        price: 7500,
        brand: 'NZXT',
        stock: 15,
        image: '/uploads/GENERAL/NZXT H510.jpg',
        specs: {
            description: 'The NZXT H510 is a compact mid-tower ATX case featuring a signature clean, all-steel design with a tempered glass side panel secured by a single thumbscrew. It is designed for, but not limited to, gaming, offering simplified cable management, USB Type-C front connectivity, and two pre-installed 120mm Aer F fans.'
        },
        rating: 4.5
    },
    {
        name: 'Corsair 4000D Airflow',
        category: 'Cabinet',
        section: 'General',
        price: 9500,
        brand: 'Corsair',
        stock: 20,
        image: '/uploads/GENERAL/Corsair 4000D Airflow.jpg',
        specs: {
            description: 'The Corsair 4000D Airflow is a popular mid-tower ATX case optimized for cooling, featuring a perforated steel front panel, two included 120mm AirGuide fans, and the RapidRoute cable management system for easy, tidy, and high-performance builds.'
        },
        rating: 4.8
    },
    {
        name: 'Lian Li Lancool III',
        category: 'Cabinet',
        section: 'General',
        price: 15500,
        brand: 'Lian Li',
        stock: 10,
        image: '/uploads/GENERAL/Lian Li Lancool III.jpg',
        specs: {
            description: 'The Lian Li Lancool III is a premium mid-tower chassis designed for high-performance PC builds, focusing on maximum airflow, ease of assembly, and extensive hardware compatibility. It is available in both RGB and non-RGB variants, featuring a fine mesh front panel, top panel, and bottom side panels for superior ventilation.'
        },
        rating: 4.9
    },
    {
        name: 'Fractal Design Meshify 2',
        category: 'Cabinet',
        section: 'General',
        price: 16500,
        brand: 'Fractal',
        stock: 12,
        image: '/uploads/GENERAL/Fractal Design Meshify 2.jpg',
        specs: {
            description: 'The Fractal Design Meshify 2 is a high-performance, flexible ATX mid-tower case featuring an iconic angular mesh front panel for maximum airflow. It supports up to E-ATX motherboards, extensive liquid cooling (up to 420mm radiators), and massive storage capacity (up to 15 HDDs/SSDs), making it a versatile, durable, and stylish choice.'
        },
        rating: 4.9
    },
    {
        name: 'Thermaltake Tower 900',
        category: 'Cabinet',
        section: 'General',
        price: 25000,
        brand: 'Thermaltake',
        stock: 8,
        image: '/uploads/GENERAL/Thermaltake Tower 900.jpg',
        specs: {
            description: 'The Thermaltake Tower 900 is a massive, vertical "super tower" chassis designed for high-end, enthusiast-level water-cooled builds and component, featuring a distinctive three-sided 5mm tempered glass "fish tank" design. It supports E-ATX motherboards, dual-loop liquid cooling (up to 560mm radiators), and multi-GPU configurations, making it ideal for displaying premium hardware.'
        },
        rating: 4.7
    },
    {
        name: 'Cooler Master Hyper 212',
        category: 'Cooler',
        section: 'General',
        price: 3500,
        brand: 'Cooler Master',
        stock: 30,
        image: '/uploads/GENERAL/Cooler Master Hyper 212.jpg',
        specs: {
            description: 'The Cooler Master Hyper 212 is a legendary, budget-friendly 120mm air cooler known for reliable, balanced thermal performance and wide compatibility. It typically features four copper heat pipes with Direct Contact technology, a stacked fin array, and a PWM fan (like the SickleFlow 120) for optimal airflow and low-noise operation.'
        },
        rating: 4.4
    },
    {
        name: 'DeepCool AK620',
        category: 'Cooler',
        section: 'General',
        price: 6500,
        brand: 'DeepCool',
        stock: 20,
        image: '/uploads/GENERAL/DeepCool AK620.jpg',
        specs: {
            description: 'The DeepCool AK620 is a high-performance dual-tower CPU air cooler featuring six 6mm copper heat pipes, a dense matrix fin array, and two 120mm Fluid Dynamic Bearing (FDB) PWM fans. Designed for superior heat dissipation (up to 260W TDP), it provides 43mm RAM clearance, a 160mm height, and supports major Intel/AMD sockets with an all-metal mounting kit.'
        },
        rating: 4.7
    },
    {
        name: 'Noctua NH-D15',
        category: 'Cooler',
        section: 'General',
        price: 9500,
        brand: 'Noctua',
        stock: 15,
        image: '/uploads/GENERAL/Noctua NH-D15.jpg',
        specs: {
            description: 'The Noctua NH-D15 is a flagship-tier, dual-tower CPU air cooler designed for maximum quiet cooling performance, often rivalling all-in-one liquid coolers. Featuring six heatpipes, a large surface area, and two premium NF-A15 140mm fans, it offers elite-class thermal efficiency for high-end processors. It includes the SecuFirm2™ mounting system and supports Intel LGA1700/1200/115x and AMD AM4/AM5 sockets.'
        },
        rating: 4.9
    },
    {
        name: 'Corsair H100i',
        category: 'Cooler',
        section: 'General',
        price: 12500,
        brand: 'Corsair',
        stock: 18,
        image: '/uploads/GENERAL/Corsair H100i.jpg',
        specs: {
            description: 'The Corsair H100i is a popular 240mm all-in-one (AIO) liquid CPU cooler series designed for high-performance, quiet cooling, and aesthetic customization. It features a 240mm radiator, RGB-lit fans (AF/SP/QX series), and an integrated pump head with customizable RGB lighting. Modern models integrate with CORSAIR iCUE software for fan control and temperature monitoring.'
        },
        rating: 4.7
    },
    {
        name: 'NZXT Kraken X73',
        category: 'Cooler',
        section: 'General',
        price: 18500,
        brand: 'NZXT',
        stock: 15,
        image: '/uploads/GENERAL/NZXT Kraken X73.jpg',
        specs: {
            description: 'The NZXT Kraken X73 is a high-performance 360mm AIO liquid cooler designed for demanding PC builds, featuring a 7th Gen Asetek pump, a 10% larger rotatable infinity mirror RGB cap, and Aer P radiator fans for silent, efficient cooling. It offers full NZXT CAM software control and a 6-year warranty.'
        },
        rating: 4.8
    },
    {
        name: 'Corsair iCUE H150i Elite',
        category: 'Cooler',
        section: 'General',
        price: 22000,
        brand: 'Corsair',
        stock: 10,
        image: '/uploads/GENERAL/Corsair iCUE H150i Elite.jpg',
        specs: {
            description: 'The Corsair iCUE H150i Elite (specifically the Elite Capellix or Elite LCD series) is a premium 360mm all-in-one (AIO) liquid CPU cooler designed for high-performance thermal management and aesthetics. It features a 360mm radiator, three RGB fans, a powerful pump head with integrated CAPELLIX LEDs, and the included iCUE Commander CORE controller for advanced RGB and fan speed management via Corsair iCUE software.'
        },
        rating: 4.9
    },
    {
        name: 'Logitech G102',
        category: 'Accessories',
        section: 'General',
        price: 1500,
        brand: 'Logitech',
        stock: 50,
        image: '/uploads/GENERAL/Logitech G102.jpg',
        specs: {
            description: 'The Logitech G102 is a budget-friendly, wired gaming mouse featuring a classic 6-button design, 8,000 DPI gaming-grade sensor, and customizable LIGHTSYNC RGB lighting. It offers a 1ms response rate, mechanical button tensioning for consistent clicks, and weighs 85g, making it ideal for fast-paced gaming.'
        },
        rating: 4.4
    },
    {
        name: 'Redragon K552',
        category: 'Accessories',
        section: 'General',
        price: 3500,
        brand: 'Redragon',
        stock: 40,
        image: '/uploads/GENERAL/Redragon K552.jpg',
        specs: {
            description: 'The Redragon K552 Kumara is a budget-friendly, wired, tenkeyless (TKL) mechanical gaming keyboard featuring 87 keys, a durable metal-ABS construction, and customizable RGB or red backlighting. It is known for its responsive, clicky switches (often Blue or Red), anti-ghosting, and compact, durable design.'
        },
        rating: 4.5
    },
    {
        name: 'HyperX Cloud Stinger',
        category: 'Accessories',
        section: 'General',
        price: 4500,
        brand: 'HyperX',
        stock: 35,
        image: '/uploads/GENERAL/HyperX Cloud Stinger.jpg',
        specs: {
            description: 'The HyperX Cloud Stinger is a lightweight (275g) wired gaming headset featuring 50mm directional drivers for precise audio, soft memory foam ear cushions, and 90° rotating ear cups. Designed for comfort and durability with adjustable steel sliders, it includes a convenient swivel-to-mute noise-cancellation microphone and on-earcup volume control.'
        },
        rating: 4.4
    },
    {
        name: 'Razer BlackWidow V3',
        category: 'Accessories',
        section: 'General',
        price: 9500,
        brand: 'Razer',
        stock: 20,
        image: '/uploads/GENERAL/Razer BlackWidow V3.jpg',
        specs: {
            description: 'The Razer BlackWidow V3 is a full-sized wired mechanical gaming keyboard designed for high-performance gaming, featuring signature switches, durable construction, and extensive RGB lighting. As an iteration of the iconic BlackWidow line, this model brings updated features like transparent switch housings for better lighting and, in some models, improved keycaps for durability.'
        },
        rating: 4.7
    },
    {
        name: 'Logitech G Pro X',
        category: 'Accessories',
        section: 'General',
        price: 12500,
        brand: 'Logitech',
        stock: 15,
        image: '/uploads/GENERAL/Logitech G Pro X.jpg',
        specs: {
            description: 'The Logitech G Pro X is a high-performance gaming headset designed for esports professionals, featuring 50mm PRO-G drivers for clear audio, a detachable cardioid microphone with Blue VO!CE technology, and a durable steel/aluminum frame. It offers premium comfort with memory foam ear pads, 7.1 surround sound, and is available in both wired and Lightspeed wireless models.'
        },
        rating: 4.8
    },
    {
        name: 'ASUS ROG Swift PG32UQX',
        category: 'Accessories',
        section: 'General',
        price: 250000,
        brand: 'ASUS',
        stock: 5,
        image: '/uploads/GENERAL/ASUS ROG Swift PG32UQX.jpg',
        specs: {
            description: 'The ASUS ROG Swift PG32UQX is a premium 32-inch 4K UHD (3840x2160) Mini LED gaming monitor designed for elite, high-fidelity gaming. It features 1,152 independent local dimming zones, 144Hz refresh rate, 1400-nit peak brightness, and NVIDIA G-SYNC Ultimate, providing exceptional contrast, deep blacks, and stunning HDR, ideal for creators and enthusiasts.'
        },
        rating: 4.9
    },
    {
        name: 'ASUS Prime H610M-K',
        category: 'Motherboard',
        section: 'General',
        price: 7800,
        brand: 'ASUS',
        stock: 25,
        image: '/uploads/GENERAL/ASUS Prime H610M-K.jpg',
        specs: {
            socket: 'LGA1700',
            chipset: 'H610',
            description: 'The ASUS Prime H610M-K is a budget-friendly Micro-ATX motherboard designed for 12th, 13th, and 14th Gen Intel Core processors, featuring the LGA 1700 socket. It offers essential features for everyday computing and entry-level gaming, including DDR4 support, a PCIe 4.0 slot, and M.2 storage connectivity.'
        },
        rating: 4.2
    },
    {
        name: 'Kingston Fury 32GB DDR4',
        category: 'RAM',
        section: 'General',
        price: 8500,
        brand: 'Kingston',
        stock: 30,
        image: '/uploads/GENERAL/Kingston Fury 32GB DDR4.jpg',
        specs: {
            capacity: 32,
            ramType: 'DDR4',
            description: 'Kingston FURY Beast DDR4 memory provides a powerful performance boost for gaming, video editing, and rendering with speeds up to 3733MT/s. This cost-effective upgrade is available in 2666MT/s–3733MT/s speeds, CL15–19 latencies, single-module capacities of 4GB–32GB, and kit capacities of 8GB–128GB.'
        },
        rating: 4.7
    },
    {
        name: 'Crucial P3 1TB NVMe',
        category: 'Storage',
        section: 'General',
        price: 5800,
        brand: 'Crucial',
        stock: 35,
        image: '/uploads/GENERAL/Crucial P3 1TB NVMe.jpg',
        specs: {
            storageCapacity: 1000,
            description: 'The Crucial P3 is an NVMe SSD that delivers performance that’s nearly 6x faster than SATA and 22x faster than HDDs. With generous storage up to 4TB, the Crucial P3 can hold all your important files, photos, videos, and games without worry.'
        },
        rating: 4.5
    },
    {
        name: 'NZXT H5 Flow',
        category: 'Cabinet',
        section: 'General',
        price: 8500,
        brand: 'NZXT',
        stock: 15,
        image: '/uploads/GENERAL/NZXT H5 Flow.jpg',
        specs: {
            description: 'The NZXT H5 Flow features a perforated front panel to generate an extra dimension of airflow for maximum cooling potential. With optimized thermal performance and intuitive cable management, the H5 Flow is an ideal chassis for most builds.'
        },
        rating: 4.7
    },
    {
        name: 'Noctua NH-U12S',
        category: 'Cooler',
        section: 'General',
        price: 5500,
        brand: 'Noctua',
        stock: 20,
        image: '/uploads/GENERAL/Noctua NH-U12S.jpg',
        specs: {
            description: 'The NH-U12S is the latest 12cm model of Noctua’s classic U-series single tower CPU coolers, which have received more than 400 awards and recommendations from the international press. The S-version’s 45mm slim shape guarantees 100% compatibility with tall RAM modules and at the same time, its fine-tuned design and the class-leading NF-F12 FocusedFlow™ fan with PWM support for fully automatic speed control allow it to further improve its predecessor’s renowned quiet cooling performance.'
        },
        rating: 4.8
    },
    {
        name: 'Logitech MK270 Wireless',
        category: 'Accessories',
        section: 'General',
        price: 1800,
        brand: 'Logitech',
        stock: 40,
        image: '/uploads/GENERAL/Logitech MK270 Wireless.jpg',
        specs: {
            description: 'The Logitech MK270 Wireless Keyboard and Mouse Combo is the reliable wireless combo that lets you work or play from almost anywhere. The keyboard features a full-size layout with numeric keypad, directional keys, and nine F-keys, and is easy to use and provides long-lasting comfort.'
        },
        rating: 4.3
    }
];
