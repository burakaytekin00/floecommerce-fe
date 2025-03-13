import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-create-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  standalone: false
})
export class CreateUserComponent {
  username: string = '';
  password: string = '';
  email: string = '';
  name: string = '';
  surname: string = '';
  address: string = '';
  mobilePhone: string = '';

  emailValid: boolean = true;
  mobilePhoneValid: boolean = true;
  message: string = ''; // Mesaj değişkeni

  constructor(private http: HttpClient) {}

  validateEmail() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.emailValid = emailRegex.test(this.email);
  }

  validateMobilePhone() {
    const phoneRegex = /^05\d{2}\d{3}\d{4}$/;
    this.mobilePhoneValid = phoneRegex.test(this.mobilePhone);
  }

  onSubmit() {
    if (!this.emailValid || !this.mobilePhoneValid) {
      this.message = 'Lütfen geçerli bir e-posta ve telefon numarası girin!';
      return;
    }

    const userData = {
      username: this.username,
      password: this.password,
      email: this.email,
      name: this.name,
      surname: this.surname,
      address: this.address,
      mobilePhone: this.mobilePhone,
      userTypeId: 1
    };

    // Kayıt işlemi
    this.http.post(`${environment.apiUrl}/User`, userData)
      .subscribe(
        (response: any) => {
          this.message = 'Kayıt başarılı! Giriş yapabilirsiniz.';
          
          // Kayıt başarılı olduktan sonra tüm inputları temizle
          this.clearForm();  // Burada fonksiyonun doğru çalışması lazım
        },
        error => {
          this.message = 'Kayıt sırasında bir hata oluştu!';
        }
      );
  }

  clearForm() {
    this.username = '';
    this.password = '';
    this.email = '';
    this.name = '';
    this.surname = '';
    this.address = '';
    this.mobilePhone = '';
  }
}
