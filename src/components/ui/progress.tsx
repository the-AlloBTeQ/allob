import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

/**
 * A Progress component built on top of Radix UI's Progress primitive.
 * This component displays a visual indicator of progress, typically used for loading states,
 * progress bars, or to visualize a value within a range.
 * 
 * Key features:
 * - Accessible by default with appropriate ARIA attributes
 * - Customizable appearance through className props
 * - Animated transitions for value changes
 * - Support for custom background and indicator colors
 */
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-gray-100",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-blue-600 transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
