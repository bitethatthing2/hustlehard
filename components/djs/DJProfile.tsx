'use client';

import InstagramEmbed from '@/components/social/InstagramEmbed';

interface DJProfileProps {
  name: string;
  alias?: string;
  bio: string;
  instagramUsername: string;
  imageUrl?: string;
}

export default function DJProfile({
  name,
  alias,
  bio,
  instagramUsername
}: DJProfileProps) {
  return (
    <div className="mb-12 p-6 border border-gray-700 rounded-lg bg-black/40">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white mb-2">
            {name} {alias && <span className="text-gray-400">({alias})</span>}
          </h2>
          
          <div className="mb-4 text-white text-opacity-90 space-y-4">
            {bio.split('\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
        
        <div className="md:w-[350px]">
          <InstagramEmbed username={instagramUsername} className="mx-auto" />
        </div>
      </div>
    </div>
  );
} 