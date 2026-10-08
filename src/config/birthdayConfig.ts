/**
 * Central Birthday Website Configuration
 * Modify values here to customize the name, text, colors, photos, wishes, and audio.
 */

export interface BirthdayPhoto {
  id: string;
  url: string;
  title: string;
  date?: string;
  caption: string;
  location?: string;
}

export interface BirthdayWish {
  id: string;
  wish: string;
  meaning: string;
  color: string;
  icon: string;
  isSecret?: boolean;
}

export const BIRTHDAY_CONFIG = {
  // Recipient details
  recipient: {
    name: "Pani Thiru Mozhi",
    shortName: "Pani",
    title: "HAPPY BIRTHDAY",
    subtitle: "MY DEAR PANI THIRU MOZHI",
    surpriseMessage: "Someone prepared a little surprise just for you...",
  },

  // Exact Letter Content as requested
  letter: {
    title: "Happy Birthday",
    subtitle: "Dearest Pani Thiru Mozhi 🌸",
    paragraphs: [
      "On this very special day, I wanted to take a moment to celebrate you and the wonderful person you are.",
      "May your life always be blessed with good health, peaceful days, and boundless happiness. May every small effort you put in bring you closer to all the dreams you hold close to your heart.",
      "Never lose the gentle kindness and radiant smile that make you so uniquely you. May this new year of your life be filled with unforgettable moments, beautiful memories, and endless reasons to smile.",
      "Wishing you a truly magical and memorable birthday!"
    ],
    closing: "— With heartfelt wishes & prayers",
  },

  // Final Personal Note from Old Friend
  personalNote: {
    title: "And finally… oru small note",
    paragraphs: [
      "Namma ippo romba frequent-aa pesala, but somehow, nee enoda sila old memories-oda innum connected-aa iruka.",
      "So, un birthday-ku just oru small thing panna thonuchu — nothing serious, nothing complicated… just konjam effort pottu un day-a konjam more special-aa make panna dhan.",
      "Un life-la vara indha new year unakku neraya happiness, nalla memories, and nee edhuku work panriyo adhellam achieve panna chance kudukanum.",
      "Always happy-aa iru, keep smiling, and have an amazing birthday!",
    ],
    closing: "— From an old friend, Prakash :)",
  },

  // Color Palette
  colors: {
    primary: "#FFE6F2",
    secondary: "#FCE4EC",
    accent: "#FFD166",
    lavender: "#D8B4FE",
    roseGold: "#F472B6",
    gold: "#F59E0B",
    bgDark: "#0B0813",
    bgPinkFantasy: "linear-gradient(135deg, #2D0B2E 0%, #1A0B2E 50%, #0F172A 100%)",
  },

  // Butterfly Palettes
  butterflyColors: [
    "#FF9EAA", // Soft Pink
    "#D8B4FE", // Lavender
    "#FFD166", // Accent Gold
    "#7DD3FC", // Soft Sky Cyan
    "#F472B6", // Rose Pink
    "#FCE7F3", // Pearl White
    "#A7F3D0", // Emerald Mint
  ],

  // Birthday Wishes to reveal in Sky Page
  wishes: [
    {
      id: "wish-1",
      wish: "Happiness",
      meaning: "May your heart overflow with endless light and pure delight every single day.",
      color: "#FF9EAA",
      icon: "💖",
    },
    {
      id: "wish-2",
      wish: "Good Health",
      meaning: "Wishing you strength, vitality, and peaceful wellness for a long, vibrant life.",
      color: "#A7F3D0",
      icon: "🌸",
    },
    {
      id: "wish-3",
      wish: "Success",
      meaning: "May all your dreams reach new heights and every goal blossom into achievement.",
      color: "#FFD166",
      icon: "👑",
    },
    {
      id: "wish-4",
      wish: "Beautiful Memories",
      meaning: "May every path you walk be adorned with unforgettable moments and cherished smiles.",
      color: "#D8B4FE",
      icon: "📸",
    },
    {
      id: "wish-5",
      wish: "Joy",
      meaning: "May laughter surround you and warmth brighten even your quietest moments.",
      color: "#F472B6",
      icon: "💖",
    },
    {
      id: "wish-6",
      wish: "Peace",
      meaning: "May serenity embrace your mind, bringing harmony and calm to your soul.",
      color: "#7DD3FC",
      icon: "🕊️",
    },
    {
      id: "wish-secret",
      wish: "Secret Wish: Eternal Radiance",
      meaning: "You unlocked the Golden Butterfly! May your light forever illuminate the world around you! 🌟",
      color: "#F59E0B",
      icon: "🦋",
      isSecret: true,
    }
  ] as BirthdayWish[],

  // Memory Garden Polaroids
  photos: [
    {
      id: "photo-1",
      url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
      title: "Magical Blossom",
      date: "Special Memory",
      caption: "A moment frozen in time, radiating warmth and beauty.",
      location: "Butterfly Sanctuary",
    },
    {
      id: "photo-2",
      url: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=80",
      title: "Golden Hour Smile",
      date: "Cherished Day",
      caption: "When the golden rays touched the garden, creating magic.",
      location: "Sunset Garden",
    },
    {
      id: "photo-3",
      url: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80",
      title: "Sweet Celebrations",
      date: "Joyful Times",
      caption: "Laughter that echoes like gentle harp strings in the breeze.",
      location: "Flower Meadow",
    },
    {
      id: "photo-4",
      url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
      title: "Starlit Dreams",
      date: "Unforgettable",
      caption: "Under the celestial canopy, wishing upon every falling star.",
      location: "Night Sky Pavilion",
    },
    {
      id: "photo-5",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      title: "Ocean Breeze",
      date: "Peaceful Horizon",
      caption: "Where gentle waves whisper birthday blessings.",
      location: "Emerald Shore",
    },
    {
      id: "photo-6",
      url: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80",
      title: "Fairytale Garden",
      date: "A New Chapter",
      caption: "May your upcoming year be as vibrant as blooming spring.",
      location: "Royal Conservatory",
    }
  ] as BirthdayPhoto[],

  // Audio configuration
  audio: {
    enabledByDefault: true,
    volume: 0.6,
    // Web audio synthesized melody is built-in; optional custom MP3 URL can be specified below:
    customMusicUrl: "",
  },

  // Interactive Secret Golden Butterfly Count
  secretButterflyLocationPage: 3,

  // Royal Flower Bouquet Configuration
  bouquet: {
    title: "A Bouquet of Forever Blossoms 💐",
    subtitle: "Specially Arranged For Pani Thiru Mozhi",
    cardMessage: "Dear Pani Thiru Mozhi, may your life be as fragrant, vibrant, and filled with beauty as this everlasting flower bouquet.",
    tagText: "To My Dear Pani Thiru Mozhi 🌸",
    flowers: [
      { id: "f1", name: "Velvet Crimson Rose", symbol: "Eternal Affection", color: "#FF2D55", icon: "🌹" },
      { id: "f2", name: "Royal Gold Sunflower", symbol: "Warmth & Radiance", color: "#FFD166", icon: "🌻" },
      { id: "f3", name: "Starlight White Lily", symbol: "Purity & Grace", color: "#FFF5F8", icon: "🪷" },
      { id: "f4", name: "Lavender Dream Blossom", symbol: "Peace & Serenity", color: "#D8B4FE", icon: "🪻" },
      { id: "f5", name: "Sweet Pink Tulip", symbol: "Happiness & Delight", color: "#F472B6", icon: "🌷" },
      { id: "f6", name: "Golden Orchid", symbol: "Elegance & Admiration", color: "#F59E0B", icon: "🌺" },
    ],
  },
};
