import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { CreateOrganizations } from './dto';
import { OrganizationsService } from './organizations.service';
import { UpdateOrganizations } from './dto/updateOrganizations.dto';

@Controller('organizations')
export class OrganizationsController {
    constructor(private readonly organizationsService: OrganizationsService) {}
    @Get() getAllOrganizations() {
        return this.organizationsService.getAll();
    }
    @Post() createOrganizations(@Body() dto: CreateOrganizations) {
        return this.organizationsService.create(dto);
    }
    @Put('/:id') updateOrganizations(@Param('id') id: string, @Body() dto: UpdateOrganizations) {
        return this.organizationsService.update(id, dto);
    }
    @Delete('/:id') deleteOrganizations(@Param('id') id: string) {
        return this.organizationsService.delete(id);
    }
}
