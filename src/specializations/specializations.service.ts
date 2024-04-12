import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateSpecializationDto, UpdateSpecializationDto } from './dto';

@Injectable()
export class SpecializationsService {
    constructor(private readonly prismaService: PrismaService) {}

    findAll() {
        return this.prismaService.specializations.findMany();
    }
    async delete(id: string) {
        const specialization = await this.prismaService.specializations.findUnique({
            where: {
                id,
            },
        });

        if (!specialization) {
            throw new NotFoundException('Такой записи не существует');
        }

        return this.prismaService.specializations.delete({ where: { id } });
    }
    create(dto: CreateSpecializationDto) {
        return this.prismaService.specializations.create({
            data: { ...dto },
        });
    }

    async update(id: string, dto: UpdateSpecializationDto) {
        const portfolio = await this.prismaService.portfolio.findUnique({
            where: {
                id,
            },
        });

        if (!portfolio) {
            throw new NotFoundException('Такой записи не существует');
        }

        return this.prismaService.portfolio.update({
            where: {
                id,
            },
            data: { ...dto },
        });
    }
}
