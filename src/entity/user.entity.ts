import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Basic } from './basic.entity';
import { Task } from './task.entity';

export enum StatusEnums {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

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
    nullable: true,
    default: false,
  })
  isDeleted: boolean;

  // One User can have many Tasks
  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
