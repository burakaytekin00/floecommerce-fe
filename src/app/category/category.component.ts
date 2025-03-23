import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  standalone: false,
  providers: [MessageService, ConfirmationService]
})
export class CategoryComponent {
  
  visible: boolean = false;
  categoryName: string = '';
  categoryDescription: string = '';
  products!: any[];
  selectedProduct: any = null;

  constructor(private http: HttpClient, private messageService: MessageService, private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.http.get(`${environment.apiUrl}/category/GetAll`).subscribe(
      (response: any) => {
        if (response.isSuccess) {
          console.log('Kategori verileri:', response.data);
          this.products = response.data;
        } else {
          this.messageService.add({ severity: 'error', summary: 'Hata', detail: response.message || 'Kategori verisi alınamadı', life: 5000 });
        }
      },
      error => {
        console.error('Kategori verisi alma hatası', error);
        this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Kategori verisi alınamadı, lütfen tekrar deneyin', life: 5000 });
      }
    );
  }

  showDialog() {
    this.visible = true;
    this.selectedProduct = null;
    this.categoryName = '';
    this.categoryDescription = '';
  }

  editProduct(product: any) {
    this.selectedProduct = product;
    this.categoryName = product.name;
    this.categoryDescription = product.description;
    this.visible = true;
  }

  saveCategory() {
    const categoryData = {
      name: this.categoryName,
      description: this.categoryDescription
    };

    this.http.post(`${environment.apiUrl}/category`, categoryData).subscribe(
      (response: any) => {
        if (response.isSuccess) {
          this.visible = false;
          this.messageService.add({severity:'success', summary: 'Başarılı', detail: 'Kategori başarıyla eklendi', life: 5000});
          this.getCategories();
        }
      },
      error => {
        console.error('Kategori ekleme hatası', error);
        this.messageService.add({severity:'error', summary: 'Hata', detail: error.error.message, life: 5000});
      }
    );
  }

  updateCategory() {
    if (!this.selectedProduct) return;

    const updatedData = {
      id: this.selectedProduct.id,
      name: this.categoryName,
      description: this.categoryDescription
    };

    this.http.post(`${environment.apiUrl}/category/update`, updatedData).subscribe(
      (response: any) => {
        if (response.isSuccess) {
          this.visible = false;
          this.messageService.add({severity:'success', summary: 'Başarılı', detail: 'Kategori başarıyla güncellendi', life: 5000});
          this.getCategories();
        }
      },
      error => {
        console.error('Kategori güncelleme hatası', error);
        this.messageService.add({severity:'error', summary: 'Hata', detail: error.error.message, life: 5000});
      }
    );
  }

  confirmDelete(product: any) {
    this.confirmationService.confirm({
      message: 'Silmek istediğinizden emin misiniz?',
      accept: () => {
        this.deleteCategory(product.id);
      }
    });
  }

  deleteCategory(id: number) {
    this.http.post(`${environment.apiUrl}/category/delete?id=${id}`,{}).subscribe(
      (response: any) => {
        if (response.isSuccess) {
          this.messageService.add({severity:'success', summary: 'Başarılı', detail: 'Kategori başarıyla silindi', life: 5000});
          this.getCategories();
        }
      },
      error => {
        console.error('Kategori silme hatası', error);
        this.messageService.add({severity:'error', summary: 'Hata', detail: error.error.message, life: 5000});
      }
    );
  }
}
  