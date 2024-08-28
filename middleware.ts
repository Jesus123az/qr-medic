import { NextRequest, NextResponse } from "next/server"
import { verify } from "./backend/middlewares/jose"

const secret = process.env.JWT_SECRET;

export const middleware = async (request: NextRequest)=>{
    const path = request.nextUrl.pathname
 const authToken = request.cookies.get("auth-token")?.value
 if(authToken && secret){
    const user = await verify(authToken, secret)
    if(user){
        if(path === "/" || path === "/forgot-password" ){
            return NextResponse.redirect(new URL("/health-form", request.url))
        }
       
    }

 }
 else{
     if(path === "/health-form" || path === "/qr-code" ){
        return NextResponse.redirect(new URL("/", request.url))
    }
 }
}

export const config = {
    matcher: [
      "/((?!api/login|api/logout|api/users|_next/static|_next/image|public|favicon.ico).*)",
    ],
  };
  