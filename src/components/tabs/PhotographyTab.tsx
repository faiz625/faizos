import React, { useState } from "react";
import { TabType } from "@/hooks/useNavigation";

interface PhotographyTabProps {
  openTab: (tab: TabType) => void;
  onPhotoClick?: (photo: Photo, photos: Photo[]) => void;
}

export interface Photo {
  id: string;
  src: string;
  alt: string;
  title: string;
  location: string;
  date: string;
  category: "city" | "sunset" | "other";
  categories?: ("city" | "sunset" | "other")[]; // Multiple categories support
  camera?: string;
  lens?: string;
  settings?: string;
  description: string;
  featured?: boolean;
}

export const PhotographyTab: React.FC<PhotographyTabProps> = ({ openTab, onPhotoClick }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("masonry");

  const photos: Photo[] = [
    // City photos
    {
      id: "1",
      src: "/photography/city.jpeg",
      alt: "Dubai cityscape",
      title: "",
      location: "Dubai, UAE",
      date: "November 2024",
      category: "city",
      camera: "Nikon D5300",
      lens: "AF-S DX NIKKOR 35mm f/1.8G",
      settings: "f/1.8 • 1/500s • ISO 400",
      description: "The stunning modern skyline of Dubai showcasing architectural marvels in the desert.",
      featured: true
    },
    {
      id: "2",
      src: "/photography/city1.jpeg",
      alt: "Toronto downtown",
      title: "",
      location: "Downtown Toronto, ON",
      date: "November 2024",
      category: "city",
      camera: "Nikon D5300",
      lens: "AF-S DX NIKKOR 18-140mm f/3.5-5.6G VR",
      settings: "f/8 • 1/125s • ISO 200",
      description: "The vibrant heart of Canada's largest city with its iconic urban landscape."
    },
    {
      id: "3",
      src: "/photography/city2.jpeg",
      alt: "Scarborough cityscape",
      title: "",
      location: "Scarborough, ON",
      date: "November 2024",
      category: "city",
      camera: "Nikon D5300",
      lens: "AF-S DX NIKKOR 35mm f/1.8G",
      settings: "f/2.0 • 1/400s • ISO 320",
      description: "Capturing the diverse urban character of Scarborough's bustling neighborhoods."
    },
    // City + Sunset combination photos
    {
      id: "4",
      src: "/photography/city_sunset.jpeg",
      alt: "Toronto sunset skyline",
      title: "",
      location: "Downtown Toronto, ON",
      date: "November 2024",
      category: "city",
      categories: ["city", "sunset"],
      camera: "Nikon D5300",
      lens: "AF-S DX NIKKOR 18-140mm f/3.5-5.6G VR",
      settings: "f/11 • 1/60s • ISO 100",
      description: "Toronto's magnificent skyline bathed in the warm glow of golden hour light.",
      featured: true
    },
    {
      id: "5",
      src: "/photography/city_sunset1.jpeg",
      alt: "Scarborough sunset",
      title: "",
      location: "Scarborough, ON",
      date: "November 2024",
      category: "sunset",
      categories: ["city", "sunset"],
      camera: "Nikon D5300",
      lens: "AF-S DX NIKKOR 18-140mm f/3.5-5.6G VR",
      settings: "f/8 • 1/250s • ISO 200",
      description: "The peaceful evening atmosphere as sunset paints the Scarborough skyline."
    },
    // Sunset photos
    {
      id: "6",
      src: "/photography/sunset.jpeg",
      alt: "Jamaica beach sunset",
      title: "",
      location: "Montego Bay, Jamaica",
      date: "November 2024",
      category: "sunset",
      camera: "Nikon D5300",
      lens: "AF-S DX NIKKOR 18-140mm f/3.5-5.6G VR",
      settings: "f/11 • 1/60s • ISO 100",
      description: "Tropical paradise as the sun sets over the crystal clear waters of Montego Bay.",
      featured: true
    },
    {
      id: "7",
      src: "/photography/sunset1.jpeg",
      alt: "Dominican Republic sunset",
      title: "",
      location: "Dominican Republic",
      date: "November 2024",
      category: "sunset",
      camera: "Nikon D5300",
      lens: "AF-S DX NIKKOR 18-140mm f/3.5-5.6G VR",
      settings: "f/8 • 1/125s • ISO 200",
      description: "The serene beauty of a Caribbean sunset painting the Dominican sky in vibrant colors."
    },
    {
      id: "8",
      src: "/photography/sunset2.jpeg",
      alt: "Scarborough sunset",
      title: "",
      location: "Scarborough, ON",
      date: "November 2024",
      category: "sunset",
      camera: "Nikon D5300",
      lens: "AF-S DX NIKKOR 18-140mm f/3.5-5.6G VR",
      settings: "f/11 • 1/30s • ISO 100",
      description: "The gentle evening light over Scarborough's landscape as day transitions to night."
    },
    // Other category photos
    {
      id: "9",
      src: "/photography/other.jpeg",
      alt: "Markham photography",
      title: "",
      location: "Markham, ON",
      date: "November 2024",
      category: "other",
      camera: "Nikon D5300",
      lens: "AF-S DX NIKKOR 35mm f/1.8G",
      settings: "f/2.8 • 1/200s • ISO 250",
      description: "Capturing the quiet charm and character of Markham's suburban landscape."
    },
    {
      id: "10",
      src: "/photography/other1.jpeg",
      alt: "Medina photography",
      title: "",
      location: "Medina, Saudi Arabia",
      date: "November 2024",
      category: "other",
      camera: "Nikon D5300",
      lens: "AF-S DX NIKKOR 35mm f/1.8G",
      settings: "f/4 • 1/320s • ISO 400",
      description: "The spiritual essence and architectural beauty of the holy city of Medina."
    },
    {
      id: "11",
      src: "/photography/other2.jpeg",
      alt: "Dominican Republic landscape",
      title: "",
      location: "Dominican Republic",
      date: "November 2024",
      category: "other",
      camera: "Nikon D5300",
      lens: "AF-S DX NIKKOR 35mm f/1.8G",
      settings: "f/2.5 • 1/200s • ISO 320",
      description: "The vibrant culture and natural beauty of the Dominican Republic's diverse landscape."
    },
    {
      id: "12",
      src: "/photography/other3.jpeg",
      alt: "Disney Castle",
      title: "",
      location: "Orlando, FL",
      date: "November 2024",
      category: "other",
      camera: "Nikon D5300",
      lens: "AF-S DX NIKKOR 35mm f/1.8G",
      settings: "f/2.2 • 1/160s • ISO 320",
      description: "The magic and energy of Disney captured through creative composition and fireworks."
    },
  ];

  const categories = [
    { key: "all", label: "All Photos", icon: "🎨" },
    { key: "city", label: "City", icon: "🏙️" },
    { key: "sunset", label: "Sunsets", icon: "�" },
    { key: "other", label: "Other", icon: "📸" }
  ];

  const filteredPhotos = selectedCategory === "all" 
    ? photos 
    : photos.filter(p => 
        p.category === selectedCategory || 
        (p.categories && p.categories.includes(selectedCategory as "city" | "sunset" | "other"))
      );

  const featuredPhotos = photos.filter(p => p.featured);

  return (
    <div className="bg-black/5 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-white/10 p-6 sm:p-8">
      {/* Back Button */}
      <div className="flex items-center mb-8">
        <button 
          onClick={() => openTab("home")} 
          className="flex items-center text-gray-600 dark:text-white/60 hover:text-sky-600 dark:hover:text-sky-300 transition-all duration-300 hover:scale-105 bg-white/20 dark:bg-black/20 px-4 py-3 rounded-xl backdrop-blur-sm border border-white/20 dark:border-white/10"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </button>
      </div>

      {/* Header Section */}
      <div className="text-center mb-12 animate-fade-in-scale">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 dark:from-purple-300 dark:via-pink-300 dark:to-orange-300 bg-clip-text text-transparent">
          Visual Stories
        </h2>
        <p className="text-gray-600 dark:text-white/70 text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
          Photography is my creative outlet—a way to capture fleeting moments, explore composition, and tell stories through visual narratives. 
          Each image documents the intersection of technology, nature, and human experience.
        </p>

        {/* Photography Stats */}
        <div className="flex justify-center gap-8 mb-8">
          <div className="text-center animate-slide-up" style={{animationDelay: '0.2s'}}>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-300">{photos.length}</div>
            <div className="text-sm text-gray-500 dark:text-white/60">Photos</div>
          </div>
          <div className="text-center animate-slide-up" style={{animationDelay: '0.3s'}}>
            <div className="text-2xl font-bold text-pink-600 dark:text-pink-300">{categories.length - 1}</div>
            <div className="text-sm text-gray-500 dark:text-white/60">Categories</div>
          </div>
          <div className="text-center animate-slide-up" style={{animationDelay: '0.4s'}}>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-300">5+</div>
            <div className="text-sm text-gray-500 dark:text-white/60">Years</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 animate-slide-in-right">
          {categories.map((category, index) => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 animate-fade-in-scale ${
                selectedCategory === category.key
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "bg-white/10 dark:bg-black/20 text-gray-600 dark:text-white/80 hover:bg-white/20 dark:hover:bg-black/30 border border-gray-200 dark:border-white/10"
              }`}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <span>{category.icon}</span>
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center space-x-2 bg-white/10 dark:bg-black/20 rounded-lg p-1 border border-gray-200 dark:border-white/10">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg transition-all ${
              viewMode === "grid" 
                ? "bg-white/20 dark:bg-white/10 text-purple-600 dark:text-purple-300" 
                : "text-gray-500 dark:text-white/60 hover:text-purple-600 dark:hover:text-purple-300"
            }`}
            title="Grid View"
          >
            <GridIcon />
          </button>
          <button
            onClick={() => setViewMode("masonry")}
            className={`p-2 rounded-lg transition-all ${
              viewMode === "masonry" 
                ? "bg-white/20 dark:bg-white/10 text-purple-600 dark:text-purple-300" 
                : "text-gray-500 dark:text-white/60 hover:text-purple-600 dark:hover:text-purple-300"
            }`}
            title="Masonry View"
          >
            <MasonryIcon />
          </button>
        </div>
      </div>

      {/* Featured Photos Banner */}
      {selectedCategory === "all" && (
        <div className="mb-12 animate-slide-up">
          <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
            <span className="text-2xl mr-3">⭐</span>
            Featured Collection
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredPhotos.map((photo, index) => (
              <FeaturedPhotoCard 
                key={photo.id} 
                photo={photo} 
                index={index}
                onClick={() => onPhotoClick?.(photo, featuredPhotos)} 
              />
            ))}
          </div>
        </div>
      )}

      {/* Main Gallery */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          {selectedCategory === "all" ? "All Photos" : `${categories.find(c => c.key === selectedCategory)?.label} Gallery`}
        </h3>
        
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPhotos.map((photo, index) => (
              <PhotoCard 
                key={photo.id} 
                photo={photo} 
                index={index}
                onClick={() => onPhotoClick?.(photo, filteredPhotos)}
                layout="grid"
              />
            ))}
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {filteredPhotos.map((photo, index) => (
              <PhotoCard 
                key={photo.id} 
                photo={photo} 
                index={index}
                onClick={() => onPhotoClick?.(photo, filteredPhotos)}
                layout="masonry"
              />
            ))}
          </div>
        )}
      </div>

      <EquipmentSection />
    </div>
  );
};

interface PhotoCardProps {
  photo: Photo;
  index: number;
  onClick: () => void;
  layout?: "grid" | "masonry";
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, index, onClick, layout = "grid" }) => (
  <div 
    className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl animate-fade-in-scale ${
      layout === "masonry" ? "break-inside-avoid mb-6" : "aspect-square"
    }`}
    style={{animationDelay: `${index * 0.1}s`}}
    onClick={onClick}
  >
    <img 
      src={photo.src}
      alt={photo.alt}
      className={`w-full object-cover transition-all duration-700 group-hover:scale-110 ${
        layout === "grid" ? "h-full" : "h-auto"
      }`}
    />
    
    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <h4 className="font-bold text-lg mb-1">{photo.title}</h4>
        <p className="text-sm text-gray-200 mb-2">{photo.location} • {photo.date}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
            {photo.category}
          </span>
          <ExpandIcon className="w-5 h-5" />
        </div>
      </div>
    </div>
  </div>
);

const FeaturedPhotoCard: React.FC<Omit<PhotoCardProps, "layout">> = ({ photo, index, onClick }) => (
  <div 
    className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-[4/3] animate-slide-up hover:scale-[1.02] transition-all duration-500"
    style={{animationDelay: `${index * 0.2}s`}}
    onClick={onClick}
  >
    <img 
      src={photo.src}
      alt={photo.alt}
      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
    />
    
    {/* Featured Badge */}
    <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
      <span>⭐</span>
      <span>Featured</span>
    </div>

    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h4 className="font-bold text-xl mb-2">{photo.title}</h4>
        <p className="text-gray-200 mb-3 text-sm leading-relaxed">{photo.description}</p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-300">{photo.location}</p>
            <p className="text-xs text-gray-400">{photo.settings}</p>
          </div>
          <ExpandIcon className="w-6 h-6" />
        </div>
      </div>
    </div>
  </div>
);

const EquipmentSection: React.FC = () => (
  <div className="animate-slide-up">
    <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
      <span className="text-2xl mr-3">📷</span>
      Equipment & Technique
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/20 hover-lift">
        <h4 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center">
          <CameraIcon className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
          Current Setup
        </h4>
        <ul className="space-y-3 text-sm text-gray-600 dark:text-white/80">
          {[
            "Nikon D5300 DSLR Camera",
            "AF-S DX NIKKOR 35mm f/1.8G Prime",
            "AF-S DX NIKKOR 18-140mm f/3.5-5.6G VR",
            "SB-700 Speedlight Flash",
            "Manfrotto PIXI Mini Tripod",
            "Polarizing & ND Filters"
          ].map((item, index) => (
            <li key={index} className="flex items-center">
              <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3 flex-shrink-0"></span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl p-6 border border-orange-500/20 hover-lift">
        <h4 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center">
          <PaletteIcon className="w-5 h-5 mr-2 text-orange-600 dark:text-orange-400" />
          Photography Style
        </h4>
        <ul className="space-y-3 text-sm text-gray-600 dark:text-white/80">
          {[
            "Natural light portraits",
            "Candid moments and expressions",
            "Vibrant landscape compositions",
            "Street art and cultural documentation",
            "Golden hour and blue hour shots",
            "Shallow depth of field techniques"
          ].map((item, index) => (
            <li key={index} className="flex items-center">
              <span className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mr-3 flex-shrink-0"></span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

// Icons
const GridIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const MasonryIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 12a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1v-7z" />
  </svg>
);

const ExpandIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
  </svg>
);

const CameraIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const PaletteIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
  </svg>
);