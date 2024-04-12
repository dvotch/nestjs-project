import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './dto/createPortfolio.dto';
import { CurrentUser, Public } from '@common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { UpdatePortfolioDto } from './dto/updatePortfolio.dto';
import { JwtPayload } from '@auth/interfaces';

@Public()
@ApiTags('Portfolio')
@Controller('portfolio')
export class PortfolioController {
    constructor(private readonly portfolioService: PortfolioService) {}

    @Get()
    getAllPortfolio() {
        return this.portfolioService.getAll();
    }

    // @Get('/my')
    // getAllMyPortfolio(@CurrentUser() user: JwtPayload) {
    //     return this.portfolioService.getAllById(user.id);
    // }

    @Post()
    createPortfolio(@Body() dto: CreatePortfolioDto) {
        return this.portfolioService.create(dto);
    }

    @Put('/:id')
    updatePortfolio(@Param('id') id: string, @Body() dto: UpdatePortfolioDto) {
        return this.portfolioService.update(id, dto);
    }

    @Delete(':/id')
    deletePortfolio(@Param('id') id: string) {
        return this.portfolioService.delete(id);
    }
}
