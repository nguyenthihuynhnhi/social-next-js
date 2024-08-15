import Image from "next/image";

const Ad = ({ size }: { size: "sm" | "md" | "lg" }) => {
    return (
        <div className='p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4'>
            {/* Top  */}
            <div className='flex items-center justify-between text-gray-500 font-medium'>
                <span>Sponsored Ads</span>
                <Image src="/more.png" alt="" className="" width={16} height={16} />
            </div>
            {/* Bottom  */}
            <div className={`flex flex-col mt-4 ${size === "sm" ? "gap-2" : "gap-4"}`}>
                <div className={`relative w-full ${size === "sm" ? "h-24" : size === "md" ? "h-36" : "h-48"}`}>
                    <Image
                        src="https://images.pexels.com/photos/27255525/pexels-photo-27255525/free-photo-of-dan-ba-chan-dung-vay-tr-ng-ng-i-ph-n-tr.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                        alt=""
                        fill
                        className="rounded-lg object-cover"
                    />
                </div>
                <div className='flex items-center gap-4'>
                    <Image src="https://images.pexels.com/photos/17266857/pexels-photo-17266857/free-photo-of-den-va-tr-ng-ca-phe-c-c-ban.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
                        alt=""
                        className="rounded-full w-6 h-6 object-cover"
                        width={24}
                        height={24}
                    />
                    <span className="text-blue-500 font-medium">BigChef Lounge</span>
                </div>
                <p className={size === "sm" ? "text-xs" : "text-sm"}>
                    {size === "sm"
                        ? " Lorem ipsum dolor sit amet consectetur adipisicing elit."
                        : size === "md"
                            ? " Distinctio maiores eos excepturi! Distinctio vel omnis repellendus vel omnis."
                            : "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Est debitis asperiores nostrum dolor nulla, cumque reiciendis optio reprehenderit blanditiis!"
                    }
                </p>
                <button className="bg-gray-200 text-gray-500 p-2 text-xs rounded-lg" >Learn more</button>
            </div>
        </div>
    )
}

export default Ad;