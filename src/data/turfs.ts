interface Turf {
  id: string;
  name: string;
  location: string;
  pricePerHour: number;
  rating: number;
  reviews: number;
  sports: string[];
  facilities: string[];
  images: string[];
  isAvailable: boolean;
  description?: string;
}

const turfs: Turf[] = [
  {
    id: '1',
    name: 'Elite Sports Complex',
    location: 'Rankala, Kolhapur',
    pricePerHour: 1200,
    rating: 4.8,
    reviews: 128,
    sports: ['Cricket', 'Football'],
    facilities: ['Parking', 'Washrooms', 'Lights', 'Refreshments'],
    images: [
      'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1171084/pexels-photo-1171084.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    isAvailable: true
  },
  {
    id: '2',
    name: 'Champions Cricket Ground',
    location: 'Shivaji University, Kolhapur',
    pricePerHour: 800,
    rating: 4.6,
    reviews: 95,
    sports: ['Cricket'],
    facilities: ['Parking', 'Washrooms', 'Lights'],
    images: [
      'https://images.pexels.com/photos/163387/cricket-player-batsman-batting-163387.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    isAvailable: true
  },
  {
    id: '3',
    name: 'Green Valley Football Club',
    location: 'Tarabai Park, Kolhapur',
    pricePerHour: 1000,
    rating: 4.7,
    reviews: 76,
    sports: ['Football'],
    facilities: ['Parking', 'Washrooms', 'Lights', 'Refreshments'],
    images: [
      'https://images.pexels.com/photos/1171084/pexels-photo-1171084.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    isAvailable: false
  },
  {
    id: '4',
    name: 'Royal Tennis Academy',
    location: 'New Palace, Kolhapur',
    pricePerHour: 600,
    rating: 4.5,
    reviews: 52,
    sports: ['Tennis'],
    facilities: ['Parking', 'Washrooms', 'Lights'],
    images: [
      'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1405355/pexels-photo-1405355.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    isAvailable: true
  },
  {
    id: '5',
    name: 'Ace Badminton Center',
    location: 'Laxmipuri, Kolhapur',
    pricePerHour: 400,
    rating: 4.4,
    reviews: 84,
    sports: ['Badminton'],
    facilities: ['Parking', 'Washrooms', 'Lights', 'Refreshments'],
    images: [
      'https://images.pexels.com/photos/1263426/pexels-photo-1263426.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1192027/pexels-photo-1192027.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    isAvailable: true
  },
  {
    id: '6',
    name: 'Splash Swimming Pool',
    location: 'Mahalaxmi, Kolhapur',
    pricePerHour: 300,
    rating: 4.3,
    reviews: 67,
    sports: ['Swimming'],
    facilities: ['Parking', 'Washrooms', 'Lights', 'Refreshments'],
    images: [
      'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/261104/pexels-photo-261104.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    isAvailable: true
  },
  {
    id: '7',
    name: 'Victory Basketball Court',
    location: 'Dabholkar Corner, Kolhapur',
    pricePerHour: 500,
    rating: 4.2,
    reviews: 43,
    sports: ['Basketball'],
    facilities: ['Parking', 'Washrooms', 'Lights'],
    images: [
      'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1944526/pexels-photo-1944526.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    isAvailable: true
  },
  {
    id: '8',
    name: 'Unity Volleyball Arena',
    location: 'Kasaba Bawada, Kolhapur',
    pricePerHour: 450,
    rating: 4.1,
    reviews: 38,
    sports: ['Volleyball'],
    facilities: ['Parking', 'Washrooms', 'Lights'],
    images: [
      'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    isAvailable: true
  }
];

export const getAllTurfs = (): Turf[] => turfs;

export const getTurfById = (id: string): Turf | null => {
  return turfs.find(turf => turf.id === id) || null;
};

export const getFeaturedTurfs = (): Turf[] => {
  return turfs.slice(0, 4);
};

export const getTurfsByCategory = (category: string): Turf[] => {
  switch (category) {
    case 'top-rated':
      return [...turfs].sort((a, b) => b.rating - a.rating);
    case 'nearby':
      return turfs.filter(turf => turf.location.includes('Kolhapur'));
    case 'recently-added':
      return turfs.slice(-4);
    default:
      return turfs;
  }
};

export const searchTurfs = (filters: {
  sport: string;
  priceRange: [number, number];
  timeSlot: string;
  rating: number;
  query: string;
}): Turf[] => {
  return turfs.filter(turf => {
    // Sport filter
    if (filters.sport && !turf.sports.some(sport => 
      sport.toLowerCase().includes(filters.sport.toLowerCase())
    )) {
      return false;
    }

    // Price filter
    if (turf.pricePerHour < filters.priceRange[0] || turf.pricePerHour > filters.priceRange[1]) {
      return false;
    }

    // Rating filter
    if (filters.rating > 0 && turf.rating < filters.rating) {
      return false;
    }

    // Search query
    if (filters.query) {
      const query = filters.query.toLowerCase();
      const searchFields = [
        turf.name,
        turf.location,
        ...turf.sports,
        ...turf.facilities
      ].join(' ').toLowerCase();
      
      if (!searchFields.includes(query)) {
        return false;
      }
    }

    return true;
  });
};

export const getFavoriteTurfs = (): Turf[] => {
  // Simulate user favorites
  return turfs.slice(0, 3);
};