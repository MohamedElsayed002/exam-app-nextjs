import { Button } from "@/components/ui/button"
import LocaleToggle from "@/lib/common/locale-toggle"
import { useTranslations } from "next-intl"
import Link from "next/link"


const Buttons = () => {
    
    const t = useTranslations()

    return (
        <div className="flex justify-end items-center  mb-10 gap-5">
            <LocaleToggle />
            <Button variant='ghost'>
                <Link href='/auth/login'>
                    {t('sign-in')}
                </Link>
            </Button>
            <Button variant='outline'>
                <Link href='/auth/register'>{t('register')}</Link>
            </Button>
        </div>
    )
}

export default Buttons 