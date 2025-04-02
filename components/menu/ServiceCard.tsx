import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ServiceOption {
  name: string;
  fee: string;
  time: string;
  url: string;
  logo?: string;
}

interface DeliveryService extends ServiceOption {
  serviceFee: string;
}

interface ServiceCardProps {
  option: ServiceOption | DeliveryService;
  index: number;
  className?: string;
}

export function ServiceCard({ option, index, className }: ServiceCardProps) {
  const isDelivery = 'serviceFee' in option;
  
  return (
    <Card className={cn(
      "h-full transition-all duration-300 border-border/50 hover:border-border/80 shadow-sm hover:shadow-md bg-white",
      className
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          {option.logo && (
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center flex-shrink-0">
              <Image 
                src={option.logo} 
                alt={option.name} 
                width={32} 
                height={32}
                className="w-8 h-8 object-contain brightness-0 invert" 
              />
            </div>
          )}
          <CardTitle className="text-base font-bold text-black">{option.name}</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="py-2">
        <div className="space-y-1.5 text-sm">
          {isDelivery && (
            <p className="text-black font-medium">{(option as DeliveryService).serviceFee}</p>
          )}
          <p className="text-black font-medium">{option.fee}</p>
          <p className="text-bar-accent font-bold">{option.time}</p>
        </div>
      </CardContent>
      
      <CardFooter className="pt-4">
        <Button 
          asChild 
          variant="default"
          className="w-full bg-black hover:bg-black/90 text-white font-bold"
        >
          <Link 
            href={option.url} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Order Now
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
} 