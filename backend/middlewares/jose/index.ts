// import { Course, Package, UserPackage } from '@/backend/types/user';
import {SignJWT, jwtVerify, } from 'jose';
import {nanoid} from "nanoid"

export type Token = {
    id: string,
}

const secret = process.env.JWT_SECRET

export async function sign(payload: Token): Promise<string> {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60* 60 * 24 * 10; // 10 days

    return new SignJWT({...payload})
        .setProtectedHeader({alg: 'HS256', typ: 'JWT'})
        .setJti(nanoid()) // Add a unique identifier
        .setExpirationTime(exp)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(new TextEncoder().encode(secret));
}

export async function verify(token: string, secret: string): Promise<Token | null> {
    try{
        const {payload} = await jwtVerify(token, new TextEncoder().encode(secret)) as {payload: Token};
        return payload;
        }catch(err){
            return null
        }
}