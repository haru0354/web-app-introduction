type OneColumnProps = {
  children: React.ReactNode;
  center: boolean;
};

const OneColumn: React.FC<OneColumnProps> = ({ children, center = false }) => {
  return (
    <main className={`flex-grow w-full my-12 ${center && "flex items-center justify-center"}`}>
      <div className="w-full max-w-[1140px] mx-auto px-2">
        {children}
      </div>
    </main>
  );
};

export default OneColumn;
