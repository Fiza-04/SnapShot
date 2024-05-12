import { Models } from "appwrite";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

type ProfileCardProps = {
  users: Models.Document;
};

const ProfileCard = ({ users }: ProfileCardProps) => {
  return (
    <div className="profile-card  align-center text-white flex-col mb-3 font-wrap">
      <Link to={`/profile/${users.$id}`}>
        <img
          src={users?.imageUrl || "/assets/icons/profile-placeholder.svg"}
          alt="creator"
          className="rounded-full w-10 h-10 flex items-center justify-center ml-2"
        />
      </Link>
      <h2 className="pt-1 text-center">{users.name}</h2>
      <p className="text-[13px] font-light text-zinc-400">@{users.username}</p>
      <Button className="shad-button_primary mt-3">Follow</Button>
    </div>
  );
};

export default ProfileCard;
