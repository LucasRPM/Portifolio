import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'teal' | 'gray' | 'dark' | 'outline' | 'amber' | 'blue' | 'mint' | 'red' | 'slate' | 'cyan' | 'green';
  size?: 'sm' | 'md';
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'teal',
  size = 'sm',
  className = '',
  icon
}) => {
  const variantStyles = {
    teal: 'bg-[#E6F7F5] text-[#05AD98] border-[#05AD98]/30 font-semibold',
    mint: 'bg-[#E6F7F5] text-[#05AD98] border-[#05AD98]/30 font-semibold',
    blue: 'bg-[#E6F7F5] text-[#05AD98] border-[#05AD98]/30 font-semibold',
    red: 'bg-[#E6F7F5] text-[#05AD98] border-[#05AD98]/30 font-semibold',
    cyan: 'bg-[#E6F7F5] text-[#05AD98] border-[#05AD98]/30 font-semibold',
    green: 'bg-[#E6F7F5] text-[#05AD98] border-[#05AD98]/30 font-semibold',
    gray: 'bg-[#F0F4F4] text-[#6B7280] border-[#DDE2E2] font-medium',
    slate: 'bg-[#F0F4F4] text-[#6B7280] border-[#DDE2E2] font-medium',
    outline: 'bg-white text-[#6B7280] border-[#BBBFBF] font-medium',
    dark: 'bg-[#111827] text-white border-transparent font-medium',
    amber: 'bg-amber-50 text-amber-700 border-amber-200 font-medium'
  };

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-0.5 gap-1.5',
    md: 'text-sm px-3.5 py-1 gap-2'
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
};
