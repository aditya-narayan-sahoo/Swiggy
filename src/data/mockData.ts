export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  isVeg: boolean;
  image: string;
}

export interface MenuCategory {
  title: string;
  items: MenuItem[];
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  ratingCount: string;
  deliveryTime: number;
  distance: number;
  costForTwo: number;
  cuisines: string[];
  offers: string[];
  tags: string[];
  menuCategories: MenuCategory[];
}

export interface GroceryItem {
  id: string;
  name: string;
  price: number;
  weight: string;
  image: string;
}

export interface GroceryCategory {
  id: string;
  label: string;
  image: string;
  items: GroceryItem[];
}

export interface Coupon {
  code: string;
  discountPercent: number;
  maxDiscount: number;
  minOrderValue: number;
  description: string;
}

export interface Address {
  id: string;
  tag: 'Home' | 'Work' | 'Other';
  details: string;
}

export interface PastOrder {
  id: string;
  restaurantName: string;
  restaurantImage: string;
  date: string;
  items: string[];
  total: number;
}

// ---------------- MOCK DATA ----------------

export const MOCK_COUPONS: Coupon[] = [
  {
    code: 'SWIGGYIT',
    discountPercent: 50,
    maxDiscount: 120,
    minOrderValue: 200,
    description: '50% off up to ₹120 on orders above ₹200'
  },
  {
    code: 'FREEFEAST',
    discountPercent: 30,
    maxDiscount: 200,
    minOrderValue: 400,
    description: '30% off up to ₹200 on orders above ₹400'
  },
  {
    code: 'INSTASAVE',
    discountPercent: 20,
    maxDiscount: 100,
    minOrderValue: 250,
    description: '20% off up to ₹100 on groceries above ₹250'
  }
];

export const MOCK_ADDRESSES: Address[] = [
  {
    id: 'addr_1',
    tag: 'Home',
    details: 'Flat 402, Sunshine Heights, Koramangala 4th Block, Bengaluru, 560034'
  },
  {
    id: 'addr_2',
    tag: 'Work',
    details: 'Tower C, Tech Park Global, Outer Ring Road, Bellandur, Bengaluru, 560103'
  }
];

export const MOCK_PAST_ORDERS: PastOrder[] = [
  {
    id: 'ord_101',
    restaurantName: 'Meghana Foods',
    restaurantImage: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=400&q=80',
    date: 'July 05, 2026',
    items: ['Special Chicken Biryani x 1', 'Paneer 65 x 1'],
    total: 480
  },
  {
    id: 'ord_102',
    restaurantName: 'Corner House Ice Cream',
    restaurantImage: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80',
    date: 'June 28, 2026',
    items: ['Death by Chocolate x 1', 'Hot Fudge Fudge Sundae x 1'],
    total: 350
  }
];

export const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: 'rest_1',
    name: 'Meghana Foods',
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=500&q=80',
    rating: 4.5,
    ratingCount: '10K+ ratings',
    deliveryTime: 25,
    distance: 2.4,
    costForTwo: 450,
    cuisines: ['Biryani', 'Andhra', 'North Indian'],
    offers: ['50% OFF up to ₹120', 'Free delivery with Swiggy One'],
    tags: ['Biryani', 'Pure Veg Options'],
    menuCategories: [
      {
        title: 'Recommended',
        items: [
          {
            id: 'm_1_1',
            name: 'Special Chicken Biryani',
            price: 330,
            description: 'Flavourful basmati rice cooked with succulent chicken pieces in authentic Andhra spices.',
            isVeg: false,
            image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=300&q=80'
          },
          {
            id: 'm_1_2',
            name: 'Paneer Biryani',
            price: 290,
            description: 'Fragrant basmati rice cooked with fresh paneer cubes marinated in rich herbs.',
            isVeg: true,
            image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=300&q=80'
          }
        ]
      },
      {
        title: 'Starters',
        items: [
          {
            id: 'm_1_3',
            name: 'Chicken 65',
            price: 240,
            description: 'Spicy, deep-fried chicken chunks marinated in yogurt, curry leaves, and green chilies.',
            isVeg: false,
            image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=300&q=80'
          },
          {
            id: 'm_1_4',
            name: 'Paneer 65',
            price: 210,
            description: 'Deep-fried cottage cheese cubes coated in home-style spice powders.',
            isVeg: true,
            image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=300&q=80'
          }
        ]
      }
    ]
  },
  {
    id: 'rest_2',
    name: 'Truffles',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80',
    rating: 4.4,
    ratingCount: '15K+ ratings',
    deliveryTime: 30,
    distance: 3.1,
    costForTwo: 500,
    cuisines: ['Burgers', 'American', 'Continental'],
    offers: ['30% OFF up to ₹75', 'Free delivery on orders above ₹199'],
    tags: ['Burgers', 'Fast Food'],
    menuCategories: [
      {
        title: 'Popular Burgers',
        items: [
          {
            id: 'm_2_1',
            name: 'All American Cheese Burger',
            price: 210,
            description: 'Juicy chicken patty, melted cheddar, lettuce, tomatoes, and home-style burger dressing.',
            isVeg: false,
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80'
          },
          {
            id: 'm_2_2',
            name: 'Crunchy Veg Burger',
            price: 170,
            description: 'Crispy deep-fried mixed vegetable patty with creamy mayo and pickled cucumbers.',
            isVeg: true,
            image: 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?auto=format&fit=crop&w=300&q=80'
          }
        ]
      },
      {
        title: 'Sides & Shakes',
        items: [
          {
            id: 'm_2_3',
            name: 'Peri Peri French Fries',
            price: 110,
            description: 'Golden crispy potato fries tossed in hot African peri-peri spices.',
            isVeg: true,
            image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=300&q=80'
          },
          {
            id: 'm_2_4',
            name: 'Ferrero Rocher Shake',
            price: 180,
            description: 'Thick, creamy chocolate milkshake blended with real Ferrero Rocher pralines.',
            isVeg: true,
            image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=300&q=80'
          }
        ]
      }
    ]
  },
  {
    id: 'rest_3',
    name: 'Leon Grill',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=80',
    rating: 4.3,
    ratingCount: '8K+ ratings',
    deliveryTime: 20,
    distance: 1.8,
    costForTwo: 400,
    cuisines: ['Turkish', 'Salads', 'Mediterranean'],
    offers: ['FREE Platform fee', 'Flat 20% off on Swiggy One'],
    tags: ['Fast Food', 'Turkish'],
    menuCategories: [
      {
        title: 'Doners & Wraps',
        items: [
          {
            id: 'm_3_1',
            name: 'Jumbo Chicken Doner Wrap',
            price: 220,
            description: 'Slow-roasted chicken shavings, crisp lettuce, jalapeños, and signature garlic sauces rolled in pita.',
            isVeg: false,
            image: 'https://images.unsplash.com/photo-1626700051175-6518c4793f4f?auto=format&fit=crop&w=300&q=80'
          },
          {
            id: 'm_3_2',
            name: 'Falafel Hummus Wrap',
            price: 180,
            description: 'Crispy chickpea falafel patties, creamy tahini, garlic spread, and fresh greens.',
            isVeg: true,
            image: 'https://images.unsplash.com/photo-1547058881-aa0edd92aab3?auto=format&fit=crop&w=300&q=80'
          }
        ]
      }
    ]
  },
  {
    id: 'rest_4',
    name: 'The Pizza Bakery',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80',
    rating: 4.6,
    ratingCount: '5K+ ratings',
    deliveryTime: 35,
    distance: 4.2,
    costForTwo: 700,
    cuisines: ['Pizzas', 'Italian', 'Pastas'],
    offers: ['Flat ₹100 OFF', 'Free garlic bread on ₹499+'],
    tags: ['Pizzas', 'Veg Option'],
    menuCategories: [
      {
        title: 'Sourdough Pizzas',
        items: [
          {
            id: 'm_4_1',
            name: 'Classic Margherita Pizza',
            price: 360,
            description: 'Neapolitan sourdough crust, house marinara sauce, fresh mozzarella, extra virgin olive oil, and basil.',
            isVeg: true,
            image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=300&q=80'
          },
          {
            id: 'm_4_2',
            name: 'Hot Smokey Chicken Pizza',
            price: 490,
            description: 'Woodfired sourdough topped with spicy smoked chicken, caramelized onions, jalapeños, and provolone.',
            isVeg: false,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=80'
          }
        ]
      }
    ]
  },
  {
    id: 'rest_5',
    name: 'Imperio Restaurant',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=80',
    rating: 4.1,
    ratingCount: '12K+ ratings',
    deliveryTime: 28,
    distance: 2.9,
    costForTwo: 350,
    cuisines: ['North Indian', 'Mughlai', 'Biryani'],
    offers: ['10% OFF with OneCard', 'Flat ₹50 OFF'],
    tags: ['North Indian', 'Pure Veg Options'],
    menuCategories: [
      {
        title: 'Main Course Specialties',
        items: [
          {
            id: 'm_5_1',
            name: 'Butter Chicken Masala',
            price: 280,
            description: 'Tandoori chicken pieces simmered in sweet, rich tomato and butter-based cream gravy.',
            isVeg: false,
            image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=300&q=80'
          },
          {
            id: 'm_5_2',
            name: 'Paneer Butter Masala',
            price: 240,
            description: 'Cottage cheese pieces cooked in classic smooth butter and cashew cream gravy.',
            isVeg: true,
            image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=300&q=80'
          },
          {
            id: 'm_5_3',
            name: 'Butter Naan',
            price: 50,
            description: 'Leavened soft flatbread baked in a tandoor clay oven and brushed with pure butter.',
            isVeg: true,
            image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=300&q=80'
          }
        ]
      }
    ]
  },
  {
    id: 'rest_6',
    name: 'Anjappar Chettinad Restaurant',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=500&q=80',
    rating: 3.9,
    ratingCount: '4K+ ratings',
    deliveryTime: 22,
    distance: 1.5,
    costForTwo: 300,
    cuisines: ['South Indian', 'Chettinad'],
    offers: ['Buy 1 Get 1 Free on select items', 'Flat 15% OFF'],
    tags: ['South Indian'],
    menuCategories: [
      {
        title: 'Authentic Chettinad',
        items: [
          {
            id: 'm_6_1',
            name: 'Chettinad Chicken Masala',
            price: 260,
            description: 'Spicy chicken dish cooked in roasted dry coconut masala and native spices.',
            isVeg: false,
            image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=300&q=80'
          },
          {
            id: 'm_6_2',
            name: 'Mushroom Pepper Fry',
            price: 190,
            description: 'Fresh button mushrooms dry-sauteed in black pepper, garlic, and fresh green curry leaves.',
            isVeg: true,
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80'
          }
        ]
      }
    ]
  }
];

export const MOCK_GROCERIES: GroceryCategory[] = [
  {
    id: 'g_dairy',
    label: 'Dairy, Bread & Eggs',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=150&q=80',
    items: [
      {
        id: 'p_1',
        name: 'Amul Butter',
        price: 58,
        weight: '100g',
        image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=300&q=80'
      },
      {
        id: 'p_2',
        name: 'Nandini GoodLife Milk',
        price: 28,
        weight: '500ml',
        image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=300&q=80'
      },
      {
        id: 'p_3',
        name: 'White Eggs (6pcs)',
        price: 45,
        weight: '6 units',
        image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=300&q=80'
      },
      {
        id: 'p_4',
        name: 'Britannia Sandwich Bread',
        price: 40,
        weight: '400g',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=80'
      }
    ]
  },
  {
    id: 'g_fruits',
    label: 'Fruits & Vegetables',
    image: 'https://images.unsplash.com/photo-1610832958506-ee5633613044?auto=format&fit=crop&w=150&q=80',
    items: [
      {
        id: 'p_5',
        name: 'Fresh Bananas (Robusta)',
        price: 48,
        weight: '1 kg',
        image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=300&q=80'
      },
      {
        id: 'p_6',
        name: 'Red Tomatoes',
        price: 35,
        weight: '500g',
        image: 'https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=300&q=80'
      },
      {
        id: 'p_7',
        name: 'Shimla Apples',
        price: 180,
        weight: '1 kg (4pcs)',
        image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=300&q=80'
      },
      {
        id: 'p_8',
        name: 'Onions (Pyaz)',
        price: 42,
        weight: '1 kg',
        image: 'https://images.unsplash.com/photo-1508747703725-719ae257c84a?auto=format&fit=crop&w=300&q=80'
      }
    ]
  },
  {
    id: 'g_munchies',
    label: 'Munchies & Snacks',
    image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=150&q=80',
    items: [
      {
        id: 'p_9',
        name: 'Lay\'s India\'s Magic Masala Chips',
        price: 20,
        weight: '50g',
        image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=300&q=80'
      },
      {
        id: 'p_10',
        name: 'Maggi 2-Minute Noodles',
        price: 14,
        weight: '70g',
        image: 'https://images.unsplash.com/photo-1612966608967-302915b50122?auto=format&fit=crop&w=300&q=80'
      },
      {
        id: 'p_11',
        name: 'Haldiram\'s Bhujia Sev',
        price: 55,
        weight: '150g',
        image: 'https://images.unsplash.com/photo-1589476993333-f55b84301219?auto=format&fit=crop&w=300&q=80'
      }
    ]
  },
  {
    id: 'g_drinks',
    label: 'Cold Drinks & Juices',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=150&q=80',
    items: [
      {
        id: 'p_12',
        name: 'Coca-Cola Zero Sugar',
        price: 40,
        weight: '300ml Can',
        image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=300&q=80'
      },
      {
        id: 'p_13',
        name: 'Kinley Club Soda',
        price: 20,
        weight: '750ml Bottle',
        image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=300&q=80'
      },
      {
        id: 'p_14',
        name: 'Real Fruit Power Mixed Fruit Juice',
        price: 110,
        weight: '1 Liter',
        image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=300&q=80'
      }
    ]
  }
];
