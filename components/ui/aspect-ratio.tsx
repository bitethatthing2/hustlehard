import * as React from "react"

interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio: number
}

export const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio, className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={className} style={{ position: 'relative' }} {...props}>
        <div
          style={{
            paddingBottom: `${(1 / ratio) * 100}%`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          {children}
        </div>
      </div>
    )
  }
)

AspectRatio.displayName = "AspectRatio" 