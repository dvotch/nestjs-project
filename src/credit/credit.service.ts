import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateCreditDto, UpdateCreditDto } from './dto';
import { JwtPayload } from '@auth/interfaces';
import { CurrentUser } from '@common/decorators';

@Injectable()
export class CreditService {
    constructor(private readonly prismaService: PrismaService) {}

    getAllMyCredits(id: string) {
        return this.prismaService.credits.findMany({
            where: { id },
        });
    }

    getAll() {
        return this.prismaService.credits.findMany();
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
