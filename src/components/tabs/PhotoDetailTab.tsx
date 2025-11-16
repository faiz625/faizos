import React from "react";
import { TabType } from "@/hooks/useNavigation";
import { Photo } from "@/types/photography";

interface PhotoDetailTabProps {
  openTab: (tab: TabType) => void;
  photo: Photo;
  photos: Photo[];
  currentIndex: number;
  onPhotoChange: (photo: Photo) => void;
}

export const PhotoDetailTab: React.FC<PhotoDetailTabProps> = ({ 
  openTab, 
  photo, 
  photos, 
  currentIndex, 
  onPhotoChange 
}) => {
  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % photos.length;
    onPhotoChange(photos[nextIndex]);
  };

  const handlePrev = () => {
    const prevIndex = currentIndex === 0 ? photos.length - 1 : currentIndex - 1;
    onPhotoChange(photos[prevIndex]);
  };

  return (
    <div className="bg-black/5 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-white/10 p-6 sm:p-8">
      {/* Back Button */}
      <div className="flex items-center mb-8">
        <button 
          onClick={() => openTab("photography")} 
          className="flex items-center text-gray-600 dark:text-white/60 hover:text-sky-600 dark:hover:text-sky-300 transition-all duration-300 hover:scale-105 bg-white/20 dark:bg-black/20 px-4 py-3 rounded-xl backdrop-blur-sm border border-white/20 dark:border-white/10"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Gallery
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Image Container */}
          <div className="flex-1 relative">
            <div className="relative bg-black/10 dark:bg-white/5 rounded-2xl overflow-hidden">
              <img 
                src={photo.src}
                alt={photo.alt}
                className="w-full h-auto max-h-[70vh] object-contain rounded-2xl"
              />
              
              {/* Navigation Buttons */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
              >
                <ChevronLeftIcon />
              </button>
              
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
              >
                <ChevronRightIcon />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full text-white text-sm">
                {currentIndex + 1} of {photos.length}
              </div>
            </div>
          </div>

          {/* Photo Details Sidebar */}
          <div className="w-full lg:w-80 lg:max-w-sm lg:min-w-0 lg:flex-shrink-0 space-y-6">
            {/* Featured Badge */}
            {photo.featured && (
              <div className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                <span className="mr-1">⭐</span>
                Featured
              </div>
            )}

            {/* Title and Description */}
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-3 break-words">
                {photo.title || photo.alt}
              </h1>
              <p className="text-gray-600 dark:text-white/80 leading-relaxed break-words">
                {photo.description}
              </p>
            </div>

            {/* Photo Details */}
            <div className="bg-white/10 dark:bg-black/10 rounded-xl p-4 space-y-3 min-w-0">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Photo Details</h3>
              
              <div className="space-y-3 text-sm min-w-0">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                  <span className="text-gray-500 dark:text-white/60 flex-shrink-0">Location:</span>
                  <span className="text-gray-800 dark:text-white font-medium break-words">{photo.location}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                  <span className="text-gray-500 dark:text-white/60 flex-shrink-0">Date:</span>
                  <span className="text-gray-800 dark:text-white font-medium">{photo.date}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                  <span className="text-gray-500 dark:text-white/60 flex-shrink-0">
                    {photo.categories && photo.categories.length > 1 ? 'Categories:' : 'Category:'}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {photo.categories && photo.categories.length > 0 ? (
                      photo.categories.map((cat, index) => (
                        <span
                          key={index}
                          className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-lg text-xs font-medium capitalize"
                        >
                          {cat}
                        </span>
                      ))
                    ) : (
                      <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-lg text-xs font-medium capitalize">
                        {photo.category}
                      </span>
                    )}
                  </div>
                </div>
                {photo.camera && (
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                    <span className="text-gray-500 dark:text-white/60 flex-shrink-0">Camera:</span>
                    <span className="text-gray-800 dark:text-white font-medium break-words">{photo.camera}</span>
                  </div>
                )}
                {photo.lens && (
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                    <span className="text-gray-500 dark:text-white/60 flex-shrink-0">Lens:</span>
                    <span className="text-gray-800 dark:text-white font-medium break-words">{photo.lens}</span>
                  </div>
                )}
                {photo.settings && (
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                    <span className="text-gray-500 dark:text-white/60 flex-shrink-0">Settings:</span>
                    <span className="text-gray-800 dark:text-white font-medium break-words">{photo.settings}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation Through Gallery */}
            <div className="bg-white/10 dark:bg-black/10 rounded-xl p-4 min-w-0">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Navigate Gallery</h3>
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 bg-white/20 dark:bg-black/20 rounded-lg hover:bg-white/30 dark:hover:bg-black/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                >
                  <ChevronLeftIcon />
                  <span className="text-xs sm:text-sm hidden xs:inline">Previous</span>
                  <span className="text-xs sm:text-sm xs:hidden">Prev</span>
                </button>
                
                <div className="text-xs sm:text-sm text-gray-600 dark:text-white/70 text-center flex-shrink-0">
                  {currentIndex + 1} / {photos.length}
                </div>
                
                <button
                  onClick={handleNext}
                  disabled={currentIndex === photos.length - 1}
                  className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 bg-white/20 dark:bg-black/20 rounded-lg hover:bg-white/30 dark:hover:bg-black/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                >
                  <span className="text-xs sm:text-sm hidden xs:inline">Next</span>
                  <span className="text-xs sm:text-sm xs:hidden">Next</span>
                  <ChevronRightIcon />
                </button>
              </div>
            </div>

            {/* View All Photos Button */}
            <button
              onClick={() => openTab("photography")}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 min-w-0"
            >
              View All Photos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Icons
const ChevronLeftIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);