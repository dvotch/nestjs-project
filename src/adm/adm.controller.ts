import { RolesGuard } from '@auth/guards/role.guard';
import { Roles } from '@common/decorators';
import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { CreateMarkDto } from 'src/mark/dto';
import { AcceptApplicationDto } from './dto/acceptApplication.dto';
import { AdmService } from './adm.service';

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
}
