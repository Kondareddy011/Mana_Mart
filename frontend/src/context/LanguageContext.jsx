import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const TRANSLATIONS = {
  en: {
    // Navigation & Common
    appTitle: "Mana Grocery Hub",
    appSubtitle: "Apartment Community Bulk Grocery Buying",
    announcement: "Next Direct Mandi Batch Cutoff: 30th Oct • Free Bulk Delivery to Your Apartment Lobby",
    helpline: "Hub Helpline",
    mandiDirect: "Direct from Kurnool & Guntur Mandis",
    yourApartment: "Your Apartment",
    selectApartment: "Select Society / Apartment",
    selectCity: "Select City",
    allCities: "All Cities",
    home: "Home",
    catalogue: "Grocery Catalogue",
    trackOrder: "Track Order",
    cart: "Cart",
    theme: "Theme",
    language: "Language",
    english: "English",
    telugu: "తెలుగు",

    // Hero Section
    communityPill: "Apartment Families Bulk Grocery Hub",
    heroTitlePart1: "Buy Groceries",
    heroTitleHighlight: "Direct From Mandi",
    heroTitlePart2: "With Your Apartment Neighbors.",
    heroQuote: '"Direct from Kurnool rice mills & Guntur mirchi yard to your apartment."',
    heroDesc: "Why pay retail supermarket markups? Place your monthly staple orders together with your society. We consolidate bulk demand, procure at wholesale mandi prices, pack household-wise, and deliver directly to your apartment lobby.",
    browseMonthlyCatalogue: "Browse Monthly Catalogue",
    directMandiSavings: "Direct Mandi Savings",
    freeSocietyDrop: "Free Society Drop",
    agedRiceBadge: "18-Mo Aged Pure Sona Masoori",

    // Calculator
    calculatorTitle: "Apartment Savings Calculator",
    calculatorSubtitle: "Calculate how much your flat saves",
    cheaperBadge: "~22% Cheaper",
    currentMonthlySpend: "Your Current Monthly Grocery Spend:",
    coupleSpend: "₹3,000 (Couple)",
    familySpend: "₹10,000 (Family)",
    jointSpend: "₹20,000 (Joint)",
    familySavesMonth: "Your Family Saves Every Month",
    yearlySavingsCallout: "That's {amount} in yearly family savings!",
    nextDeliveryBatch: "Next Delivery: Sunday, Nov 2nd",
    orderNow: "Order Now",

    // Categories Section
    exploreCategories: "Explore by Grocery Category",
    exploreCategoriesSub: "Sourced directly from Andhra mandi yards & specialty mills",
    viewAllProducts: "View All ({count} Products)",

    // Monthly Baskets
    oneClickPacksBadge: "One-Click Monthly Packs",
    curatedBasketsTitle: "Curated Monthly Andhra Grocery Baskets",
    curatedBasketsSub: "Select your family size, get all your rice, dals, oils, atta and spices added with 1 click at maximum wholesale discount.",
    mostPopularBadge: "Community Top Choice",
    oneClickBasketBtn: "1-Click Basket",
    saveVsMrp: "Save {savings} (Direct Mandi Rate)",

    // Bundles Info
    bundleSmallTitle: "Couple & Small Family Basket",
    bundleSmallSub: "Essentials for 2-3 members for full month",
    bundleSmallTarget: "2 - 3 Members",

    bundleStandardTitle: "Standard Andhra Family Mega Basket",
    bundleStandardSub: "Complete monthly staples for 4-5 members",
    bundleStandardTarget: "4 - 5 Members (Most Popular)",

    bundleHealthyTitle: "Healthy Living & Joint Family Basket",
    bundleHealthySub: "Native millets, cold-pressed oils & dry fruits",
    bundleHealthyTarget: "5+ Members & Health Conscious",

    // Featured Mandi Staples
    featuredTitle: "Featured Wholesale Mandi Staples",
    featuredSub: "Bulk 25kg rice bags, 5L oils, and unpolished pulses ordered most by apartment families",
    seeFullCatalogue: "See Full Catalogue",
    addBtn: "Add",
    mandiBulkRateLabel: "Mandi Bulk Rate",
    savePercent: "Save ₹{amount} ({percent}% OFF)",

    // Price Comparison
    compareTag: "Transparent Mandi Economics",
    compareTitle: "Supermarket Retail vs Mana Community Hub",
    compareSub: "See why apartment families across communities are saving ₹1,500 - ₹2,500 every single month.",
    colStaple: "Staple Product",
    colMrp: "Supermarket MRP",
    colHubPrice: "Mana Hub Bulk Price",
    colSaves: "Your Flat Saves",
    colSourcing: "Sourcing Point",

    // Testimonials
    testimonialsTag: "Voices From Your Neighborhood",
    testimonialsTitle: "Loved By Families Across Apartment Communities",

    // Catalogue Page
    catalogueHeaderTag: "Mandi Wholesale Grocery Store",
    catalogueHeaderTitle: "Monthly Grocery Catalogue",
    catalogueHeaderSub: "Direct wholesale prices on staples for apartment families. Delivered free on monthly batch day.",
    searchPlaceholder: "Search Sona Masoori, Toor Dal, Freedom Oil, Atta, Guntur Chilli...",
    allBrands: "All Brands & Mandi Sources",
    sortFeatured: "Featured / Best Deals",
    sortPriceAsc: "Price: Low to High",
    sortPriceDesc: "Price: High to Low",
    sortSavings: "Biggest Savings (₹)",
    sortName: "Product Name (A-Z)",
    allProductsLabel: "All Products",
    showingItemsCount: "Showing {count} wholesale staples",
    clearAllFilters: "Clear All Filters",
    noProductsFound: "No matching products found",
    tryAdjustingSearch: "Try adjusting your search query or reset category filter.",
    resetFiltersBtn: "Reset Filters",

    // Cart Drawer
    basketDrawerTitle: "Your Monthly Basket",
    bulkLoadLabel: "{count} Products • {weight} kg bulk load",
    noAptSelected: "No apartment selected",
    changeBtn: "Change",
    wholesaleSavingsBanner: "Community Wholesale Savings: ₹{savings} ({percent}% OFF)",
    mandiRatesBadge: "Mandi Rates",
    basketEmptyTitle: "Your basket is empty",
    basketEmptyDesc: "Add Rice bags, cold-pressed oils, unpolished dals, and spices directly from wholesale mandis.",
    retailMarketMrpValue: "Retail Market MRP Value",
    commSavingsLabel: "Community Bulk Savings ({percent}% OFF)",
    aptDeliveryLabel: "Apartment Society Delivery",
    freeConsolidated: "FREE (Bulk Consolidated)",
    totalPayable: "Total Order Value",
    paymentNoteBadge: "Verified UPI QR code scan or Cash on Apartment Drop Day",
    proceedToCheckoutBtn: "Proceed to Checkout",

    // Checkout Page
    backToCatalogue: "Back to Grocery Catalogue",
    checkoutMainTitle: "Confirm Your Apartment Monthly Order",
    checkoutMainSub: "Review delivery flat details and select payment method for wholesale mandi pricing.",
    step1Title: "1. Delivery Flat & Society Information",
    step1Sub: "Your carton will be labeled with your flat number",
    aptSelectLabel: "Apartment Society *",
    towerBlockLabel: "Tower / Block *",
    flatNumberLabel: "Flat Number *",
    residentNameLabel: "Resident Name *",
    phoneLabel: "WhatsApp Phone Number *",
    phoneHint: "For delivery OTP & dispatch status",
    deliveryNotesLabel: "Delivery Notes / Gate Instructions (Optional)",
    step2Title: "2. Delivery Batch Schedule",
    step2Sub: "Consolidated bulk delivery directly to your society",
    activeBatchLabel: "Active Batch:",
    ordersCutoffLabel: "Orders Cutoff:",
    dispatchDeliveryLabel: "Dispatch & Delivery:",
    freeDropLabel: "Society Consolidated Drop:",
    step3Title: "3. Payment Preference",
    step3Sub: "Lean MVP verified payment workflow",
    payUpiOptionTitle: "Scan & Pay via UPI (GPay / PhonePe / Paytm)",
    payUpiOptionSub: "Instant QR code scan with 12-digit UTR confirmation",
    payCodOptionTitle: "Pay on Delivery Day at Apartment Lobby",
    payCodOptionSub: "Cash or instant UPI scan to delivery volunteer",
    recommendedBadge: "Recommended",
    placeMonthlyOrderBtn: "Place Monthly Order (₹{amount})",
    submittingOrderBtn: "Submitting Order...",
    basketSummaryTitle: "Monthly Basket Summary",

    // Tracking Page
    trackPageTag: "Batch & Household Tracking",
    trackPageTitle: "Track Your Monthly Order",
    trackPageSub: "Follow your apartment order from mandi wholesale procurement to lobby delivery.",
    searchOrderInputPlaceholder: "Enter Order Code (e.g. CGH-VIJ-1001) or WhatsApp Number (9848022338)...",
    trackOrderBtn: "Track Order",
    trySampleOrders: "Try sample orders:",
    timelineTitle: "Order Fulfillment Timeline:",
    deliveryBatchLabel: "Delivery Batch",
    paymentStatusLabel: "Payment Status",
    residentContactLabel: "Resident Contact",
    groceriesInPackage: "Groceries in Your Package ({count}):",

    // Order Stages
    stage_ORDER_PLACED: "Order Placed",
    stage_ORDER_PLACED_desc: "Household order submitted",
    stage_PAYMENT_CONFIRMED: "Payment Confirmed",
    stage_PAYMENT_CONFIRMED_desc: "UPI / COD verified",
    stage_SUPPLIER_ORDER_FINALIZED: "Mandi Procurement",
    stage_SUPPLIER_ORDER_FINALIZED_desc: "Combined wholesale mill order",
    stage_HUB_PACKED: "Packed for Household",
    stage_HUB_PACKED_desc: "Labeled carton prepared",
    stage_DELIVERED: "Delivered to Apartment",
    stage_DELIVERED_desc: "Lobby drop completed",

    // Footer
    footerAbout: "A collective bulk grocery platform for apartment communities and gated societies. Empowering families to bypass retail supermarket markups by aggregating demand and sourcing directly from millers and mandi yards.",
    footerTrustBadge: "Tested & trusted across 15+ apartment communities",
    footerHowItWorksTitle: "How Bulk Buying Works",
    footerStep1: "Families in your apartment select their monthly staples before cutoff date.",
    footerStep2: "Our hub combines total bags of rice, tins of oil, and dals for wholesale procurement.",
    footerStep3: "Goods are packed household-wise into labeled family cartons.",
    footerStep4: "Free bulk delivery right to your apartment lobby / doorstep on Batch Day.",
    footerActiveHubsTitle: "Active Communities & Hubs",
    footerProposeSociety: "+ Propose your society with 5+ flats!",
    footerHelplineTitle: "Hub Support & WhatsApp",
    footerHelplinePhone: "+91 98480 22338 (Customer Helpline)",
    footerWhatsAppGroup: "WhatsApp Community Broadcast Group",
    footerFacility: "Direct Wholesale Mill & Mandi Network",
  },

  te: {
    // Navigation & Common
    appTitle: "మన గ్రోసరీ హబ్",
    appSubtitle: "అపార్ట్‌మెంట్ కమ్యూనిటీల బల్క్ కిరాణా సేకరణ",
    announcement: "తదుపరి డైరెక్ట్ మండి బ్యాచ్ కటాఫ్: 30 అక్టోబర్ • మీ అపార్ట్‌మెంట్ లాబీకి ఉచిత బల్క్ డెలివరీ",
    helpline: "హబ్ హెల్ప్‌లైన్",
    mandiDirect: "కర్నూలు & గుంటూరు మండిల నుండి నేరుగా",
    yourApartment: "మీ అపార్ట్‌మెంట్",
    selectApartment: "అపార్ట్‌మెంట్ ఎంచుకోండి",
    selectCity: "నగరం ఎంచుకోండి",
    allCities: "అన్ని నగరాలు",
    home: "హోమ్",
    catalogue: "కిరాణా కేటలాగ్",
    trackOrder: "ఆర్డర్ ట్రాక్",
    cart: "బుట్ట",
    theme: "థీమ్",
    language: "భాష",
    english: "English",
    telugu: "తెలుగు",

    // Hero Section
    communityPill: "అపార్ట్‌మెంట్ కుటుంబాల బల్క్ కిరాణా హబ్",
    heroTitlePart1: "మీ అపార్ట్‌మెంట్ పొరుగువారితో కలిసి",
    heroTitleHighlight: "నేరుగా మండి నుండే",
    heroTitlePart2: "కిరాణా కొనుగోలు చేయండి.",
    heroQuote: '"కర్నూలు బియ్యం మిల్లులు, గుంటూరు మిర్చి యార్డ్ నుండి నేరుగా మీ అపార్ట్‌మెంట్ కే డెలివరీ."',
    heroDesc: "సూపర్‌మార్కెట్ అధిక ధరలు ఎందుకు చెల్లించాలి? మీ సొసైటీతో కలిసి నెలవారీ నిత్యావసర ఆర్డర్లను ఇవ్వండి. మేము ఉమ్మడిగా హోల్‌సేల్ మండి ధరలకు సేకరించి, ప్రతి ఫ్లాట్‌కు ప్యాక్ చేసి మీ అపార్ట్‌మెంట్ లాబీకి ఉచితంగా డెలివరీ చేస్తాము.",
    browseMonthlyCatalogue: "నెలవారీ కేటలాగ్ చూడండి",
    directMandiSavings: "మండి డైరెక్ట్ పొదుపు",
    freeSocietyDrop: "ఉచిత సొసైటీ డెలివరీ",
    agedRiceBadge: "18 నెలల పాత సోనా మసూరి",

    // Calculator
    calculatorTitle: "అపార్ట్‌మెంట్ పొదుపు కాలిక్యులేటర్",
    calculatorSubtitle: "మీ ఫ్లాట్ ఎంత ఆదా చేస్తుందో లెక్కించండి",
    cheaperBadge: "~22% తక్కువ ధర",
    currentMonthlySpend: "మీ ప్రస్తుత నెలవారీ కిరాణా ఖర్చు:",
    coupleSpend: "₹3,000 (ఇద్దరు)",
    familySpend: "₹10,000 (కుటుంబం)",
    jointSpend: "₹20,000 (ఉమ్మడి కుటుంబం)",
    familySavesMonth: "ప్రతి నెలా మీ కుటుంబం ఆదా చేసే మొత్తం",
    yearlySavingsCallout: "సంవత్సరానికి మొత్తం {amount} కుటుంబ పొదుపు!",
    nextDeliveryBatch: "తదుపరి డెలివరీ: ఆదివారం, నవంబర్ 2",
    orderNow: "ఇప్పుడే ఆర్డర్ చేయండి",

    // Categories Section
    exploreCategories: "కేటగిరీల వారీగా చూడండి",
    exploreCategoriesSub: "ఆంధ్ర మండి యార్డులు & ప్రత్యేక మిల్లుల నుండి నేరుగా",
    viewAllProducts: "అన్నీ చూడండి ({count} వస్తువులు)",

    // Monthly Baskets
    oneClickPacksBadge: "1-క్లిక్ నెలవారీ ప్యాక్‌లు",
    curatedBasketsTitle: "నెలవారీ ఆంధ్ర కిరాణా ప్యాక్‌లు",
    curatedBasketsSub: "మీ కుటుంబ పరిమాణాన్ని ఎంచుకోండి, బియ్యం, పప్పులు, నూనెలు, పిండి, మసాలాలు 1-క్లిక్‌తో గరిష్ట హోల్‌సేల్ డిస్కౌంట్‌తో పొందండి.",
    mostPopularBadge: "అత్యంత ప్రజాదరణ పొందినవి",
    oneClickBasketBtn: "1-క్లిక్ బాస్కెట్",
    saveVsMrp: "₹{savings} ఆదా (మండి హోల్‌సేల్ రేటు)",

    // Bundles Info
    bundleSmallTitle: "చిన్న కుటుంబం ప్యాక్ (2-3 సభ్యులు)",
    bundleSmallSub: "నెల మొత్తానికి సరిపడా ముఖ్య నిత్యావసరాలు",
    bundleSmallTarget: "2 - 3 సభ్యులు",

    bundleStandardTitle: "స్టాండర్డ్ ఆంధ్ర ఫ్యామిలీ మెగా ప్యాక్",
    bundleStandardSub: "4-5 సభ్యుల పూర్తి నెలవారీ కిరాణా సరుకులు",
    bundleStandardTarget: "4 - 5 సభ్యులు (అత్యంత జనాదరణ)",

    bundleHealthyTitle: "ఆరోగ్య & ఉమ్మడి కుటుంబ ప్యాక్",
    bundleHealthySub: "దేశీ చిరుధాన్యాలు, గానుగ నూనెలు & డ్రై ఫ్రూట్స్",
    bundleHealthyTarget: "5+ సభ్యులు & ఆరోగ్య ప్రియులు",

    // Featured Mandi Staples
    featuredTitle: "ప్రధాన హోల్‌సేల్ మండి నిత్యావసరాలు",
    featuredSub: "అపార్ట్‌మెంట్ కుటుంబాలు ఎక్కువగా ఆర్డర్ చేసే 25కేజీల బియ్యం బస్తాలు, 5లీటర్ల నూనెలు, పప్పులు",
    seeFullCatalogue: "పూర్తి కేటలాగ్ చూడండి",
    addBtn: "జోడించు",
    mandiBulkRateLabel: "మండి బల్క్ రేటు",
    savePercent: "₹{amount} ఆదా ({percent}% తగ్గింపు)",

    // Price Comparison
    compareTag: "పారదర్శక మండి లెక్కలు",
    compareTitle: "సూపర్‌మార్కెట్ రిటైల్ vs మన కమ్యూనిటీ హబ్",
    compareSub: "అపార్ట్‌మెంట్ కుటుంబాలు ప్రతి నెలా ₹1,500 - ₹2,500 ఎందుకు ఆదా చేస్తున్నాయో చూడండి.",
    colStaple: "నిత్యావసర సరుకు",
    colMrp: "సూపర్‌మార్కెట్ MRP",
    colHubPrice: "మన హబ్ బల్క్ ధర",
    colSaves: "మీ ఫ్లాట్ పొదుపు",
    colSourcing: "సేకరణ కేంద్రం",

    // Testimonials
    testimonialsTag: "మీ చుట్టుపక్కల అపార్ట్‌మెంట్ల అనుభవాలు",
    testimonialsTitle: "అపార్ట్‌మెంట్ కుటుంబాల విస్తృత ఆదరణ",

    // Catalogue Page
    catalogueHeaderTag: "మండి హోల్‌సేల్ కిరాణా స్టోర్",
    catalogueHeaderTitle: "నెలవారీ కిరాణా కేటలాగ్",
    catalogueHeaderSub: "అపార్ట్‌మెంట్ కుటుంబాలకు నేరుగా హోల్‌సేల్ ధరలు. నెలవారీ బ్యాచ్ రోజున ఉచిత డెలివరీ.",
    searchPlaceholder: "సోనా మసూరి, కంది పప్పు, సన్‌ఫ్లవర్ ఆయిల్, గోధుమ పిండి, కారం వెతకండి...",
    allBrands: "అన్ని బ్రాండ్లు & మండి వనరులు",
    sortFeatured: "ప్రధానమైనవి / ఉత్తమ ఆఫర్లు",
    sortPriceAsc: "ధర: తక్కువ నుండి ఎక్కువ",
    sortPriceDesc: "ధర: ఎక్కువ నుండి తక్కువ",
    sortSavings: "అత్యధిక పొదుపు (₹)",
    sortName: "పేరు ప్రకారం (A-Z)",
    allProductsLabel: "అన్ని వస్తువులు",
    showingItemsCount: "మొత్తం {count} నాణ్యమైన హోల్‌సేల్ సరుకులు అందుబాటులో ఉన్నాయి",
    clearAllFilters: "ఫిల్టర్లు తొలగించండి",
    noProductsFound: "ఎటువంటి వస్తువులు కనుగొనబడలేదు",
    tryAdjustingSearch: "మీ శోధన పదాన్ని మార్చండి లేదా ఫిల్టర్లను రీసెట్ చేయండి.",
    resetFiltersBtn: "రీసెట్ చేయండి",

    // Cart Drawer
    basketDrawerTitle: "మీ నెలవారీ బుట్ట",
    bulkLoadLabel: "{count} వస్తువులు • {weight} కేజీల బల్క్ లోడ్",
    noAptSelected: "అపార్ట్‌మెంట్ ఎంపిక చేయలేదు",
    changeBtn: "మార్చండి",
    wholesaleSavingsBanner: "కమ్యూనిటీ హోల్‌సేల్ పొదుపు: ₹{savings} ({percent}% తగ్గింపు)",
    mandiRatesBadge: "మండి రేట్లు",
    basketEmptyTitle: "మీ బుట్ట ఖాళీగా ఉంది",
    basketEmptyDesc: "విజయవాడ హోల్‌సేల్ మండి నుండి బియ్యం బస్తాలు, గానుగ నూనెలు, నాణ్యమైన పప్పులు, మసాలాలు జోడించండి.",
    retailMarketMrpValue: "మార్కెట్ MRP విలువ",
    commSavingsLabel: "కమ్యూనిటీ బల్క్ పొదుపు ({percent}% తగ్గింపు)",
    aptDeliveryLabel: "అపార్ట్‌మెంట్ సొసైటీ డెలివరీ",
    freeConsolidated: "ఉచితం (కన్సాలిడేటెడ్ డెలివరీ)",
    totalPayable: "మొత్తం ఆర్డర్ విలువ",
    paymentNoteBadge: "డెలివరీ రోజున UPI క్యూఆర్ స్కాన్ లేదా నగదు చెల్లింపు",
    proceedToCheckoutBtn: "చెక్‌అవుట్‌కు వెళ్లండి",

    // Checkout Page
    backToCatalogue: "కిరాణా కేటలాగ్‌కు తిరిగి వెళ్ళండి",
    checkoutMainTitle: "మీ అపార్ట్‌మెంట్ నెలవారీ ఆర్డర్‌ను నిర్ధారించండి",
    checkoutMainSub: "ఫ్లాట్ వివరాలు సరిచూసి హోల్‌సేల్ మండి ధరల కోసం చెల్లింపు విధానాన్ని ఎంచుకోండి.",
    step1Title: "1. డెలివరీ ఫ్లాట్ & సొసైటీ వివరాలు",
    step1Sub: "మీ ఫ్లాట్ నంబర్‌తో బాక్స్ స్పష్టంగా లేబుల్ చేయబడుతుంది",
    aptSelectLabel: "విజయవాడలోని మీ అపార్ట్‌మెంట్ సొసైటీ *",
    towerBlockLabel: "టవర్ / బ్లాక్ *",
    flatNumberLabel: "ఫ్లాట్ నంబర్ *",
    residentNameLabel: "నివాసి పేరు *",
    phoneLabel: "వాట్సాప్ మొబైల్ నంబర్ *",
    phoneHint: "డెలివరీ OTP మరియు సమాచారం కోసం",
    deliveryNotesLabel: "గేట్ / డెలివరీ సూచనలు (ఐచ్ఛికం)",
    step2Title: "2. డెలివరీ బ్యాచ్ షెడ్యూల్",
    step2Sub: "మీ సొసైటీకి నేరుగా ఉచిత బల్క్ డెలివరీ",
    activeBatchLabel: "ప్రస్తుత బ్యాచ్:",
    ordersCutoffLabel: "ఆర్డర్ల కటాఫ్ సమయం:",
    dispatchDeliveryLabel: "డిస్పాచ్ & డెలివరీ తేదీ:",
    freeDropLabel: "సొసైటీ ఉమ్మడి డెలివరీ:",
    step3Title: "3. చెల్లింపు ప్రాధాన్యత",
    step3Sub: "ధృవీకరించబడిన సులభ చెల్లింపు విధానం",
    payUpiOptionTitle: "UPI ద్వారా స్కాన్ చేసి చెల్లించండి (GPay / PhonePe / Paytm)",
    payUpiOptionSub: "12-అంకెల UTR నంబర్‌తో తక్షణ ధృవీకరణ",
    payCodOptionTitle: "అపార్ట్‌మెంట్ లాబీలో డెలివరీ రోజున చెల్లించండి",
    payCodOptionSub: "నగదు లేదా డెలివరీ వాలంటీర్‌కు UPI స్కాన్",
    recommendedBadge: "సిఫార్సు చేయబడినది",
    placeMonthlyOrderBtn: "నెలవారీ ఆర్డర్ ఇవ్వండి (₹{amount})",
    submittingOrderBtn: "ఆర్డర్ సమర్పిస్తున్నాము...",
    basketSummaryTitle: "నెలవారీ బుట్ట సారాంశం",

    // Tracking Page
    trackPageTag: "బ్యాచ్ & కుటుంబ ట్రాకింగ్",
    trackPageTitle: "మీ నెలవారీ ఆర్డర్‌ను ట్రాక్ చేయండి",
    trackPageSub: "మండి సేకరణ నుండి మీ అపార్ట్‌మెంట్ లాబీ డెలివరీ వరకు ఆర్డర్ ప్రయాణాన్ని అనుసరించండి.",
    searchOrderInputPlaceholder: "ఆర్డర్ కోడ్ (ఉదా: CGH-VIJ-1001) లేదా వాట్సాప్ నంబర్ (9848022338) ఎంటర్ చేయండి...",
    trackOrderBtn: "ట్రాక్ చేయండి",
    trySampleOrders: "నమూనా ఆర్డర్లను ప్రయత్నించండి:",
    timelineTitle: "ఆర్డర్ డెలివరీ దశలు:",
    deliveryBatchLabel: "డెలివరీ బ్యాచ్",
    paymentStatusLabel: "చెల్లింపు స్థితి",
    residentContactLabel: "నివాసి సంప్రదింపు",
    groceriesInPackage: "మీ ప్యాకేజీలోని వస్తువులు ({count}):",

    // Order Stages
    stage_ORDER_PLACED: "ఆర్డర్ పూర్తయింది",
    stage_ORDER_PLACED_desc: "కుటుంబ ఆర్డర్ నమోదైంది",
    stage_PAYMENT_CONFIRMED: "చెల్లింపు ధృవీకరించబడింది",
    stage_PAYMENT_CONFIRMED_desc: "UPI / నగదు ధృవీకరణ పూర్తయింది",
    stage_SUPPLIER_ORDER_FINALIZED: "మండి సేకరణ",
    stage_SUPPLIER_ORDER_FINALIZED_desc: "ఉమ్మడి హోల్‌సేల్ మిల్లు ఆర్డర్",
    stage_HUB_PACKED: "కుటుంబ బాక్స్ ప్యాక్ అయింది",
    stage_HUB_PACKED_desc: "ఫ్లాట్ నంబర్ లేబుల్‌తో సిద్ధమైంది",
    stage_DELIVERED: "డెలివరీ పూర్తయింది",
    stage_DELIVERED_desc: "అపార్ట్‌మెంట్ లాబీకి అందజేయబడింది",

    // Footer
    footerAbout: "అపార్ట్‌మెంట్ కమ్యూనిటీలు మరియు గేటెడ్ సొసైటీల సామూహిక కిరాణా వేదిక. రిటైల్ సూపర్ మార్కెట్ ధరలను దాటవేసి, మిల్లులు మరియు మండిల నుండి నేరుగా సేకరించడం ద్వారా కుటుంబాలకు 20-25% ఆదా కల్పిస్తున్నాము.",
    footerTrustBadge: "15+ ప్రముఖ అపార్ట్‌మెంట్ సొసైటీల విశ్వాసం",
    footerHowItWorksTitle: "బల్క్ బయ్యింగ్ ఎలా పనిచేస్తుంది",
    footerStep1: "కటాఫ్ తేదీలోపు మీ అపార్ట్‌మెంట్ కుటుంబాలు నెలవారీ ఆర్డర్లను ఇస్తాయి.",
    footerStep2: "మా హబ్ మొత్తం బియ్యం బస్తాలు, నూనె డబ్బాలు, పప్పుల అవసరాన్ని ఉమ్మడిగా సేకరిస్తుంది.",
    footerStep3: "ప్రతి కుటుంబానికి విడివిడిగా లేబుల్ చేసిన బాక్స్‌లలో సరుకులు ప్యాక్ చేస్తాము.",
    footerStep4: "బ్యాచ్ రోజున మీ అపార్ట్‌మెంట్ లాబీ వద్దకు ఉచితంగా బల్క్ డెలివరీ చేరుతుంది.",
    footerActiveHubsTitle: "యాక్టివ్ కమ్యూనిటీలు & హబ్‌లు",
    footerProposeSociety: "+ 5 కంటే ఎక్కువ ఫ్లాట్లతో మీ సొసైటీని జోడించండి!",
    footerHelplineTitle: "హబ్ సపోర్ట్ & వాట్సాప్",
    footerHelplinePhone: "+91 98480 22338 (కస్టమర్ హెల్ప్‌లైన్)",
    footerWhatsAppGroup: "వాట్సాప్ కమ్యూనిటీ గ్రూప్",
    footerFacility: "డైరెక్ట్ హోల్‌సేల్ మిల్లు & మండి నెట్‌వర్క్",
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('cgh_language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('cgh_language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'te' : 'en'));
  };

  const t = (key, params = {}) => {
    let text = TRANSLATIONS[language]?.[key] || TRANSLATIONS['en']?.[key] || key;
    if (params) {
      Object.keys(params).forEach(k => {
        text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), params[k]);
      });
    }
    return text;
  };

  // Helper to choose product title according to current language
  const getProductTitle = (product) => {
    if (language === 'te' && product.telugu_name) {
      return product.telugu_name;
    }
    return product.name;
  };

  // Helper to choose category title according to current language
  const getCategoryTitle = (category) => {
    if (language === 'te' && category.telugu_name) {
      return category.telugu_name;
    }
    return category.name;
  };

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      toggleLanguage,
      t,
      getProductTitle,
      getCategoryTitle
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
