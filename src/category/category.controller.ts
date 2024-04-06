import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';
import { Public } from '@common/decorators';

@Public()
@ApiTags('Category')
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    getAllCategories() {
        return this.categoryService.getAll();
    }

    @Post()
    createCategory(@Body() dto: CreateCategoryDto) {
        return this.categoryService.create(dto);
    }

    @Delete('/:id')
    deleteCategory(@Param('id') id: string) {
        return this.categoryService.delete(id);
    }

    @Put('/:id')
    updateCategory(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
        return this.categoryService.update(id, dto);
    }
}
