import React from "react";

const Button = ({
  variant = "default",
  size = "default",
  children,
  className = "",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const buttonVariants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline:
      "border border-input hover:bg-accent/20 hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "underline-offset-4 hover:underline text-primary",
  };
  const sizeClasses = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3 py-1.5 text-xs",
    lg: "h-12 px-6 py-3 text-sm",
    icon: "h-10 w-10 p-0",
  };
  const variantClasses = buttonVariants[variant] || buttonVariants.default;
  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses} ${className}`;
  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
