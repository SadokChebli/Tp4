import { Component } from '@angular/core';
import { ProgressBarComponent } from "../project/progress-bar/progress-bar.component";
import { TaskListComponent } from "../project/task-list/task-list.component";
import { ProjectTitleComponent } from "../project/project-title/project-title.component";
import { AppHeaderComponent } from "../app-header/app-header.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProgressBarComponent, TaskListComponent, ProjectTitleComponent, AppHeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
