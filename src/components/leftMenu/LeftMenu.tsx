import Link from "next/link";
import Ad from "../Ad";
import ProfileCard from "./ProfileCard";
import Image from "next/image";

const LeftMenu = ({ type }: { type: "home" | "profile"; }) => {
  return (
    <div className='flex flex-col gap-6'>
      {type === "home" && (< ProfileCard />)}
      <div className='p-4 bg-white rounded-lg shadow-md text-sm text-gray-500 flex flex-col gap-2'>
        <Link href="/" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-300" >
          <Image src="/posts.png" alt="" className="" width={20} height={20} />
          <span>My Posts</span>
        </Link>
        <hr className="border-t-1 border-gray-300 w-36 self-center" />
        <Link href="/" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-300" >
          <Image src="/activity.png" alt="" className="" width={20} height={20} />
          <span>Activity</span>
        </Link>
        <hr className="border-t-1 border-gray-300 w-36 self-center" />
        <Link href="/" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-300" >
          <Image src="/market.png" alt="" className="" width={20} height={20} />
          <span>Marketplace</span>
        </Link>
        <hr className="border-t-1 border-gray-300 w-36 self-center" />
        <Link href="/" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-300" >
          <Image src="/events.png" alt="" className="" width={20} height={20} />
          <span>Events</span>
        </Link>
        <hr className="border-t-1 border-gray-300 w-36 self-center" />
        <Link href="/" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-300" >
          <Image src="/albums.png" alt="" className="" width={20} height={20} />
          <span>Albums</span>
        </Link>
        <hr className="border-t-1 border-gray-300 w-36 self-center" />
        <Link href="/" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-300" >
          <Image src="/videos.png" alt="" className="" width={20} height={20} />
          <span>Videos</span>
        </Link>
        <hr className="border-t-1 border-gray-300 w-36 self-center" />
        <Link href="/" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-300" >
          <Image src="/news.png" alt="" className="" width={20} height={20} />
          <span>News</span>
        </Link>
        <hr className="border-t-1 border-gray-300 w-36 self-center" />
        <Link href="/" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-300" >
          <Image src="/courses.png" alt="" className="" width={20} height={20} />
          <span>Courses</span>
        </Link>
        <hr className="border-t-1 border-gray-300 w-36 self-center" />
        <Link href="/" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-300" >
          <Image src="/lists.png" alt="" className="" width={20} height={20} />
          <span>List</span>
        </Link>
        <hr className="border-t-1 border-gray-300 w-36 self-center" />
        <Link href="/" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-300" >
          <Image src="/settings.png" alt="" className="" width={20} height={20} />
          <span>Setting</span>
        </Link>
        <hr className="border-t-1 border-gray-300 w-36 self-center" />
      </div>
      <Ad size="sm" />
    </div>
  );
};

export default LeftMenu;