import { Metadata } from 'next';
import DJProfile from '@/components/djs/DJProfile';

export const metadata: Metadata = {
  title: 'Meet Our DJs - Side Hustle',
  description: 'Meet the talented DJs that make Side Hustle Bar the place to be',
};

export default function DJsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-white text-center">Meet Our DJs</h1>
      
      <p className="text-white text-opacity-80 mb-10 max-w-3xl mx-auto text-center">
        At Side Hustle Bar, our DJs are the heart and soul of our entertainment. 
        Each brings their unique style and passion to create unforgettable nights.
        Follow them on Instagram to stay updated on their latest mixes and upcoming events.
      </p>
      
      <div className="space-y-12">
        <DJProfile
          name="Elisha Johnson-McClyde"
          alias="EJ that DJ"
          bio="Elisha Johnson-McClyde, known professionally as 'EJ that DJ', brings over a decade of experience to the turntables at Side Hustle Bar.\n\nWith roots in classic hip-hop and R&B, EJ has evolved his sound to encompass everything from trap and bass music to house and EDM. His seamless transitions and crowd-reading abilities have made him a favorite among Portland's nightlife scene.\n\nWhen not at Side Hustle Bar, EJ produces original tracks and remixes, and has opened for several national touring acts."
          instagramUsername="ejthatdj"
        />
        
        <DJProfile
          name="Denver Orozco"
          alias="DJ Denver"
          bio="Denver Orozco, better known as DJ Denver, brings Latin flair and international rhythm to Side Hustle Bar.\n\nSpecializing in reggaeton, Latin trap, and global beats, Denver creates an irresistible dance floor experience that transcends language barriers. His energy behind the decks is infectious, often seen dancing along with the crowd while mixing tracks from around the world.\n\nA Portland native with Mexican roots, Denver incorporates both traditional and contemporary Latin sounds into his sets, creating a unique cultural fusion that perfectly matches Side Hustle's diverse atmosphere."
          instagramUsername="djdenverpdx"
        />
        
        <DJProfile
          name="Alexandria Carter"
          alias="DJ Lexi Beats"
          bio="Alexandria Carter, performing as DJ Lexi Beats, is Side Hustle Bar's resident vinyl enthusiast and deep cut specialist.\n\nWith a background in music journalism and a collection of rare vinyl spanning decades, Lexi brings unparalleled musical knowledge and curation to her sets. Her Sunday Soul Sessions have become legendary in Portland's music scene, featuring everything from obscure funk classics to soul-inspired contemporary tracks.\n\nLexi's approach to DJing is both technical and emotional, creating thoughtful journeys through music history while keeping the dance floor moving."
          instagramUsername="lexibeats"
        />
      </div>
    </main>
  );
} 