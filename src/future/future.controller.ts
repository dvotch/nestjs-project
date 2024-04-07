import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FutureService } from './future.service';
import { CreateFuture, UpdateFuture } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@common/decorators';

@Public()
@ApiTags('Future')
@Controller('future')
export class FutureController {
    constructor(private readonly futureService: FutureService) {}
    @Get()
    getAllMarks() {
        return this.futureService.getAll();
    }

    @Post()
    createMark(@Body() dto: CreateFuture) {
        return this.futureService.create(dto);
    }

    @Put('/:id')
    updateMark(@Param('id') id: string, @Body() dto: UpdateFuture) {
        return this.futureService.update(id, dto);
    }

    @Delete('/:id')
    deleteMark(@Param('id') id: string) {
        return this.futureService.delete(id);
    }
}
