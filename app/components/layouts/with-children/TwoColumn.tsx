import SideMenu from "../webPage/sideMenu/SideMenu";

type TwoColumnProps = {
  children: React.ReactNode;
};

const TwoColumn: React.FC<TwoColumnProps> = ({ children }) => {
  return (
    <main className="flex flex-col md:flex-row justify-between w-full max-w-[1140px] mx-auto my-12">
      <div className="w-full max-w-[900px] pl-2 pr-2 md:pr-8">{children}</div>
      <SideMenu />
    </main>
  );
};

export default TwoColumn;
