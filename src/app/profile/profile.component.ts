import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Location, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [NgIf],
})


export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private location: Location, private http: HttpClient) {}
  userProfile: any;
  imageUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  ngOnInit(): void {
    // Retrieve the user profile from localStorage (or service if using state management)
    const storedUser = localStorage.getItem('userProfile');
    
    if (storedUser) {
      this.userProfile = JSON.parse(storedUser);
    }
    if (this.userProfile.image) {
      this.imageUrl = `data:image/jpeg;base64,${this.userProfile.image}`;
    } else {
      this.imageUrl = 'assets/nophoto.jpg'; // Default image if no user image is found
    }
  }
  logout(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform the logout if user confirms
        this.authService.logout();
        
        // Display success message
        Swal.fire({
          title: 'Logged Out',
          text: 'You have been successfully logged out!',
          icon: 'success',
          confirmButtonText: 'Okay'
        }).then(() => {
          // Navigate to login page after successful logout
          this.router.navigate(['/login']);
        });
      }
    });
  }
  goBack(): void {
    this.location.back();
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    
    if (file) {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          this.imageUrl = e.target.result; // Update image preview only if the result is not undefined
        }
      };
      reader.readAsDataURL(file); // Read the file and show a preview
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
        this.selectedFile = input.files[0];
        console.log('Selected file:', this.selectedFile); // Ajoute ce log
    } else {
        console.error('No files selected or input is null');
    }
}

uploadImage() {
  console.log('Starting image upload...'); // Indiquer que la méthode commence

  if (this.selectedFile) {
      console.log('File selected:', this.selectedFile.name); // Affiche le nom du fichier sélectionné

      const formData = new FormData();
      formData.append('image', this.selectedFile, this.selectedFile.name);
      
      // Supposons que tu aies le nom d'utilisateur stocké dans userProfile
      const username = this.userProfile.username; // Récupère le nom d'utilisateur
      console.log('Username for upload:', username); // Affiche le nom d'utilisateur

      this.http.post(`http://localhost:8080/api/upload/${username}`, formData).subscribe(
          response => {
              console.log('Upload successful!', response); // Affiche la réponse du serveur
              Swal.fire({
                title: 'Upload Successful',
                text: 'Your image has been uploaded successfully!',
                icon: 'success',
                confirmButtonText: 'Okay'
            });
            }, 
          error => {
              console.error('Upload failed', error); // Affiche l'erreur
              Swal.fire({
                title: 'Upload Failed',
                text: 'There was an error uploading your image. Please try again.',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
              if (error.error) {
                  console.error('Error details:', error.error); // Affiche les détails de l'erreur, si disponibles
              }
          }
      );
  } else {
      console.error('No file selected'); // Indique qu'aucun fichier n'est sélectionné
  }
}

  
  
}
