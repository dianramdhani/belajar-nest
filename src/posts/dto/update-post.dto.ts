import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsBoolean, IsMongoId, IsString } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsString()
  title?: string;

  @IsString()
  content?: string;

  @IsBoolean()
  published?: boolean;

  @IsMongoId()
  authorId?: string;
}
