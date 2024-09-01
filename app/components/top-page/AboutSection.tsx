import TwoFlexBox from "../layouts/TwoFlexBox";
import TopPageSection from "../layouts/with-children/TopPageSection";

const AboutSection = () => {
  return (
    <TopPageSection bg="bg-blue-800">
        <h2 className="text-center text-2xl font-semibold mb-4 text-white">「当サイトについて」</h2>
      <TwoFlexBox
        leftTitle="WEB閲覧者側"
        leftContents={["leftContents", "leftContents"]}
        rightTitle="アプリ製作者側"
        rightContents={["rightContents", "rightContents"]}
      />
    </TopPageSection>
  );
};

export default AboutSection;
