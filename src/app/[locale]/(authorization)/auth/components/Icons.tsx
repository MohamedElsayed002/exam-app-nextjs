
import { FaGithub , FaApple    } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { RiTwitterXLine } from "react-icons/ri";
import { signIn } from "next-auth/react";


const Icons = () => {
    return (
        <>
            <div className='flex  justify-center items-center gap-5'>
                <div onClick={() => signIn('github')} className='border p-2 rounded-md cursor-pointer'>
                        <FaGithub className="size-5"/>
                </div>
                <div className='border p-2 rounded-md cursor-pointer'>
                    <FcGoogle className="size-5"/>
                </div>
                <div className='border p-2 rounded-md cursor-pointer'>
                    <RiTwitterXLine className="size-5" />
                </div>
                <div className='border p-2 rounded-md cursor-pointer'>
                    <FaApple className="size-5" />
                </div>
            </div>
        </>
    )
}

export default Icons