import React from "react";

export default function MyButton({
  children,
  onClick,
  type = "button",
  className = "",
  variant = "primary",
  size = "",
  ...props
}) {
  const base = "btn";
  const variantClass = variant ? `btn-${variant}` : "";
  const sizeClass = size ? `btn-${size}` : "";

  return (
    <button
      type={type}
      className={`${base} ${variantClass} ${sizeClass} ${className}`.trim()}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}