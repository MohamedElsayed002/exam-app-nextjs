
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";


declare module 'next-auth' {
    interface User extends Pick<DatabaseFields,"_id"> {
        token : string;
        username : string;
        email : string;
        firstName : string;
        lastName ?: string;
        role : string;
        photo?: string;
        // blocked : boolean;
        isVerified: boolean;
        // fullName : string;
        // id : string;
    }
    interface Session {
        username : string;
        email : string;
        firstName : string;
        lastName ?: string;
        role : string;
        photo?: string;
        blocked : boolean;
        fullName : string;
        isVerified :boolean;
        id : string;
    }
    
}

declare module 'next-auth/jwt' {
    interface JWT {
        token : string;
        username : string;
        email : string;
        firstName : string;
        lastName ?: string;
        role : string;
        photo?: string;
        // blocked : boolean;
        isVerified : boolean;
        fullName : string;
    }
}