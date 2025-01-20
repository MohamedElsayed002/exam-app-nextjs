'use client'
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Search } from "lucide-react"
import { Avatar , AvatarImage , AvatarFallback } from "./ui/avatar"
import { useLocale, useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import { useSession } from "next-auth/react"
import ModalAddExam from "./add-exam-admin"
const Header = () => {

    const session = useSession()
    const t = useTranslations()
    const locale = useLocale()

    return (
        <div className="flex justify-center">
            <div className="">
                <div className="relative  w-full">
                    <Input placeholder={t('search')} className=" py-2 mx-auto  w-80 md:w-[600px] pl-4 border border-gray-300 rounded-md" />
                    <Button variant='outline' className={cn("absolute top-1/2 transform  -translate-y-1/2  py-1", locale === 'ar' ? 'left-0' : 'right-0')}>
                        <Search />
                    </Button>
                </div>
            </div>
            <Avatar className="ml-4 mr-4 size-8 items-center">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            { session.data && session?.data.role !== 'user' ? (
                <>
                    <Button className='bg-blue-600'>{t('start-quiz')}</Button>
                </>
            ): (
                <>
                    <ModalAddExam/>
                </>
            )}
        </div>
    )
}

export default Header