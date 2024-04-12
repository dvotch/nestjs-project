import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';
import { RolesGuard } from '@auth/guards/role.guard';
import { Roles } from '@common/decorators';
import { Role } from '@prisma/client';

@ApiTags('Category')
@Controller('category')
@ApiBearerAuth('JWT-auth')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @UseGuards(RolesGuard)
    @Roles(Role.RESOURCES_DEPARTMENT, Role.STUDENT)
    @Get()
    getAllCategories() {
        return this.categoryService.getAll();
    }

    @UseGuards(RolesGuard)
    @Roles(Role.RESOURCES_DEPARTMENT)
    @Post()
    createCategory(@Body() dto: CreateCategoryDto) {
        return this.categoryService.create(dto);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.RESOURCES_DEPARTMENT)
    @Delete('/:id')
    deleteCategory(@Param('id') id: string) {
        return this.categoryService.delete(id);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.RESOURCES_DEPARTMENT)
    @Put('/:id')
    updateCategory(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
        return this.categoryService.update(id, dto);
    }
}
