import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '../entities/post.entity';
import { Repository } from 'typeorm';
import { PostListView } from './views/post.view';
import { ulid } from 'ulid';

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

  async createPost(
    userId: string,
    title: string,
    content: string,
  ): Promise<PostEntity> {
    const newPost = new PostEntity();
    newPost.id = ulid();
    newPost.userId = userId;
    newPost.title = title;
    newPost.content = content;
    newPost.createdAt = new Date();
    await this.postRepository.save(newPost);

    return newPost;
  }
}
