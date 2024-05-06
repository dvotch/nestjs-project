import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    UploadedFile,
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
import { Role, User } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('User')
@Controller('user')
@ApiBearerAuth('JWT-auth')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(RolesGuard)
    @Roles(Role.RESOURCES_DEPARTMENT, Role.STUDENT, Role.TEACHER)
    @Get('/logo')
    myLogo(@CurrentUser() user: JwtPayload) {
        return this.userService.getMyLogo(user.id);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.RESOURCES_DEPARTMENT, Role.STUDENT, Role.TEACHER)
    @UseInterceptors(FileInterceptor('file'))
    @Post('/logo')
    uploadLogo(@CurrentUser() user: JwtPayload, @UploadedFile() file: Express.Multer.File) {
        this.userService.uploadMyLogo(user.id, file);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.RESOURCES_DEPARTMENT, Role.TEACHER)
    @Get('/:group')
    getStudentsInGroup(@Param('group') group: number) {
        return this.userService.getAllByGroup(group);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(RolesGuard)
    @Roles(Role.RESOURCES_DEPARTMENT)
    @Post()
    async createUser(@Body() dto: CreateUserDto) {
        const user = await this.userService.save(dto);
        return new UserResponse(user);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(RolesGuard)
    @Roles(Role.RESOURCES_DEPARTMENT)
    @Put('/:id')
    updateUser(@Param('id') id: string, @Body() dto: Partial<User>) {
        return this.userService.update(id, dto);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(RolesGuard)
    @Roles(Role.RESOURCES_DEPARTMENT)
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
    @Get('/me')
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
}
