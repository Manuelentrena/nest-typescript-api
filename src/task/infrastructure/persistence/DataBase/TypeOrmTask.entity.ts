import { TypeOrmUserEntity } from 'src/user/infrastructure/persistence/DataBase/TypeOrmUser.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity('tasks')
export class TypeOrmTaskEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  date: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => TypeOrmUserEntity, (user) => user.tasks, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: TypeOrmUserEntity;

  @Column()
  userId: string;
}
