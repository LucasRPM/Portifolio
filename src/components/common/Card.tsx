import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'soft' | 'flat' | 'interactive' | 'solid' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'soft',
  padding = 'md',
  className = '',
  ...props
}) => {
  const variantStyles = {
    soft: 'bg-white border border-[#DDE2E2] shadow-sm shadow-slate-900/3',
    flat: 'bg-[#F8FAFA] border border-[#DDE2E2]',
    interactive: 'bg-white border border-[#DDE2E2] shadow-sm hover:shadow-md hover:border-[#05AD98] hover:-translate-y-1 transition-all duration-200 cursor-pointer',
    solid: 'bg-white border border-[#DDE2E2] shadow-sm',
    glass: 'bg-white/90 backdrop-blur-md border border-[#DDE2E2] shadow-sm'
  };

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6 sm:p-8',
    lg: 'p-8 sm:p-10'
  };

  return (
    <div
      className={`rounded-2xl sm:rounded-3xl ${variantStyles[variant]} ${paddingStyles[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
