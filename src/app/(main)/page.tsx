"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Download, Bell } from "lucide-react"
import { LocationSwitcher } from "@/components/features/location-switcher"
import { motion } from "framer-motion"
import { useLocation } from "@/contexts/LocationContext";
import PortlandMap from "@/components/features/locations/PortlandMap"; 
import SalemMap from "@/components/features/locations/SalemMap";     
import LocationDirectionButtons from "@/components/features/locations/LocationDirectionButtons"; 
import InstagramFeedSection from '@/components/features/social/InstagramFeedSection';
import GoogleReviewsSection from '@/components/features/social/GoogleReviewsSection';
import AppInstallFlow from '@/components/features/install/AppInstallFlow';

export default function HomePage() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { selectedLocation, locationData } = useLocation() 

  // Ensure component is mounted before accessing theme
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) return null

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 text-center space-y-8">
      <LocationSwitcher className="mb-8" /> 

      {/* Header Text with Animations */}
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-center">
          High-Energy Sports<br />
          Bar • Restaurant •<br />
          Nightclub
        </h1>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-2xl md:text-3xl font-semibold flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 mt-4 text-center"
        >
          <span className="w-full text-center mb-1">Featuring Executive Chef</span>
          <div className="flex items-center justify-center gap-3">
            <motion.div
              animate={{ 
                y: [0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="rounded-full bg-black p-1"
            >
              <Image 
                src="/wolf_girl.png" 
                alt="Wolf icon" 
                width={24} 
                height={24} 
                className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full"
              />
            </motion.div>
            <span>Rebecca Sanchez</span>
            <motion.div
              animate={{ 
                y: [0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              className="rounded-full bg-black p-1"
            >
              <Image 
                src="/wolf_girl.png" 
                alt="Wolf icon" 
                width={24} 
                height={24} 
                className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full"
              />
            </motion.div>
          </div>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, type: 'spring' }}
          className="text-xl italic"
        >
          #1 Rated Mexican Food & Best Tacos in Town
        </motion.p>
        
        {/* App Installation Flow */}
        <AppInstallFlow />
      </div>

      {/* Conditional Map and Directions Section */}
      <div className="w-full max-w-3xl mb-8"> 
        {selectedLocation === 'portland' ? (
          <>
            <PortlandMap 
              embedUrl={locationData.portland.embedUrl} 
              title={locationData.portland.name} 
            />
            <div className="mt-4 flex justify-center">
              <LocationDirectionButtons location="portland" />
            </div>
          </>
        ) : (
          <>
            <SalemMap 
              embedUrl={locationData.salem.embedUrl} 
              title={locationData.salem.name} 
            />
            <div className="mt-4 flex justify-center">
              <LocationDirectionButtons location="salem" />
            </div>
          </>
        )}
      </div>

      <InstagramFeedSection />
      
      <GoogleReviewsSection />
    </main>
  )
}