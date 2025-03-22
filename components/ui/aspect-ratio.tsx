import * as React from "react"

interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio: number
}

export const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio, className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={`aspect-ratio-wrapper ${className || ''}`} {...props}>
        <div
          className="aspect-ratio-spacer"
          style={{ paddingBottom: `${(1 / ratio) * 100}%` }}
        />
        <div className="aspect-ratio-content">
          {children}
        </div>
      </div>
    )
  }
)

AspectRatio.displayName = "AspectRatio" 