import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('User')
export class UserEntity {
  @PrimaryColumn('varchar', { length: 100 })
  id: string;

  @Column('varchar', { length: 100 })
  userId: string;

  @Column('varchar', { length: 500 })
  password: string;

  @Column('varchar', { length: 500 })
  salt: string;

  @Column('datetime')
  createdAt: Date;
}
