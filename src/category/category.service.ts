import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PageDto } from '@/dto/page.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async create(category: CreateCategoryDto) {
    await this.prisma.category.create({
      data: {
        title: category.title,
      },
    });
    return {
      message: '添加成功',
      data: null,
    };
  }

  async findAll({ page = 1 }: PageDto) {
    const row = this.config.get('PAGE_ROW');
    const categorys = await this.prisma.category.findMany({
      skip: (page - 1) * row,
      take: +row,
    });
    return {
      meta: {
        current_page: page,
        total: await this.prisma.category.count(),
        total_pages: Math.ceil((await this.prisma.category.count()) / row),
      },
      data: categorys,
    };
  }

  async findOne(id: number) {
    return await this.prisma.category.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, categoryData: UpdateCategoryDto) {
    await this.prisma.category.update({
      where: {
        id,
      },
      data: categoryData,
    });

    return {
      message: '修改成功',
      data: null,
    };
  }

  async remove(id: number) {
    await this.prisma.category.delete({
      where: {
        id,
      },
    });
    return {
      message: '删除成功',
      data: null,
    };
  }
}
