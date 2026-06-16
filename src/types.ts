export type Priority = 'CHILL' | 'STANDARD' | 'DEFCON 1';
export type Status = 'BACKLOG' | 'IN_PROGRESS' | 'DONE';

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
  tags: string[];
  subtasks: SubTask[];
  createdAt: number;
  completedAt?: number;
}
