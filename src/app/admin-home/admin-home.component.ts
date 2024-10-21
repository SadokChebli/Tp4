import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AppHeaderComponent } from '../app-header/app-header.component';
import { Project } from '../project.model';
import { ProjectService } from '../project.service';
import { ProjectComponent } from '../project/project.component';
import { ProjectFormComponent } from '../project-form/project-form.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AsyncPipe, ProjectFormComponent, AppHeaderComponent, ProjectComponent],
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent {
  projects$!: Observable<Project[]>;  // Observable for the projects list
  isLoading = true;                   // Loading state indicator
  showProjectForm = false;            // Variable to control the visibility of the project form

  private projectService = inject(ProjectService);

  constructor() {
    this.loadProjects();
  }

  loadProjects() {
    this.projects$ = this.projectService.getProjects();
    this.projects$.subscribe({
      next: () => {
        this.isLoading = false;  // Hide loading indicator after projects are loaded
      },
      error: () => {
        this.isLoading = false;  // Also hide loading indicator in case of error
      }
    });
  }

  addNewProject() {
    this.showProjectForm = true;  // Show the project form when the button is clicked
  }

  handleProjectFormClose() {
    this.showProjectForm = false;  // Hide the project form when closed
    this.loadProjects();            // Refresh the projects list
  }

  viewProjectDetails(project: Project) {
   // this.selectedProject = project; // Set the selected project to display
   // this.showProjectDetails = true; //
  }
  trackByProjectId(index: number, project: Project): number {
    return project.id; // Use project ID as the unique identifier
  }
}
