type TopPageSectionProps = {
  children: React.ReactNode;
  className?: string;
  maxWidth?: string;
  bg?:  string;
};

const TopPageSection: React.FC<TopPageSectionProps> = ({
  children,
  className,
  maxWidth = "max-w-[1150px]",
  bg,
}) => {
  return (
    <section className={`w-full py-12 px-2 ${bg}`}>
      <div className={`mx-auto ${maxWidth} ${className}`}>{children}</div>
    </section>
  );
};

export default TopPageSection;
