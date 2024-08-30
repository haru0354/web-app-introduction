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
  borderColor = "border-blue-600",
}) => {
  return (
    <div className="flex flex-wrap items-center justify-center w-full">
      <div
        className={`flex flex-col items-center justify-center w-full md:w-[46%] md:mx-4 my-4 border-2 rounded ${borderColor} `}
      >
        <h3 className="h3 text-center">{leftTitle}</h3>
        {leftContents.map((leftContent, index) => {
          return <p key={index}>{leftContent}</p>;
        })}
      </div>
      <div
        className={`flex flex-col items-center justify-center w-full md:w-[46%] md:mx-4 my-4 border-2 rounded ${borderColor} `}
      >
        <h3 className="h3 text-center">{rightTitle}</h3>
        {rightContents.map((rightContent, index) => {
          return <p key={index}>{rightContent}</p>;
        })}
      </div>
    </div>
  );
};

export default TwoFlexBox;
