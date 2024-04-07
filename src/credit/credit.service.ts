import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateCreditDto, UpdateCreditDto } from './dto';
import { JwtPayload } from '@auth/interfaces';
import { CurrentUser } from '@common/decorators';

@Injectable()
export class CreditService {
    constructor(private readonly prismaService: PrismaService) {}

    getAll() {
        return this.prismaService.credits.findMany();
    }

    getAllById(id: string) {
        return this.prismaService.credits.findMany({
            where: { id },
        });
    }

    create(dto: CreateCreditDto) {
        return this.prismaService.credits.create({
            data: { ...dto },
        });
    }

    delete(id: string) {
        return this.prismaService.credits.delete({
            where: {
                id,
            },
        });
    }

    update(id: string, dto: UpdateCreditDto) {
        return this.prismaService.credits.update({
            where: { id },
            data: { ...dto },
        });
    }
}
