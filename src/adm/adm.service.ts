import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { AcceptApplicationDto } from './dto/acceptApplication.dto';

@Injectable()
export class AdmService {
    constructor(private readonly prismaService: PrismaService) {}

    acceptApplication(id: string, dto: AcceptApplicationDto) {
        return this.prismaService.usersOrganization.update({
            where: { id },
            data: dto,
        });
    }

    getAllUsersOrganization() {
        return this.prismaService.usersOrganization.findMany();
    }
}
