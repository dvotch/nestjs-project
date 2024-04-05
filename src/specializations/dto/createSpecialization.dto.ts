import { Specializations } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class createSpecialization implements Specializations {
    @Exclude()
    id: string;
    name: string;
    description: string;
}