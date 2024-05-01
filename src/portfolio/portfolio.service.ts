import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreatePortfolioDto } from './dto/createPortfolio.dto';
import { UpdateCategoryDto } from 'src/category/dto/updateCategory.dto';
import bufferToDataUrl from 'buffer-to-data-url';

@Injectable()
export class PortfolioService {
    constructor(private readonly prismaService: PrismaService) {}

    getAll() {
        return this.prismaService.portfolio.findMany();
    }

    async getAllById(userId: string, page: string) {
        const portfolios = await this.prismaService.portfolio.findMany({ where: { userId } });
        const returnData = portfolios.slice(+page * 2, +page * 2 + 2).map((elem) => {
            return { ...elem, photo: bufferToDataUrl('image/png', elem.photo) };
        });
        return {
            data: returnData,
            meta: {
                totalPage: portfolios.length,
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
