import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  isSidebarOpen: boolean = false;
  products: any[] = [];
  itemsPerPage = 8;
  currentPage = 1;
  
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.http.get(`${environment.apiUrl}/product/GetAll`).subscribe(
      (response: any) => {
        if (response.isSuccess) {
          this.products = response.data.map((product: any) => ({
            ...product,
            image: `assets/images/${product.photoUrl}`
          }));
        } else {
          console.error('Ürün verisi alınamadı', response.message);
        }
      },
      error => {
        console.error('Ürün verisi alma hatası', error);
      }
    );
  }

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
