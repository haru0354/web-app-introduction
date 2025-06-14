type TwoFlexBoxProps = {
  leftTitle: string;
  leftContents: string[];
  rightTitle: string;
  rightContents: string[];
  borderColor?: string;
};

const TwoFlexBox: React.FC<TwoFlexBoxProps> = ({
  leftTitle,
  leftContents,
  rightTitle,
  rightContents,
  borderColor = "border-customBlack",
}) => {
  return (
    <div className="flex flex-wrap items-center justify-center w-full">
      <div
        className={`flex flex-col items-center justify-center w-full md:w-[46%] mx-0 md:mx-4 my-4 px-2 pb-6 border rounded bg-white ${borderColor} `}
      >
        <h3 className="w-full text-center text-lg font-semibold my-4 py-2 border-b border-dashed border-customBlack">
          {leftTitle}
        </h3>
        {leftContents.map((leftContent, index) => {
          return <p key={index}>{leftContent}</p>;
        })}
      </div>
      <div
        className={`flex flex-col items-center justify-center w-full md:w-[46%] mx-0 md:mx-4 my-4 px-4 pb-6 border rounded bg-white ${borderColor} `}
      >
        <h3 className="w-full text-center text-lg font-semibold my-4 py-2 border-b border-dashed border-customBlack">
          {rightTitle}
        </h3>
        {rightContents.map((rightContent, index) => {
          return <p key={index}>{rightContent}</p>;
        })}
      </div>
    </div>
  );
};

export default TwoFlexBox;
