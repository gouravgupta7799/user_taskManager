import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Basic } from './basic.entity';
import { Task } from './task.entity';
import { StatusEnums } from '../helpers/enums/user.enums';

@Entity()
export class User extends Basic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'enum',
    enum: StatusEnums,
    default: StatusEnums.INACTIVE,
    nullable: false,
  })
  status: StatusEnums;

  @Column()
  password: string;

  @Column({
    unique: true,
    nullable: false,
  })
  alias: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  isDeleted: boolean;
  
  @Column({
    type: 'boolean',
    default: false,
  })
  isAdmin: boolean;

  // One User can have many Tasks
  @OneToMany(() => Task, (task) => task.project, { cascade: true, onDelete: 'CASCADE' })
  tasks: Task[];
}
