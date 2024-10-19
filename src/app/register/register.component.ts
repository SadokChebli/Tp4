import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,  // Standalone component
  imports: [FormsModule],  // Import FormsModule here
})
export class RegisterComponent {
  user = {
    fullName: '',
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    // Ensure all user data is captured properly
    console.log('Submitting form:', this.user);

    if (!this.user.username || !this.user.password || !this.user.email || !this.user.phoneNumber || !this.user.fullName || !this.user.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'All fields are required!',
      });
      return;
    }

    if (this.user.password !== this.user.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: 'Passwords do not match. Please try again.',
      });
      return;
    }

    const phonePattern = /^[0-9]+$/; // Only digits
    if (!phonePattern.test(this.user.phoneNumber)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Phone Number',
        text: 'Phone number must contain only digits.',
      });
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Basic email pattern
    if (!emailPattern.test(this.user.email)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
      });
      return;
    }
  
    // Send a POST request to register the user
    this.authService.register(this.user)
      .subscribe(
        (response) => {
          console.log('Registration successful', response);
          Swal.fire({
            title: 'Success!',
            text: 'Registration was successful! Please log in.',
            icon: 'success',
            confirmButtonText: 'Okay'
          }).then(() => {
            this.router.navigate(['/login']); // Redirect to login after alert is closed
          });
        },
        (error) => {
          console.error('Registration failed', error);
          Swal.fire({
            title: 'Error!',
            text: 'Registration failed. Please try again.',
            icon: 'error',
            confirmButtonText: 'Okay'
          });
        }
      );
  }
  
}
