import { Post } from '@prisma/client';
import { IsBoolean, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto implements Partial<Post> {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsBoolean()
  published: boolean;

  @IsMongoId()
  authorId: string;
}
