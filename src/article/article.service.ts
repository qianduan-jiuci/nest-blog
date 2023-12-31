import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { PageDto } from '@/dto/page.dto';
import _ from 'lodash';

@Injectable()
export class ArticleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async create(article: CreateArticleDto) {
    await this.prisma.artilce.create({
      data: {
        account: article.account,
        title: article.title,
        categoryId: _._.random(1, 5),
      },
    });
    return {
      message: '添加成功',
      data: null,
    };
  }

  async findAll({ page = 1 }: PageDto) {
    const row = this.config.get('PAGE_ROW');
    const articles = await this.prisma.artilce.findMany({
      skip: (page - 1) * row,
      take: +row,
    });
    return {
      meta: {
        current_page: page,
        total: await this.prisma.artilce.count(),
        total_pages: Math.ceil((await this.prisma.artilce.count()) / row),
      },
      data: articles,
    };
  }

  async findOne(id: number) {
    return await this.prisma.artilce.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, articleData: UpdateArticleDto) {
    await this.prisma.artilce.update({
      where: {
        id,
      },
      data: articleData,
    });

    return {
      message: '修改成功',
      data: null,
    };
  }

  async remove(id: number) {
    await this.prisma.artilce.delete({
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
