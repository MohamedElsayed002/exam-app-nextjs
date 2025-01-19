import { AxiosError } from "axios";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from 'next-auth/providers/github'
import { cookies } from "next/headers";

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/auth/login',
        error: '/auth/error'
    },
    providers: [
        GithubProvider({
            clientId : process.env.AUTH_SECRET as string,
            clientSecret : process.env.GITHUB_SECRET as string,
        }),
        Credentials({
            name: 'Credentials',
            credentials: {
                email: {label : 'email' , type : 'email' , placeholder: 'enter email address'},
                password: {label : 'password', type: 'password', placeholder: 'enter password'}
            },
    
            async authorize(credentials) {
                try {
                    const response = await fetch('https://exam.elevateegy.com/api/v1/auth/signin', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: credentials?.email,
                            password: credentials?.password
                        })
                    })
                    const payload : APIResponse<LoginResponse> = await response.json()
                    console.log(payload.token)
                    if (payload.message === 'success') {

                        cookies().set('ecommerce_token',payload.token,{
                            httpOnly : true
                        })

                        return {
                            token: payload.token,
                            ...payload.user,
                        }
                    } else {
                        return null
                    }
                } catch (error: unknown) {
                    if (error instanceof AxiosError) {
                        const errMsg = error.response?.data?.message || 'Invalid email or password';
                        console.log(errMsg);
                    } else {
                        // Handle other types of errors
                        console.log('An unknown error occurred');
                    }
                    return null;
                }
            }
        })
    ],
    secret : process.env.AUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.token = user.token;
                token.username = user.username;
                token.email = user.email;
                token.firstName = user.firstName;
                token.lastName = user.lastName;
                token.role = user.role;
                token.photo = user.photo;
                token.isVerified = user.isVerified
                token.id = user.id;
            }
            return token
        },
        async session({ session, token }) {
            session.username = token.username;
            session.email = token.email;
            session.firstName = token.firstName;
            session.lastName = token.lastName;
            session.fullName = token.fullName;
            session.role = token.role;
            session.photo = token.photo;
            session.isVerified = token.isVerified      
            return session;
        }
    }
}