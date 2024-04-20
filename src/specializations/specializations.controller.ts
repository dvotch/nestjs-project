import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { SpecializationsService } from './specializations.service';
import { Roles } from '@common/decorators';
import { CreateSpecializationDto, UpdateSpecializationDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '@auth/guards/role.guard';
import { Role } from '@prisma/client';
import { Public } from "@common/decorators";

@ApiTags('Specialization')
@Controller('specializations')
@ApiBearerAuth('JWT-auth')
@Public()
export class SpecializationsController {
    constructor(private readonly specializationsService: SpecializationsService) {}

    @Get()
    getSpecializations() {
        return this.specializationsService.findAll();
    }

    @UseGuards(RolesGuard)
    @Roles(Role.RESOURCES_DEPARTMENT)
    @Delete('/:id')
    deleteSpecialization(@Param('id') id: string) {
        return this.specializationsService.delete(id);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.RESOURCES_DEPARTMENT)
    @Post()
    postSpecialization(@Body() dto: CreateSpecializationDto) {
        return this.specializationsService.create(dto);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.RESOURCES_DEPARTMENT)
    @Put('/:id')
    updateSpecialization(@Param('id') id: string, @Body() dto: UpdateSpecializationDto) {
        return this.specializationsService.update(id, dto);
    }
}
