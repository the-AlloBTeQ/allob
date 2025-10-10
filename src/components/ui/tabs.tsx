"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"

// The root Tabs component that serves as a container for the entire tabs interface
const Tabs = TabsPrimitive.Root

// The list container that holds all the tab triggers
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      // Base styles for the tabs list
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1",
      // Responsive text sizing
      "text-muted-foreground",
      // Space between items and general appearance
      "gap-1",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

// The individual tab trigger button
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      // Base styles
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5",
      // Text styling
      "text-sm font-medium ring-offset-background transition-all",
      // Focus and disabled states
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      // Selected state styling
      "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

// The content panel for each tab
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      // Base styles
      "mt-2 ring-offset-background",
      // Focus states
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }