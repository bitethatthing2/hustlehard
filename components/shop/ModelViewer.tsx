interface ModelViewerProps {
  isModelLoaded: boolean;
  showTooltip: boolean;
  onLoad: () => void;
  onError: () => void;
}

export default function ModelViewer({ isModelLoaded, showTooltip, onLoad, onError }: ModelViewerProps) {
  return (
    <div className="relative group">
      <div className="aspect-square relative bg-gradient-to-br from-black/90 to-bar-accent/5 rounded-xl overflow-hidden backdrop-blur-sm transition-transform duration-300 group-hover:scale-[1.02] border border-bar-accent/10">
        {!isModelLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 gap-2">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-bar-accent border-t-transparent"></div>
            <p className="text-white/70 text-sm">Loading Preview...</p>
          </div>
        )}
        <spline-viewer 
          url="https://prod.spline.design/Mh91AUmppB4ru-9h/scene.splinecode"
          className="w-full h-full"
          onLoad={onLoad}
          onError={onError}
          loading="lazy"
          events-target="global"
          cross-origin="anonymous"
        />
        {showTooltip && (
          <div className="absolute top-4 right-4 bg-black/95 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm border border-bar-accent/20">
            <p className="flex items-center gap-2">
              <span className="text-bar-accent">👆</span>
              Rotate to preview
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 