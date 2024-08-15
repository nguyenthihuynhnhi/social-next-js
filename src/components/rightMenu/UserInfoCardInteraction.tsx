"use client";

import { switchBlockAction, switchFollowAction } from "@/lib/action";
import { useOptimistic, useState } from "react";

const UserInfoCardInteraction = ({
  userId,
  isUserBlocked,
  isFollowing,
  isFollowingSent
}: {
  userId: string;
  currentUserId: string;
  isUserBlocked: boolean;
  isFollowing: boolean;
  isFollowingSent: boolean;
}) => {
  const [userState, setUserState] = useState({
    following: isFollowing,
    blocked: isUserBlocked,
    followingRequestSent: isFollowingSent,
  });

  const follow = async () => {
    switchOptimisticState("follow");
    try {
      await switchFollowAction(userId);
      setUserState((prev) => ({
        ...prev,
        following: prev.following && false,
        followingRequestSent:
          !prev.following && !prev.followingRequestSent ? true : false,
      }));
    } catch (err) { }
  };

  const block = async () => {
    switchOptimisticState("block");
    try {
      await switchBlockAction(userId);
      setUserState(prev => ({
        ...prev,
        blocked: !prev.blocked
      }));

    } catch (error) {
      console.log("👙 🏊‍♀️  🏄‍♀️ 🌴 🌊  ~ error:", error);
    }
  };

  const [optimisticState, switchOptimisticState] = useOptimistic(
    userState,
    (state, value: "follow" | "block") =>
      value === "follow"
        ? {
          ...state,
          following: state.following && false,
          followingRequestSent:
            !state.following && !state.followingRequestSent ? true : false,
        }
        : { ...state, blocked: !state.blocked }
  );
  return (
    <>
      <form action={follow}>
        <button className=" w-full bg-blue-500 cursor-pointer text-sm text-white rounded-md p-2">
          {optimisticState.following
            ? "Following"
            : optimisticState.followingRequestSent
              ? "Friend Request Sent"
              : "Follow"}
        </button>
      </form>
      <form action={block} className="self-end">
        <button>
          <span className="text-red-400 self-end text-xs cursor-pointer">
            {optimisticState.blocked ? "Unblock User" : "Block User"}
          </span>
        </button>
      </form>
    </>
  );
};

export default UserInfoCardInteraction;