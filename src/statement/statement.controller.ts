import { Get, Controller, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';

import { StatementService } from './statement.service';
import { JwtPayload } from '@auth/interfaces';
import { CurrentUser, Public, Roles } from '@common/decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateStatementDto, UpdateStatementDto } from './dto';
import { RolesGuard } from '@auth/guards/role.guard';
import { Role } from '@prisma/client';

@ApiTags('Statement')
@ApiBearerAuth('JWT-auth')
@Controller('statement')
export class StatementController {
    constructor(private readonly statementService: StatementService) {}

    @UseGuards(RolesGuard)
    @Roles(Role.STUDENT)
    @Get('/me')
    getAllMyStatements(@CurrentUser() user: JwtPayload) {
        return this.statementService.getAllById(user.id);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.TEACHER)
    @Get('/teacher/:lessonId')
    getAllUsersByLesson(@CurrentUser() user: JwtPayload, @Param('lessonId') lessonId: string) {
        return this.statementService.getAllUsersByLesson(lessonId);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.RESOURCES_DEPARTMENT)
    @Get()
    getAllStatements() {
        return this.statementService.getAll();
    }

    @UseGuards(RolesGuard)
    @Roles(Role.RESOURCES_DEPARTMENT)
    @Post()
    createStatement(@Body() dto: CreateStatementDto) {
        return this.statementService.create(dto);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.RESOURCES_DEPARTMENT)
    @Put('/:id')
    updateStatement(@Param('id') id: string, @Body() dto: UpdateStatementDto) {
        return this.statementService.update(id, dto);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.RESOURCES_DEPARTMENT)
    @Delete('/:id')
    deleteStatement(@Param('id') id: string) {
        return this.statementService.delete(id);
    }
}
