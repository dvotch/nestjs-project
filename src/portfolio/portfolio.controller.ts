import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './dto/createPortfolio.dto';
import { CurrentUser, Public, Roles } from '@common/decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdatePortfolioDto } from './dto/updatePortfolio.dto';
import { JwtPayload } from '@auth/interfaces';
import { RolesGuard } from '@auth/guards/role.guard';
import { Role } from '@prisma/client';

@ApiTags('Portfolio')
@Controller('portfolio')
@ApiBearerAuth('JWT-auth')
export class PortfolioController {
    constructor(private readonly portfolioService: PortfolioService) {}

    @UseGuards(RolesGuard)
    @Roles(Role.RESOURCES_DEPARTMENT)
    @Get('/:id')
    getAllPortfolioById(@Param() id: string) {
        return this.portfolioService.getAllById(id);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.STUDENT)
    @Get('/my')
    getAllMyPortfolio(@CurrentUser() user: JwtPayload) {
        return this.portfolioService.getAllById(user.id);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.STUDENT)
    @Post()
    createPortfolio(@Body() dto: CreatePortfolioDto) {
        return this.portfolioService.create(dto);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.STUDENT)
    @Put('/:id')
    updatePortfolio(@Param('id') id: string, @Body() dto: UpdatePortfolioDto, @CurrentUser() user: JwtPayload) {
        return this.portfolioService.update(id, dto, user.id);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.STUDENT)
    @Delete(':/id')
    deletePortfolio(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
        return this.portfolioService.delete(id, user.id);
    }
}
