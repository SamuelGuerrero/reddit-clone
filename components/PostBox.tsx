import { useSession } from "next-auth/react";
import Avatar from "./Avatar";
import { LinkIcon, PhotographIcon } from "@heroicons/react/outline";
import { useForm } from "react-hook-form";
import { useState } from "react";

function PostBox() {
  const { data: session } = useSession();
  const [imageBoxOpen, setImageBoxOpen] = useState(false);

  type FormData = {
    postTitle: string;
    postBody: string;
    postImage: string;
    subreddit: string;
  };

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(async (formData) => {
    console.log(formData);
  });

  return (
    <form
      onSubmit={onSubmit}
      className="sticky top-16 p-2 z-50 bg-white border rounded-md border-gray-300"
    >
      <div className="flex items-center space-x-3">
        <Avatar seed="Samuel" />
        <input
          {...register("postTitle", { required: true })}
          disabled={!session}
          className="bg-gray-50 p-2 pl-5 outline-none rounded-md flex-1"
          type={"text"}
          placeholder={
            session ? "Create a post by entering title!" : "Sign in to post"
          }
        />
        <PhotographIcon
          onClick={() => setImageBoxOpen(!imageBoxOpen)}
          className={`h-6 text-gray-300 cursor-pointer ${
            imageBoxOpen && "text-blue-300"
          }`}
        />
        <LinkIcon className="h-6 text-gray-300" />
      </div>

      {!!watch("postTitle") && (
        <div className="flex flex-col py-2">
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Body</p>
            <input
              className="m-2 flex-1 bg-blue-50 p-2 outline-none"
              {...register("postBody")}
              type="text"
              placeholder="Text (optional)"
            />
          </div>

          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Subreddit:</p>
            <input
              className="m-2 flex-1 bg-blue-50 p-2 outline-none"
              {...register("subreddit", { required: true })}
              type="text"
              placeholder="i.e reactjs"
            />
          </div>

          {imageBoxOpen && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Image URL:</p>
              <input
                className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                {...register("postImage")}
                type="text"
                placeholder="Optional"
              />
            </div>
          )}

          {/* Errors */}
          {Object.keys(errors).length > 0 && (
            <div className="space-y-2 p-2 text-red-500">
              {errors.postTitle?.type === "required" && (
                <p>- A Post Title is required</p>
              )}

              {errors.subreddit?.type === "required" && (
                <p>-A Subreddit is required</p>
              )}
            </div>
          )}

          {!!watch("postTitle") && (
            <button
              type="submit"
              className="w-full rounded-full bg-blue-400 p-2 text-white"
            >
              Create Post
            </button>
          )}
        </div>
      )}
    </form>
  );
}

export default PostBox;