import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,  // Standalone component
  imports: [FormsModule, RouterModule],  // Import FormsModule here
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  

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
      response => {
        console.log('Login successful:', response);
        Swal.fire({
          title: 'Success!',
          text: 'Login was successful!',
          icon: 'success',
          confirmButtonText: 'Okay'
        }).then(() => {
          this.router.navigate(['/Home']);
        });
      },
      error => {
        console.error('Login failed:', error);
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
