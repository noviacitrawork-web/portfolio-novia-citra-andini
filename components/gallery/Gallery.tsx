import React, { useState, useRef } from 'react';
import { GALLERY, CAROUSEL_ITEMS, GALLERY_DESCRIPTION } from '../../src/constants';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import Carousel from '../Carousel';
import { GalleryItem } from '../../types';
import { parseBoldText } from '../../src/utis';

const Gallery: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [showAll, setShowAll] = useState(false);
  
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const visibleGallery = showAll ? GALLERY : GALLERY.slice(0, 3);



  const handleOpenModal = (item: GalleryItem) => {
    setSelectedItem(item);
    setCurrentImageIndex(0);
  };

  const handleImageLoad = (src: string) => {
    setLoadedImages(prev => new Set(prev).add(src));
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
      handleNextImage();
    }
    if (touchStartX.current - touchEndX.current < -50) {
      handlePrevImage();
    }
  };

  return (
    <section id="gallery" className="py-24 bg-gray-50 dark:bg-dark relative overflow-hidden transition-colors duration-500">
       {/* Texture Pattern: Scatter Plot / Matrix Dots (Discrete Math Theme) */}
      <div className="absolute inset-0 bg-[radial-gradient(#80808008_2px,transparent_2px)] bg-[size:20px_20px] z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Gallery</h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full"></div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4">
            {GALLERY_DESCRIPTION}
          </p>
        </motion.div>

        {/* Carousel Section */}
        <div className="w-full max-w-4xl mx-auto mb-16">
          <Carousel items={CAROUSEL_ITEMS} />
        </div>

        {/* Grid Section */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {visibleGallery.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.4rem)] group relative overflow-hidden rounded-xl shadow-lg bg-white dark:bg-card cursor-pointer"
              onClick={() => handleOpenModal(item)}
            >
              <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                <img 
                  src={item.images[0]} 
                  alt={item.title} 
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 hidden md:flex items-start justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
                  <div className="bg-black/50 p-2 rounded-full backdrop-blur-sm">
                    <ZoomIn className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-200 text-sm">{parseBoldText(item.description)}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {GALLERY.length > 3 && (
          <div className="flex justify-center mt-8">
             <button 
               onClick={() => setShowAll(!showAll)}
               className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-card border border-gray-200 dark:border-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all text-gray-900 dark:text-white font-medium group hover:-translate-y-1"
             >
               {showAll ? (
                 <>
                   Show Less Gallery <ChevronUp size={20} className="group-hover:-translate-y-1 transition-transform" />
                 </>
               ) : (
                 <>
                   Show More Gallery <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform" />
                 </>
               )}
             </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-[95%] md:w-full bg-white dark:bg-card rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] lg:h-[85vh] flex flex-col"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="flex flex-col lg:grid lg:grid-cols-[65%_35%] flex-1 min-h-0 overflow-hidden">
                <div 
                  className="bg-black flex items-center justify-center p-0 relative group h-[40%] min-h-[250px] lg:h-full w-full shrink-0"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
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
                <div className="flex-1 lg:h-full overflow-y-auto bg-white dark:bg-card p-6 md:p-8 custom-scrollbar">
                  <div className="flex flex-col min-h-full">
                    <div className="flex-shrink-0">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        {selectedItem.title}
                      </h3>
                      <div className="w-20 h-1 bg-secondary rounded-full mb-6"></div>
                    </div>
                    <div className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base">
                      {parseBoldText(selectedItem.description, "font-bold text-gray-900 dark:text-white")}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
