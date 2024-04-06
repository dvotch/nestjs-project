import { Get, Controller } from '@nestjs/common';

import { StatementService } from './statement.service';
import { JwtPayload } from '@auth/interfaces';
import { CurrentUser, Public } from '@common/decorators';
import { ApiTags } from '@nestjs/swagger';

@Public()
@ApiTags('Statement')
@Controller('statement')
export class StatementController {
    constructor(private readonly statementService: StatementService) {}

    @Get('/me')
    getAllMy(@CurrentUser() user: JwtPayload) {
        return this.statementService.getMyStatement(user);
    }

    @Get()
    getAll() {
        return this.statementService.getAll();
    }
}
