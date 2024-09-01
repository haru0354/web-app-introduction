type OneColumnProps = {
  children: React.ReactNode;
  center?: boolean;
};

const OneColumn: React.FC<OneColumnProps> = ({ children, center = false }) => {
  return (
    <main className={`flex-grow w-full py-12 ${center && "flex items-center justify-center bg-blue-50"}`}>
      <div className={`w-full max-w-[1140px] mx-auto px-2 ${center && "bg-blue-50"}`}>
        {children}
      </div>
    </main>
  );
};

export default OneColumn;
