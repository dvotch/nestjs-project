import { Organizations } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UpdateOrganizations implements Organizations {
    @Exclude()
    id: string;
    name: string;
    description: string;
    logo: Buffer;
}
