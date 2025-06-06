import Breadcrumbs from "../../web-parts/global/Breadcrumbs";

type OneColumnProps = {
  children: React.ReactNode;
  center?: boolean;
};

const OneColumn: React.FC<OneColumnProps> = ({ children, center = false }) => {
  return (
    <main className="flex-1 flex flex-col items-center bg-layout-bgColor">
      <div className="flex-1 flex flex-col w-full max-w-[1140px] mx-2 my-4 py-4 px-2 md:px-6 rounded bg-white ">
        <Breadcrumbs />
        {center ? (
          <div className="flex-1 flex items-center justify-center">
            {children}
          </div>
        ) : (
          <div>{children}</div>
        )}
      </div>
    </main>
  );
};

export default OneColumn;
