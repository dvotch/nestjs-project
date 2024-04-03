import { $Enums, User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserResponse implements User {
    id: string;
    email: string;
    dateOfReceipt: Date;
    group: number;
    login: string;
    name: string;
    organizationId: string;
    patronymic: string;
    phoneNumber: string;
    surname: string;
    avatar: Buffer;
    specializationId: string;

    @Exclude()
    password: string;

    @Exclude()
    createdAt: Date;

    updatedAt: Date;
    roles: $Enums.role[];

    constructor(user: User) {
        Object.assign(this, user);
    }
}
