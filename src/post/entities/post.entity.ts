import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Post')
export class PostEntity {
  @PrimaryColumn('varchar', { length: 100 })
  id: string;

  @Column('varchar', { length: 100 })
  userId: string;

  @Column('varchar', { length: 250 })
  title: string;

  @Column('varchar', { length: 1000 })
  content: string;

  @Column('datetime')
  createdAt: Date;
}
