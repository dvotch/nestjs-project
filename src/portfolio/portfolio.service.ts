import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreatePortfolioDto } from './dto/createPortfolio.dto';
import { UpdateCategoryDto } from 'src/category/dto/updateCategory.dto';
import { Portfolio } from '@prisma/client';

@Injectable()
export class PortfolioService {
    constructor(private readonly prismaService: PrismaService) {}

    getAll() {
        return this.prismaService.portfolio.findMany();
    }

    create(dto: CreatePortfolioDto) {
        return this.prismaService.portfolio.create({
            data: {
                name: dto.name,
                photo: dto.photo,
                year: dto.year,
                categoryId: dto.categoryId,
                userId: dto.userId,
            },
        });
    }

    update(id: string, dto: Partial<UpdateCategoryDto>) {
        const portfolio = this.prismaService.portfolio.findUnique({
            where: {
                id,
            },
        }) as Partial<Portfolio>;

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

    delete(id: string) {
        return this.prismaService.portfolio.delete({ where: { id } });
    }
}
