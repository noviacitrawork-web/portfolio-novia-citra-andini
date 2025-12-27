import React, { useState, useRef } from 'react';
import { GALLERY, CAROUSEL_ITEMS, GALLERY_DESCRIPTION } from '../../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import Carousel from '../Carousel';
import { GalleryItem } from '../../types';

const Gallery: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const handleOpenModal = (item: GalleryItem) => {
    setSelectedItem(item);
    setCurrentImageIndex(0);
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
        <div className="flex flex-wrap justify-center gap-8">
          {GALLERY.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.4rem)] group relative overflow-hidden rounded-xl shadow-lg bg-white dark:bg-gray-800 cursor-pointer"
              onClick={() => handleOpenModal(item)}
            >
              <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                <img 
                  src={item.images[0]} 
                  alt={item.title} 
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
                  <ZoomIn className="w-10 h-10 text-white drop-shadow-lg" />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-200 text-sm">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
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
              className="relative max-w-5xl w-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="grid md:grid-cols-[2fr,1fr]">
                <div 
                  className="bg-black flex items-center justify-center p-2 relative group"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <AnimatePresence mode='wait'>
                    <motion.img
                      key={currentImageIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      src={selectedItem.images[currentImageIndex]}
                      alt={selectedItem.title}
                      className="max-h-[80vh] w-auto object-contain"
                    />
                  </AnimatePresence>

                  {/* Navigation Buttons (Desktop only, if multiple images) */}
                  {selectedItem.images.length > 1 && (
                    <>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors hidden md:block"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors hidden md:block"
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
                <div className="p-8 flex flex-col justify-center bg-white dark:bg-gray-800">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {selectedItem.title}
                  </h3>
                  <div className="w-20 h-1 bg-secondary rounded-full mb-6"></div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {selectedItem.description}
                  </p>
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
