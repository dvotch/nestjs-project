import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreatePortfolioDto } from './dto/createPortfolio.dto';
import { UpdateCategoryDto } from 'src/category/dto/updateCategory.dto';

@Injectable()
export class PortfolioService {
    constructor(private readonly prismaService: PrismaService) {}

    getAll() {
        return this.prismaService.portfolio.findMany();
    }

    async getAllById(userId: string, page: string) {
        const portfolios = await this.prismaService.portfolio.findMany({ where: { userId } });
        return {
            data: portfolios.slice(+page - 1, 2),
            meta: {
                totalPage: (await this.prismaService.portfolio.findMany({ where: { userId } })).length,
            },
        };
    }

    create(dto: CreatePortfolioDto, photo: Express.Multer.File) {
        return this.prismaService.portfolio.create({
            data: {
                ...dto,
                year: +dto.year,
                photo: photo.buffer,
            },
        });
    }

    async update(id: string, dto: UpdateCategoryDto, userId: string) {
        const portfolio = await this.prismaService.portfolio.findUnique({
            where: {
                id,
            },
        });

        if (!portfolio) {
            throw new NotFoundException('Такой записи не существует');
        }

        if (userId !== portfolio.userId) {
            throw new ForbiddenException('Невозможно изменить чужую запись');
        }

        return this.prismaService.portfolio.update({
            where: {
                id,
            },
            data: { ...dto },
        });
    }

    async delete(id: string, userId: string) {
        const portfolio = await this.prismaService.portfolio.findUnique({
            where: {
                id,
            },
        });

        if (!portfolio) {
            throw new NotFoundException('Такой записи не существует');
        }

        if (userId !== portfolio.userId) {
            throw new ForbiddenException('Невозможно удалить чужую запись');
        }

        return this.prismaService.portfolio.delete({ where: { id } });
    }
}
