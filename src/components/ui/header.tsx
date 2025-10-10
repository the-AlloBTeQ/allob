import React from 'react';
import { cn } from '@/lib/utils';

// Define the interface for our component props to ensure type safety
interface SectionHeaderProps {
  // The main title of the section
  title: string;
  
  // Optional description text below the title
  description?: string;
  
  // Optional class names for custom styling
  className?: string;
  
  // Optional alignment property with default center alignment
  align?: 'left' | 'center' | 'right';
  
  // Optional size variant for different contexts
  size?: 'small' | 'default' | 'large';
}

export function SectionHeader({ 
  title, 
  description, 
  className,
  align = 'center',
  size = 'default'
}: SectionHeaderProps) {
  // Define size-specific classes for the title
  const titleSizeClasses = {
    small: 'text-2xl',
    default: 'text-3xl',
    large: 'text-4xl'
  };

  // Define alignment classes
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  return (
    <div className={cn(
      'mb-8',                    // Default bottom margin
      alignmentClasses[align],   // Apply text alignment
      className                  // Allow custom classes to override defaults
    )}>
      <h2 className={cn(
        titleSizeClasses[size],  // Size-specific font size
        'font-bold',             // Bold weight for emphasis
        'text-gray-900',         // Dark text color for contrast
        'tracking-tight',        // Slightly tighter letter spacing
        'mb-2'                   // Space between title and description
      )}>
        {title}
      </h2>
      
      {/* Render description only if provided */}
      {description && (
        <p className={cn(
          'mt-2',                // Top margin for spacing from title
          'text-gray-600',       // Muted text color for hierarchy
          size === 'large' ? 'text-lg' : 'text-base', // Larger text for large headers
          'max-w-3xl',           // Maximum width for readability
          'mx-auto'              // Center the text block if narrower than container
        )}>
          {description}
        </p>
      )}
    </div>
  );
}