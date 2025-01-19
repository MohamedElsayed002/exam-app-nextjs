'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icons from "../components/Icons";
import { useForm, SubmitHandler } from "react-hook-form"
import { signIn } from "next-auth/react";
import Buttons from "../components/Buttons";
import Link from "next/link";
import { useTranslations } from "use-intl";


type Inputs = {
    email : string;
    password : string
}


const LoginPage = () => {

    const t = useTranslations()
    const { register , handleSubmit} = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const {email,password} = data
        const response = await signIn('credentials',{email,password,redirect : false,callbackUrl: '/'})

        if(response?.error) {
            console.log('error',response.error)
            return
        }

        if(response?.ok) {
            window.location.href = response.url || '/'
            console.log('im here')
            // console.log('res' , response.url)
            // router.replace(response.url || "/");

            // return redirect('/')
        }

        

    }



    return (
       <>
         <div className="p-20   md:md-10   max-w-2xl">
         <Buttons/>
            <h1 className="text-xl mb-5 font-bold">{t('sign-in')}</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
                <div>
                    <Label>{t('email')}</Label>
                    <Input 
                        autoFocus={true}
                        {...register('email')}
                        type='email'
                        name='email'
                        placeholder= {t('enter-your-email')}
                        className='mt-1'
                        required
                     />
                </div>
                <div>
                    <Label> {t('password')} </Label>
                    <Input
                        {...register('password')}
                        type='password'
                        name='password'
                        placeholder= {t('enter-your-password')}
                        className="mt-1"
                        required
                     />
                </div>
                <p className='text-end -mt-2 text-blue-400 hover:underline cursor-pointer'>
                    <Link href='/auth/recover-password'>
                        {t('recover-password-less-than')}
                    </Link>
                </p>
                <Button type='submit' className="bg-blue-500 hover:bg-blue-500/80 -mt-2">
                    {t('sign-in')}
                </Button>
            </form>
            <div className='relative flex py-5 items-center'>
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-400">{t('or-continue-with')}</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
            <Icons/>
        </div>
       </>
    )
}

export default LoginPage;