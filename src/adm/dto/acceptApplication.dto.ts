import { ApiProperty } from '@nestjs/swagger';
import { UsersOrganization } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class AcceptApplicationDto implements UsersOrganization {
    @Exclude()
    id: string;

    @Exclude()
    organizationId: string;

    @Exclude()
    userId: string;

    @Exclude()
    whyYouText: string;

    @ApiProperty({
        description: 'Принять',
        required: true,
        default: 'true',
        type: 'boolean',
    })
    status: boolean;
}
