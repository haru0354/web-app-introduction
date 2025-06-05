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
    <main className="flex-1 flex flex-col items-center bg-layout-bgColor">
      <div className="flex flex-col md:flex-row justify-between w-full max-w-[1140px] mx-2 my-4  bg-white rounded">
        <div
          className={`w-full max-w-[800px] px-2 md:px-6 py-4 rounded ${
            blogPage ? "blog" : ""
          }`}
        >
          <Breadcrumbs />
          {children}
        </div>
        <SideMenu />
      </div>
    </main>
  );
};

export default TwoColumn;
