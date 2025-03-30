export interface User {
    id: string 
    name: string;
    email: string;
    phone:string;
    user_type: string;
    nickname:string;
    password: string;
    encrypted_password?:string;
}