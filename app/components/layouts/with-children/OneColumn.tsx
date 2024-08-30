type OneColumnProps = {
  children: React.ReactNode;
};

const OneColumn: React.FC<OneColumnProps> = ({ children }) => {
  return (
    <main className="flex flex-col items-center justify-center w-full mx-auto mt-12">
      {children}
    </main>
  );
};

export default OneColumn;
