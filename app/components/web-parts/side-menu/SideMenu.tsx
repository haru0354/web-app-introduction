import NewAppIntroductions from "../../web-parts/side-menu/NewAppIntroductions ";
import SideLink from "../../web-parts/side-menu/SideLink";

const SideMenu = () => {
  return (
    <div className="w-full mx-auto md:mx-0 md:max-w-[280px] px-2 rounded">
      <NewAppIntroductions />
      <SideLink />
    </div>
  );
};

export default SideMenu;
