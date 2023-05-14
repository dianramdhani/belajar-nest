import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

interface FindAllQuery {
  authorId?: string;
}

@Injectable()
export class PostsService {
  constructor(private readonly dbService: PrismaService) {}

  async create(createPostDto: CreatePostDto) {
    return await this.dbService.post.create({
      data: createPostDto,
    });
  }

  async findAll(query?: FindAllQuery) {
    if (query) {
      console.log(query);
      const { authorId } = query;

      return await this.dbService.post.findMany({
        where: { authorId },
        include: { author: true },
      });
    }

    return await this.dbService.post.findMany();
  }

  async findOne(id: string) {
    return await this.dbService.post.findUnique({
      where: { id },
    });
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    return await this.dbService.post.update({
      where: { id },
      data: updatePostDto,
    });
  }

  async remove(id: string) {
    return await this.dbService.post.delete({
      where: { id },
    });
  }
}
