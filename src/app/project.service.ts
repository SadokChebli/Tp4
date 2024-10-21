import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from './project.model';

const BASE_URL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  
  constructor(private http: HttpClient) {}

  // getProjects
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${BASE_URL}/projects`);
  }

  // addProject
  addProject(project: Project): Observable<Project> {
    console.log(project.description);
    console.log("CCCCCCCCCCCCCCCCCCC");
    return this.http.post<Project>(`${BASE_URL}/projects`, { ...project });
  }

  // updateProject
  updateProject(updatedProject: Project): Observable<Project> {
    return this.http.put<Project>(`${BASE_URL}/projects/${updatedProject.id}`, updatedProject);
  }

  // deleteProject
  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/projects/${id}`);
  }

  // getProjectById (newly added)
  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${BASE_URL}/projects/${id}`);
  }
}
