'use client'
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

import { Suspense } from "react";
import { Progress } from "./ui/progress";
import { Check, Clock, Flag } from "lucide-react";
import Image from "next/image";
// bg-gray-200/80 rounded-md p-2 mt-5 w- md:w-[750px]

const UserInfo = () => {

    const t = useTranslations()
    const session = useSession()
    return (
        <div className="bg-gray-200/80 rounded-md p-2 mt-5 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
                <Image alt='imagee' className="w-full md:w-52 h-60 my-auto rounded-md object-cover" src='/image.jpg' />
                <div>
                    <div className="flex md:py-8 flex-col gap-4 md:gap-8">
                        <h1 className="font-bold"><span className="text-blue-600">{t('name')}: </span> <Suspense fallback={<h1>Loading..</h1>}> {session?.data?.username} </Suspense></h1>
                        <h2 className="font-bold  text-xl md:text-2xl "><span className="text-blue-600"> {t('professional')}:</span> {t('front-end-developer')}</h2>
                        <Progress value={20} />
                    </div>
                    <div className="flex w-full text-center mt-5 md:-mt-2 mx-auto justify-between gap-10">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
                            <div className="inline-block p-2 rounded-md bg-white">
                                <Flag className="text-blue-600 md:size-10" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h1>27</h1>
                                <h2>{t('quiz-passed')}</h2>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-center gap-3">
                            <div className="inline-block p-2 rounded-md bg-white">
                                <Clock className="md:size-10 text-blue-600" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h1>13 {t('min')}</h1>
                                <h2>{t('fastest-time')}</h2>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-center gap-3">
                            <div className="inline-block p-2 rounded-md bg-white">
                                <Check className="md:size-10 text-blue-600" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h1>200</h1>
                                <h2>{t('correct-answers')}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default UserInfo;