import { Column, Entity, ManyToOne } from 'typeorm';
import { Basic } from './basic.entity';
import { User } from './user.entity';
import { Project } from './project.entity';

enum TaskStatus {
  Pending = 'Pending',
  InProgress = 'InProgress',
  OnHold = 'OnHold',
  Delayed = 'Delayed',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
  Failed = 'Failed',
}

enum TaskPriority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

@Entity()
export class Task extends Basic {
  @Column({
    type: 'varchar',
    length: 100,
  })
  title: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.Pending,
  })
  status: TaskStatus;

  @Column({
    type: 'enum',
    enum: TaskPriority,
    default: TaskPriority.Medium,
  })
  priority: TaskPriority;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  dueDate: Date;

  @Column({
    type: 'varchar',
  })
  taskMessage: string;

  // Each Task is associated with one User
  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

 
  // Each Task is associated with one Project
  @ManyToOne(() => Project, (project) => project.tasks)
  project: Project; // Relating Task to Project
}
