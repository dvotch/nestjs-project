import { JwtPayload } from '@auth/interfaces';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class StatementService {
    constructor(private readonly prismaService: PrismaService) {}
    getMyStatement(user: JwtPayload) {
        return this.prismaService.statement.findMany({ where: { userId: user.id } });
    }

    getAll() {
        return this.prismaService.statement.findMany();
    }
}
