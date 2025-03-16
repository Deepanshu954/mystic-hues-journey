export interface State {
  name: string;
  path: string;
  image: string;
  description: string;
  capital: string;
  languages: string[];
  tags: string[];
  festivals: string[];
  food: string[];
  isUT?: boolean;
  famous?: string;
  places?: Array<{
    name: string;
    image: string;
    description: string;
  }>;
  cuisine?: Array<{
    name: string;
    image: string;
    description: string;
  }>;
  culture?: {
    art: string;
    dance: string;
    festivals: string[];
    handicrafts: string[];
  };
  history?: {
    ancient: string;
    details: Array<{
      year: string;
      period: string;
      description: string;
    }>;
  };
  news?: Array<{
    title: string;
    date: string;
    summary: string;
  }>;
  thumbnail?: string;
}

export const states: State[] = [
  {
    name: "Rajasthan",
    path: "rajasthan",
    image: "https://source.unsplash.com/random/800x600/?rajasthan-palace",
    description: "Land of Kings, known for its majestic palaces, vibrant culture, and vast Thar Desert.",
    capital: "Jaipur",
    languages: ["Hindi", "Rajasthani"],
    tags: ["Palaces", "Desert", "Culture"],
    festivals: ["Pushkar Fair", "Desert Festival", "Gangaur"],
    food: ["Dal Baati Churma", "Laal Maas", "Ker Sangri"],
    famous: "Desert landscapes and royal palaces",
    isUT: false,
    places: [
      {
        name: "Jaipur",
        image: "https://source.unsplash.com/random/800x600/?jaipur",
        description: "The Pink City with stunning architecture and vibrant markets."
      },
      {
        name: "Udaipur",
        image: "https://source.unsplash.com/random/800x600/?udaipur",
        description: "The City of Lakes with beautiful palaces and romantic setting."
      }
    ],
    cuisine: [
      {
        name: "Dal Baati Churma",
        image: "https://source.unsplash.com/random/800x600/?indian-food",
        description: "Traditional Rajasthani dish with baked wheat balls, lentils, and sweet churma."
      }
    ],
    culture: {
      art: "Rajasthan is known for miniature paintings, pottery, and block printing textiles.",
      dance: "Popular dance forms include Ghoomar, Kalbeliya, and Bhavai.",
      festivals: ["Pushkar Camel Fair", "Desert Festival", "Gangaur"],
      handicrafts: ["Blue Pottery", "Bandhani", "Camel Leather Work"]
    },
    history: {
      ancient: "Rajasthan has a rich history dating back to the Indus Valley Civilization. It was home to the Rajput warriors who built magnificent forts and palaces.",
      details: [
        {
          year: "700-1200 CE",
          period: "Rajput",
          description: "Rise of Rajput kingdoms and building of major fortresses."
        },
        {
          year: "1200-1700 CE",
          period: "Medieval",
          description: "Conflicts between Rajput kingdoms and Mughal Empire."
        }
      ]
    },
    news: [
      {
        title: "Tourism Boost in Rajasthan",
        date: "June 15, 2023",
        summary: "Rajasthan sees 30% increase in international tourists after pandemic recovery."
      },
      {
        title: "New Heritage Conservation Project",
        date: "May 10, 2023",
        summary: "Government launches initiative to restore ancient stepwells across the state."
      }
    ],
    thumbnail: "https://source.unsplash.com/random/100x100/?rajasthan"
  },
  {
    name: "Kerala",
    path: "kerala",
    image: "https://source.unsplash.com/random/800x600/?kerala-backwaters",
    description: "God's Own Country, famous for its serene backwaters, lush greenery, and Ayurvedic traditions.",
    capital: "Thiruvananthapuram",
    languages: ["Malayalam", "English"],
    tags: ["Backwaters", "Nature", "Ayurveda"],
    festivals: ["Onam", "Thrissur Pooram", "Vishu"],
    food: ["Appam", "Kerala Fish Curry", "Puttu"]
  },
  {
    name: "Himachal Pradesh",
    path: "himachal-pradesh",
    image: "https://source.unsplash.com/random/800x600/?himachal-mountains",
    description: "Land of Snow, offering breathtaking mountain views, adventure sports, and peaceful monasteries.",
    capital: "Shimla",
    languages: ["Hindi", "Punjabi"],
    tags: ["Mountains", "Adventure", "Nature"],
    festivals: ["Holi", "Shimla Carnival", "Baisakhi"],
    food: ["Chana Masala", "Kasauri", "Rasmalai"]
  },
  {
    name: "Gujarat",
    path: "gujarat",
    image: "https://source.unsplash.com/random/800x600/?gujarat-culture",
    description: "Known for its rich cultural heritage, vibrant festivals, and the unique Rann of Kutch.",
    capital: "Gandhinagar",
    languages: ["Gujarati", "Hindi"],
    tags: ["Culture", "Heritage", "Festivals"],
    festivals: ["Navratri", "Uttarayan", "Rann Utsav"],
    food: ["Dhokla", "Thepla", "Fafda"]
  },
  {
    name: "Tamil Nadu",
    path: "tamil-nadu",
    image: "https://source.unsplash.com/random/800x600/?tamil-nadu-temple",
    description: "Rich in ancient temples, classical arts, and traditional Dravidian culture.",
    capital: "Chennai",
    languages: ["Tamil", "English"],
    tags: ["Temples", "Art", "Culture"],
    festivals: ["Pongal", "Diwali", "Thai Poosam"],
    food: ["Idli", "Dosa", "Pongal"]
  }
];
