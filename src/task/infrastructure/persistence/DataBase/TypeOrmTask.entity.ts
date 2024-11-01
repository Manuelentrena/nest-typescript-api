import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

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
}
