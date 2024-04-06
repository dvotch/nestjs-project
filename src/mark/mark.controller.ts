import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MarkService } from './mark.service';
import { CreateMarkDto, UpdateMarkDto } from './dto';
import { Public } from '@common/decorators';
import { ApiTags } from '@nestjs/swagger';

@Public()
@ApiTags('Marks')
@Controller('mark')
export class MarkController {
    constructor(private readonly markService: MarkService) {}

    @Get()
    getAllMarks() {
        return this.markService.getAll();
    }

    @Post()
    createMark(@Body() dto: CreateMarkDto) {
        return this.markService.create(dto);
    }

    @Put('/:id')
    updateMark(@Param('id') id: string, @Body() dto: UpdateMarkDto) {
        return this.markService.update(id, dto);
    }

    @Delete('/:id')
    deleteMark(@Param('id') id: string) {
        return this.markService.delete(id);
    }
}
