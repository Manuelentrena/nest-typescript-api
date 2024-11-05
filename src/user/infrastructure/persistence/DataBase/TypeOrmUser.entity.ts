import { Column, Entity, PrimaryColumn } from 'typeorm';

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
}
