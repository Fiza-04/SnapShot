import { bottombarLinks } from "@/constants";
import { Link, useLocation } from "react-router-dom";

const BottomBar = () => {
  const { pathname } = useLocation();
  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <Link
            to={link.route}
            key={link.label}
            className={`pt-1 hover:bg-zinc-900 p-1 pl-2 pr-2 rounded-[10px] ${
              isActive && "bg-violet-500"
            } flex-center flex-col gap-1 transition`}
          >
            <img
              src={link.imageUrl}
              alt={link.label}
              width={20}
              height={20}
              className={` ${isActive && "p-1 h-7 w-7 invert-white"}`}
            />
            <p className="tiny-medium text-white">{link.label}</p>
          </Link>
        );
      })}
    </section>
  );
};

export default BottomBar;
