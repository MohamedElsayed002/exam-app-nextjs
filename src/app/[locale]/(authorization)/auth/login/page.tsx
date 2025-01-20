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
import { useToast } from "@/hooks/use-toast";


type Inputs = {
    email: string;
    password: string
}


const LoginPage = () => {

    const { toast } = useToast()
    const t = useTranslations()
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const { email, password } = data
        const response = await signIn('credentials', { email, password, redirect: false, callbackUrl: '/' })
        console.log(response)
        if (response?.error) {
            return toast({ title: 'Error', variant: 'destructive' })
        }

        if (response?.ok) {
            toast({
                title: 'Logged in Successfully'
            })
            setTimeout(() => {
                window.location.href = response.url || '/'
            }, 2000)
        }
    }

    return (
        <>
            <div className="p-20   md:md-10   max-w-2xl">
                <Buttons />
                <h1 className="text-xl mb-5 font-bold">{t('sign-in')}</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">

                    {/* Email */}
                    <div>
                        <Label>{t('email')}</Label>
                        <Input
                            autoFocus={true}
                            {...register('email', {
                                required: {
                                    value: true,
                                    message: 'Email is required'
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: 'Invalid email format'
                                }
                            })}
                            type='email'
                            required
                            name='email'
                            placeholder={t('enter-your-email')}
                            className='mt-1'
                        // required
                        />
                        <p className="text-red-500 mt-1">
                            {errors.email && errors.email.message}
                        </p>
                    </div>

                    {/* Password */}
                    <div>
                        <Label> {t('password')} </Label>
                        <Input
                            {...register('password', {
                                pattern: {
                                    value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/,  // Use regex directly
                                    message: "Password must include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character."
                                }
                            })}
                            type='password'
                            name='password'
                            placeholder={t('enter-your-password')}
                            className="mt-1"
                            required
                        />
                        <p className="text-red-500 mt-1">
                            {errors.password && errors.password.message}
                        </p>
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
                <Icons />
            </div>
        </>
    )
}

export default LoginPage;