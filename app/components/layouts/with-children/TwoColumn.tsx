import SideMenu from "../../web-parts/side-menu/SideMenu";

type TwoColumnProps = {
  children: React.ReactNode;
  blogPage?: boolean;
};

const TwoColumn: React.FC<TwoColumnProps> = ({
  children,
  blogPage = false,
}) => {
  return (
    <main className="flex-grow flex flex-col md:flex-row justify-between w-full max-w-[1140px] mx-auto my-12">
      <div
        className={`w-full max-w-[800px] px-2 ${
          blogPage ? "blog" : ""
        }`}
      >
        {children}
      </div>
      <SideMenu />
    </main>
  );
};

export default TwoColumn;
