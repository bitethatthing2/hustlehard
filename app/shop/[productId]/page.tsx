/** @jsxImportSource react */
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

// Define product data structure
interface ProductItem {
  id: string;
  name: string;
  description: string;
  videoUrl: string;
  trademark: string;
  price: number;
  availableSizes: string[];
}

// Product data
const products: ProductItem[] = [
  {
    id: 'lone-wolf-sweater',
    name: 'The Lone Wolf Sweater',
    description: 'Sleek, comfortable design for the independent hustler',
    videoUrl: 'https://video.wixstatic.com/video/6c399c_7cfb19f9f26d42c8b568f0f6fefdd2cd/720p/mp4/file.mp4',
    trademark: 'Side Hustle Wear™',
    price: 65.99,
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL']
  },
  {
    id: 'the-representer',
    name: 'The Representer',
    description: 'Showcasing the Side Hustle logo with pride',
    videoUrl: 'https://video.wixstatic.com/video/6c399c_6097580d4c4f414fb13c097be931c468/720p/mp4/file.mp4',
    trademark: 'Side Hustle Wear™',
    price: 59.99,
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL']
  },
  {
    id: 'pdx-player',
    name: 'PDX Portland Player Sweater',
    description: 'Grand Opening Edition - Limited availability',
    videoUrl: 'https://video.wixstatic.com/video/6c399c_a5fb96ea30404b3d9e11bf4e890eca5a/720p/mp4/file.mp4',
    trademark: 'Side Hustle Wear™',
    price: 69.99,
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL']
  }
];

interface ProductPageProps {
  params: {
    productId: string;
  };
}

export default function ProductPage({ params }: ProductPageProps): React.ReactElement {
  const { productId } = params;
  const searchParams = useSearchParams();
  const [product, setProduct] = useState<ProductItem | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    // Find the product by ID
    const foundProduct = products.find(item => item.id === productId);
    setProduct(foundProduct || null);
    
    // Get the size from URL params if available
    const sizeParam = searchParams.get('size');
    if (sizeParam && foundProduct?.availableSizes.includes(sizeParam)) {
      setSelectedSize(sizeParam);
    }
  }, [productId, searchParams]);
  
  // Handle quantity changes
  const incrementQuantity = () => setQuantity(prev => Math.min(prev + 1, 10));
  const decrementQuantity = () => setQuantity(prev => Math.max(prev - 1, 1));
  
  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl mb-4">Product not found</h1>
        <Link href="/shop" className="text-bar-accent hover:text-bar-accent/80">
          Return to shop
        </Link>
      </div>
    );
  }
  
  return (
    <main className="min-h-screen bg-black text-white pt-16">
      <div className="container mx-auto max-w-6xl px-4">
        <Link 
          href="/shop" 
          className="inline-flex items-center gap-2 text-gray-300 hover:text-bar-accent transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Shop</span>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Video Showcase */}
          <div className="rounded-xl overflow-hidden bg-black/40 backdrop-blur-sm border border-white/10 video-showcase animate-fade-in">
            <video
              src={product.videoUrl}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>

          {/* Product Details */}
          <div className="animate-fade-in animation-delay-300">
            <h1 className="text-3xl font-display mb-2">{product.name}</h1>
            <p className="text-gray-300 mb-4">{product.description}</p>
            <p className="text-bar-accent text-2xl mb-6">${product.price}</p>
            <p className="text-gray-400 text-sm mb-8">{product.trademark}</p>
            
            {/* Size Selection */}
            <div className="mb-8">
              <h3 className="text-lg mb-4">Select Size</h3>
              <div className="grid grid-cols-3 gap-2">
                {product.availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-4 border rounded-lg transition-colors ${
                      selectedSize === size
                        ? 'bg-bar-accent border-bar-accent text-white'
                        : 'border-white/10 hover:bg-bar-accent/20 hover:border-bar-accent'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="mb-8">
              <h3 className="text-lg mb-4">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={decrementQuantity}
                  className="w-10 h-10 rounded-lg border border-white/10 hover:bg-bar-accent/20 hover:border-bar-accent transition-colors"
                >
                  -
                </button>
                <span className="text-xl">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  className="w-10 h-10 rounded-lg border border-white/10 hover:bg-bar-accent/20 hover:border-bar-accent transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button 
              className={`w-full py-3 rounded-lg transition-colors ${
                selectedSize
                  ? 'bg-bar-accent hover:bg-bar-accent/90'
                  : 'bg-gray-600 cursor-not-allowed'
              }`}
              disabled={!selectedSize}
            >
              {selectedSize ? 'Add to Cart' : 'Select a Size'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
} 