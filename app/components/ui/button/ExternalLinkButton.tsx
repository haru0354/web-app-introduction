type ExternalLinkButtonProps = {
  children: React.ReactNode;
  href: string;
  color?: "red" | "blue" | "gray" | "white" | "black";
  size?: "normal" | "small" | "big";
  className?: string;
};

const ExternalLinkButton: React.FC<ExternalLinkButtonProps> = ({
  children,
  href,
  color = "blue",
  size = "normal",
  className,
}) => {
  const colors = {
    red: "text-white hover:text-customBlack border border-red-900 bg-red-700 hover:bg-red-200",
    blue: "text-white hover:text-customBlack border border-sky-900 bg-sky-700 hover:bg-sky-200",
    gray: "text-white hover:text-customBlack border border-gray-900 bg-customBlack hover:bg-gray-200",
    white: "bg-white hover:bg-gray-200",
    black:
      "text-white hover:text-customBlack bg-layout-mainColor hover:bg-gray-200",
  };

  const sizes = {
    small: "min-w-[80px] p-2",
    normal: "min-w-[170px] px-4 py-2",
    big: "min-w-[240px] px-4 py-3",
  };

  return (
    <a
      className={`my-4 text-center font-bold transition-colors duration-300
          ${colors[color]} 
          ${sizes[size]} 
          ${className}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

export default ExternalLinkButton;
