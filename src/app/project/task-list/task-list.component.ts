import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../task.model';
import { TaskService } from '../../task.service';
import { TaskFormComponent } from '../task-form/task-form.component';

const emptyTask = {
  name: '',
  description: '',
  dueDate: '',
  completed: false,
  project: null,
  id: 0,
};

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [DatePipe, TaskFormComponent, AsyncPipe,CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  tasks: Task[] = [];
  showModal: boolean = false;
  formType: 'CREATE' | 'UPDATE' = 'CREATE';
  selectedTask: Task = emptyTask;
  tasks$!: Observable<Task[]>;

  private taskService = inject(TaskService);

  constructor() {
    this.updateTasks();
  }

  updateTasks() {
    this.tasks$ = this.taskService.getTasks();
  }

  handleCheckbox(id: number) {
    // Récupérer la tâche par son ID à partir du service
    this.taskService.getTaskById(id).subscribe((task) => {
      // Inverser la valeur de completed
      task.completed = !task.completed;
      
      // Mettre à jour la tâche via le service
      this.taskService.updateTask(task).subscribe(
        (updatedTask) => {
          console.log('Task updated successfully:', updatedTask);
          this.updateTasks();
        },
        (error) => {
          console.error('Error updating task:', error);
        }
      );
    }, 
    (error) => {
      console.error('Error fetching task by id:', error);
    });
    
  }  
  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.updateTasks();
    });
  }

  updateTask(task: Task) {
    this.selectedTask = task;
    this.formType = 'UPDATE';
    this.showModal = true;
  }

  addNewTask() {
    this.selectedTask = emptyTask;
    this.formType = 'CREATE';
    this.showModal = true;
  }

  handleModalClose(type: 'SUBMIT' | 'CANCEL') {
    if (type === 'SUBMIT') {
      this.updateTasks();
    }
    this.showModal = false;
  }
}
