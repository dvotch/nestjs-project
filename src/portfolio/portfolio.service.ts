import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreatePortfolioDto } from './dto/createPortfolio.dto';
import { UpdateCategoryDto } from 'src/category/dto/updateCategory.dto';
import { PaginatorTypes, paginator } from '@nodeteam/nestjs-prisma-pagination';
import { Portfolio } from '@prisma/client';
const paginate: PaginatorTypes.PaginateFunction = paginator({ perPage: 2 });

@Injectable()
export class PortfolioService {
    constructor(private readonly prismaService: PrismaService) {}

    getAll() {
        return this.prismaService.portfolio.findMany();
    }

    getAllById(userId: string, page: string): Promise<PaginatorTypes.PaginatedResult<Portfolio>> {
        return paginate(
            this.prismaService.portfolio,
            { where: { userId } },
            {
                page: +page,
            },
        );
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
