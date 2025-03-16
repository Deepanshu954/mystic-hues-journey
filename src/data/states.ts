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
    food: ["Dal Baati Churma", "Laal Maas", "Ker Sangri"]
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