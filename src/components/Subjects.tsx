import { getAllExams } from "@/lib/actions/action";
import Image from "next/image";
import Link from "next/link";

const Subjects = async () => {
    const data = await getAllExams()
    // console.log(data.)
    if(!data) return <h1>Error</h1>
    if(data?.subjects?.length === 0) return <h1>No Items</h1>
    return (
        <div className="my-5">
        <div className="flex justify-between mx-8 p-1">
            <div className="text-blue-600">Quizes</div>
            <div className="text-blue-600 hover:underline cursor-pointer">View All</div>
        </div>
          <div className="grid grid-cols-1 w-full gap-5  md:grid-cols-3  place-items-center">
            {data?.subjects?.map((item) => {
                return (
                    <Link href={`/exam/${item._id}`} className="relative" key={item._id}>
                        <div className="absolute bottom-0 rounded-md text-center p-2 opacity-80 bg-blue-400 w-full">
                            <h1 className="text-white">{item.name}</h1>
                            <h2>{item._id}</h2>
                        </div>
                        <Image src={item.icon} alt='image' />
                    </Link>
                )
            })}  
             {!data && <h1>No</h1>} 
        </div>
        </div>
    )
}

export default Subjects;

