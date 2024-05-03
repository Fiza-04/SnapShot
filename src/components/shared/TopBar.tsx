import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queryAndMutation";
import { useUserContext } from "@/context/AuthContext";

const TopBar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();
  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);
  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5 items-center">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo_main(2).png"
            alt="logo"
            width={130}
            height={325}
          />
        </Link>

        <div className="flex gap-2 p-4 absolute inset-y-0 right-0 items-center">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => signOut()}
          >
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>
          <Link to={`/profile/${user.id}`} className="flex-center gap-3">
            <img
              src={user.imageUrl || "/assets/icons/profile-placehoder.svg"}
              alt="profile"
              className="h-9 w-9 rounded-full"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopBar;
