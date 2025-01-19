'use client'
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import {ChevronDown} from 'lucide-react'
import { useLocale } from 'next-intl';


export default function LocaleToggle() {
    const locale = useLocale();  // Get the current locale

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const switchLocale = (locale: "en" | 'ar') => {
        router.push(`${pathname}?${searchParams.toString()}`, { locale });
    }


    console.log(locale)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost'>
                    <p>
                        {
                            locale === 'en' ? (
                                <span className="flex gap-2">
                                    <span>English</span>
                                    <ChevronDown/>
                                </span>
                            ) : (
                                <span className="flex gap-2">
                                <span>العربيه</span>
                                <ChevronDown/>
                            </span>
                            )
                        }
                    </p>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuItem asChild>
                    <Button variant='ghost' className='w-full justify-start' onClick={() => switchLocale('en')}>
                        {locale === 'ar' ? 'الانجليزيه' : 'English'}
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Button variant="ghost" className="w-full justify-start" onClick={() => switchLocale("ar")}>
                        {locale === 'ar' ? 'العربيه' : 'Arabic'}
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}