"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"
import { useLocation } from "@/contexts/LocationContext"
import Image from "next/image"

const LocationSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => {
  const { selectedLocation, setSelectedLocation } = useLocation()

  const handleToggle = (checked: boolean) => {
    setSelectedLocation(checked ? 'portland' : 'salem')
  }

  return (
    <div className="flex items-center justify-center gap-4 w-full max-w-xs mx-auto">
      <span className={cn(
        "text-sm font-medium transition-colors",
        selectedLocation === 'salem' ? "text-white" : "text-white/50"
      )}>
        SALEM
      </span>
      
      <SwitchPrimitives.Root
        className={cn(
          "peer inline-flex h-14 w-28 shrink-0 cursor-pointer items-center rounded-full border-4 border-white shadow-[0_0_0_1px_rgba(255,255,255,1)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-50 bg-black",
          selectedLocation === 'portland' ? "justify-end" : "justify-start",
          className
        )}
        checked={selectedLocation === 'portland'}
        onCheckedChange={handleToggle}
        ref={ref}
        {...props}
      >
        <SwitchPrimitives.Thumb
          className={cn(
            "pointer-events-none flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] border border-white/80 ring-0 transition-transform",
            selectedLocation === 'portland' ? "translate-x-0" : "-translate-x-0"
          )}
        >
          <Image 
            src="/only_these/logos/salem_portland_toggle_icon.png"
            alt="Location Toggle Icon"
            width={48}
            height={48}
            className="w-12 h-12 object-contain"
          />
        </SwitchPrimitives.Thumb>
      </SwitchPrimitives.Root>

      <span className={cn(
        "text-sm font-medium transition-colors",
        selectedLocation === 'portland' ? "text-white" : "text-white/50"
      )}>
        PORTLAND
      </span>
    </div>
  )
})

LocationSwitch.displayName = "LocationSwitch"

export { LocationSwitch } 