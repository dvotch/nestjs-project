import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreditService } from './credit.service';
import { CurrentUser, Public, Roles } from '@common/decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCreditDto, UpdateCreditDto } from './dto';
import { JwtPayload } from '@auth/interfaces';
import { RolesGuard } from '@auth/guards/role.guard';
import { Role } from '@prisma/client';

@ApiTags('Credit')
@Controller('credit')
@ApiBearerAuth('JWT-auth')
export class CreditController {
    constructor(private readonly creditService: CreditService) {}

    @UseGuards(RolesGuard)
    @Roles(Role.RESOURCES_DEPARTMENT)
    @Get()
    getAllCredits() {
        return this.creditService.getAll();
    }

    @UseGuards(RolesGuard)
    @Roles(Role.TEACHER)
    @Get('/teacher')
    getTeacherCredits(@CurrentUser() user: JwtPayload) {
        return this.creditService.getCreditsForTeacher(user.id);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.STUDENT)
    @Get('/student')
    getStudentCredits(@CurrentUser() user: JwtPayload) {
        return this.creditService.getByUserId(user.id);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.TEACHER)
    @Post()
    createCredit(@Body() dto: CreateCreditDto) {
        return this.creditService.create(dto);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.TEACHER)
    @Put('/:id')
    updateCredit(@Param('id') id: string, @Body() dto: UpdateCreditDto) {
        return this.creditService.update(id, dto);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.TEACHER)
    @Delete('/:id')
    deleteCredit(@Param('id') id: string) {
        return this.creditService.delete(id);
    }
}
