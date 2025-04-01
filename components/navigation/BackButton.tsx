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
        'flex items-center gap-2 bg-white text-black hover:bg-white/90 px-5 py-2 h-auto shadow-md rounded-md',
        className
      )}
      size="default"
      aria-label="Go back"
    >
      <div className="relative w-6 h-6 flex-shrink-0">
        <Image 
          src="/only_these/logos/menu_icon_back _button.png"
          alt="Back"
          width={24}
          height={24}
          className="object-contain"
        />
      </div>
      <span className="text-sm font-bold text-black">
        {label}
      </span>
    </Button>
  );
} 