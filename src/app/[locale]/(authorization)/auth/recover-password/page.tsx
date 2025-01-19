'use client'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FormEvent, useState } from "react"
import { useForm, SubmitHandler } from 'react-hook-form'
import { redirect } from 'next/navigation'
import axios from 'axios'
import { useToast } from "@/hooks/use-toast"
import Buttons from "../components/Buttons"
import { useTranslations } from "next-intl"

type Inputs = {
    email: string;
    newPassword: string
}

const RecoverPassword = () => {

    const t = useTranslations()
    const { toast } = useToast()
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()

    const [email, setEmail] = useState<string | undefined>('')
    const [verify, setVerify] = useState<string | undefined>('')
    const [recoverEmail, setRecoverEmail] = useState<boolean>(true)

    const [recover, setResetPassword] = useState(true)

    const handleSubmitEmail = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const response = await axios.post('https://exam.elevateegy.com/api/v1/auth/forgotPassword', { email })
            console.log(response)
            toast({ title: 'Success!' })
            setRecoverEmail(false)
        } catch (error) {
            toast({ title: 'Error', variant: 'destructive', description: error?.response?.data?.message })
        }
    }

    const handleVerify = async (e: FormEvent) => {
        e.preventDefault()
        try {

            const response = await axios.post('https://exam.elevateegy.com/api/v1/auth/verifyResetCode', {
                resetCode: verify
            })
            setResetPassword(false)
            toast({ title: 'Success!' })
            return response // played
        } catch (error) {
            toast({ title: 'Error', variant: 'destructive', description: error?.response?.data?.message })
        }

    }

    const handleResetPassword: SubmitHandler<Inputs> = async (data) => {
        const { email, newPassword } = data
        try {
            const response = await axios.put('https://exam.elevateegy.com/api/v1/auth/resetPassword', {
                email,
                newPassword
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
            toast({ title: 'Password Changed Successfully', description: 'Please Login' })
            console.log(response)
            return redirect('/auth/login')

        } catch (error) {
            console.log(error)
            toast({ title: 'Error', variant: 'destructive', description: error?.response?.data?.message })
        }
    }


    return (
        <div className="p-20 mt-20">
            <Buttons />
            {
                recoverEmail && (
                    <form onSubmit={handleSubmitEmail}>
                        <h1 className="text-xl font-bold mb-5">{t('forgot-your-password')}</h1>
                        <Input
                            autoFocus={true}
                            placeholder={t('email')}
                            name='email'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='p-2 bg-gray-100 focus:outline-none ring-inset focus:ring-4 focus:ring-blue-400 '
                            type='text'
                        />
                        <Button
                            type='submit'
                            className='bg-blue-500 hover:bg-blue-400 w-full my-5'
                        >
                            {t('recover-email')}
                        </Button>

                    </form>
                )
            }

{
              !recoverEmail && recover && (
                <form onSubmit={handleVerify}>
                  <h1 className="text-xl font-bold mb-5">{t('verify-code')}</h1>
                  <Input
                    autoFocus={true}
                    placeholder={t('enter-code')}
                    name='verify'
                    required
                    value={verify}
                    onChange={(e) => setVerify(e.target.value)}
                    className='p-2 bg-gray-100 focus:outline-none ring-inset focus:ring-4 focus:ring-blue-400 '
                    type='text'
                  />
                  <Button
                    type='submit'
                    className='bg-blue-500 hover:bg-blue-400 w-full my-5'
                  >
                    {t('recover-email')}
                  </Button>

                </form>
              )}

{
              !recover && (
                <form onSubmit={handleSubmit(handleResetPassword)}>
                  <h1 className="text-xl font-bold mb-5">{t('set-a-password')}</h1>
                  <Input
                    placeholder={t('email')}
                    required
                    {...register('email', {
                      required: "Email is required",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email format"
                      }
                    })}
                    className='p-2 bg-gray-100 focus:outline-none ring-inset focus:ring-4 focus:ring-blue-400 '
                    type='text'
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}

                  <Input
                    placeholder={t('enter-new-password')}
                    required
                    type='password'
                    className="p-2 bg-gray-100 my-2"
                    {...register('newPassword', {
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
                        message: "Password must include at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character."
                      }
                    })}
                  />
                  {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword.message}</p>}

                  <Button
                    type='submit'
                    className='bg-blue-500 hover:bg-blue-400 w-full my-5'
                  >
                   {t('sign-in')}
                  </Button>

                </form>
              )
            }

        </div>
    )
}

export default RecoverPassword