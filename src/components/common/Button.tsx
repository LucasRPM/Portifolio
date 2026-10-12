import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'mint' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#05AD98] disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98] cursor-pointer";

  const variantStyles = {
    primary: "bg-[#05AD98] hover:bg-[#049381] text-white font-semibold shadow-sm hover:shadow-md hover:shadow-[#05AD98]/20 border border-transparent",
    mint: "bg-[#05AD98] hover:bg-[#049381] text-white font-semibold shadow-sm hover:shadow-md hover:shadow-[#05AD98]/20 border border-transparent",
    secondary: "bg-[#F0F4F4] hover:bg-[#E2EBEA] text-[#111827] font-medium border border-[#DDE2E2]",
    outline: "bg-white hover:bg-[#E6F7F5] text-[#111827] hover:text-[#05AD98] border border-[#DDE2E2] hover:border-[#05AD98]",
    ghost: "bg-transparent hover:bg-[#F0F4F4] text-[#6B7280] hover:text-[#111827]",
    danger: "bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200"
  };

  const sizeStyles = {
    sm: "text-xs px-3.5 py-1.5 gap-1.5 rounded-lg",
    md: "text-sm px-5 py-2.5 gap-2 rounded-xl",
    lg: "text-base px-7 py-3.5 gap-2.5 font-semibold rounded-2xl"
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
};
