import { RolesGuard } from '@auth/guards/role.guard';
import { Roles } from '@common/decorators';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { CreateMarkDto } from 'src/mark/dto';
import { AcceptApplicationDto } from './dto/acceptApplication.dto';
import { AdmService } from './adm.service';
import { CreateFutureDto } from './dto/createFuture.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Adm')
@Controller('adm')
@ApiBearerAuth('JWT-auth')
export class AdmController {
    constructor(private readonly admService: AdmService) {}

    @UseGuards(RolesGuard)
    @Roles(Role.RESOURCES_DEPARTMENT)
    @Get()
    getAllUsersOrganization() {
        return this.admService.getAllUsersOrganization();
    }

    @UseGuards(RolesGuard)
    @Roles(Role.RESOURCES_DEPARTMENT)
    @Put('/:id')
    createMark(@Param('id') id: string, @Body() dto: AcceptApplicationDto) {
        return this.admService.acceptApplication(id, dto);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.RESOURCES_DEPARTMENT)
    @UseInterceptors(FileInterceptor('photo'))
    @Post('/future')
    createFeature(@Body() dto: CreateFutureDto, @UploadedFile() photo: Express.Multer.File) {
        return this.admService.createFuture(dto, photo);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.RESOURCES_DEPARTMENT)
    @Get('/future')
    getAllFutures() {
        return this.admService.getAllFutures();
    }

    @UseGuards(RolesGuard)
    @Roles(Role.RESOURCES_DEPARTMENT)
    @Delete('/future/:id')
    deleteFuture(@Param('id') id: string) {
        return this.admService.deleteFuture(id);
    }
}
