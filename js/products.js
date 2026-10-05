/**
 * MDMA SPICES AND FOODS — Centralized Product Catalog & Helper API
 * Master catalog organized into 4 core categories:
 * 1. Dried Fruits and vegetables (using client assets)
 * 2. Dried Spices Powder
 * 3. Pure Cold Preessed Oil
 * 4. Dry Snacks
 */

const MDMA_PRODUCTS = [
  // =========================================================================
  // 1. Dried Fruits and vegetables (Using authentic client assets in assets/clientassets/)
  // =========================================================================
  {
    id: 101,
    name: "Crispy Dehydrated Apple Rings",
    slug: "dehydrated-apple-rings",
    category: "Dried Fruits and vegetables",
    categorySlug: "dehydrated-foods",
    price: 240,
    oldPrice: 290,
    rating: 4.9,
    reviewCount: 82,
    badge: "100% Natural",
    badgeType: "organic",
    inStock: true,
    featured: true,
    weightOptions: ["100g", "200g", "500g"],
    image: "assets/clientassets/dehydrated-apple.jpeg",
    gallery: [
      "assets/clientassets/dehydrated-apple.jpeg"
    ],
    shortDesc: "Slow-dehydrated crisp natural apple slices packed with fiber and natural sweetness without added sugar.",
    description: "Our MDMA Crispy Dehydrated Apple Rings are crafted from crisp orchard-fresh apples dehydrated at optimal low temperatures to retain vitamins, dietary fiber, and natural pectin without sulfur or artificial sweeteners.",
    ingredients: "100% Pure Natural Apples (Malus domestica). Zero added sugar, preservatives, or artificial coloring.",
    nutrition: "Per 100g: Energy 243 kcal, Dietary Fiber 8.7g, Vitamin C 12mg, Potassium 450mg.",
    storage: "Store in a cool, dry place inside an airtight container. Reseal after opening to maintain crunch.",
    features: ["Zero Added Sugar", "Low Temperature Dehydration", "Fiber Rich", "100% Vegan & Gluten Free"]
  },
  {
    id: 102,
    name: "Exotic Dehydrated Dragon Fruit Slices",
    slug: "dehydrated-dragon-fruit-slices",
    category: "Dried Fruits and vegetables",
    categorySlug: "dehydrated-foods",
    price: 320,
    oldPrice: 380,
    rating: 5.0,
    reviewCount: 114,
    badge: "Bestseller",
    badgeType: "bestseller",
    inStock: true,
    featured: true,
    weightOptions: ["100g", "200g", "500g"],
    image: "assets/clientassets/dehydrated-dragon-fruit.jpeg",
    gallery: [
      "assets/clientassets/dehydrated-dragon-fruit.jpeg"
    ],
    shortDesc: "Vibrant ruby red dehydrated dragon fruit wheels rich in antioxidants, prebiotics, and vital micronutrients.",
    description: "Sourced from farm-fresh red pitahayas. Each slice is sun-cured and gently dehydrated to lock in crunchy seeds, dietary fiber, betalains, and natural fruit sugars.",
    ingredients: "100% Pure Red Dragon Fruit (Hylocereus polyrhizus).",
    nutrition: "Per 100g: Energy 260 kcal, Fiber 9.0g, Protein 3.2g, Antioxidants (Betalains).",
    storage: "Keep in a dark, dry container to preserve vibrant color and crisp texture.",
    features: ["Rich in Betalains", "Natural Prebiotic Fiber", "No Artificial Sweeteners", "Gourmet Snack"]
  },
  {
    id: 103,
    name: "Sun-Cured Dehydrated Lime Wheels",
    slug: "dehydrated-lime-wheels",
    category: "Dried Fruits and vegetables",
    categorySlug: "dehydrated-foods",
    price: 190,
    oldPrice: 230,
    rating: 4.8,
    reviewCount: 56,
    badge: "Zesty Pick",
    badgeType: "sale",
    inStock: true,
    featured: true,
    weightOptions: ["100g", "250g", "500g"],
    image: "assets/clientassets/dehydrated-lime.jpeg",
    gallery: [
      "assets/clientassets/dehydrated-lime.jpeg"
    ],
    shortDesc: "Aromatic dehydrated citrus lime wheels perfect for herbal teas, detox infusions, cocktails, and culinary seasoning.",
    description: "Hand-sliced prime green limes dehydrated gently to lock in concentrated citrus essential oils, citric vitality, and tangy flavor. Perfect for detox teas, mocktails, baking, and garnishing.",
    ingredients: "100% Natural Fresh Citrus Limes.",
    nutrition: "Per 100g: Vitamin C 35mg, Citric Bioflavonoids, Zero Fat.",
    storage: "Store sealed in an airtight jar in a dry pantry away from moisture.",
    features: ["Concentrated Citrus Aroma", "Ideal for Detox Teas", "Zero Chemical Bleach", "Gourmet Cocktail Garnish"]
  },
  {
    id: 104,
    name: "Royal Dehydrated Alphonso Mango Slices",
    slug: "dehydrated-mango-slices",
    category: "Dried Fruits and vegetables",
    categorySlug: "dehydrated-foods",
    price: 280,
    oldPrice: 340,
    rating: 4.9,
    reviewCount: 160,
    badge: "Chef's Choice",
    badgeType: "bestseller",
    inStock: true,
    featured: true,
    weightOptions: ["100g", "250g", "500g"],
    image: "assets/clientassets/dehydrated-mango.jpeg",
    gallery: [
      "assets/clientassets/dehydrated-mango.jpeg"
    ],
    shortDesc: "Naturally sweet and chewy Alphonso mango strips made from ripe, sun-blessed Ratnagiri mangoes.",
    description: "Experience the king of fruits year-round. Our dehydrated mango slices are naturally dried without sulfur dioxide or added corn syrups, offering wholesome caramel-like sweetness and rich Vitamin A.",
    ingredients: "100% Naturally Ripened Alphonso Mango Pulp.",
    nutrition: "Per 100g: Energy 319 kcal, Carbohydrates 78g, Vitamin A 1400 IU, Potassium 280mg.",
    storage: "Keep in a cool, airtight pantry jar.",
    features: ["Sun-Ripened Alphonso", "No Added High-Fructose Syrup", "Rich Vitamin A Source", "Chewy Natural Texture"]
  },
  {
    id: 105,
    name: "Sweet Dehydrated Orange Slices",
    slug: "dehydrated-orange-slices",
    category: "Dried Fruits and vegetables",
    categorySlug: "dehydrated-foods",
    price: 220,
    oldPrice: 260,
    rating: 4.8,
    reviewCount: 74,
    badge: "Vitamin C Rich",
    badgeType: "organic",
    inStock: true,
    featured: true,
    weightOptions: ["100g", "250g", "500g"],
    image: "assets/clientassets/dehydrated-orange.jpeg",
    gallery: [
      "assets/clientassets/dehydrated-orange.jpeg"
    ],
    shortDesc: "Golden sun-dried orange wheels bursting with citrus aroma, vitamin C, and authentic fruit essence.",
    description: "Selected Nagpur sweet oranges sliced evenly and dried under controlled airflow to maintain their vibrant orange color and sweet-tart zest.",
    ingredients: "100% Natural Nagpur Sweet Oranges (Citrus sinensis).",
    nutrition: "Per 100g: Vitamin C 45mg, Dietary Fiber 6.2g, Natural Fruit Sugars.",
    storage: "Airtight container in a dry place.",
    features: ["Cold Air Dehydrated", "High Citrus Bioflavonoids", "Great for Snacking & Baking"]
  },
  {
    id: 106,
    name: "Sun-Dried Dehydrated Papaya Chunks",
    slug: "dehydrated-papaya-chunks",
    category: "Dried Fruits and vegetables",
    categorySlug: "dehydrated-foods",
    price: 210,
    oldPrice: 250,
    rating: 4.7,
    reviewCount: 49,
    badge: "Digestive Care",
    badgeType: "organic",
    inStock: true,
    featured: false,
    weightOptions: ["100g", "250g", "500g"],
    image: "assets/clientassets/dehydrated-papaya.jpeg",
    gallery: [
      "assets/clientassets/dehydrated-papaya.jpeg"
    ],
    shortDesc: "Tender, naturally sweet papaya bites loaded with digestive enzymes (papain) and zero artificial dyes.",
    description: "Ripe golden papayas diced and slow-dehydrated to preserve vital digestive enzymes, natural carotenes, and wholesome sweetness.",
    ingredients: "100% Pure Dehydrated Red Papaya.",
    nutrition: "Per 100g: Energy 250 kcal, Papain Enzymes, Vitamin C 30mg.",
    storage: "Store sealed in a cool pantry.",
    features: ["Natural Papain Enzymes", "No Artificial Red Coloring", "Gentle on Digestion"]
  },
  {
    id: 107,
    name: "Crisp Dehydrated Pear Slices",
    slug: "dehydrated-pear-slices",
    category: "Dried Fruits and vegetables",
    categorySlug: "dehydrated-foods",
    price: 230,
    oldPrice: 270,
    rating: 4.8,
    reviewCount: 63,
    badge: "Natural Snack",
    badgeType: "organic",
    inStock: true,
    featured: false,
    weightOptions: ["100g", "250g", "500g"],
    image: "assets/clientassets/dehydrated-pear.jpeg",
    gallery: [
      "assets/clientassets/dehydrated-pear.jpeg"
    ],
    shortDesc: "Delicately sweet pear crisps gently dehydrated at low temperatures to lock in delicate floral flavor and crunch.",
    description: "Fresh orchard pears harvested at crisp ripeness, washed, thinly sliced, and dehydrated without added sugars or artificial additives.",
    ingredients: "100% Pure Natural Pears.",
    nutrition: "Per 100g: Energy 262 kcal, Dietary Fiber 7.5g, Potassium 380mg.",
    storage: "Store in a dry, sealed bag or jar.",
    features: ["High Soluble Fiber", "Naturally Low Glycemic", "Clean Snack"]
  },
  {
    id: 108,
    name: "Tropical Dehydrated Pineapple Rings",
    slug: "dehydrated-pineapple-rings",
    category: "Dried Fruits and vegetables",
    categorySlug: "dehydrated-foods",
    price: 260,
    oldPrice: 310,
    rating: 4.9,
    reviewCount: 128,
    badge: "Tropical Favorite",
    badgeType: "bestseller",
    inStock: true,
    featured: true,
    weightOptions: ["100g", "250g", "500g"],
    image: "assets/clientassets/dehydrated-pineapple.jpeg",
    gallery: [
      "assets/clientassets/dehydrated-pineapple.jpeg"
    ],
    shortDesc: "Tangy-sweet dehydrated pineapple slices brimming with natural bromelain and tropical sunshine.",
    description: "Sun-ripened Queen pineapples cored and sliced into delicious rings. Dehydration concentrates their luscious tropical sweetness while keeping healthy enzymes intact.",
    ingredients: "100% Pure Tropical Pineapple (Ananas comosus).",
    nutrition: "Per 100g: Energy 310 kcal, Vitamin C 36mg, Bromelain.",
    storage: "Keep in a dark, dry container.",
    features: ["Natural Bromelain", "Tangy Sweet Profile", "Zero High-Fructose Dextrose"]
  },

  // =========================================================================
  // 2. Dried Spices Powder & HERITAGE BLENDS
  // =========================================================================
  {
    id: 201,
    name: "Dehydrated Royal Heritage Garam Masala",
    slug: "dehydrated-royal-garam-masala",
    category: "Dried Spices Powder",
    categorySlug: "dehydrated-masala",
    price: 240,
    oldPrice: 290,
    rating: 4.9,
    reviewCount: 188,
    badge: "Bestseller",
    badgeType: "bestseller",
    inStock: true,
    featured: true,
    weightOptions: ["100g", "250g", "500g", "1kg"],
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Royal 18-spice formulation crafted from dehydrated whole spices, sun-cured and slow-ground.",
    description: "A master blend of dehydrated green cardamom, black cardamom, star anise, mace, cinnamon, and cloves. Gives exceptional royal fragrance to curries and biryanis.",
    ingredients: "Dehydrated Coriander, Cumin, Black Pepper, Green Cardamom, Black Cardamom, Cloves, Cinnamon, Star Anise, Mace, Nutmeg, Bay Leaf.",
    nutrition: "Per 100g: Energy 380 kcal, Protein 13.5g, Iron 42mg.",
    storage: "Keep tightly sealed in a glass jar.",
    features: ["18 Whole Spices", "Zero Starches or Fillers", "Aroma Locked Packaging"]
  },
  {
    id: 202,
    name: "Dehydrated Shahi Dum Biryani Masala",
    slug: "dehydrated-shahi-biryani-masala",
    category: "Dried Spices Powder",
    categorySlug: "dehydrated-masala",
    price: 260,
    oldPrice: 310,
    rating: 5.0,
    reviewCount: 145,
    badge: "Royal Blend",
    badgeType: "bestseller",
    inStock: true,
    featured: true,
    weightOptions: ["100g", "250g", "500g"],
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Authentic Awadhi-style dehydrated biryani blend with fragrant saffron, mace, and royal spices.",
    description: "Crafted for connoisseurs of Dum Biryani. Combines coarse-ground dehydrated aromatics and delicate whole petal spices for authentic royal aroma.",
    ingredients: "Dehydrated Cardamom, Saffron, Mace, Shahi Jeera, Star Anise, Fennel, Cloves, Dagad Phool.",
    nutrition: "Per 100g: Energy 365 kcal, Protein 12.8g.",
    storage: "Airtight container.",
    features: ["Hyderabadi & Awadhi Recipe", "Natural Saffron Infused", "Coarse Grind Texture"]
  },
  {
    id: 203,
    name: "Dehydrated Royal Chai Spice Masala",
    slug: "dehydrated-royal-chai-masala",
    category: "Dried Spices Powder",
    categorySlug: "dehydrated-masala",
    price: 195,
    oldPrice: 230,
    rating: 4.9,
    reviewCount: 110,
    badge: "Immunity Booster",
    badgeType: "organic",
    inStock: true,
    featured: true,
    weightOptions: ["100g", "250g", "500g"],
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Warming blend of dehydrated ginger (sonth), green cardamom, cinnamon quills, and black pepper.",
    description: "Transform daily tea into a soothing royal brew. Packed with warming gingerol, essential oils, and aromatic spices for digestive wellness.",
    ingredients: "Dehydrated Sun-Dried Ginger, Green Cardamom, Ceylon Cinnamon, Cloves, Black Pepper, Nutmeg.",
    nutrition: "Per 100g: Energy 340 kcal, Gingerol 2.5%.",
    storage: "Dry airtight container.",
    features: ["Warming Gingerol Active", "No Added Sugar", "Digestive & Immunity Support"]
  },
  {
    id: 204,
    name: "Dehydrated Kasuri Methi & Herb Masala",
    slug: "dehydrated-kasuri-methi-masala",
    category: "Dried Spices Powder",
    categorySlug: "dehydrated-masala",
    price: 180,
    oldPrice: 220,
    rating: 4.8,
    reviewCount: 75,
    badge: "Farm Fresh",
    badgeType: "organic",
    inStock: true,
    featured: false,
    weightOptions: ["100g", "250g"],
    image: "https://images.unsplash.com/photo-1608797178974-15b35a61deda?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1608797178974-15b35a61deda?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Fragrant dehydrated Nagaur fenugreek leaves and herb mix for paneer dishes, gravies, and parathas.",
    description: "Sun-dried in Nagaur, Rajasthan. Delivers intense herbal fragrance and savory butteriness when crushed over warm dishes.",
    ingredients: "100% Dehydrated Nagaur Kasuri Methi Leaves & Natural Herbs.",
    nutrition: "Per 100g: Dietary Fiber 48g, Iron 33mg.",
    storage: "Airtight moisture-proof container.",
    features: ["Nagaur Single Origin", "Aroma Locked", "Zero Yellow Stems"]
  },
  {
    id: 205,
    name: "Dehydrated Sambhar & Rasam Masala",
    slug: "dehydrated-sambhar-rasam-masala",
    category: "Dried Spices Powder",
    categorySlug: "dehydrated-masala",
    price: 190,
    oldPrice: 230,
    rating: 4.8,
    reviewCount: 64,
    badge: "Traditional",
    badgeType: "sale",
    inStock: true,
    featured: false,
    weightOptions: ["100g", "250g", "500g"],
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Authentic South Indian masala blended with roasted lentils, dehydrated curry leaves, and spices.",
    description: "Slow-roasted chana dal, urad dal, dehydrated curry leaves, coriander, and Byadgi chillies stone-ground to perfection for aromatic sambhar.",
    ingredients: "Roasted Lentils, Dehydrated Curry Leaves, Coriander, Cumin, Pepper, Fenugreek, Asafoetida.",
    nutrition: "Per 100g: Energy 355 kcal, Protein 16.5g.",
    storage: "Cool dry cabinet.",
    features: ["Stone Ground", "Lentil Enriched", "Pure South Indian Heritage"]
  },
  {
    id: 206,
    name: "Dehydrated Kitchen King Gourmet Masala",
    slug: "dehydrated-kitchen-king-masala",
    category: "Dried Spices Powder",
    categorySlug: "dehydrated-masala",
    price: 210,
    oldPrice: 250,
    rating: 4.9,
    reviewCount: 92,
    badge: "All-in-One",
    badgeType: "bestseller",
    inStock: true,
    featured: true,
    weightOptions: ["100g", "250g", "500g"],
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "The universal curry masala crafted with dehydrated aromatics, fenugreek, and roasted spices.",
    description: "The ultimate all-purpose Indian seasoning for North Indian curries, vegetable stir-fries, and paneer dishes.",
    ingredients: "Dehydrated Coriander, Turmeric, Cumin, Chilli, Cardamom, Kasuri Methi, Ginger, Nutmeg.",
    nutrition: "Per 100g: Energy 370 kcal, Protein 14g.",
    storage: "Sealed container away from moisture.",
    features: ["All-in-One Curry Enhancer", "Balanced Spice Heat", "100% Natural"]
  },

  // =========================================================================
  // 3. Pure Cold Preessed Oil
  // =========================================================================
  {
    id: 301,
    name: "Cold-Pressed Kachi Ghani Mustard Oil",
    slug: "cold-pressed-mustard-oil",
    category: "Pure Cold Preessed Oil",
    categorySlug: "pure-oil",
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
    gallery: [
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Traditional Kolhu wood-pressed pungent mustard oil for authentic pickles and curries.",
    description: "Extracted slowly from select black mustard seeds without chemical refining or heat treatment. Packed with natural pungency (allylisothiocyanate) and essential Omega-3 fatty acids.",
    ingredients: "100% Pure Cold-Pressed Virgin Mustard Seed Oil.",
    nutrition: "Per 100g: Energy 884 kcal, Monounsaturated Fat 60g, Polyunsaturated Fat 21g.",
    storage: "Keep in a dark glass bottle away from heat.",
    features: ["Kolhu Wood Pressed", "Zero Chemical Refining", "Authentic Pungent Aroma"]
  },
  {
    id: 302,
    name: "Traditional Wood-Pressed Sesame (Til) Oil",
    slug: "wood-pressed-sesame-oil",
    category: "Pure Cold Preessed Oil",
    categorySlug: "pure-oil",
    price: 340,
    oldPrice: 400,
    rating: 4.9,
    reviewCount: 96,
    badge: "Kolhu Extracted",
    badgeType: "organic",
    inStock: true,
    featured: true,
    weightOptions: ["500ml", "1 Litre"],
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Pure unrefined sesame oil extracted from sun-ripened black sesame seeds in wooden churners.",
    description: "Rich in natural sesamol antioxidants, magnesium, and healthy fats. Revered in Ayurvedic traditions for deep flavor and therapeutic cooking.",
    ingredients: "100% Pure Raw Black Sesame Seeds.",
    nutrition: "Per 100ml: Energy 884 kcal, Sesamol Antioxidants, Vitamin E.",
    storage: "Store in a cool dark bottle.",
    features: ["Traditional Wooden Ghani", "Antioxidant Sesamol", "Rich Nutty Flavor"]
  },
  {
    id: 303,
    name: "Pure Cold-Pressed Extra Virgin Coconut Oil",
    slug: "cold-pressed-coconut-oil",
    category: "Pure Cold Preessed Oil",
    categorySlug: "pure-oil",
    price: 360,
    oldPrice: 420,
    rating: 4.8,
    reviewCount: 88,
    badge: "Raw Virgin",
    badgeType: "organic",
    inStock: true,
    featured: true,
    weightOptions: ["500ml", "1 Litre"],
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Raw, cold-pressed virgin coconut oil made from fresh coconut milk without heat or bleach.",
    description: "Pure coconut goodness with high Lauric Acid (MCT) content. Delicate tropical aroma suitable for cooking, raw consumption, and body wellness.",
    ingredients: "100% Cold-Pressed Raw Coconut Kernels.",
    nutrition: "Per 100ml: Medium Chain Triglycerides (MCTs) 65%, Lauric Acid 50%.",
    storage: "Keep in a cool dry cabinet.",
    features: ["Zero Chemical Bleaching", "High Lauric Acid", "Multi-purpose Wellness Oil"]
  },
  {
    id: 304,
    name: "Wood-Pressed Golden Groundnut Oil",
    slug: "wood-pressed-groundnut-oil",
    category: "Pure Cold Preessed Oil",
    categorySlug: "pure-oil",
    price: 280,
    oldPrice: 330,
    rating: 4.8,
    reviewCount: 72,
    badge: "Unrefined",
    badgeType: "sale",
    inStock: true,
    featured: false,
    weightOptions: ["1 Litre", "5 Litres"],
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Traditional cold-pressed peanut oil with a high smoke point and authentic nutty aroma.",
    description: "Cold-pressed from premium Saurashtra groundnuts. Retains natural phytosterols, heart-healthy monounsaturates, and rich golden clarity.",
    ingredients: "100% Pure Virgin Groundnut Kernels.",
    nutrition: "Per 100ml: MUFA 50g, PUFA 32g, Vitamin E 15mg.",
    storage: "Store away from direct light.",
    features: ["High Smoke Point", "Unrefined & Filtered", "Heart Healthy MUFA"]
  },

  // =========================================================================
  // 4. Dry Snacks
  // =========================================================================
  {
    id: 401,
    name: "Pure Salem Turmeric Powder",
    slug: "pure-salem-turmeric-powder",
    category: "Dry Snacks",
    categorySlug: "heritage-spices",
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
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "High-curcumin golden turmeric ground cold from select Salem fingers for vibrant color and deep earthy aroma.",
    description: "Our MDMA Pure Salem Turmeric Powder is sourced directly from heritage spice farmers in Salem, Tamil Nadu. Sun-dried and slow ground at cold temperatures to preserve its natural volatile oils, rich 3.5%+ active curcumin content, and radiant golden tint.",
    ingredients: "100% Pure Salem Turmeric Rhizomes (Curcuma longa). No added colors, fillers, or starches.",
    nutrition: "Per 100g: Energy 354 kcal, Protein 7.8g, Active Curcumin 3.5%+.",
    storage: "Store in a cool, dark and dry place inside an airtight glass container.",
    features: ["High Active Curcumin", "Cold Ground Technology", "Zero Artificial Additives", "Hygienically Packed"]
  },
  {
    id: 402,
    name: "Malabar Bold Black Pepper",
    slug: "malabar-bold-black-pepper",
    category: "Dry Snacks",
    categorySlug: "heritage-spices",
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
    id: 403,
    name: "Royal Idukki Green Cardamom (8mm+)",
    slug: "royal-idukki-green-cardamom",
    category: "Dry Snacks",
    categorySlug: "heritage-spices",
    price: 650,
    oldPrice: 780,
    rating: 4.9,
    reviewCount: 175,
    badge: "8mm+ Giant Pods",
    badgeType: "bestseller",
    inStock: true,
    featured: true,
    weightOptions: ["50g", "100g", "250g", "500g"],
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Extra-large 8mm+ emerald green cardamom pods bursting with sweet cineole aroma.",
    description: "Hand-graded jumbo pods from high-altitude plantations of Idukki, Kerala. Packed with aromatic black seeds high in natural volatile oils.",
    ingredients: "100% Whole Green Cardamom Pods (Elettaria cardamomum).",
    nutrition: "Per 100g: Energy 311 kcal, Cineole Essential Oils 8%+.",
    storage: "Keep in an airtight jar.",
    features: ["8mm+ Bold Extra Large", "Intense Floral Aroma", "Zero Chemical Color Dye"]
  },
  {
    id: 404,
    name: "Guntur Stemless Red Chilli Powder",
    slug: "guntur-red-chilli-powder",
    category: "Dry Snacks",
    categorySlug: "heritage-spices",
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
      "https://images.unsplash.com/photo-1583064313642-a7c14d49a5a1?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Fiery red, intensely aromatic chilli powder ground from 100% stemless sun-ripened Guntur chillies.",
    description: "Experience the authentic pungent warmth of Andhra cuisine. MDMA Guntur Red Chilli Powder uses only destemmed chillies slow-pulverized to preserve natural capsaicin and a rich natural crimson hue without artificial dyes.",
    ingredients: "100% Destemmed Guntur Chillies (Capsicum annuum).",
    nutrition: "Per 100g: Energy 318 kcal, Protein 12.0g, Fat 16.8g.",
    storage: "Store sealed in an airtight container.",
    features: ["Stemless Sourcing", "Rich Natural Red Hue", "Bold Authentic Pungency"]
  },
  {
    id: 405,
    name: "Grade A1 Kashmir Pampore Saffron (Kesar)",
    slug: "kashmir-pampore-saffron",
    category: "Dry Snacks",
    categorySlug: "heritage-spices",
    price: 950,
    oldPrice: 1150,
    rating: 5.0,
    reviewCount: 89,
    badge: "Mongra Grade",
    badgeType: "bestseller",
    inStock: true,
    featured: true,
    weightOptions: ["1g", "2g", "5g"],
    image: "https://images.unsplash.com/photo-1608797178974-15b35a61deda?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1608797178974-15b35a61deda?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Certified pure Mongra Kashmiri saffron threads with deep red stigma and golden coloring strength.",
    description: "Directly sourced from the saffron valleys of Pampore, Kashmir. 100% pure Mongra grade long-cut stigmas with potent crocin (color), picrocrocin (taste), and safranal (aroma).",
    ingredients: "100% Pure Kashmiri Mongra Saffron Stigmas (Crocus sativus).",
    nutrition: "Crocin Color Reading > 220 (Grade 1 Standard).",
    storage: "Store in a cool, dark, airtight glass container away from humidity.",
    features: ["100% Pampore Origin", "Grade 1 ISO Standard", "Zero Artificial Yellow Style Adulteration"]
  },
  {
    id: 406,
    name: "Natural Himalayan Pink Rock Salt",
    slug: "himalayan-pink-rock-salt",
    category: "Dry Snacks",
    categorySlug: "heritage-spices",
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
    gallery: [
      "https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?auto=format&fit=crop&w=800&q=80"
    ],
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
    name: "Dried Fruits and vegetables",
    slug: "dehydrated-foods",
    count: 8,
    image: "assets/clientassets/dehydrated-dragon-fruit.jpeg",
    description: "100% natural, nutrient-dense Dehydrated Fruitss and gourmet pantry crisps with zero added sugar, sulfur, or artificial preservatives."
  },
  {
    name: "Dried Spices Powder",
    slug: "dehydrated-masala",
    count: 6,
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
    description: "Heritage recipes crafted from sun-dried and dehydrated whole spices, slow-ground to preserve intense culinary aroma and natural oils."
  },
  {
    name: "Pure Cold Preessed Oil",
    slug: "pure-oil",
    count: 4,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80",
    description: "Kolhu wood-pressed virgin oils extracted cold without chemical solvents or heat processing for pristine natural nutrition."
  },
  {
    name: "Dry Snacks",
    slug: "heritage-spices",
    count: 6,
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80",
    description: "Single-origin Salem turmeric, Tellicherry peppercorns, Idukki green cardamoms, and pure Himalayan mineral salts."
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
