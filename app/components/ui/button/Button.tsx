type ButtonProps = {
  children: React.ReactNode;
  color: "red" | "blue" | "gray" | "white" | "black";
  size?: "normal" | "small" | "big";
  className?: string;
  type?: "submit" | "button";
  onClick?: () => void;
  disabled?: boolean | undefined;
};

const Button: React.FC<ButtonProps> = ({
  children,
  color,
  size = "normal",
  className,
  onClick,
  type = "submit",
  disabled,
}) => {
  const colors = {
    red: "text-white hover:text-customBlack border border-red-900 bg-red-700 hover:bg-red-200",
    blue: "text-white hover:text-customBlack border border-sky-900 bg-sky-700 hover:bg-sky-200",
    gray: "text-white hover:text-customBlack border border-gray-900 bg-customBlack hover:bg-gray-200",
    white: "bg-white hover:bg-gray-200",
    black: "text-white hover:text-customBlack bg-layout-mainColor hover:bg-gray-200",
  };

  const sizes = {
    small: "min-w-[80px] p-1",
    normal: "min-w-[170px] p-2",
    big: "min-w-[240px] p-3",
  };

  return (
    <>
      <button
        className={`font-bold my-4 transition-colors duration-300
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
