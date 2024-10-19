import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProjectComponent } from './project/project.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: 'AppHeader', component: AppHeaderComponent},
    { path: 'Home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'project' , component: ProjectComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full' },  // Default route
  ];
