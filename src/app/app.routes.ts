import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProjectComponent } from './project/project.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';
import { AdminHomeComponent } from './admin-home/admin-home.component';

export const routes: Routes = [

    { path: 'AppHeader', component: AppHeaderComponent, canActivate: [AuthGuard]},
    { path: 'Home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'AdminHome', component: AdminHomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'Profile', component: ProfileComponent, canActivate: [AuthGuard]},
    { path: 'project' , component: ProjectComponent, canActivate: [AuthGuard]},
    { path: '', redirectTo: '/login', pathMatch: 'full' },  // Default route
  ];
