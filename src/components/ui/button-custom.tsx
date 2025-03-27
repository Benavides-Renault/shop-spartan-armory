
import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    children, 
    variant = 'primary', 
    size = 'md', 
    isLoading = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    disabled,
    ...props 
  }, ref) => {
    return (
      <button
        className={cn(
          // Base styles
          'inline-flex items-center justify-center rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spartan-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
          
          // Variant styles
          variant === 'primary' && 'bg-spartan-primary text-white hover:bg-spartan-secondary shadow-sm',
          variant === 'secondary' && 'bg-spartan-light text-spartan-dark hover:bg-spartan-gray-100',
          variant === 'outline' && 'border border-spartan-gray-300 bg-transparent hover:bg-spartan-light text-spartan-gray-700',
          variant === 'ghost' && 'bg-transparent hover:bg-spartan-light text-spartan-gray-700',
          variant === 'link' && 'bg-transparent underline-offset-4 hover:underline text-spartan-primary p-0 height-auto',
          variant === 'danger' && 'bg-red-600 text-white hover:bg-red-700',
          
          // Size styles
          size === 'sm' && 'text-sm px-3 py-1',
          size === 'md' && 'text-sm px-4 py-2',
          size === 'lg' && 'text-base px-6 py-3',
          size === 'icon' && 'h-9 w-9',
          
          // Width
          fullWidth && 'w-full',
          
          // Custom class
          className
        )}
        ref={ref}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
