'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icons from "../components/Icons";
import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from "next/navigation";
import Buttons from "../components/Buttons";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import axios from 'axios'
import { useTranslations } from "next-intl";

type Inputs = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    confirmPassword: string;
}


const RegisterPage = () => {


    const router = useRouter()
    const { toast } = useToast()
    const t = useTranslations()
    const { register, handleSubmit } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        try {

            const response = await axios.post('https://exam.elevateegy.com/api/v1/auth/signup',{
                username: data.firstName + data.lastName,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
                rePassword: data.confirmPassword,
                phone: '01093588197'
            })
            console.log(response)

            if(response.status === 200) {
                toast({
                    title: 'Success',
                    description: 'You have been registered successfully'
                })
                router.push('/auth/login')
            }

        } catch (error) {
            toast({
                title: 'Error',
                description: error.response.data.message,
                variant: 'destructive'
            })
        }
    }


    return (
        <div className="p-20 -mt-10 md:md-10  max-w-2xl">
            <Buttons />
            <h1 className="text-xl mb-5 font-bold">{t('register')}</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-y-3">
                <div>
                    {/* <Label>First Name</Label> */}
                    <Input
                        autoFocus={true}
                        {...register('firstName')}
                        type='text'
                        name='firstName'
                        placeholder={t('first-name')}
                        className='mt-1'
                        required
                    />
                </div>
                <div>
                    {/* <Label>Email</Label> */}
                    <Input
                        {...register('lastName')}
                        type='text'
                        name='lastName'
                        placeholder={t('last-name')}
                        className='mt-1'
                        required
                    />
                </div>
                <div>
                    {/* <Label>Email</Label> */}
                    <Input
                        {...register('email')}
                        type='email'
                        name='email'
                        placeholder={t('email')}
                        className='mt-1'
                        required
                    />
                </div>
                <div>
                    {/* <Label>Password</Label> */}
                    <Input
                        {...register('password')}
                        type='password'
                        name='password'
                        placeholder={t('password')}
                        className="mt-1"
                        required
                    />
                </div>
                <div>
                    {/* <Label>Password</Label> */}
                    <Input
                        {...register('confirmPassword')}
                        type='password'
                        name='confirmPassword'
                        placeholder={t('confirm-password')}
                        className="mt-1"
                        required
                    />
                </div>
                <p className='text-end my-1 text-blue-400 hover:underline cursor-pointer'>
                    <Link href='/auth/recover-password'> {t('recover-password-less-than')} </Link>
                </p>


                <Button type='submit' className="bg-blue-500 hover:bg-blue-500/80 -mt-2">
                    {t('register-1')}
                </Button>
            </form>
            <div className='relative flex py-5 items-center'>
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="flex-shrink mx-4 text-gray-400">
                    {t('or-continue-with')}
                </span>
                <div className="flex-grow border-t border-gray-400"></div>
            </div>
            <Icons />
        </div>
    )
}

export default RegisterPage;