export interface LoginRequest{
    email:string;
    password:string;
}

export interface AuthResponse{
    token:string;
}

export interface JwtPayload{
    sub:string;
    role?:string;
    exp?:number;
    iat?:number;
}
export interface RegisterRequest{
    name:string;
    email:string;
    password:string;
    role?:string;
}