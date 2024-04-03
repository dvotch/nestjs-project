import { JwtPayload } from '@auth/interfaces';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class LessonService {
    constructor(private readonly prismaService: PrismaService) {}
    findLesson(user: JwtPayload) {
        this.prismaService.statement.findMany({ where: { userId: user.id } });
    }
}
