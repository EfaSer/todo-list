export interface ITodo {
  id: number;
  title: string;
  completed: boolean;
  description: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  deadline?: string;
  priority?: string;
  category?: string;
}
