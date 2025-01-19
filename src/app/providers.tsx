import { Toaster } from "@/components/ui/toaster";
import { NextAuthProvider } from "./nextAuthProvider";
import { NextIntlClientProvider, useMessages } from "next-intl";


type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({children} : ProvidersProps) {
  const messages = useMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <NextAuthProvider>
        {children}
        <Toaster/>
      </NextAuthProvider>
    </NextIntlClientProvider>
  )
}