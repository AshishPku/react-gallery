import React, { useState, useEffect } from "react";
import {
  Search,
  Heart,
  Eye,
  Download,
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);

  // Sample images with categories
  const images = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      title: "Mountain Landscape",
      category: "nature",
      views: 1240,
      description: "Breathtaking mountain vista with golden hour lighting",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
      title: "City Skyline",
      category: "urban",
      views: 890,
      description: "Modern city architecture at sunset",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
      title: "Forest Trail",
      category: "nature",
      views: 2100,
      description: "Mystical forest path with dappled sunlight",
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&h=600&fit=crop",
      title: "Ocean Waves",
      category: "nature",
      views: 1560,
      description: "Powerful ocean waves crashing on shore",
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=800&h=600&fit=crop",
      title: "Urban Street",
      category: "urban",
      views: 670,
      description: "Vibrant street art and urban culture",
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop",
      title: "Tropical Beach",
      category: "travel",
      views: 3200,
      description: "Paradise beach with crystal clear waters",
    },
    {
      id: 7,
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      title: "Northern Lights",
      category: "nature",
      views: 4100,
      description: "Aurora borealis dancing across the night sky",
    },
    {
      id: 8,
      url: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600&fit=crop",
      title: "Desert Dunes",
      category: "travel",
      views: 980,
      description: "Golden sand dunes stretching to the horizon",
    },
  ];

  const categories = ["all", "nature", "urban", "travel"];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const filteredImages = images.filter((img) => {
    const matchesFilter = filter === "all" || img.category === filter;
    const matchesSearch =
      img.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      img.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const openModal = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = "unset";
  };

  const navigateImage = (direction) => {
    const currentIndex = filteredImages.findIndex(
      (img) => img.id === selectedImage.id
    );
    let newIndex;

    if (direction === "next") {
      newIndex = (currentIndex + 1) % filteredImages.length;
    } else {
      newIndex =
        currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    }

    setSelectedImage(filteredImages[newIndex]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl font-light">Loading Gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="backdrop-blur-lg bg-black/20 border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Gallery
              </h1>
              <p className="text-gray-300 mt-2 text-lg">
                Discover breathtaking moments
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search images..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 capitalize ${
                filter === cat
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105"
                  : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white backdrop-blur-lg border border-white/10"
              }`}
            >
              <Filter className="inline w-4 h-4 mr-2" />
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/10 hover:border-purple-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: "fadeInUp 0.6s ease-out forwards",
              }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-bold text-lg mb-2">
                    {image.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {image.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(image.id);
                        }}
                        className={`p-2 rounded-full transition-all duration-300 ${
                          favorites.has(image.id)
                            ? "bg-red-500 text-white"
                            : "bg-white/20 text-white hover:bg-red-500"
                        }`}
                      >
                        <Heart
                          className="w-4 h-4"
                          fill={
                            favorites.has(image.id) ? "currentColor" : "none"
                          }
                        />
                      </button>
                      <span className="text-gray-300 text-sm flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {image.views}
                      </span>
                    </div>

                    <button
                      onClick={() => openModal(image)}
                      className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">
              No images found
            </h3>
            <p className="text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-lg z-50 flex items-center justify-center p-4">
          <div className="relative max-w-6xl w-full max-h-[90vh] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-3xl overflow-hidden">
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="w-full h-96 lg:h-[60vh] object-cover"
            />

            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {selectedImage.title}
                  </h2>
                  <p className="text-gray-300 mb-4">
                    {selectedImage.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {selectedImage.views} views
                    </span>
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full capitalize">
                      {selectedImage.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleFavorite(selectedImage.id)}
                    className={`p-3 rounded-full transition-all duration-300 ${
                      favorites.has(selectedImage.id)
                        ? "bg-red-500 text-white"
                        : "bg-white/20 text-white hover:bg-red-500"
                    }`}
                  >
                    <Heart
                      className="w-5 h-5"
                      fill={
                        favorites.has(selectedImage.id)
                          ? "currentColor"
                          : "none"
                      }
                    />
                  </button>
                  <button className="p-3 bg-white/20 text-white rounded-full hover:bg-white/30 transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <button
              onClick={() => navigateImage("prev")}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 backdrop-blur-lg text-white rounded-full hover:bg-black/70 transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => navigateImage("next")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 backdrop-blur-lg text-white rounded-full hover:bg-black/70 transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-3 bg-black/50 backdrop-blur-lg text-white rounded-full hover:bg-black/70 transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Gallery;
