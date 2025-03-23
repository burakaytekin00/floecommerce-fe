import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  isSidebarOpen = false;
  title = 'ecommerce-app';

  constructor(private router: Router) {}

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
    console.log('Kullanıcı oturumdan çıkış yaptı.');
  }
}
