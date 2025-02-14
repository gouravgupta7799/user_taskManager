import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Basic } from './basic.entity';
import { User } from './user.entity';
import { Project } from './project.entity';
import { TaskStatus, TaskPriority } from '../helpers/enums/task.enums';

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
  @JoinColumn({ name: 'userId' })
  user: User;


  // Each Task is associated with one Project
  @ManyToOne(() => Project, (project) => project.tasks)
  project: Project; // Relating Task to Project
}
