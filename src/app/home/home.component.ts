import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  isSidebarOpen: boolean = false;
  products = [
    { id: 1, name: 'Ürün 1', price: 199.99, image: 'assets/images/reebok.jpg' },
    { id: 2, name: 'Ürün 2', price: 299.99, image: 'https://via.placeholder.com/200' },
    { id: 3, name: 'Ürün 3', price: 399.99, image: 'https://via.placeholder.com/200' },
    { id: 4, name: 'Ürün 4', price: 499.99, image: 'https://via.placeholder.com/200' },
    { id: 5, name: 'Ürün 5', price: 599.99, image: 'https://via.placeholder.com/200' },
    { id: 6, name: 'Ürün 6', price: 699.99, image: 'https://via.placeholder.com/200' },
    { id: 7, name: 'Ürün 7', price: 799.99, image: 'https://via.placeholder.com/200' },
    { id: 8, name: 'Ürün 8', price: 899.99, image: 'https://via.placeholder.com/200' },
    { id: 9, name: 'Ürün 9', price: 999.99, image: 'https://via.placeholder.com/200' },
    { id: 10, name: 'Ürün 10', price: 1099.99, image: 'https://via.placeholder.com/200' },
    { id: 11, name: 'Ürün 11', price: 1199.99, image: 'https://via.placeholder.com/200' },
    { id: 12, name: 'Ürün 12', price: 1299.99, image: 'https://via.placeholder.com/200' },
  ];

  itemsPerPage = 8;
  currentPage = 1;
  
  constructor(private router: Router) {}

  get pages() {
    const totalPages = Math.ceil(this.products.length / this.itemsPerPage);
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  get paginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.products.slice(startIndex, endIndex);
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;  // Sidebar açma/kapama fonksiyonu
  }
}
