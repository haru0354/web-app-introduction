type ProfileProps = {
  userName: string;
  profile: Profile;
};

type Profile = {
  selfIntroduction: string;
  occupation: string;
  skill: string;
  portfolio: string;
  gitHub: string;
  x: string;
};

const Profile: React.FC<ProfileProps> = ({ userName, profile }) => {
  return (
    <>
      <ul className="m-4 p-4 border border-gray-700 border-dashed rounded">
        <li>名前(ニックネーム):{userName}</li>
        {profile.occupation && <li>職種:{profile.occupation}</li>}
        {profile.skill && <li>スキル:{profile.skill}</li>}
        {profile.portfolio && <li>portfolio:{profile.portfolio}</li>}
        {profile.gitHub && <li>gitHub:{profile.gitHub}</li>}
        {profile.x && <li>x:{profile.x}</li>}
      </ul>
      {profile.selfIntroduction && (
        <div className="m-4 p-4 border border-gray-700 rounded">
          <p className="text-center pb-2 border-b border-gray-500 border-dashed">
            自己紹介
          </p>
          {profile.selfIntroduction}
        </div>
      )}
    </>
  );
};

export default Profile;
