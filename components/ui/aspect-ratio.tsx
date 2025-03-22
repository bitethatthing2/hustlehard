import * as React from "react"

interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio: number
}

export const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio, className, children, ...props }, ref) => {
    // Determine aspect ratio class for common ratios
    let ratioClass = "";
    
    // Map common ratios to predefined classes
    if (ratio === 1) ratioClass = "aspect-ratio-1-1";
    else if (ratio === 4/3) ratioClass = "aspect-ratio-4-3";
    else if (ratio === 16/9) ratioClass = "aspect-ratio-16-9";
    else if (ratio === 21/9) ratioClass = "aspect-ratio-21-9";
    else if (ratio === 3/2) ratioClass = "aspect-ratio-3-2";
    else if (ratio === 3/4) ratioClass = "aspect-ratio-3-4";
    else if (ratio === 9/16) ratioClass = "aspect-ratio-9-16";
    else if (ratio === 2/1) ratioClass = "aspect-ratio-2-1";
    else if (ratio === 1/2) ratioClass = "aspect-ratio-1-2";
    else if (ratio === 5/4) ratioClass = "aspect-ratio-5-4";
    else if (ratio === 4/5) ratioClass = "aspect-ratio-4-5";
    else if (ratio === 5/3) ratioClass = "aspect-ratio-5-3";
    else if (ratio === 3/5) ratioClass = "aspect-ratio-3-5";
    else if (ratio === 7/5) ratioClass = "aspect-ratio-7-5";
    else if (ratio === 5/7) ratioClass = "aspect-ratio-5-7";
    
    // For custom ratios, we'll use CSS variables
    const style = !ratioClass ? { "--aspect-ratio": ratio } as React.CSSProperties : undefined;
    
    return (
      <div ref={ref} className={`aspect-ratio-wrapper ${className || ''}`} style={style} {...props}>
        <div className={`aspect-ratio-spacer ${ratioClass}`} />
        <div className="aspect-ratio-content">
          {children}
        </div>
      </div>
    )
  }
)

AspectRatio.displayName = "AspectRatio" 