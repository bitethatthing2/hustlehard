'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BackButtonProps {
  className?: string;
  label?: string;
}

export default function BackButton({ className = '', label = 'Back' }: BackButtonProps) {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      variant="default"
      className={cn(
        'flex items-center gap-2 bg-white text-black hover:bg-white/90 px-6 py-3 h-auto shadow-lg rounded-lg',
        'transition-all duration-200 hover:scale-105 active:scale-95',
        'min-w-[100px] min-h-[44px]', // Ensuring minimum size for touch targets
        'md:min-w-[120px] md:min-h-[48px]', // Larger on desktop
        'outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500', // Keyboard focus styles
        className
      )}
      size="default"
      aria-label="Go back"
    >
      <div className="relative w-6 h-6 flex-shrink-0 md:w-7 md:h-7">
        <Image
          src="/only_these/logos/menu_icon_back _button_close.png"
          alt="Back"
          width={28}
          height={28}
          className="w-full h-full object-contain"
          priority
        />
      </div>
      <span className="text-sm md:text-base font-bold text-black">
        {label}
      </span>
    </Button>
  );
} 