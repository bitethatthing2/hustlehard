import { useState } from 'react';
import ModelViewer from './ModelViewer';

interface ProductImage {
  src: string;
  alt: string;
}

interface ProductDisplayProps {
  isModelLoaded: boolean;
  showTooltip: boolean;
  onModelLoad: () => void;
  onModelError: () => void;
  onTooltipToggle: () => void;
}

const productImages: ProductImage[] = [
  { src: '/images/shop/product-1.jpg', alt: 'Product front view' },
  { src: '/images/shop/product-2.jpg', alt: 'Product back view' },
  { src: '/images/shop/product-3.jpg', alt: 'Product detail view' },
  { src: '/images/shop/product-4.jpg', alt: 'Product lifestyle shot' },
];

export default function ProductDisplay({ isModelLoaded, showTooltip, onModelLoad, onModelError, onTooltipToggle }: ProductDisplayProps) {
  const [selectedImage, setSelectedImage] = useState<number>(0);

  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Thumbnail Navigation */}
        <div className="md:col-span-2 order-2 md:order-1">
          <div className="flex md:flex-col gap-2 justify-center">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  selectedImage === index
                    ? 'border-bar-accent scale-105 shadow-lg shadow-bar-accent/20'
                    : 'border-white/10 hover:border-bar-accent/50'
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-16 h-16 object-cover"
                />
              </button>
            ))}
            <button
              onClick={() => setSelectedImage(4)}
              className={`relative rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                selectedImage === 4
                  ? 'border-bar-accent scale-105 shadow-lg shadow-bar-accent/20'
                  : 'border-white/10 hover:border-bar-accent/50'
              }`}
            >
              <div className="w-16 h-16 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                <span className="text-2xl">🎮</span>
              </div>
            </button>
          </div>
        </div>

        {/* Main Display Area */}
        <div className="md:col-span-10 order-1 md:order-2">
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black/40 backdrop-blur-sm border border-white/10">
            {selectedImage === 4 ? (
              <div className="absolute inset-0">
                <ModelViewer
                  isModelLoaded={isModelLoaded}
                  showTooltip={showTooltip}
                  onLoad={onModelLoad}
                  onError={onModelError}
                />
              </div>
            ) : (
              <img
                src={productImages[selectedImage].src}
                alt={productImages[selectedImage].alt}
                className="w-full h-full object-cover"
              />
            )}

            {/* Interactive Elements */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button
                onClick={onTooltipToggle}
                className="p-2 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 text-white hover:bg-bar-accent/20 hover:border-bar-accent/50 transition-colors"
                title="Toggle information tooltip"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <button
                onClick={() => setSelectedImage(4)}
                className="p-2 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 text-white hover:bg-bar-accent/20 hover:border-bar-accent/50 transition-colors"
                title="View 3D model"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 