import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateSpecializationDto } from './dto';

@Injectable()
export class SpecializationsService {
    constructor(private readonly prismaService: PrismaService) {}
    findAllSpecializaztions() {
        return this.prismaService.specializations.findMany();
    }
    deleteSpecializaztions(id: string) {
        return this.prismaService.specializations.delete({ where: { id } });
    }
    postSpecializations(dto: CreateSpecializationDto) {
        return this.prismaService.specializations.create({
            data: { ...dto },
        });
    }
}
