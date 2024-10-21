import { Project } from "./project.model";

export interface Task {
  id: number;
  name: string;
  description: string;
  completed: boolean;
  dueDate: string;
  project?: Project | null;
}
