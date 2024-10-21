import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../user.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,  // Standalone component
  imports: [FormsModule, RouterModule],  // Import FormsModule here
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  userProfile: User | null = null;
  

  constructor(private authService: AuthService, private router: Router) {}

  login() {

    if (!this.credentials.username || !this.credentials.password) {
      Swal.fire({
        title: 'Error!',
        text: 'All fields are required!',
        icon: 'error',
        confirmButtonText: 'Okay'
      });
      return;
    }
  
    this.authService.login(this.credentials).subscribe(
      (userProfile) => {
        console.log('Login successful:', userProfile);
  
        // Store user profile in local storage (or state management)
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
  
        // Display success message
        Swal.fire({
          title: 'Success!',
          text: 'Login was successful!',
          icon: 'success',
          confirmButtonText: 'Okay'
        }).then(() => {
          // Navigate to home or profile page after success
          if (this.credentials.username === 'admin') {
            this.router.navigate(['/AdminHome']);
          } else {
            this.router.navigate(['/Home']);
          }
        });
      },
      (error) => {
        console.error('Login failed:', error);
        
        // Display error message
        Swal.fire({
          title: 'Error!',
          text: 'Login failed. Please try again.',
          icon: 'error',
          confirmButtonText: 'Okay'
        });
      }
    );
  }
  
}
