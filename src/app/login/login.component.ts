import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
export class LoginComponent {
  
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}


  onLogin() {
    const loginData = { username: this.username, password: this.password };

    this.http.post(`${environment.apiUrl}/login`, loginData)
      .subscribe(
        (response: any) => {
          if (response.isSuccess) {
        
            this.router.navigate(['/home']);
          } else {
            
            this.errorMessage = response.message || 'Bilinmeyen hata'; 
          }
        },
        error => {
          console.error('Login error', error);
          this.errorMessage = 'Bir hata oluştu, lütfen tekrar deneyin';  
        }
      );
  }
}
  
