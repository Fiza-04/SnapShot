import { useGetPostById } from "@/lib/react-query/queryAndMutation";
import { Loader } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { formatDate } from "@/lib/utils";
import { useUserContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import PostStats from "@/components/shared/PostStats";

const PostDetails = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || "");
  const { user } = useUserContext();

  const handleDeletePost = () => {};

  return (
    <div className="post_details-container text-white">
      {isPending ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img
            src={post?.imageUrl}
            alt="creator"
            className="post_details-img"
          />
          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link
                to={`/profile/${post?.creator.$id}`}
                className="flex items-center gap-3"
              >
                <img
                  src={
                    post?.creator?.imageUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="rounded-full w-9 lg:h-10"
                />

                <div className="flex flex-col ">
                  <p className="base-medium lg:body-bold">
                    {post?.creator.name}
                  </p>
                  <div className="flex-center gap-2 text-zinc-500">
                    <p className="subtle-semibold lg:small-regular text-[13px]">
                      {formatDate(post?.$createdAt)}
                    </p>
                    -
                    <p className="subtle-semibold lg:small-regular text-[13px]">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="flex-center">
                <Link
                  to={`/update-post/${post?.$id}`}
                  className={`${user.id !== post?.creator.$id && "hidden"}`}
                >
                  <img src="/assets/icons/edit.svg" width={23} height={23} />
                </Link>

                <Button
                  onClick={handleDeletePost}
                  variant="ghost"
                  className={`ghost_details-delete_btn ${
                    user.id !== post?.creator.$id && "hidden"
                  }`}
                >
                  <img
                    src="/assets/icons/delete.svg"
                    alt="delete"
                    width={23}
                    height={23}
                  />
                </Button>
              </div>
            </div>
            <hr className="border w-full border-zinc-900" />

            <div className="flex flex-col flex-1 w-full small-medium">
              <p className="text-[15px] font-light">{post?.caption}</p>
              <ul className="flex gap-1 mt-1  text-[14px]">
                {post?.tags.map((tag: string) => (
                  <li key={tag} className="text-zinc-500">
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full">
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
