import { Injectable } from "@angular/core";
import { jwtDecode } from 'jwt-decode'
import { JwtPayload } from "../../shared/auth.models";

const TOKEN_KEY = 'auth_token';

@Injectable({providedIn:'root'})
export class TokenService{
    setToken(token:string){
        localStorage.setItem(TOKEN_KEY,token);
    }

    getToken() : string | null{
        return localStorage.getItem(TOKEN_KEY);
    }

    clear(){
        localStorage.removeItem(TOKEN_KEY);
    }

    isLoggedIn(){
        const token=this.getToken();
        if(!token) return false;
        try{
            const {exp}=jwtDecode<JwtPayload>(token);
            return !exp ? true : Date.now() < exp*1000;
        }catch{
            return false;
        }
    }
    getEmail() : string | null{
        const token=this.getToken();
        if(!token) return null;
        try{
            const {sub}=jwtDecode<JwtPayload>(token);
            return sub ?? null;
        }catch{
            return null;
        }
    }

    getRole() : 'ADMIN' | 'STAFF' | null{
        const token=this.getToken();
        if(!token) return null;
        try{
            const {role} = jwtDecode<JwtPayload>(token);
            return (role === 'ADMIN' || role === 'STAFF' ) ? role : null;

        }catch{
            return null;
        }
    }

}