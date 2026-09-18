/**
 * MDMA SPICES AND FOODS — Centralized Product Catalog & Helper API
 */

const MDMA_PRODUCTS = [
  // --- Ground Spices ---
  {
    id: 1,
    name: "Pure Salem Turmeric Powder",
    slug: "pure-salem-turmeric-powder",
    category: "Ground Spices",
    categorySlug: "ground-spices",
    price: 180,
    oldPrice: 220,
    rating: 4.9,
    reviewCount: 142,
    badge: "Bestseller",
    badgeType: "bestseller",
    inStock: true,
    featured: true,
    weightOptions: ["100g", "250g", "500g", "1kg"],
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "High-curcumin golden turmeric ground from select Salem fingers for vibrant color and deep earthly aroma.",
    description: "Our MDMA Pure Salem Turmeric Powder is sourced directly from heritage spice farmers in Salem, Tamil Nadu. Sun-dried and slow ground at cold temperatures to preserve its natural volatile oils, rich 3.5%+ active curcumin content, and radiant golden tint.",
    ingredients: "100% Pure Salem Turmeric Rhizomes (Curcuma longa). No added colors, fillers, or starches.",
    nutrition: "Per 100g: Energy 354 kcal, Protein 7.8g, Carbohydrates 64.9g, Fat 9.9g, Dietary Fiber 21.1g.",
    storage: "Store in a cool, dark and dry place inside an airtight glass or ceramic container away from direct sunlight.",
    features: ["High Active Curcumin", "Cold Ground Technology", "Zero Artificial Additives", "Hygienically Packed"]
  },
  {
    id: 2,
    name: "Guntur Stemless Red Chilli Powder",
    slug: "guntur-red-chilli-powder",
    category: "Ground Spices",
    categorySlug: "ground-spices",
    price: 210,
    oldPrice: 260,
    rating: 4.8,
    reviewCount: 98,
    badge: "Hot Deal",
    badgeType: "sale",
    inStock: true,
    featured: true,
    weightOptions: ["100g", "250g", "500g", "1kg"],
    image: "https://images.unsplash.com/photo-1583064313642-a7c14d49a5a1?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1583064313642-a7c14d49a5a1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Fiery red, intensely aromatic chilli powder ground from 100% stemless sun-ripened Guntur Sanam chillies.",
    description: "Experience the authentic pungent warmth of Andhra cuisine. MDMA Guntur Red Chilli Powder uses only destemmed chillies slow-pulverized to preserve natural capsaicin and a rich natural crimson hue without artificial dyes.",
    ingredients: "100% Destemmed Guntur Chillies (Capsicum annuum).",
    nutrition: "Per 100g: Energy 318 kcal, Protein 12.0g, Carbohydrates 56.6g, Fat 16.8g.",
    storage: "Store sealed in an airtight container in a dry pantry away from moisture.",
    features: ["Stemless Sourcing", "Rich Natural Red Hue", "Bold Authentic Pungency", "Moisture Controlled"]
  },
  {
    id: 3,
    name: "Roasted Cumin (Jeera) Powder",
    slug: "roasted-cumin-powder",
    category: "Ground Spices",
    categorySlug: "ground-spices",
    price: 195,
    oldPrice: 240,
    rating: 4.9,
    reviewCount: 86,
    badge: "Natural",
    badgeType: "organic",
    inStock: true,
    featured: false,
    weightOptions: ["100g", "250g", "500g"],
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Artisanal slow-roasted cumin seeds powdered to perfection for chaats, raitas, and curries.",
    description: "Roasted in small batches over low embers before fine stone grinding. Gives that quintessential smoky warmth and earthy aroma to daily meals, buttermilk, salads, and gravies.",
    ingredients: "100% Roasted Unadulterated Cumin Seeds.",
    nutrition: "Per 100g: Energy 375 kcal, Protein 17.8g, Fat 22.3g, Iron 66.4mg.",
    storage: "Keep in a dark, dry container to lock in the roasted essential oils.",
    features: ["Slow Wood-Roast Aroma", "Stone Ground", "Aromatic Essential Oils Intact"]
  },
  {
    id: 4,
    name: "Fragrant Coriander (Dhania) Powder",
    slug: "fragrant-coriander-powder",
    category: "Ground Spices",
    categorySlug: "ground-spices",
    price: 160,
    oldPrice: 190,
    rating: 4.7,
    reviewCount: 64,
    badge: "Pure",
    badgeType: "organic",
    inStock: true,
    featured: false,
    weightOptions: ["200g", "500g", "1kg"],
    image: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Sweet, citrusy coriander powder made from premium Rajasthan green coriander seeds.",
    description: "Freshly harvested coriander seeds ground with care to retain their natural lemony zest, cooling properties, and delicate herbal fragrance.",
    ingredients: "100% Whole Coriander Seeds.",
    nutrition: "Per 100g: Energy 298 kcal, Dietary Fiber 41.9g.",
    storage: "Store airtight in a dry cabinet.",
    features: ["Citrus Undertones", "Cooling Properties", "Fine Powder Mesh"]
  },

  // --- Whole Spices ---
  {
    id: 5,
    name: "Malabar Bold Black Pepper",
    slug: "malabar-bold-black-pepper",
    category: "Whole Spices",
    categorySlug: "whole-spices",
    price: 380,
    oldPrice: 450,
    rating: 5.0,
    reviewCount: 210,
    badge: "King of Spices",
    badgeType: "bestseller",
    inStock: true,
    featured: true,
    weightOptions: ["100g", "250g", "500g", "1kg"],
    image: "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Tellicherry grade bold black peppercorns harvested from the high-altitude hills of Kerala.",
    description: "Large, mature, uniform peppercorns with a robust pungent bite and lingering floral heat. The true black gold of the Malabar Coast.",
    ingredients: "100% Whole Dried Black Peppercorns (Piper nigrum).",
    nutrition: "Per 100g: Energy 251 kcal, Piperine 5.2%.",
    storage: "Keep in a cool, dry spice jar.",
    features: ["Extra Large Peppercorn Grade", "High Piperine Heat", "Handpicked Quality"]
  },
  {
    id: 6,
    name: "Royal Idukki Green Cardamom (8mm+)",
    slug: "royal-idukki-green-cardamom",
    category: "Whole Spices",
    categorySlug: "whole-spices",
    price: 650,
    oldPrice: 780,
    rating: 4.9,
    reviewCount: 175,
    badge: "Exotic",
    badgeType: "bestseller",
    inStock: true,
    featured: true,
    weightOptions: ["50g", "100g", "250g", "500g"],
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Lush, plump 8mm jumbo green cardamom pods loaded with fragrant black aromatic seeds.",
    description: "Sourced from the misty valleys of Idukki, Kerala. Known as the Queen of Spices, each pod delivers an exquisite sweet-eucalyptus fragrance ideal for royal curries, biryanis, desserts, and chai.",
    ingredients: "100% Natural Whole Green Cardamom Pods.",
    nutrition: "Rich in Cineole and natural antioxidant terpenes.",
    storage: "Airtight vacuum pack or sealed container.",
    features: ["8mm+ Bold Pods", "Vibrant Natural Green", "Intense Sweet Aroma"]
  },
  {
    id: 7,
    name: "Zanzibar Clove Buds (Laung)",
    slug: "zanzibar-clove-buds",
    category: "Whole Spices",
    categorySlug: "whole-spices",
    price: 290,
    oldPrice: 340,
    rating: 4.8,
    reviewCount: 89,
    badge: "Pure",
    badgeType: "organic",
    inStock: true,
    featured: false,
    weightOptions: ["50g", "100g", "250g"],
    image: "https://images.unsplash.com/photo-1563865436874-9aef32095fad?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1563865436874-9aef32095fad?auto=format&fit=crop&w=800&q=80"],
    shortDesc: "Intensely pungent whole clove buds containing high natural eugenol oil content.",
    description: "Fully developed whole clove buds with intact crowning heads. Imparts deep warming sweetness to traditional culinary preparations and wellness teas.",
    ingredients: "100% Whole Clove Buds (Syzygium aromaticum).",
    nutrition: "High natural eugenol essential oil.",
    storage: "Store dry away from humidity.",
    features: ["Intact Crown Heads", "High Oil Retention", "Warm Pungent Flavor"]
  },
  {
    id: 8,
    name: "Ceylon True Cinnamon Quills (Dalchini)",
    slug: "ceylon-true-cinnamon-quills",
    category: "Whole Spices",
    categorySlug: "whole-spices",
    price: 340,
    oldPrice: 410,
    rating: 4.9,
    reviewCount: 114,
    badge: "Low Coumarin",
    badgeType: "organic",
    inStock: true,
    featured: false,
    weightOptions: ["50g", "100g", "250g"],
    image: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80"],
    shortDesc: "Delicate layered true Ceylon cinnamon sticks with low coumarin and subtle woody sweetness.",
    description: "Unlike coarse cassia bark, our true Ceylon cinnamon features paper-thin multiple roll quills with a gentle sweet aroma and soft texture that crumbles effortlessly.",
    ingredients: "100% Pure Ceylon Cinnamon Quills (Cinnamomum verum).",
    nutrition: "Low coumarin (<0.004%), rich in cinnamaldehyde.",
    storage: "Sealed jar in cool cupboard.",
    features: ["Authentic True Cinnamon", "Safe Low Coumarin", "Delicate Sweet Note"]
  },

  // --- Signature Blends ---
  {
    id: 9,
    name: "MDMA Royal Heritage Garam Masala",
    slug: "royal-heritage-garam-masala",
    category: "Signature Blends",
    categorySlug: "signature-blends",
    price: 260,
    oldPrice: 320,
    rating: 5.0,
    reviewCount: 310,
    badge: "Master Blend",
    badgeType: "bestseller",
    inStock: true,
    featured: true,
    weightOptions: ["100g", "250g", "500g"],
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80"],
    shortDesc: "A secret 18-spice royal formulation blended for royal curries, gravies, and slow-cooked delicacies.",
    description: "Crafted with 18 prized whole spices including mace, nutmeg, black cardamom, star anise, shahi jeera, and stone flowers. Gently roasted and blended to bestow an unforgettable royal aroma upon your dishes.",
    ingredients: "Coriander, Cumin, Black Pepper, Cardamom, Cinnamon, Cloves, Mace, Nutmeg, Bay Leaf, Star Anise, Fennel, Stone Flower, Ginger, Caraway.",
    nutrition: "100% Whole Spices with zero added starch or artificial flavoring.",
    storage: "Airtight tin container.",
    features: ["18 Whole Spices Formula", "Royal Mughlai Aroma", "Zero Fillers"]
  },
  {
    id: 10,
    name: "Nawabi Shahi Biryani Masala",
    slug: "nawabi-shahi-biryani-masala",
    category: "Signature Blends",
    categorySlug: "signature-blends",
    price: 240,
    oldPrice: 290,
    rating: 4.9,
    reviewCount: 198,
    badge: "Chef Special",
    badgeType: "bestseller",
    inStock: true,
    featured: true,
    weightOptions: ["100g", "250g", "500g"],
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80"],
    shortDesc: "Authentic Dum Biryani masala infused with Kashmiri saffron notes, kewra essence, and whole spices.",
    description: "Brings the legendary aromas of Old Lucknow and Hyderabad to your home. Designed for layered meat, vegetable, and basmati rice preparations.",
    ingredients: "Kesar Notes, Star Anise, Black Cardamom, Green Cardamom, Mace, Nutmeg, Shah Jeera, Cinnamon, Cloves, Bay Leaf, Rose Petals.",
    nutrition: "Per 100g: Energy 340 kcal.",
    storage: "Cool dry pantry.",
    features: ["Dum Biryani Specialist", "Infused with Rose & Mace", "Rich Golden Rice Hue"]
  },
  {
    id: 11,
    name: "Artisanal Royal Chai Masala",
    slug: "artisanal-royal-chai-masala",
    category: "Signature Blends",
    categorySlug: "signature-blends",
    price: 220,
    oldPrice: 275,
    rating: 4.9,
    reviewCount: 245,
    badge: "Staff Pick",
    badgeType: "bestseller",
    inStock: true,
    featured: true,
    weightOptions: ["100g", "200g"],
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80"],
    shortDesc: "Invigorating tea spice blend with ginger, green cardamom, cinnamon, cloves, and holy tulsi.",
    description: "Transform daily chai into a royal wellness ritual. Formulated with dry ginger warmth, fragrant green cardamom, and subtle herbal tulsi hints.",
    ingredients: "Sun-Dried Ginger, Green Cardamom, Cinnamon, Black Pepper, Cloves, Nutmeg, Tulsi Leaves.",
    nutrition: "Rich in warming antioxidants and digestive botanicals.",
    storage: "Airtight glass bottle.",
    features: ["Digestive Herbs", "Zesty Winter Warmth", "Pairs with Assam Tea"]
  },
  {
    id: 12,
    name: "Pav Bhaji Masala Extra Bold",
    slug: "pav-bhaji-masala-extra-bold",
    category: "Signature Blends",
    categorySlug: "signature-blends",
    price: 175,
    oldPrice: 210,
    rating: 4.8,
    reviewCount: 92,
    badge: "Street Style",
    badgeType: "sale",
    inStock: true,
    featured: false,
    weightOptions: ["100g", "250g"],
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80"],
    shortDesc: "Authentic Mumbai chowpatty street flavor with tangy dried mango and aromatic cumin.",
    description: "Recreate sizzling street-style pav bhaji with the signature tangy, spicy, and buttery notes that delight every palate.",
    ingredients: "Chilli, Coriander, Cumin, Amchur (Dried Mango), Black Pepper, Fennel, Cinnamon, Clove, Star Anise, Rock Salt.",
    nutrition: "Per 100g: Energy 310 kcal.",
    storage: "Dry airtight container.",
    features: ["Mumbai Street Taste", "Tangy Amchur Kick", "Deep Red Color"]
  },

  // --- Organic Herbs & Aromatics ---
  {
    id: 13,
    name: "Kashmiri Mongra Saffron (Grade A1 Kesar)",
    slug: "kashmiri-mongra-saffron",
    category: "Organic Herbs",
    categorySlug: "organic-herbs",
    price: 950,
    oldPrice: 1200,
    rating: 5.0,
    reviewCount: 380,
    badge: "Luxury Gold",
    badgeType: "bestseller",
    inStock: true,
    featured: true,
    weightOptions: ["1g", "2g", "5g"],
    image: "https://images.unsplash.com/photo-1608797178974-15b35a61deda?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1608797178974-15b35a61deda?auto=format&fit=crop&w=800&q=80"],
    shortDesc: "Deep crimson whole stigmas handpicked from the organic saffron fields of Pampore, Kashmir.",
    description: "The crown jewel of Indian spices. MDMA Kashmiri Mongra Saffron features long all-red stigmas with no yellow style tails, yielding phenomenal crocin coloration and floral sweetness.",
    ingredients: "100% Pure Grade A1 Kashmiri Saffron Stigmas (Crocus sativus).",
    nutrition: "High Crocin (color), Picrocrocin (flavor), and Safranal (aroma).",
    storage: "Store in a cool, dark place away from light.",
    features: ["100% All-Red Stigmas", "Pampore Direct Sourcing", "Intense Crimson Color Release"]
  },
  {
    id: 14,
    name: "Nagaur Kasuri Methi (Dried Fenugreek)",
    slug: "nagaur-kasuri-methi",
    category: "Organic Herbs",
    categorySlug: "organic-herbs",
    price: 130,
    oldPrice: 160,
    rating: 4.8,
    reviewCount: 75,
    badge: "Sun Dried",
    badgeType: "organic",
    inStock: true,
    featured: false,
    weightOptions: ["50g", "100g", "200g"],
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80"],
    shortDesc: "Lush green, fragrant dried fenugreek leaves harvested from Nagaur, Rajasthan.",
    description: "Hand-harvested and gently shade-dried to retain clean green leaves and characteristic savoury-bitter herbal fragrance.",
    ingredients: "100% Dried Fenugreek Leaves (Trigonella foenum-graecum).",
    nutrition: "Rich in iron and soluble dietary fibers.",
    storage: "Airtight pouch or tin.",
    features: ["Shade Dried Green Leaves", "No Stems or Sand", "Rich Savoury Aroma"]
  },

  // --- Dry Fruits & Premium Nuts ---
  {
    id: 15,
    name: "Jumbo King Cashew Nuts (W180)",
    slug: "jumbo-king-cashew-nuts",
    category: "Dry Fruits & Nuts",
    categorySlug: "dry-fruits-nuts",
    price: 490,
    oldPrice: 580,
    rating: 4.9,
    reviewCount: 165,
    badge: "Premium Grade",
    badgeType: "bestseller",
    inStock: true,
    featured: true,
    weightOptions: ["250g", "500g", "1kg"],
    image: "https://images.unsplash.com/photo-1563865436874-9aef32095fad?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1563865436874-9aef32095fad?auto=format&fit=crop&w=800&q=80"],
    shortDesc: "Extra-large whole white cashews with crisp crunch and buttery sweet flavor.",
    description: "Hand-graded W180 King size whole cashews. Vacuum packed fresh to maintain buttery creaminess, natural sweetness, and irresistible crunch.",
    ingredients: "100% Raw Whole Cashew Kernels.",
    nutrition: "Per 100g: Energy 553 kcal, Protein 18.2g, Healthy Fats 43.8g.",
    storage: "Refrigerate after opening for lasting crunch.",
    features: ["W180 King Size", "Zero Added Oil or Salt", "Rich in Healthy Monounsaturates"]
  },
  {
    id: 16,
    name: "California Inshell & Whole Almonds",
    slug: "california-whole-almonds",
    category: "Dry Fruits & Nuts",
    categorySlug: "dry-fruits-nuts",
    price: 420,
    oldPrice: 500,
    rating: 4.8,
    reviewCount: 140,
    badge: "Daily Nutrition",
    badgeType: "organic",
    inStock: true,
    featured: false,
    weightOptions: ["250g", "500g", "1kg"],
    image: "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80"],
    shortDesc: "Sweet, crunchy whole almonds rich in natural Vitamin E and dietary protein.",
    description: "Premium Nonpareil variety whole almonds, high in crunch and ideal for morning soaked snacking, baking, and rich gravies.",
    ingredients: "100% Whole Almond Kernels (Prunus dulcis).",
    nutrition: "Per 100g: Energy 579 kcal, Protein 21.1g, Vitamin E 25.6mg.",
    storage: "Cool, dry container.",
    features: ["Nonpareil Supreme Quality", "High Natural Vitamin E", "Zero Preservatives"]
  },

  // --- Traditional Pantry Foods ---
  {
    id: 17,
    name: "Cold-Pressed Kachi Ghani Mustard Oil",
    slug: "cold-pressed-mustard-oil",
    category: "Traditional Foods",
    categorySlug: "traditional-foods",
    price: 240,
    oldPrice: 290,
    rating: 4.9,
    reviewCount: 184,
    badge: "Wood Pressed",
    badgeType: "bestseller",
    inStock: true,
    featured: true,
    weightOptions: ["500ml", "1 Litre", "5 Litres"],
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80"],
    shortDesc: "Traditional Kolhu wood-pressed pungent mustard oil for authentic pickles and curries.",
    description: "Extracted slowly from black mustard seeds without chemical refining or heat treatment. Packed with natural pungency (allylisothiocyanate) and essential Omega-3 fatty acids.",
    ingredients: "100% Pure Cold-Pressed Virgin Mustard Seed Oil.",
    nutrition: "Per 100g: Energy 884 kcal, Monounsaturated Fat 60g, Polyunsaturated Fat 21g.",
    storage: "Keep in a dark glass bottle away from heat.",
    features: ["Kolhu Wood Pressed", "Zero Chemical Refining", "Authentic Pungent Aroma"]
  },
  {
    id: 18,
    name: "Natural Himalayan Pink Rock Salt (Sendha Namak)",
    slug: "himalayan-pink-rock-salt",
    category: "Traditional Foods",
    categorySlug: "traditional-foods",
    price: 110,
    oldPrice: 140,
    rating: 4.8,
    reviewCount: 95,
    badge: "Mineral Rich",
    badgeType: "organic",
    inStock: true,
    featured: false,
    weightOptions: ["500g", "1kg"],
    image: "https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?auto=format&fit=crop&w=800&q=80"],
    shortDesc: "Unrefined pink crystal mineral salt containing 84+ natural trace minerals.",
    description: "Mined from ancient pristine Himalayan salt beds. 100% natural, unbleached, and free from synthetic anti-caking agents.",
    ingredients: "100% Natural Himalayan Pink Mineral Salt.",
    nutrition: "Sodium Chloride ~98%, contains Calcium, Magnesium, Potassium.",
    storage: "Airtight dry container.",
    features: ["84+ Trace Minerals", "Zero Anti-caking Chemicals", "Vrat / Fasting Friendly"]
  }
];

const MDMA_CATEGORIES = [
  {
    name: "Ground Spices",
    slug: "ground-spices",
    count: 4,
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80",
    description: "Aromatic turmeric, fiery chilli, and roasted spice powders ground cold to preserve volatile essential oils."
  },
  {
    name: "Whole Spices",
    slug: "whole-spices",
    count: 4,
    image: "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
    description: "Handpicked Tellicherry peppers, Idukki green cardamom, clove buds, and authentic Ceylon cinnamon quills."
  },
  {
    name: "Signature Blends",
    slug: "signature-blends",
    count: 4,
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
    description: "Time-tested artisanal masala recipes for royal gravies, dum biryani, pav bhaji, and authentic chai."
  },
  {
    name: "Organic Herbs",
    slug: "organic-herbs",
    count: 2,
    image: "https://images.unsplash.com/photo-1608797178974-15b35a61deda?auto=format&fit=crop&w=800&q=80",
    description: "Pampore Mongra saffron stigmas, fragrant Nagaur kasuri methi, and pure botanical garnishes."
  },
  {
    name: "Dry Fruits & Nuts",
    slug: "dry-fruits-nuts",
    count: 2,
    image: "https://images.unsplash.com/photo-1563865436874-9aef32095fad?auto=format&fit=crop&w=800&q=80",
    description: "King-size W180 cashews, California supreme almonds, and nutrient-packed dry pantry staples."
  },
  {
    name: "Traditional Foods",
    slug: "traditional-foods",
    count: 2,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80",
    description: "Cold-pressed virgin mustard oils and unrefined Himalayan pink mineral salts for holistic wellness."
  }
];

// Helper Functions
function getAllProducts() {
  return MDMA_PRODUCTS;
}

function getProductById(id) {
  return MDMA_PRODUCTS.find(p => p.id === parseInt(id));
}

function getProductBySlug(slug) {
  return MDMA_PRODUCTS.find(p => p.slug === slug);
}

function getProductsByCategory(categorySlug) {
  if (!categorySlug || categorySlug === 'all') return MDMA_PRODUCTS;
  return MDMA_PRODUCTS.filter(p => p.categorySlug === categorySlug);
}

function getFeaturedProducts() {
  return MDMA_PRODUCTS.filter(p => p.featured);
}

function searchProducts(query) {
  if (!query) return [];
  const q = query.toLowerCase().trim();
  return MDMA_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(q) || 
    p.category.toLowerCase().includes(q) || 
    p.shortDesc.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q)
  );
}
