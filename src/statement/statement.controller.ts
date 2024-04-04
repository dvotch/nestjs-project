import { Get, Controller } from '@nestjs/common';

import { StatementService } from './statement.service';
import { JwtPayload } from '@auth/interfaces';
import { CurrentUser } from '@common/decorators';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Statement')
@Controller('statement')
export class StatementController {
    constructor(private readonly statementService: StatementService) {}

    @Get()
    getStatement(@CurrentUser() user: JwtPayload) {
        return this.statementService.findLesson(user);
    }
}
