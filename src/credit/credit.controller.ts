import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreditService } from './credit.service';
import { CurrentUser, Public } from '@common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { CreateCreditDto, UpdateCreditDto } from './dto';
import { JwtPayload } from '@auth/interfaces';

@Public()
@ApiTags('Credit')
@Controller('credit')
export class CreditController {
    constructor(private readonly creditService: CreditService) {}

    @Get()
    getAllCredits() {
        return this.creditService.getAll();
    }

    @Get('/me')
    getAllMyCredits(@CurrentUser() user: JwtPayload) {
        return this.creditService.getAllMyCredits(user.id);
    }

    @Post()
    createCredit(@Body() dto: CreateCreditDto) {
        return this.creditService.create(dto);
    }

    @Put('/:id')
    updateCredit(@Param('id') id: string, @Body() dto: UpdateCreditDto) {
        return this.creditService.update(id, dto);
    }

    @Delete('/:id')
    deleteCredit(@Param('id') id: string) {
        return this.creditService.delete(id);
    }
}
