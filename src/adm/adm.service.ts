import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { AcceptApplicationDto } from './dto/acceptApplication.dto';
import { CreateFutureDto } from './dto/createFuture.dto';

@Injectable()
export class AdmService {
    constructor(private readonly prismaService: PrismaService) {}

    acceptApplication(id: string, dto: AcceptApplicationDto) {
        return this.prismaService.usersOrganization.update({
            where: { id },
            data: dto,
        });
    }

    getAllUsersOrganization() {
        return this.prismaService.usersOrganization.findMany();
    }

    createFuture(dto: CreateFutureDto, photo: Express.Multer.File) {
        console.log(dto);
        return this.prismaService.future.create({ data: { ...dto, photo: photo.buffer } });
    }

    deleteFuture(id: string) {
        return this.prismaService.future.delete({ where: { id } });
    }

    getAllFutures() {
        return this.prismaService.future.findMany();
    }
}
