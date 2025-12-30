import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { GalleryItem } from '../types';

interface CarouselProps {
  items: GalleryItem[];
  autoPlayInterval?: number;
}

const Carousel: React.FC<CarouselProps> = ({ items, autoPlayInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Helper to parse bold text using * syntax
  const parseBoldText = (text: string | React.ReactNode, className = "font-bold text-gray-900 dark:text-white") => {
    if (typeof text !== 'string') return text;
    return text.split('*').map((part, index) => 
      index % 2 === 1 ? <span key={index} className={className}>{part}</span> : part
    );
  };

  useEffect(() => {
    if (isPaused || selectedItem) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [items.length, autoPlayInterval, isPaused, selectedItem]);

  const handleImageLoad = (src: string) => {
    setLoadedImages(prev => new Set(prev).add(src));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handleOpenModal = (item: GalleryItem) => {
    setSelectedItem(item);
    setCurrentImageIndex(0);
    setIsPaused(true);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setIsPaused(false);
  };

  const handleNextImage = () => {
    if (selectedItem) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedItem.images.length);
    }
  };

  const handlePrevImage = () => {
    if (selectedItem) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedItem.images.length) % selectedItem.images.length);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      handleNext();
    }
    if (touchStartX.current - touchEndX.current < -50) {
      handlePrev();
    }
  };

  const handleModalTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      handleNextImage();
    }
    if (touchStartX.current - touchEndX.current < -50) {
      handlePrevImage();
    }
  };

  return (
    <>
      <div 
        className="relative w-full aspect-video overflow-hidden rounded-xl shadow-2xl group"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-full cursor-pointer bg-black"
            onClick={() => handleOpenModal(items[currentIndex])}
          >
            {!loadedImages.has(items[currentIndex].images[0]) && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            )}
            <img 
              src={items[currentIndex].images[0]} 
              alt={items[currentIndex].title} 
              onLoad={() => handleImageLoad(items[currentIndex].images[0])}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                loadedImages.has(items[currentIndex].images[0]) ? 'opacity-100' : 'opacity-0'
              }`}
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
               <p className="text-white text-lg font-bold mb-2">{items[currentIndex].title}</p>
               <p className="text-white/80 text-sm max-w-md text-center px-4 mb-4 line-clamp-2">{parseBoldText(items[currentIndex].description, "font-bold text-white")}</p>
               <div className="hidden md:flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider bg-primary/80 px-3 py-1.5 rounded-full">
                  <ZoomIn size={14} /> View Full Size
               </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button 
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight size={24} />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={(e) => { e.stopPropagation(); setCurrentIndex(index); }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-white w-6' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {createPortal(
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-[95%] md:w-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] lg:h-[85vh] flex flex-col"
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col lg:grid lg:grid-cols-[65%_35%] flex-1 min-h-0 overflow-hidden">
                <div 
                  className="bg-black flex items-center justify-center p-0 relative group h-[40%] min-h-[250px] lg:h-full w-full shrink-0"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleModalTouchEnd}
                >
                  <AnimatePresence mode='wait'>
                    <div className="relative w-full h-full flex items-center justify-center">
                      {!loadedImages.has(selectedItem.images[currentImageIndex]) && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Loader2 className="w-10 h-10 animate-spin text-white" />
                        </div>
                      )}
                      <motion.img
                        key={currentImageIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        src={selectedItem.images[currentImageIndex]}
                        alt={selectedItem.title}
                        onLoad={() => handleImageLoad(selectedItem.images[currentImageIndex])}
                        className={`max-w-full max-h-full w-auto object-contain transition-opacity duration-300 ${
                          loadedImages.has(selectedItem.images[currentImageIndex]) ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    </div>
                  </AnimatePresence>

                  {/* Navigation Buttons (Desktop only, if multiple images) */}
                  {selectedItem.images.length > 1 && (
                    <>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white p-2 rounded-full transition-colors hidden md:block"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white p-2 rounded-full transition-colors hidden md:block"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                      
                      {/* Dots Indicator */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {selectedItem.images.map((_, idx) => (
                          <div 
                            key={idx}
                            className={`w-2 h-2 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-white' : 'bg-white/30'}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Unified Scroll Container */}
                <div className="flex-1 lg:h-full overflow-y-auto bg-white dark:bg-gray-800 p-6 md:p-8 custom-scrollbar">
                  <div className="flex flex-col min-h-full">
                    <div className="flex-shrink-0">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        {selectedItem.title}
                      </h3>
                      <div className="w-20 h-1 bg-secondary rounded-full mb-6"></div>
                    </div>
                    <div className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base">
                      {parseBoldText(selectedItem.description)}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
      )}
    </>
  );
};

export default Carousel;
