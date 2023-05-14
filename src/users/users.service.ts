import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly dbService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.dbService.user.create({
        data: createUserDto,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    return await this.dbService.user.findMany();
  }

  async findOne(id: string) {
    return await this.dbService.user.findUnique({
      where: { id },
      include: { posts: true },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      return await this.dbService.user.update({
        where: { id },
        data: updateUserDto,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    const posts = await this.dbService.post.findMany({
      where: { authorId: id },
    });

    if (posts.length) throw new BadRequestException('User has posts');

    return await this.dbService.user.delete({
      where: { id },
    });
  }
}
