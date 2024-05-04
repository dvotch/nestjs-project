import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateOrganizations } from './dto/createOrganizations.dto';
import { UpdateOrganizations } from './dto/updateOrganizations.dto';

@Injectable()
export class OrganizationsService {
    constructor(private readonly prismaService: PrismaService) {}
    getAll() {
        return this.prismaService.organizations.findMany();
    }
    getAllByUserId(id: string) {
        return this.prismaService.organizations.findMany({ where: { id } });
    }
    create(dto: CreateOrganizations, logo: Express.Multer.File) {
        return this.prismaService.organizations.create({
            data: {
                name: dto.name,
                description: dto.description,
                logo: logo.buffer,
            },
        });
    }
    update(id: string, dto: Partial<UpdateOrganizations>) {
        const organization = this.prismaService.organizations.findUnique({
            where: {
                id,
            },
        });
        if (!organization) {
            throw new NotFoundException('Такой записи не существует');
        }
        return this.prismaService.organizations.update({
            where: {
                id,
            },
            data: { ...dto },
        });
    }
    delete(id: string) {
        return this.prismaService.organizations.delete({ where: { id } });
    }
}
