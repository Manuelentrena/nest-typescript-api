import { TypeOrmTaskEntity } from 'src/shared/database/TypeOrmTask.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('users')
export class TypeOrmUserEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => TypeOrmTaskEntity, (task) => task.user)
  tasks: TypeOrmTaskEntity[];
}
