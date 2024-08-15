import prisma from "@/lib/Client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

const ProfileCard = async () => {
    const { userId } = auth();
    if (!userId) return null;

    const user = await prisma.user.findFirst({
        where: {
            id: userId
        },
        include: {
            _count: {
                select: {
                    followers: true
                }
            }
        }
    });

    if (!user) return null;

    return (
        <div className='p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-6'>
            <div className='relative h-20'>
                <Image
                    src={user.cover || "/noCover.png"}
                    alt=""
                    fill
                    className="rounded-md object-cover"
                />
                <Image
                    src={user.avatar || "noAvatar.png"}
                    alt=""
                    className="rounded-full object-cover w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10"
                    width={48}
                    height={48}
                />
            </div>
            <div className='flex flex-col h-20 gap-2 items-center'>
                <span className="font-semibold">{(user.name && user.surname) ? user.name + " " + user.name + user.surname : user.username}</span>
                <div className='flex gap-4 items-center'>
                    <div className='flex'>
                        <Image
                            src="https://images.pexels.com/photos/27263839/pexels-photo-27263839/free-photo-of-anh-sang-thanh-ph-n-c-toa-nha.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt=""
                            className="rounded-full object-cover w-3 h-3"
                            width={12}
                            height={12}
                        />
                        <Image
                            src="https://images.pexels.com/photos/27263839/pexels-photo-27263839/free-photo-of-anh-sang-thanh-ph-n-c-toa-nha.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt=""
                            className="rounded-full object-cover w-3 h-3"
                            width={12}
                            height={12}
                        />
                        <Image
                            src="https://images.pexels.com/photos/27263839/pexels-photo-27263839/free-photo-of-anh-sang-thanh-ph-n-c-toa-nha.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt=""
                            className="rounded-full object-cover w-3 h-3"
                            width={12}
                            height={12}
                        />
                    </div>
                    <span className="text-xs text-gray-500">{user._count.followers}</span>
                </div>
                <Link href={`/profile/${user.username}`}>
                    <button className="bg-blue-500 text-white text-xs p-2 cursor-pointer hover:bg-blue-700 rounded-md">My Profile</button>
                </Link>
            </div>
        </div>
    );
};

export default ProfileCard; 