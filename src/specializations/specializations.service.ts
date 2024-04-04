import { Injectable } from '@nestjs/common';
import { Specializations } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class SpecializationsService {
    constructor(private readonly prismaService: PrismaService) {}
    findAllSpecializaztions() {
        return this.prismaService.specializations.findMany();
    }
    deleteSpecializaztions(specialization: string) {
        return this.prismaService.specializations.delete({ where: { id: specialization } });
    }
    postSpecializations(specialization: Specializations) {
        return this.prismaService.specializations.create({
            data: {
                name: specialization.name,
                description: specialization.description,
            },
        });
    }
}
