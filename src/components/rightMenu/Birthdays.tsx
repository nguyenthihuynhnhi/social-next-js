import Image from "next/image";
import Link from "next/link";

const Birthdays = () => {
    return (
        <div className='p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4'>
            <div className='flex justify-between items-center font-medium'>
                <span className="text-gray-500">Birthdays</span>
            </div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center justify-between gap-2'>
                    <Image
                        src="https://images.pexels.com/photos/27255525/pexels-photo-27255525/free-photo-of-dan-ba-chan-dung-vay-tr-ng-ng-i-ph-n-tr.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
                        alt=""
                        className="w-10 h-10 rounded-full object-cover"
                        width={40}
                        height={40}
                    />
                    <span className="font-semibold">Wayne Burton</span>
                </div>
                <div className='flex items-center justify-end gap-3'>
                    <button className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md">Celebrate</button>
                </div>
            </div>
            {/* UPCOMING */}
            <div className='p-4 bg-slate-100 rounded-lg flex items-center gap-4'>
                <Image
                    src="/gift.png"
                    alt=""
                    width={24}
                    height={24}
                />
                <Link href="/" className="flex flex-col gap-1 text-xs">
                    <span className="text-gray-700 font-semibold">Upcoming Birthdays</span>
                    <span className="text-gray-700">See other 16 have upcoming birthdays</span>
                </Link>
            </div>
        </div>
    )
}

export default Birthdays;