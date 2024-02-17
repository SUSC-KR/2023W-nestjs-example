import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '../entities/post.entity';
import { Repository } from 'typeorm';
import { PostListView } from './views/post.view';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async listPost(limit: number, offset: number): Promise<PostListView> {
    const [posts, count] = await this.postRepository.findAndCount({
      take: limit,
      skip: offset,
    });
    return { count, posts };
  }
}
