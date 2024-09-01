type OneColumnProps = {
  children: React.ReactNode;
};

const OneColumn: React.FC<OneColumnProps> = ({ children }) => {
  return (
    <main className="flex-grow w-full my-12">
      <div className="w-full max-w-[1140px] mx-auto px-2">
        {children}
      </div>
    </main>
  );
};

export default OneColumn;
