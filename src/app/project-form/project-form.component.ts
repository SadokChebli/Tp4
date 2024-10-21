// src/app/home/project-form/project-form.component.ts
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Project } from '../project.model';
import { ProjectService } from '../project.service';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-project-form',
  standalone: true, // Marking the component as standalone
  imports: [CommonModule, ReactiveFormsModule], // Import necessary modules
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css'],
})
export class ProjectFormComponent {
  projectForm: FormGroup;

  @Output() close = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private projectService: ProjectService,private taskService :TaskService) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      tasks: this.fb.array([]), // FormArray for tasks
    });
  }

  get tasks(): FormArray {
    return this.projectForm.get('tasks') as FormArray;
  }

  addTask() {
    console.log("heyyyyyyyyyyyyyyyyyyyyyyyyyy");
    const taskFormGroup = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.tasks.push(taskFormGroup);
  }

  removeTask(index: number) {
    this.tasks.removeAt(index);
  }

    onSubmit() {
      console.log("hamdouuuuuuuuuuuuuullllllllllllaaaaaaaaaaaaahhhhhhhhhhhhhhhhhhhhhhhh");
    
      if (this.projectForm.valid) {
        const newProject: Project = this.projectForm.value;
    
        console.log('New Project:', newProject);
        
        // First, add the project
        this.projectService.addProject(newProject).subscribe({
          next: (response) => {
            console.log('Project added:', response);
            
            // Fetch the complete project details after creation
            this.projectService.getProjectById(response.id).subscribe((fullProject: Project) => {
              // Now, add the tasks associated with this project
              newProject.tasks.forEach((task: Task) => {
                // Set the complete project object for each task
                task.project = fullProject; // Assign the complete project object
                console.log(newProject.tasks[0]);
    
                // Add the task to the database
                this.taskService.addTask(task).subscribe({
                  next: (taskResponse) => {
                    console.log('Task added:', taskResponse);
                  },
                  error: (taskError) => {
                    console.error('Error adding task:', taskError);
                  }
                });
              });
    
              // Close the form or reset it
              this.close.emit(); // Emit close event to the parent (if using event emitter)
            }, (error) => {
              console.error('Error fetching full project details:', error);
            });
          },
          error: (error) => {
            console.error('Error adding project:', error);
          },
        });
      }
    }
  }