type ProfileProps = {
  userName: string | null;
  profile: Profile | null;
};

type Profile = {
  selfIntroduction: string | null;
  occupation: string | null;
  skill: string | null;
  portfolio: string | null;
  gitHub: string | null;
  x: string | null;
};

const Profile: React.FC<ProfileProps> = ({ userName, profile }) => {
  return (
    <>
      <h1 className="h1">プロフィール</h1>
      <div className="w-full max-w-[1140px] p-6 border border-customBlack rounded">
        <ul>
          <li className="pb-2 mb-2 border-b border-dashed border-customBlack">
            名前(ニックネーム)：「{userName ? userName : "未登録"}」
          </li>
          <li className="pb-2 mb-2 border-b border-dashed  border-customBlack">
            職業：「{profile?.occupation ? profile.occupation : "未登録"}」
          </li>
          <li className="pb-2 mb-2 border-b border-dashed  border-customBlack">
            スキル：「{profile?.skill ? profile.skill : "未登録"}」
          </li>
          <li className="pb-2 mb-2 border-b border-dashed  border-customBlack">
            portfolio：「{profile?.portfolio ? profile.portfolio : "未登録"}」
          </li>
          <li className="pb-2 mb-2 border-b border-dashed  border-customBlack">
            gitHub：「{profile?.gitHub ? profile.gitHub : "未登録"}」
          </li>
          <li className="pb-2 mb-2 border-b border-dashed  border-customBlack">
            x：「{profile?.x ? profile.x : "未登録"}」
          </li>
        </ul>
      </div>
      <div className="w-full max-w-[1140px] p-6 my-4 border border-customBlack rounded">
        <p className="text-center pb-2 mb-4 border-b border-gray-500 border-dashed">
          自己紹介
        </p>
        {profile?.selfIntroduction
          ? profile.selfIntroduction
          : "登録されていません"}
      </div>
    </>
  );
};

export default Profile;
