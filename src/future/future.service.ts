import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateFuture, UpdateFuture } from './dto';

@Injectable()
export class FutureService {
    constructor(private readonly prismaService: PrismaService) {}

    getAll() {
        return this.prismaService.future.findMany();
    }

    create(dto: CreateFuture) {
        return this.prismaService.future.create({
            data: {
                ...dto,
            },
        });
    }

    update(id: string, dto: Partial<UpdateFuture>) {
        const future = this.prismaService.future.findUnique({
            where: {
                id,
            },
        });

        if (!future) {
            throw new NotFoundException('Такой записи не существует');
        }

        return this.prismaService.future.update({
            where: {
                id,
            },
            data: { ...dto },
        });
    }

    delete(id: string) {
        return this.prismaService.future.delete({ where: { id } });
    }
}
