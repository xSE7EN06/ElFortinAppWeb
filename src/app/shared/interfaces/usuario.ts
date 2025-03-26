
export interface Usuario {
    id?: string 
    name: string;
    email: string;
    phone:string;
    user_type: string;
    nickname:string;
    password: string;
    encrypted_password?:string;
}