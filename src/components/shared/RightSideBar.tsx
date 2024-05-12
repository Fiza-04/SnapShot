import { useGetAllUsers } from "@/lib/react-query/queryAndMutation";
import ProfileCard from "./ProfileCard";
import Loader from "./Loader";
import { Models } from "appwrite";
import { useUserContext } from "@/context/AuthContext";

const RightSideBar = () => {
  const {
    data: users,
    isPending: isProfileLoading,
    isError: isErrorCreators,
  } = useGetAllUsers();

  // const { user } = useUserContext();

  return (
    <div className="right-side-container">
      <h2 className="text-left w-full text-white text-[20px] p-5 pt-[60px]">
        Top Creators
      </h2>
      {isProfileLoading && !users ? (
        <Loader />
      ) : (
        <div className="flex flex-wrap justify-center gap-2">
          {users?.documents.map((user: Models.Document) => (
            <ProfileCard users={user} key={user.$id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RightSideBar;
