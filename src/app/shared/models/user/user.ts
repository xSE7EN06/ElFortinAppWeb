export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    imageUrl: string;
    user_type: string;
    nickname: string;
    encryptedPassword: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
}
  