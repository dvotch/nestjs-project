import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';

@Injectable()
export class CategoryService {
    constructor(private readonly prismaService: PrismaService) {}

    getAll() {
        return this.prismaService.categories.findMany();
    }

    create(dto: CreateCategoryDto) {
        return this.prismaService.categories.create({
            data: {
                name: dto.name,
            },
        });
    }

    delete(id: string) {
        return this.prismaService.categories.delete({
            where: {
                id,
            },
        });
    }

    update(id: string, dto: UpdateCategoryDto) {
        return this.prismaService.categories.update({
            where: { id },
            data: { name: dto.name },
        });
    }
}
