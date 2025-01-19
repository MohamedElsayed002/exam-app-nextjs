'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Globe2 } from "lucide-react"
import Link from "next/link"
import { Separator } from "./ui/separator"
import { usePathname } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"
import { signIn, signOut, useSession } from "next-auth/react"

export function AppSidebar() {
  const session = useSession()
  const t = useTranslations()
  const pathname = usePathname()
  console.log(pathname)
  const locale = useLocale()
  console.log(locale)  // Output: 'en' or 'ar' depending on the current locale

  return (
    <Sidebar side={locale === 'ar' ? 'right' : 'left'}>
      <SidebarHeader>
        <Link href='/' className="flex p-5 gap-4 cursor-pointer bg-blue-500 rounded-md text-white">
          <Globe2 size={24} />
          <span>{t('elevate')}</span>
        </Link>
      </SidebarHeader>
      <Separator />
      <SidebarContent className="p-5">
        <SidebarGroup className={pathname.includes('/quiz-history') ? '' : 'bg-blue-500 text-white rounded-md'}>
          <Link href='/'>{t('home')}</Link>
        </SidebarGroup>
        <SidebarGroup className={pathname.includes('/quiz-history') ? 'bg-blue-500 text-white rounded-md' : ''}>
          <Link href='/quiz-history'>{t('quiz-history')}</Link>
        </SidebarGroup>
        <SidebarGroup>
          {
            session.data ? (
              <h1 onClick={() => signOut()}  className="cursor-pointer">{t('logout')}</h1>
            ) : (
              <h1 className="cursor-pointer" onClick={() => signIn()}>{t('login')}</h1>
            )
          }
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

