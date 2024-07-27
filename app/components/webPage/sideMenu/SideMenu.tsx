import NewAppIntroductions from "./NewAppIntroductions ";
import SideLink from "./SideLink";

const SideMenu = () => {
  return (
    <div className="w-full max-w-[240px] px-2">
      <NewAppIntroductions />
      <SideLink />
    </div>
  );
};

export default SideMenu;
