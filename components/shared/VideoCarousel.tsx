import { useEffect, useRef, useState } from 'react';

const videos = [
  'https://video.wixstatic.com/video/6c399c_7cfb19f9f26d42c8b568f0f6fefdd2cd/720p/mp4/file.mp4',
  'https://video.wixstatic.com/video/6c399c_6097580d4c4f414fb13c097be931c468/720p/mp4/file.mp4',
  'https://video.wixstatic.com/video/6c399c_a5fb96ea30404b3d9e11bf4e890eca5a/720p/mp4/file.mp4'
];

export default function VideoCarousel() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Initialize refs array
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, videos.length);
  }, []);

  // Handle video end
  const handleVideoEnd = () => {
    const nextIndex = (currentVideoIndex + 1) % videos.length;
    setCurrentVideoIndex(nextIndex);
    
    // Play the next video
    const nextVideo = videoRefs.current[nextIndex];
    if (nextVideo) {
      nextVideo.play();
    }
  };

  return (
    <div className="video-carousel-container video-carousel-xs h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] max-h-[600px] shadow-xl border border-white/10">
      {videos.map((url, index) => (
        <video
          key={url}
          ref={(el) => {
            videoRefs.current[index] = el;
          }}
          src={url}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
            index === currentVideoIndex ? 'opacity-100' : 'opacity-0'
          }`}
          autoPlay={index === 0}
          muted
          playsInline
          onEnded={handleVideoEnd}
          style={{ zIndex: index === currentVideoIndex ? 1 : 0 }}
        />
      ))}
      
      {/* Video Controls */}
      <div className="absolute bottom-4 left-0 right-0 mx-auto flex justify-center items-center gap-2 z-10 px-4">
        {videos.map((_, index) => (
          <button
            key={index}
            aria-label={`Play video ${index + 1}`}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 transform hover:scale-125 ${
              index === currentVideoIndex 
                ? 'bg-white w-6 sm:w-8' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            onClick={() => {
              setCurrentVideoIndex(index);
              videoRefs.current[index]?.play();
            }}
          />
        ))}
      </div>
      
      {/* Title Overlay */}
      <div className="absolute top-0 left-0 right-0 p-3 sm:p-4 md:p-5 bg-gradient-to-b from-black/70 to-transparent z-10">
        <p className="text-white text-xs sm:text-sm md:text-base font-medium flex items-center justify-between">
          <span>Lone Wolf Collection</span>
          <span className="bg-black/30 px-2 py-1 rounded-full text-xs">{currentVideoIndex + 1}/{videos.length}</span>
        </p>
      </div>
    </div>
  );
} 