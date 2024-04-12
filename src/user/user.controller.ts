import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserResponse } from './responses';
import { CurrentUser, Roles } from '@common/decorators';
import { JwtPayload } from '@auth/interfaces';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesGuard } from '@auth/guards/role.guard';
import { Role } from '@prisma/client';

@ApiTags('User')
@Controller('user')
@ApiBearerAuth('JWT-auth')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(RolesGuard)
    @Roles(Role.RESOURCES_DEPARTMENT)
    @UseInterceptors(ClassSerializerInterceptor)
    @Post()
    async createUser(@Body() dto: CreateUserDto) {
        const user = await this.userService.save(dto);
        return new UserResponse(user);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.RESOURCES_DEPARTMENT)
    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':idOrEmail')
    async findOneUser(@Param('idOrEmail') idOrEmail: string) {
        const user = await this.userService.findOne(idOrEmail);
        return new UserResponse(user);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.RESOURCES_DEPARTMENT)
    @Delete(':id')
    async deleteUser(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: JwtPayload) {
        return this.userService.delete(id, user);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.RESOURCES_DEPARTMENT, Role.STUDENT, Role.TEACHER)
    @Post('/me')
    me(@CurrentUser() user: JwtPayload) {
        console.log(user);
        return user;
    }

    @UseGuards(RolesGuard)
    @Roles(Role.RESOURCES_DEPARTMENT)
    @Get()
    getAll() {
        return this.userService.getAll();
    }

    @UseGuards(RolesGuard)
    @Roles(Role.RESOURCES_DEPARTMENT, Role.TEACHER)
    @Get('/:group')
    getStudentsInGroup(@Param('group') group: number) {
        return this.userService.getAllByGroup(group);
    }
}
