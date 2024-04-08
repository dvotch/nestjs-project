import { Get, Controller, Post, Body, Put, Param, Delete } from '@nestjs/common';

import { StatementService } from './statement.service';
import { JwtPayload } from '@auth/interfaces';
import { CurrentUser, Public } from '@common/decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateStatementDto, UpdateStatementDto } from './dto';

@ApiTags('Statement')
@ApiBearerAuth('JWT-auth')
@Controller('statement')
export class StatementController {
    constructor(private readonly statementService: StatementService) {}

    @Get('/me')
    getAllMyStatements(@CurrentUser() user: JwtPayload) {
        return this.statementService.getAllById(user);
    }

    @Get()
    getAllStatements() {
        return this.statementService.getAll();
    }

    @Post()
    createStatement(@Body() dto: CreateStatementDto) {
        return this.statementService.create(dto);
    }

    @Put('/:id')
    updateStatement(@Param('id') id: string, @Body() dto: UpdateStatementDto) {
        return this.statementService.update(id, dto);
    }

    @Delete('/:id')
    deleteStatement(@Param('id') id: string) {
        return this.statementService.delete(id);
    }
}
