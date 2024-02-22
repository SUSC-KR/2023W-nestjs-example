import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostService } from '../services/post.service';
import { AuthGuard } from 'src/auth/AuthGuard';
import { IUser } from 'src/auth/IUser';
import { Requester } from 'src/auth/Requester';
import { CreatePostRequestDto } from './dto/CreatePostRequestDto';
import { CreatePostResponseDto } from './dto/CreatePostResponseDto';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/posts')
  async listPost(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('offset', ParseIntPipe) offset: number,
  ) {
    return await this.postService.listPost(limit, offset);
  }

  @Post('/posts')
  @UseGuards(AuthGuard)
  async createPost(
    @Requester('asdf') user: IUser,
    @Body() requestDto: CreatePostRequestDto,
  ): Promise<CreatePostResponseDto> {
    const { userId } = user;
    const { title, content } = requestDto;

    const newPost = await this.postService.createPost(userId, title, content);

    return newPost;
  }
}
