import NewAppIntroductions from "../../web-parts/side-menu/NewAppIntroductions ";
import SideLink from "../../web-parts/side-menu/SideLink";

const SideMenu = () => {
  return (
    <div className="w-full max-w-[240px] px-2">
      <NewAppIntroductions />
      <SideLink />
    </div>
  );
};

export default SideMenu;
