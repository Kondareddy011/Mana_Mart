from datetime import datetime
from sqlalchemy.orm import Session
from .models import Apartment, Batch, Category, Product, Order, OrderItem

def seed_database(db: Session):
    # Only seed if apartments table is empty
    if db.query(Apartment).count() > 0:
        return

    # 1. Seed Apartments across Multiple Cities (Hyderabad, Vijayawada, Guntur, Visakhapatnam, Tirupati)
    apartments = [
        # Hyderabad
        Apartment(
            name="My Home Bhooja",
            area="HITEC City / Madhapur",
            city="Hyderabad",
            pincode="500081",
            total_flats=1800,
            registered_families=245,
            coordinator_name="Vikramaditya V.",
            coordinator_phone="9849012345",
            delivery_slot_info="Clubhouse Block C Basement Loading Bay, 1st Sunday 8 AM - 12 PM",
            is_active=True
        ),
        Apartment(
            name="Aparna Sarovar Zenith",
            area="Nallagandla / Gachibowli",
            city="Hyderabad",
            pincode="500019",
            total_flats=2400,
            registered_families=320,
            coordinator_name="Radha Krishna K.",
            coordinator_phone="9988054321",
            delivery_slot_info="Central Community Amenities Gate 2, 1st Sunday 1 PM - 5 PM",
            is_active=True
        ),
        Apartment(
            name="Rainbow Vistas Rockgarden",
            area="Moosapet / Hitec City",
            city="Hyderabad",
            pincode="500018",
            total_flats=2500,
            registered_families=280,
            coordinator_name="P. Venkat Reddy",
            coordinator_phone="9701023456",
            delivery_slot_info="Tower 8 Lobby Logistics Hub, 1st Saturday 10 AM",
            is_active=True
        ),
        # Vijayawada
        Apartment(
            name="Trendset Winz",
            area="Benz Circle / Polyclinic Rd",
            city="Vijayawada",
            pincode="520010",
            total_flats=180,
            registered_families=42,
            coordinator_name="Ramesh Varma",
            coordinator_phone="9848011223",
            delivery_slot_info="Clubhouse ground floor lobby, 1st Saturday 9 AM - 1 PM",
            is_active=True
        ),
        Apartment(
            name="Amaravati Heights",
            area="Tadigadapa / Bandar Road",
            city="Vijayawada",
            pincode="521137",
            total_flats=240,
            registered_families=58,
            coordinator_name="Lakshmi Narayana",
            coordinator_phone="9440122334",
            delivery_slot_info="Block B Community Hall & Doorstep Carts, 1st Saturday 2 PM - 6 PM",
            is_active=True
        ),
        Apartment(
            name="Lanco Hills Enclave",
            area="Gollapudi Bypass",
            city="Vijayawada",
            pincode="521225",
            total_flats=150,
            registered_families=31,
            coordinator_name="Suresh Babu",
            coordinator_phone="9989033445",
            delivery_slot_info="Security Gate Bulk Hub & Lift delivery, 1st Sunday 10 AM",
            is_active=True
        ),
        Apartment(
            name="Sri Krishna Grandeur",
            area="Kanuru / Auto Nagar",
            city="Vijayawada",
            pincode="520007",
            total_flats=120,
            registered_families=28,
            coordinator_name="Anitha Reddy",
            coordinator_phone="9866044556",
            delivery_slot_info="Basement multipurpose room, 1st Sunday 2 PM - 5 PM",
            is_active=True
        ),
        Apartment(
            name="Bhavani Residency",
            area="Bhavanipuram / MG Road",
            city="Vijayawada",
            pincode="520012",
            total_flats=90,
            registered_families=22,
            coordinator_name="Koteswara Rao",
            coordinator_phone="9490155667",
            delivery_slot_info="Apartment entrance hub, 1st Saturday morning",
            is_active=True
        ),
        # Guntur
        Apartment(
            name="Prakruthi Enclave",
            area="Koretipadu / Ring Road",
            city="Guntur",
            pincode="522007",
            total_flats=160,
            registered_families=48,
            coordinator_name="M. Sivaramakrishna",
            coordinator_phone="9441188990",
            delivery_slot_info="Clubhouse reception, 1st Saturday 3 PM",
            is_active=True
        ),
        Apartment(
            name="Lotus Palms",
            area="Lakshmipuram / Amaravathi Rd",
            city="Guntur",
            pincode="522002",
            total_flats=210,
            registered_families=62,
            coordinator_name="N. Srinivasa Rao",
            coordinator_phone="9848177665",
            delivery_slot_info="Main security concourse, 1st Sunday 9 AM",
            is_active=True
        ),
        # Visakhapatnam
        Apartment(
            name="Sea Breeze Enclave",
            area="MVP Colony",
            city="Visakhapatnam",
            pincode="530017",
            total_flats=340,
            registered_families=85,
            coordinator_name="Capt. K. Jagannadham",
            coordinator_phone="9849133445",
            delivery_slot_info="Community Hall Portico, 1st Sunday 10 AM - 2 PM",
            is_active=True
        ),
        Apartment(
            name="Hill Crest Towers",
            area="Rushikonda / IT SEZ",
            city="Visakhapatnam",
            pincode="530045",
            total_flats=420,
            registered_families=110,
            coordinator_name="Sunil K. Varma",
            coordinator_phone="9959144556",
            delivery_slot_info="Tower A Ground Lobby, 1st Saturday 4 PM",
            is_active=True
        ),
        # Tirupati
        Apartment(
            name="Sapthagiri Residency",
            area="Korlagunta / AIR Bypass",
            city="Tirupati",
            pincode="517501",
            total_flats=130,
            registered_families=36,
            coordinator_name="B. Madhusudhan Rao",
            coordinator_phone="9440266778",
            delivery_slot_info="Ground floor vehicle porch, 1st Sunday 11 AM",
            is_active=True
        ),
    ]
    db.add_all(apartments)
    db.commit()

    # 2. Seed Batch
    batch1 = Batch(
        name="November 2026 Sourcing Batch",
        cutoff_date="30 Oct 2026, 11:59 PM",
        delivery_date="02 Nov 2026 (Sunday)",
        status="ACCEPTING_ORDERS",
        notes="Wholesale mandi procurement directly from Kurnool rice mills, Guntur mirchi yard & Tenali oil mills.",
        is_active=True
    )
    db.add(batch1)
    db.commit()

    # 3. Seed Categories
    categories = [
        Category(slug="rice-millets", name="Rice & Millets", telugu_name="బియ్యం & చిరుధాన్యాలు", icon="Wheat", display_order=1),
        Category(slug="dals-pulses", name="Dals & Pulses", telugu_name="పప్పు ధాన్యాలు", icon="Layers", display_order=2),
        Category(slug="oils-ghee", name="Cooking Oils & Ghee", telugu_name="నూనెలు & ఆవు నెయ్యి", icon="Droplet", display_order=3),
        Category(slug="spices-masalas", name="Spices & Andhra Masalas", telugu_name="మసాలాలు & కారం", icon="Flame", display_order=4),
        Category(slug="flours-staples", name="Atta & Flours", telugu_name="పిండి పదార్థాలు", icon="Box", display_order=5),
        Category(slug="dry-fruits", name="Dry Fruits & Healthy Nuts", telugu_name="డ్రై ఫ్రూట్స్", icon="Sparkles", display_order=6),
        Category(slug="cleaning-home", name="Cleaning & Household Bulk", telugu_name="క్లీనింగ్ నిత్యావసరాలు", icon="ShieldCheck", display_order=7),
    ]
    db.add_all(categories)
    db.commit()

    # 4. Seed Products
    c_rice = db.query(Category).filter_by(slug="rice-millets").first()
    c_dal = db.query(Category).filter_by(slug="dals-pulses").first()
    c_oil = db.query(Category).filter_by(slug="oils-ghee").first()
    c_spice = db.query(Category).filter_by(slug="spices-masalas").first()
    c_flour = db.query(Category).filter_by(slug="flours-staples").first()
    c_dry = db.query(Category).filter_by(slug="dry-fruits").first()
    c_clean = db.query(Category).filter_by(slug="cleaning-home").first()

    products = [
        # Rice & Millets
        Product(
            category_id=c_rice.id,
            name="Kurnool BPT Sona Masoori Rice (18-Month Aged Old Paddy)",
            telugu_name="కర్నూలు BPT సోనా మసూరి బియ్యం (18 నెలల పాతవి)",
            brand="Kurnool Mandi Direct",
            pack_size="25 kg Bag",
            unit_weight_kg=25.0,
            mrp=1850.0,
            hub_price=1490.0,
            supplier_cost=1360.0,
            in_stock=True,
            is_featured=True,
            is_bundle_item=True,
            image_url="https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
            description="Grade-A polished Sona Masoori rice sourced directly from Kurnool river belt mills. Low starch, non-sticky, cooked grain doubles in size.",
            min_qty=1,
            max_qty=5
        ),
        Product(
            category_id=c_rice.id,
            name="Kurnool BPT Sona Masoori Rice (Medium Grain)",
            telugu_name="కర్నూలు సోనా మసూరి (10 కేజీల బస్తా)",
            brand="Kurnool Mandi Direct",
            pack_size="10 kg Bag",
            unit_weight_kg=10.0,
            mrp=760.0,
            hub_price=620.0,
            supplier_cost=560.0,
            in_stock=True,
            is_featured=False,
            is_bundle_item=False,
            image_url="https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
            description="Family-size pack of premium Sona Masoori rice.",
            min_qty=1,
            max_qty=5
        ),
        Product(
            category_id=c_rice.id,
            name="Royal Heritage Basmati Rice (XXL Long Grain)",
            telugu_name="రాయల్ బాస్మతి బియ్యం",
            brand="Heritage Rice Selection",
            pack_size="5 kg Bag",
            unit_weight_kg=5.0,
            mrp=650.0,
            hub_price=520.0,
            supplier_cost=460.0,
            in_stock=True,
            is_featured=True,
            is_bundle_item=True,
            image_url="https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=600&q=80",
            description="Extra-long aged Basmati rice for Biryanis and Pulaos with rich aroma.",
            min_qty=1,
            max_qty=4
        ),
        Product(
            category_id=c_rice.id,
            name="Native Foxtail Millet (కొర్రలు - Korralu)",
            telugu_name="దేశీ కొర్రలు (Foxtail Millet)",
            brand="Amaravati Organic Cluster",
            pack_size="2 kg Bag",
            unit_weight_kg=2.0,
            mrp=260.0,
            hub_price=195.0,
            supplier_cost=165.0,
            in_stock=True,
            is_featured=False,
            is_bundle_item=False,
            image_url="https://images.unsplash.com/photo-1627916607164-7b20241db935?auto=format&fit=crop&w=600&q=80",
            description="Unpolished diabetic-friendly native millet rich in fiber and minerals.",
            min_qty=1,
            max_qty=4
        ),

        # Dals & Pulses
        Product(
            category_id=c_dal.id,
            name="Ksheera Guntur Toor Dal (కంది పప్పు - Unpolished Bold Grain)",
            telugu_name="గుంటూరు నాణ్యమైన కంది పప్పు",
            brand="Guntur Mandi Wholesale",
            pack_size="5 kg Pouch",
            unit_weight_kg=5.0,
            mrp=860.0,
            hub_price=695.0,
            supplier_cost=630.0,
            in_stock=True,
            is_featured=True,
            is_bundle_item=True,
            image_url="https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80",
            description="Unpolished Guntur Toor Dal with high natural protein. Cooks evenly with deep golden sambar aroma.",
            min_qty=1,
            max_qty=4
        ),
        Product(
            category_id=c_dal.id,
            name="Ksheera Guntur Toor Dal (కంది పప్పు)",
            telugu_name="కంది పప్పు (1 కేజీ)",
            brand="Guntur Mandi Wholesale",
            pack_size="1 kg Pkt",
            unit_weight_kg=1.0,
            mrp=175.0,
            hub_price=142.0,
            supplier_cost=128.0,
            in_stock=True,
            is_featured=False,
            is_bundle_item=False,
            image_url="https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80",
            description="Top-grade unpolished Toor Dal.",
            min_qty=1,
            max_qty=6
        ),
        Product(
            category_id=c_dal.id,
            name="Andhra Premium Urad Dal (మినప పప్పు - For Fluffy Idli/Dosa)",
            telugu_name="గుండు మినప పప్పు (ఇడ్లీ, దోశ)",
            brand="Vijayawada Krishna Mills",
            pack_size="2 kg Pkt",
            unit_weight_kg=2.0,
            mrp=340.0,
            hub_price=275.0,
            supplier_cost=245.0,
            in_stock=True,
            is_featured=True,
            is_bundle_item=True,
            image_url="https://images.unsplash.com/photo-1585994192701-f1a505c817ea?auto=format&fit=crop&w=600&q=80",
            description="Clean, whole white Gundu Urad Dal that yields 2x batter volume for softest idlis.",
            min_qty=1,
            max_qty=5
        ),
        Product(
            category_id=c_dal.id,
            name="Yellow Moong Dal (పెసర పప్పు - Split)",
            telugu_name="పచ్చ పెసర పప్పు",
            brand="Tata Sampann Choice",
            pack_size="1 kg Pkt",
            unit_weight_kg=1.0,
            mrp=150.0,
            hub_price=122.0,
            supplier_cost=108.0,
            in_stock=True,
            is_featured=False,
            is_bundle_item=False,
            image_url="https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=600&q=80",
            description="Nutrient rich easy-to-digest yellow Moong Dal.",
            min_qty=1,
            max_qty=5
        ),
        Product(
            category_id=c_dal.id,
            name="Bold Chana Dal (శనగ పప్పు - Bengal Gram)",
            telugu_name="నాణ్యమైన శనగ పప్పు",
            brand="Mandi Direct Pulses",
            pack_size="2 kg Pkt",
            unit_weight_kg=2.0,
            mrp=220.0,
            hub_price=175.0,
            supplier_cost=155.0,
            in_stock=True,
            is_featured=False,
            is_bundle_item=False,
            image_url="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
            description="Freshly milled Chana dal with crisp crunch for vadas and tadkas.",
            min_qty=1,
            max_qty=5
        ),

        # Oils & Ghee
        Product(
            category_id=c_oil.id,
            name="Freedom Refined Sunflower Oil (Bulk Family Saver)",
            telugu_name="ఫ్రీడమ్ సన్‌ఫ్లవర్ ఆయిల్ (5 లీటర్లు)",
            brand="Freedom Refined",
            pack_size="5 Litre Jar",
            unit_weight_kg=4.6,
            mrp=790.0,
            hub_price=640.0,
            supplier_cost=590.0,
            in_stock=True,
            is_featured=True,
            is_bundle_item=True,
            image_url="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80",
            description="Fortified with Vitamin A & D. Light, non-greasy sunflower cooking oil for everyday South Indian meals.",
            min_qty=1,
            max_qty=4
        ),
        Product(
            category_id=c_oil.id,
            name="Traditional Cold-Pressed Groundnut Oil (గానుగ వేరుశెనగ నూనె)",
            telugu_name="స్వచ్ఛమైన చెక్క గానుగ పల్లీ నూనె",
            brand="Tenali Cold Mills",
            pack_size="5 Litre Tin",
            unit_weight_kg=4.7,
            mrp=1350.0,
            hub_price=1090.0,
            supplier_cost=980.0,
            in_stock=True,
            is_featured=True,
            is_bundle_item=False,
            image_url="https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=600&q=80",
            description="Cold wood-pressed traditional groundnut oil with authentic nutty aroma and zero chemicals.",
            min_qty=1,
            max_qty=3
        ),
        Product(
            category_id=c_oil.id,
            name="Heritage Golden Cow Ghee (స్వచ్ఛమైన ఆవు నెయ్యి)",
            telugu_name="హెరిటేజ్ ఆవు నెయ్యి (దాణేదార్)",
            brand="Heritage Foods",
            pack_size="1 Litre Jar",
            unit_weight_kg=1.0,
            mrp=710.0,
            hub_price=595.0,
            supplier_cost=540.0,
            in_stock=True,
            is_featured=True,
            is_bundle_item=True,
            image_url="https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=600&q=80",
            description="Aromatic, granulated traditional cow ghee prepared from pure milk fat.",
            min_qty=1,
            max_qty=3
        ),

        # Spices & Masalas
        Product(
            category_id=c_spice.id,
            name="Guntur Teja Grade-A Red Chilli Powder (గుంటూరు కారం పొడి)",
            telugu_name="గుంటూరు ఘాటైన మిర్చి కారం",
            brand="Guntur Yard Direct",
            pack_size="1 kg Pkt",
            unit_weight_kg=1.0,
            mrp=380.0,
            hub_price=305.0,
            supplier_cost=270.0,
            in_stock=True,
            is_featured=True,
            is_bundle_item=True,
            image_url="https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=600&q=80",
            description="Authentic high-pungency, vivid natural red chili powder from the world-famous Guntur Mirchi Yard.",
            min_qty=1,
            max_qty=5
        ),
        Product(
            category_id=c_spice.id,
            name="Salem Export Curcumin-Rich Turmeric Powder (పసుపు)",
            telugu_name="స్వచ్ఛమైన పసుపు పొడి",
            brand="Andhra Spices Board",
            pack_size="500g Pkt",
            unit_weight_kg=0.5,
            mrp=160.0,
            hub_price=125.0,
            supplier_cost=105.0,
            in_stock=True,
            is_featured=False,
            is_bundle_item=True,
            image_url="https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
            description="High curcumin percentage, zero artificial colors.",
            min_qty=1,
            max_qty=5
        ),
        Product(
            category_id=c_spice.id,
            name="Rajasthan Unpolished Cumin Seeds (జీలకర్ర - Jeera)",
            telugu_name="దేశీ జీలకర్ర (Jeera)",
            brand="Mandi Wholesale Spices",
            pack_size="500g Pkt",
            unit_weight_kg=0.5,
            mrp=240.0,
            hub_price=195.0,
            supplier_cost=170.0,
            in_stock=True,
            is_featured=False,
            is_bundle_item=True,
            image_url="https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=600&q=80",
            description="Aromatic whole jeera for tadka and digestive wellness.",
            min_qty=1,
            max_qty=4
        ),
        Product(
            category_id=c_spice.id,
            name="Small Grain Mustard Seeds (ఆవాలు - Aavalu)",
            telugu_name="సన్న ఆవాలు",
            brand="Mandi Wholesale Spices",
            pack_size="500g Pkt",
            unit_weight_kg=0.5,
            mrp=110.0,
            hub_price=85.0,
            supplier_cost=70.0,
            in_stock=True,
            is_featured=False,
            is_bundle_item=False,
            image_url="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80",
            description="Pungent tiny mustard seeds for Andhra pickling and tempering.",
            min_qty=1,
            max_qty=4
        ),

        # Flours & Staples
        Product(
            category_id=c_flour.id,
            name="Aashirvaad Select 100% Sharbati Whole Wheat Atta",
            telugu_name="ఆశీర్వాద్ శర్బతి గోధుమ పిండి",
            brand="Aashirvaad",
            pack_size="10 kg Bag",
            unit_weight_kg=10.0,
            mrp=570.0,
            hub_price=475.0,
            supplier_cost=430.0,
            in_stock=True,
            is_featured=True,
            is_bundle_item=True,
            image_url="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
            description="Made from the golden grains of Madhya Pradesh Sharbati fields. Rotis stay tender and soft for hours.",
            min_qty=1,
            max_qty=4
        ),
        Product(
            category_id=c_flour.id,
            name="Anakapalli Organic Jaggery Powder (బెల్లం పొడి)",
            telugu_name="అనకాపల్లి స్వచ్ఛమైన బెల్లం పొడి",
            brand="Andhra Sugars Co-op",
            pack_size="2 kg Tub",
            unit_weight_kg=2.0,
            mrp=220.0,
            hub_price=170.0,
            supplier_cost=145.0,
            in_stock=True,
            is_featured=False,
            is_bundle_item=True,
            image_url="https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&w=600&q=80",
            description="Chemical-free golden jaggery powder made from fresh sugarcane juice.",
            min_qty=1,
            max_qty=4
        ),
        Product(
            category_id=c_flour.id,
            name="Tata Salt Pure Iodized Vacuum Evaporated",
            telugu_name="టాటా సాల్ట్ (ఉప్పు)",
            brand="Tata Salt",
            pack_size="1 kg Pkt",
            unit_weight_kg=1.0,
            mrp=28.0,
            hub_price=22.0,
            supplier_cost=19.0,
            in_stock=True,
            is_featured=False,
            is_bundle_item=True,
            image_url="https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?auto=format&fit=crop&w=600&q=80",
            description="India's trusted vacuum evaporated iodized table salt.",
            min_qty=1,
            max_qty=10
        ),

        # Dry Fruits & Nuts
        Product(
            category_id=c_dry.id,
            name="California Jumbo Whole Almonds (బాదం పప్పు - Badam)",
            telugu_name="కాలిఫోర్నియా బాదం పప్పు",
            brand="Nut King Direct",
            pack_size="1 kg Jar",
            unit_weight_kg=1.0,
            mrp=950.0,
            hub_price=760.0,
            supplier_cost=690.0,
            in_stock=True,
            is_featured=True,
            is_bundle_item=True,
            image_url="https://images.unsplash.com/photo-1508061252445-5350f3ab0bad?auto=format&fit=crop&w=600&q=80",
            description="Crisp sweet jumbo almonds rich in vitamin E and antioxidants.",
            min_qty=1,
            max_qty=3
        ),
        Product(
            category_id=c_dry.id,
            name="Mangalore W-240 Premium Whole Cashews (జీడిపప్పు - Kaju)",
            telugu_name="స్వచ్ఛమైన జీడిపప్పు (డబ్ల్యూ-240)",
            brand="Nut King Direct",
            pack_size="1 kg Pack",
            unit_weight_kg=1.0,
            mrp=1100.0,
            hub_price=890.0,
            supplier_cost=805.0,
            in_stock=True,
            is_featured=True,
            is_bundle_item=False,
            image_url="https://images.unsplash.com/photo-1509912760195-46747535b4bd?auto=format&fit=crop&w=600&q=80",
            description="Large sweet ivory whole cashews for sweets, curries and snacking.",
            min_qty=1,
            max_qty=3
        ),

        # Cleaning & Household Bulk
        Product(
            category_id=c_clean.id,
            name="Surf Excel Matic Top/Front Load Detergent (Apartment Mega Pack)",
            telugu_name="సర్ఫ్ ఎక్సెల్ మేటిక్ లిక్విడ్ (4 లీటర్లు)",
            brand="Surf Excel",
            pack_size="4 Litre Can",
            unit_weight_kg=4.2,
            mrp=820.0,
            hub_price=670.0,
            supplier_cost=610.0,
            in_stock=True,
            is_featured=False,
            is_bundle_item=False,
            image_url="https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=600&q=80",
            description="Tough stain removal in 1 wash. Apartment bulk value size with dispensing cap.",
            min_qty=1,
            max_qty=3
        ),
        Product(
            category_id=c_clean.id,
            name="Vim Dishwash Gel Lemon Canister (Bulk Saver)",
            telugu_name="విమ్ డిష్‌వాష్ జెల్ (5 లీటర్లు)",
            brand="Vim Gel",
            pack_size="5 Litre Can",
            unit_weight_kg=5.2,
            mrp=750.0,
            hub_price=590.0,
            supplier_cost=535.0,
            in_stock=True,
            is_featured=False,
            is_bundle_item=False,
            image_url="https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80",
            description="Power of 100 lemons. Lasts 4-5 months for typical family kitchen.",
            min_qty=1,
            max_qty=3
        ),
    ]

    db.add_all(products)
    db.commit()

