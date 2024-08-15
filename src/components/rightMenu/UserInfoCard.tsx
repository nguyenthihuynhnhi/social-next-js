import prisma from "@/lib/Client";
import { auth } from "@clerk/nextjs/server";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import UserInfoCardInteraction from "./UserInfoCardInteraction";
import UpdateUser from "./UpdateUser";

const UserInfoCard = async ({ user }: { user: User; }) => {

    const createAtDate = new Date(user.createdAt);
    const formattedDate = createAtDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    let isUserBlocked = false;
    let isFollowing = false;
    let isFollowingSent = false;

    const { userId: currentUserId } = auth();

    if (currentUserId) {
        const blockRes = await prisma.block.findFirst({
            where: {
                blockerId: currentUserId, // user hiện tại có block người này không
                blockedId: user.id // người mà mình đang qua xem tường có đang bị mình block khong :v
            }
        });
        blockRes ? (isUserBlocked = true) : (isUserBlocked = false);

        const followRes = await prisma.follower.findFirst({
            where: {
                followerId: currentUserId, // user hiện tại có đang follow người này không
                followingId: user.id // người mà mình đang qua xem tường có đang bị mình follow khong :v
            }
        });
        blockRes ? (isFollowing = true) : (isFollowing = false);

        const followReqRes = await prisma.followRequest.findFirst({
            where: {
                senderId: currentUserId, // user hiện tại có yêu cầu follow người này không
                receiverId: user.id // người mà mình đang qua xem tường có đang bị mình yêu cầu follow khong :v
            }
        });
        blockRes ? (isFollowingSent = true) : (isFollowingSent = false);
    }

    return (<>
        <div className='p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4'>
            {/* TOP  */}
            <div className='flex justify-between items-center font-medium'>
                <span className="text-gray-500">User Information</span>
                {currentUserId === user.id ? (<UpdateUser user={user} />) : (<Link href="/" className="text-blue-500 text-xs" >See all</Link>)
                }
            </div>
            {/* BOTTOM */}
            <div className='flex flex-col gap-4 text-gray-500'>
                <div className='flex items-center gap-2'>
                    <span className="text-xl text-black">{(user.name && user.surname) ? user.name + " " + user.surname : user.username}</span>
                    <span className="text-sm">@{user.username}</span>
                </div>
                {user.description && (<p>{user.description}</p>)}

                {user.city && (<div className='flex items-center gap-2'>
                    <Image src="/map.png" alt="" className="" width={16} height={16} />
                    <span>Living in <b>{user.city}</b></span>
                </div>)}

                {user.school && (<div className='flex items-center gap-2'>
                    <Image src="/school.png" alt="" className="" width={16} height={16} />
                    <span>Went to <b>{user.school}</b></span>
                </div>)}
                {user.work && (<div className='flex items-center gap-2'>
                    <Image src="/map.png" alt="" className="" width={16} height={16} />
                    <span>Works at <b>{user.work}</b></span>
                </div>)}

                <div className='flex items-center justify-between flex-wrap'>
                    {user.website && (<div className='flex items-center gap-1'>
                        <Image src="/link.png" alt="" className="" width={16} height={16} />

                        <Link href={user.website} className="text-blue-300 font-medium">{user.website}</Link>
                    </div>)}

                    <div className='flex items-center gap-1 '>
                        <Image src="/date.png" alt="" className="" width={16} height={16} />
                        <span>Join {formattedDate}</span>
                    </div>
                </div>
                {(currentUserId && currentUserId !== user.id) &&
                    <UserInfoCardInteraction
                        userId={user.id}
                        currentUserId={currentUserId}
                        isUserBlocked={isUserBlocked}
                        isFollowing={isFollowing}
                        isFollowingSent={isFollowingSent}
                    />
                }
            </div>
        </div >
    </>
    );
};

export default UserInfoCard;