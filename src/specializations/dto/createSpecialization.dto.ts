import { Specializations } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class CreateSpecializationDto implements Specializations {
    @Exclude()
    id: string;
    name: string;
    description: string;
}
