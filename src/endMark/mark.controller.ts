import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { endMarkService } from './mark.service';
import { CreateEndMarkDto, UpdateEndMarkDto } from './dto';
import { Public, Roles } from '@common/decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '@auth/guards/role.guard';
import { Role } from '@prisma/client';

@ApiTags('EndMark')
@Controller('endMark')
@ApiBearerAuth('JWT-auth')
export class endMarkController {
    constructor(private readonly markService: endMarkService) {}

    @UseGuards(RolesGuard)
    @Roles(Role.RESOURCES_DEPARTMENT)
    @Get()
    getAllMarks() {
        return this.markService.getAll();
    }

    @UseGuards(RolesGuard)
    @Roles(Role.TEACHER)
    @Post()
    createEndMark(@Body() dto: CreateEndMarkDto) {
        return this.markService.create(dto);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.TEACHER)
    @Get('/mark/:statement')
    async getAllById(@Param('statement') statementId: string) {
        return this.markService.getAllById(statementId);
    }

    // @UseGuards(RolesGuard)
    // @Roles(Role.TEACHER)
    // @Put('/:id')
    // updateMark(@Param('id') id: string, @Body() dto: UpdateEndMarkDto) {
    //     return this.markService.update(id, dto);
    // }

    // @UseGuards(RolesGuard)
    // @Roles(Role.TEACHER)
    // @Delete('/:id')
    // deleteMark(@Param('id') id: string) {
    //     return this.markService.delete(id);
    // }

    // @UseGuards(RolesGuard)
    // @Roles(Role.TEACHER)
    // @Get('/:lesson/:user')
    // async getStudentMarks(@Param('user') userId: string, @Param('lesson') lessonId: string) {
    //     return this.markService.getStudentMarks(userId, lessonId);
    // }

    // @UseGuards(RolesGuard)
    // @Roles(Role.TEACHER)
    // @Get('averageMarks/:lesson/:user')
    // async getAverageMark(@Param('user') userId: string, @Param('lesson') lessonId: string) {
    //     return this.markService.getAverageMark(userId, lessonId);
    // }
}
