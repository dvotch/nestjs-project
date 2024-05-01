import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './dto/createPortfolio.dto';
import { CurrentUser, Public, Roles } from '@common/decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdatePortfolioDto } from './dto/updatePortfolio.dto';
import { JwtPayload } from '@auth/interfaces';
import { RolesGuard } from '@auth/guards/role.guard';
import { Role } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Portfolio')
@Controller('portfolio')
@ApiBearerAuth('JWT-auth')
export class PortfolioController {
    constructor(private readonly portfolioService: PortfolioService) {}

    @UseGuards(RolesGuard)
    @Roles(Role.RESOURCES_DEPARTMENT)
    @Get()
    getAllPortfolioById(@Param('id') id: string, @Query('page') page: string) {
        return this.portfolioService.getAllById(id, page);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.STUDENT)
    @Get('/my')
    getAllMyPortfolio(@CurrentUser() user: JwtPayload, @Query('page') page: string) {
        return this.portfolioService.getAllById(user.id, page);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.STUDENT, Role.TEACHER)
    @UseInterceptors(FileInterceptor('photo'))
    @Post()
    createPortfolio(@Body() dto: CreatePortfolioDto, @UploadedFile() photo: Express.Multer.File) {
        return this.portfolioService.create(dto, photo);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.STUDENT)
    @Put('/:id')
    updatePortfolio(@Param('id') id: string, @Body() dto: UpdatePortfolioDto, @CurrentUser() user: JwtPayload) {
        return this.portfolioService.update(id, dto, user.id);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.STUDENT)
    @Delete('/:id')
    deletePortfolio(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
        return this.portfolioService.delete(id, user.id);
    }
}
