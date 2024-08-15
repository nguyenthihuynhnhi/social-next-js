"use client";

import { acceptFollowRequestAction, declineFollowRequestAction } from "@/lib/action";
import { FollowRequest, User } from "@prisma/client";
import Image from "next/image";
import { useOptimistic, useState } from "react";

type RequestsWithUser = FollowRequest & {
  sender: User;
};

const FriendRequestList = ({ requests }: { requests: RequestsWithUser[]; }) => {

  const [requestState, setRequestState] = useState(requests);

  const accept = async (requestId: number, userId: string) => {
    removeOptimisticState(requestId);

    try {
      await acceptFollowRequestAction(userId);
      setRequestState((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {
      console.log("👙 🏊‍♀️  🏄‍♀️ 🌴 🌊  ~ error:", error);
    }
  };

  const decline = async (requestId: number, userId: string) => {
    removeOptimisticState(requestId);

    try {
      await declineFollowRequestAction(userId);
      setRequestState((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {
      console.log("👙 🏊‍♀️  🏄‍♀️ 🌴 🌊  ~ error:", error);
    }
  };

  const [optimisticState, removeOptimisticState] = useOptimistic(requestState, (state, value: number) => state.filter((req) => req.id !== value));

  return (
    <>{optimisticState.map((request) => {
      return (
        <div className='flex items-center justify-between' key={request.id}>
          <div className='flex items-center justify-between gap-2'>
            <Image
              src={request.sender.avatar || "/noAvatar.png"}
              alt=""
              className="w-10 h-10 rounded-full object-cover"
              width={40}
              height={40}
            />
            <span className="font-semibold">{(request.sender.name && request.sender.surname) ? request.sender.name + " " + request.sender.surname : request.sender.username}</span>
          </div>
          <div className='flex items-center justify-end gap-3'>
            <form action={() => accept(request.id, request.sender.id)} >
              <button>
                <Image
                  src="/accept.png"
                  alt=""
                  className="cursor-pointer"
                  width={20}
                  height={20}
                />
              </button>
            </form>
            <form action={() => decline(request.id, request.sender.id)} >
              <button>
                <Image
                  src="/reject.png"
                  alt=""
                  className="cursor-pointer"
                  width={20}
                  height={20}
                />
              </button>
            </form>
          </div>
        </div >
      );
    })}
    </>
  );
};

export default FriendRequestList;