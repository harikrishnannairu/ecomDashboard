import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthResponse, LoginRequest, RegisterRequest } from "../../shared/auth.models";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";


@Injectable({ providedIn: 'root' })
export class AuthService{
    
    constructor(private http:HttpClient){}

    private base=`${environment.apiUrl}/auth`

    login(request:LoginRequest):Observable<AuthResponse>{
        let url = `${this.base}/login`;
        return this.http.post<AuthResponse>(url,request);
    }

    register(request:RegisterRequest):Observable<AuthResponse>{
        let url=`${this.base}/register`;
        return this.http.post<AuthResponse>(url,request);
    }
    logOut(){
        
    }
}