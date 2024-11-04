import Breadcrumbs from "../../web-parts/Breadcrumbs";
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
    <main className="w-full p-2 md:py-12 bg-layout-bgColor">
      <Breadcrumbs />
      <div className="flex-grow flex flex-col md:flex-row justify-between max-w-[1140px] mx-auto bg-white rounded">
        <div
          className={`w-full max-w-[800px] px-4 md:px-6 ${
            blogPage ? "blog" : ""
          }`}
        >
          {children}
        </div>
        <SideMenu />
      </div>
    </main>
  );
};

export default TwoColumn;
