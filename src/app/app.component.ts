import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  isSidebarOpen = false;
  title = 'ecommerce-app';
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
