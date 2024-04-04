import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SpecializationsService } from './specializations.service';
import { Public } from '@common/decorators';
import { createSpecialization } from './dto';
@Public()
@Controller('specializations')
export class SpecializationsController {
    constructor(private readonly specializationsService: SpecializationsService) {}
    @Get()
    getSpecializations() {
        return this.specializationsService.findAllSpecializaztions();
    }
    @Delete('/:id')
    deleteSpecializations(@Param('id') id: string) {
        return this.specializationsService.deleteSpecializaztions(id);
    }
    @Post()
    postSpecializations(@Body() dto: createSpecialization) {
        return this.specializationsService.postSpecializations(dto);
    }
}
