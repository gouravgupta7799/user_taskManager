import { Column, Entity, OneToMany } from 'typeorm';
import { Basic } from './basic.entity';
import { Task } from './task.entity';

enum ProjectStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

@Entity()
export class Project extends Basic {
  @Column({
    type: 'varchar',
    length: 100,
  })
  name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'enum',
    enum: ProjectStatus,
    default: ProjectStatus.ACTIVE,
  })
  status: ProjectStatus;

  // Each Project can have many Tasks
  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[]; // Relating Project to multiple Tasks
}
