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

import { CreateOrganizations } from './dto';
import { OrganizationsService } from './organizations.service';
import { UpdateOrganizations } from './dto/updateOrganizations.dto';
import { Public, Roles } from '@common/decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '@auth/guards/role.guard';
import { Role } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Organization')
@Controller('organizations')
@ApiBearerAuth('JWT-auth')
export class OrganizationsController {
    constructor(private readonly organizationsService: OrganizationsService) {}

    @UseGuards(RolesGuard)
    @Roles(Role.RESOURCES_DEPARTMENT, Role.STUDENT)
    @Get()
    getAllOrganizations() {
        return this.organizationsService.getAll();
    }

    @UseGuards(RolesGuard)
    @Roles(Role.RESOURCES_DEPARTMENT)
    @UseInterceptors(FileInterceptor('logo'))
    @Post()
    createOrganizations(@Body() dto: CreateOrganizations, @UploadedFile() file: Express.Multer.File) {
        return this.organizationsService.create(dto, file);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.RESOURCES_DEPARTMENT)
    @Put('/:id')
    updateOrganizations(@Param('id') id: string, @Body() dto: UpdateOrganizations) {
        return this.organizationsService.update(id, dto);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.RESOURCES_DEPARTMENT)
    @Delete('/:id')
    deleteOrganizations(@Param('id') id: string) {
        return this.organizationsService.delete(id);
    }
}
