type TopPageSectionProps = {
  children: React.ReactNode;
  className?: string;
  maxWidth?: string;
  bg?: string;
  backgroundImage?: string;
};

const TopPageSection: React.FC<TopPageSectionProps> = ({
  children,
  className,
  maxWidth = "max-w-[1140px]",
  bg,
  backgroundImage,
}) => {
  return (
    <section
      className={`w-full py-12 px-2 ${bg}`}
      style={
        backgroundImage ? { backgroundImage: `url("${backgroundImage}")` } : {}
      }
    >
      <div className={`mx-auto ${maxWidth} ${className}`}>{children}</div>
    </section>
  );
};

export default TopPageSection;
