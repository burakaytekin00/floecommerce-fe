import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  standalone: false
})
export class CategoryComponent implements OnInit {

  categories: any[] = [];
  categoryName: string = '';
  errorMessage: string = '';
  displayDialog: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.http.get(`${environment.apiUrl}/categories`)
      .subscribe(
        (response: any) => {
          if (response.isSuccess) {
            this.categories = response.data;
          } else {
            this.errorMessage = response.message || 'Kategoriler yüklenemedi';
          }
        },
        error => {
          console.error('Kategori yükleme hatası', error);
          this.errorMessage = 'Bir hata oluştu, lütfen tekrar deneyin';
        }
      );
  }

  addCategory() {
    this.displayDialog = true;
    // if (!this.categoryName.trim()) {
    //   this.errorMessage = 'Kategori adı boş olamaz';
    //   return;
    // }

    // const newCategory = { name: this.categoryName };

    // this.http.post(`${environment.apiUrl}/categories`, newCategory)
    //   .subscribe(
    //     (response: any) => {
    //       if (response.isSuccess) {
    //         this.loadCategories(); // Listeyi güncelle
    //         this.categoryName = ''; // Input'u temizle
    //       } else {
    //         this.errorMessage = response.message || 'Kategori eklenemedi';
    //       }
    //     },
    //     error => {
    //       console.error('Kategori ekleme hatası', error);
    //       this.errorMessage = 'Bir hata oluştu, lütfen tekrar deneyin';
    //     }
    //   );  
  
  
    }
}
