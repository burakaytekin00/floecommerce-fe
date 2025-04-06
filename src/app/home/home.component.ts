import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';  // PrimeNG Dropdown importu
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';  // ChangeDetectionRef importu

// Interface tanımı (dosyanın üst kısmına ekleyin)
interface SearchModel {
  CategoryId: number | null;
  SearchText: string | null;
}

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, DialogModule, DropdownModule, FormsModule],  // PrimeNG DropdownModule eklendi
})
export class HomeComponent {
  isSidebarOpen = false;
  products: any[] = [];
  itemsPerPage = 8;
  currentPage = 1;

  displayDialog: boolean = false;
  selectedProduct: any = null;
  categories: any[] = [];  
  selectedCategory: any = null;  
  searchText: string = ''; // Arama metni için yeni değişken

  constructor(private router: Router, private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getCategories();  
    this.getProducts(); 
  }

  showProductDetails(product: any): void {
    this.selectedProduct = product;
    this.displayDialog = true;
  }

  
  getProducts(categoryId?: any): void {
    let apiUrl = `${environment.apiUrl}/product/GetAll`;

    
    if (categoryId) {
      apiUrl = `${environment.apiUrl}/product/GetAllByFilter?categoryId=${categoryId}`;
    }

    this.http.get<any>(apiUrl).subscribe(
      response => {
        if (response.isSuccess) {
          this.products = response.data.map((product: any) => ({
            ...product,
            image: `../assets/images/${product.photoUrl}`,
          }));
          this.cdr.detectChanges();  
        } else {
          console.error('Ürün verisi alınamadı:', response.message);
        }
      },
      error => console.error('Ürün verisi alma hatası:', error)
    );
  }

  
  getCategories(): void {
    this.http.get<any>(`${environment.apiUrl}/category/GetAll`).subscribe(
      response => {
        if (response.isSuccess) {
          this.categories = response.data;
        } else {
          console.error('Kategori verisi alınamadı:', response.message);
        }
      },
      error => console.error('Kategori verisi alma hatası:', error)
    );
  }

  onCategoryChange(categoryId: any) {
    console.log('Seçilen Kategori ID:', categoryId);
  
    if (categoryId) {
      this.getProducts(categoryId)
      
    }
  }  

  // Arama butonuna tıklandığında çağrılacak yeni metod
  searchProducts(): void {
    const searchModel: SearchModel = {
      CategoryId: this.selectedCategory,
      SearchText: this.searchText
    };

    this.http.post<any>(`${environment.apiUrl}/product/GetAllByFilter`, searchModel).subscribe(
      response => {
        if (response.isSuccess) {
          this.products = response.data.map((product: any) => ({
            ...product,
            image: `../assets/images/${product.photoUrl}`,
          }));
          this.cdr.detectChanges();
        } else {
          console.error('Ürün verisi alınamadı:', response.message);
        }
      },
      error => console.error('Ürün verisi alma hatası:', error)
    );
  }

  
  get pages(): number[] {
    return Array.from({ length: Math.ceil(this.products.length / this.itemsPerPage) }, (_, i) => i + 1);
  }

  // Sayfalama için ürünleri getiren getter
  get paginatedProducts(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.products.slice(startIndex, startIndex + this.itemsPerPage);
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
