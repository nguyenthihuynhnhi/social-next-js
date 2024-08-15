"use client";

import { switchLikeAction } from "@/lib/action";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { useOptimistic, useState } from "react";

const PostInteraction = ({
  postId,
  likes,
  commentNumber,
}: {
  postId: number;
  likes: string[];
  commentNumber: number;
}) => {

  const { isLoaded, userId } = useAuth();
  const [likeState, setLikeState] = useState({
    likeCount: likes.length,
    isLiked: userId ? likes.includes(userId) : false,
  });

  const [optimisticLike, switchOptimisticLike] = useOptimistic(
    likeState,
    (state, value) => {
      return {
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: !state.isLiked,
      };
    }
  );

  const likeAction = async () => {
    switchOptimisticLike("");
    try {
      switchLikeAction(postId);
      setLikeState((state) => ({
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: !state.isLiked,
      }));

    } catch (error) {

    }
  };

  return (
    <div className=''>
      <div className='flex items-center justify-between text-sm my-4'>
        <div className="flex gap-8">
          {/* LIKE  */}
          <div className='flex items-center gap-4 bg-slate-300 p-2 rounded-xl'>
            <form action={likeAction}>
              <button>
                <Image
                  src={optimisticLike.isLiked ? "/liked.png" : "/like.png"}
                  alt=""
                  width={16}
                  height={16}
                  className="cursor-pointer"
                />
              </button>
            </form>
            <span className="text-gray-500" >|</span>
            <span className="text-gray-500" > {optimisticLike.likeCount}
              <span className="md:inline hidden text-gray-500"> Likes</span>
            </span>
          </div>
          {/* COMMENT  */}
          <div className='flex items-center gap-4 bg-slate-300 p-2 rounded-xl'>
            <Image
              src="/comment.png"
              alt=""
              width={16}
              height={16}
              className="cursor-pointer"
            />
            <span className="text-gray-500" >|</span>
            <span className="text-gray-500" >{commentNumber}</span>
            <span className="md:inline hidden text-gray-500"> Comments</span>
          </div>
        </div>

        {/* SHARE */}
        <div>
          <div className='flex items-center gap-4 bg-slate-300 p-2 rounded-xl'>
            <Image
              src="/share.png"
              alt=""
              width={16}
              height={16}
              className="cursor-pointer"
            />
            <span className="text-gray-500" >|</span>
            <span className="text-gray-500" >
              <span className="md:inline hidden"> Shares</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostInteraction; 