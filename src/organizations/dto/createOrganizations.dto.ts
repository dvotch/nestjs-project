import { Organizations } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class CreateOrganizations implements Organizations {
    @Exclude()
    id: string;
    name: string;
    description: string;
    logo: Buffer;
}
