import { ApiProperty } from '@nestjs/swagger';
import { UsersOrganization } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsString } from 'class-validator';

export class PostOrganizationDto implements UsersOrganization {
    @Exclude()
    id: string;
    @Exclude()
    userId: string;

    @IsString()
    @ApiProperty({
        description: 'Идентификатор организации',
        type: 'string',
        required: true,
        default: '-',
    })
    organizationId: string;
    status: boolean;
}
