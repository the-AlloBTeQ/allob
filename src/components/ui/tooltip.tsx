"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cn } from "@/lib/utils"

// Create a provider component that wraps our tooltip functionality
const TooltipProvider = TooltipPrimitive.Provider

// Create the base tooltip component
const Tooltip = TooltipPrimitive.Root

// Create the tooltip trigger - this is what the user interacts with to show the tooltip
const TooltipTrigger = TooltipPrimitive.Trigger

// Create the content component with customizable styling
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      // Base styles
      "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      // Allow custom classes to be added
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

// Export all components for use in other files
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }