type OneColumnProps = {
  children: React.ReactNode;
  center?: boolean;
};

const OneColumn: React.FC<OneColumnProps> = ({ children, center = false }) => {
  return (
    <main className={`flex-grow w-full p-2 md:py-12 bg-layout-bgColor ${center && "flex items-center justify-center"}`}>
      <div className={`w-full max-w-[1140px] mx-auto py-1 px-4 md:px-6 bg-white rounded`}>
        {children}
      </div>
    </main>
  );
};

export default OneColumn;
