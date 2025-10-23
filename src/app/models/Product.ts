export interface Product {
  id: string;
  name: string;
  description: string;
  type: ProductType;
  price: number;
  options?: ProductOptions[];
  addOns?: AddOns[] | null;
  images: string[];
  location?: {
    address: string;
    latitude?: number;
    longitude?: number;
  };
  rating?: number | null;
  reviewsCount?: number | null;
  bookingCount?: number | null;
  available: boolean;
  tags: string[];
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  discounts?: ProductDiscount | null;
  moreInformation?: ProductInfo[] | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AddOns {
  name: string;
  price: number;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductInfo {
  title: string;
  details: string;
}

export interface ProductDiscount {
  percentage: number;
  startDate: Date;
  endDate: Date;
  active: boolean;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductOptions {
  name: string;
  image: string;
  description?: string;
  price: number;
  available: boolean;
}

export enum ProductType {
  TRAVELS_AND_TOURS = 'Travels and Tours',
  FOODS = 'Foods',
  HOTELS = 'Hotels',
}

export const PRODUCTS: Product[] = [
  {
    id: 'product_1',
    name: 'Marriott Hotel',
    description:
      'A luxury 5-star hotel offering elegant rooms, fine dining, and premium amenities in the heart of the city.',
    type: ProductType.HOTELS,
    price: 2000,
    images: ['assets/images/hotel_1.webp'],
    available: true,

    options: [
      {
        name: 'Basic Room',
        image: 'assets/images/room_1.webp',
        description: 'Cozy single room with complimentary Wi-Fi and breakfast.',
        price: 200,
        available: true,
      },
      {
        name: 'Executive Room',
        image: 'assets/images/room_2.webp',
        description:
          'Spacious room with king-size bed, workspace, and lounge access.',
        price: 700,
        available: true,
      },
      {
        name: 'Presidential Suite',
        image: 'assets/images/room_3.webp',
        description:
          'Luxurious suite with private balcony, butler service, and panoramic views.',
        price: 1000,
        available: true,
      },
    ],
    addOns: [
      {
        name: 'Breakfast Buffet',
        price: 500,
        available: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Airport Pickup',
        price: 300,
        available: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    discounts: {
      percentage: 10,
      startDate: new Date('2025-10-01'),
      endDate: new Date('2025-10-31'),
      active: true,
      description: 'Sale',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    location: {
      address: 'Calintaan',
      latitude: 14.5547,
      longitude: 121.0244,
    },
    rating: 4.8,
    reviewsCount: 125,
    bookingCount: 500,
    tags: ['hotel', 'luxury', '5-star', 'spa', 'pool'],
    contact: {
      phone: '+63 917 555 1234',
      email: 'contact@marriott.ph',
      website: 'https://marriott.ph',
    },
    moreInformation: [
      {
        title: 'Check-in Policy',
        details: 'Check-in starts at 2:00 PM and check-out is until 12:00 PM.',
      },
      {
        title: 'Amenities',
        details:
          'Free Wi-Fi, pool access, gym, 24-hour room service, and valet parking.',
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: 'product_132',
    name: 'Marriott Hotel',
    description:
      'A luxury 5-star hotel offering elegant rooms, fine dining, and premium amenities in the heart of the city.',
    type: ProductType.HOTELS,
    price: 2000,
    images: ['assets/images/hotel_1.webp'],
    available: true,

    options: [
      {
        name: 'Basic Room',
        image: 'assets/images/room_1.webp',
        description: 'Cozy single room with complimentary Wi-Fi and breakfast.',
        price: 200,
        available: true,
      },
      {
        name: 'Executive Room',
        image: 'assets/images/room_2.webp',
        description:
          'Spacious room with king-size bed, workspace, and lounge access.',
        price: 700,
        available: true,
      },
      {
        name: 'Presidential Suite',
        image: 'assets/images/room_3.webp',
        description:
          'Luxurious suite with private balcony, butler service, and panoramic views.',
        price: 1000,
        available: true,
      },
    ],
    addOns: [
      {
        name: 'Breakfast Buffet',
        price: 500,
        available: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Airport Pickup',
        price: 300,
        available: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    discounts: {
      percentage: 10,
      startDate: new Date('2025-10-01'),
      endDate: new Date('2025-10-31'),
      active: true,
      description: 'October Sale',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    location: {
      address: 'Calintaan',
      latitude: 14.5547,
      longitude: 121.0244,
    },
    rating: 4.8,
    reviewsCount: 125,
    bookingCount: 500,
    tags: ['hotel', 'luxury', '5-star', 'spa', 'pool'],
    contact: {
      phone: '+63 917 555 1234',
      email: 'contact@marriott.ph',
      website: 'https://marriott.ph',
    },
    moreInformation: [
      {
        title: 'Check-in Policy',
        details: 'Check-in starts at 2:00 PM and check-out is until 12:00 PM.',
      },
      {
        title: 'Amenities',
        details:
          'Free Wi-Fi, pool access, gym, 24-hour room service, and valet parking.',
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'product_123',
    name: 'Marriott Hotel',
    description:
      'A luxury 5-star hotel offering elegant rooms, fine dining, and premium amenities in the heart of the city.',
    type: ProductType.HOTELS,
    price: 2000,
    images: ['assets/images/hotel_1.webp'],
    available: true,

    options: [
      {
        name: 'Basic Room',
        image: 'assets/images/room_1.webp',
        description: 'Cozy single room with complimentary Wi-Fi and breakfast.',
        price: 200,
        available: true,
      },
      {
        name: 'Executive Room',
        image: 'assets/images/room_2.webp',
        description:
          'Spacious room with king-size bed, workspace, and lounge access.',
        price: 700,
        available: true,
      },
      {
        name: 'Presidential Suite',
        image: 'assets/images/room_3.webp',
        description:
          'Luxurious suite with private balcony, butler service, and panoramic views.',
        price: 1000,
        available: true,
      },
    ],
    addOns: [
      {
        name: 'Breakfast Buffet',
        price: 500,
        available: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Airport Pickup',
        price: 300,
        available: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    discounts: {
      percentage: 10,
      startDate: new Date('2025-10-01'),
      endDate: new Date('2025-10-31'),
      active: true,
      description: 'Sale',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    location: {
      address: 'Calintaan',
      latitude: 14.5547,
      longitude: 121.0244,
    },
    rating: 4.8,
    reviewsCount: 125,
    bookingCount: 500,
    tags: ['hotel', 'luxury', '5-star', 'spa', 'pool'],
    contact: {
      phone: '+63 917 555 1234',
      email: 'contact@marriott.ph',
      website: 'https://marriott.ph',
    },
    moreInformation: [
      {
        title: 'Check-in Policy',
        details: 'Check-in starts at 2:00 PM and check-out is until 12:00 PM.',
      },
      {
        title: 'Amenities',
        details:
          'Free Wi-Fi, pool access, gym, 24-hour room service, and valet parking.',
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'product_2',
    name: 'Burger Feast Combo',
    description:
      'A juicy beef burger combo served with fries and a refreshing drink.',
    type: ProductType.FOODS,
    price: 250,
    images: ['assets/images/food_1.webp'],
    available: true,
    addOns: [
      {
        name: 'Extra Cheese',
        price: 30,
        available: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Upgrade to Large Fries',
        price: 50,
        available: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    discounts: {
      percentage: 5,
      startDate: new Date('2025-10-10'),
      endDate: new Date('2025-10-20'),
      active: true,
      description: 'Limited time',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    rating: 4.5,
    reviewsCount: 80,
    bookingCount: 500,
    tags: ['food', 'burger', 'combo', 'fastfood'],
    moreInformation: [
      {
        title: 'Ingredients',
        details:
          '100% beef patty, fresh lettuce, tomatoes, cheese, and sesame bun.',
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: 'product_3',
    name: 'Bohol Adventure Tour',
    description:
      '3-day tour package exploring Chocolate Hills, Panglao Island, and local wildlife sanctuaries.',
    type: ProductType.TRAVELS_AND_TOURS,
    price: 8000,
    images: ['assets/images/mountain_1.webp'],
    available: true,
    options: [
      {
        name: 'Standard Package',
        image: 'assets/images/mountain_2.webp',
        description: 'Includes transport, accommodation, and guided tour.',
        price: 8000,
        available: true,
      },
      {
        name: 'Premium Package',
        image: 'assets/images/mountain_3.webp',
        description: 'Includes Standard Package + meals + island hopping.',
        price: 12000,
        available: true,
      },
    ],
    discounts: {
      percentage: 15,
      startDate: new Date('2025-12-01'),
      endDate: new Date('2025-12-31'),
      active: false,
      description: 'December sale',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    tags: ['travel', 'bohol', 'tour', 'vacation', 'adventure'],
    contact: {
      phone: '+63 917 123 4567',
      email: 'info@boholtours.ph',
      website: 'https://boholtours.ph',
    },
    bookingCount: 700,
    rating: 4.6,
    reviewsCount: 200,
    moreInformation: [
      {
        title: 'Itinerary',
        details:
          'Day 1: Chocolate Hills • Day 2: Panglao Island • Day 3: Tarsier Sanctuary',
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
