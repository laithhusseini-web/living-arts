'use client'
import React from 'react'

/**
 * Reveal-on-scroll, borrowed from the motion study's ScrollTrigger choreography
 * but done with an IntersectionObserver so it costs nothing to ship.
 * The blur/lift is stripped for prefers-reduced-motion by the CSS.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className,
  style,
  ...rest
}: {
  children: React.ReactNode
  /** Seconds of stagger before this element starts. */
  delay?: number
  as?: React.ElementType
  className?: string
  style?: React.CSSProperties
} & React.HTMLAttributes<HTMLElement>) {
  const ref = React.useRef<HTMLElement>(null)
  const [shown, setShown] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    // Already in view on load (or no observer): show immediately.
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -16% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      data-reveal=""
      data-shown={shown ? '' : undefined}
      className={className}
      style={{ transitionDelay: delay ? `${delay}s` : undefined, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
