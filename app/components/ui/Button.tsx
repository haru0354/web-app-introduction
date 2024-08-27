
type ButtonProps = {
  children: React.ReactNode;
  color: "red" | "blue" | "gray";
  size: "normal" | "small";
  className?: string;
  type?: "submit" | "button";
  onClick?: () => void;
  disabled?: boolean | undefined;
};

const Button: React.FC<ButtonProps> = ({
  children,
  color,
  size,
  className,
  onClick,
  type,
  disabled
}) => {
  const colors = {
    red: "border-red-900 bg-red-700 hover:bg-red-200",
    blue: "border-sky-900 bg-sky-700  hover:bg-sky-200",
    gray: "border-gray-900 bg-gray-700  hover:bg-gray-200",
  };

  const sizes = {
    small: "min-w-[80px] p-1",
    normal: "min-w-[170px] p-2",
  };

  return (
    <>
      <button
        className={`font-bold text-white my-4 hover:text-gray-700 border 
        ${colors[color]}
        ${sizes[size]}
        ${className}
        `}
        type={type}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
