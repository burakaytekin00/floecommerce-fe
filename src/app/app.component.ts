import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  isSidebarOpen = false;
  title = 'ecommerce-app';

  constructor(private router: Router, private authService: AuthService) {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  shouldShowHeader(): boolean {
    // Login ve create-user sayfalarında header'ı gizlemek için
    const hiddenRoutes = ['/login', '/create-user'];
    return !hiddenRoutes.includes(this.router.url);
  }

  logout() {
    // Kullanıcıyı oturumdan çıkarmak için gerekli işlemleri buraya ekleyin
    this.authService.logout();
    console.log('Kullanıcı oturumdan çıkış yaptı.');
  }
}
