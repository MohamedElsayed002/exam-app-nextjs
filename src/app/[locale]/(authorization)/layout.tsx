import { useTranslations } from "next-intl";
import Image from "next/image";

const LayoutAuthorization = ({ children }: { children: React.ReactNode }) => {

    const t = useTranslations()

    return (
        <main>
            <section className="min-h-screen grid p-10 md:p-0 md:grid-cols-2 ">
                <div className='hidden  rounded-r-[100px] md:flex flex-col gap-4 items-center text-left   justify-center bg-[#F0F4FC]'>
                    <h1 className='text-5xl font-bold -ml-32 p-0'>{t('welcome-to')}<br /> <span className='text-blue-400'>{t('next-js')}</span></h1>
                    <p className='max-w-xl'>{t('lorem-ipsum-dolor-sit-amet-conseestias-libero-ut-esse')}</p>
                    <Image className="rounded-full" src='/bro.png' width={408} height={434} alt='Login Image' priority />
                </div>
                <div>
                    {children}
                </div>
            </section>
        </main>
    )
}

export default LayoutAuthorization;