import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { PostService } from '../services/post.service';

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
}
