import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  standalone: false,
  providers: [MessageService, ConfirmationService]
})
export class ProductComponent {
  
  visible: boolean = false;
  categoryName: string = '';
  categoryDescription: string = '';
  products!: any[];
  categories!: any[];
  selectedProduct: any = null;

  constructor(private http: HttpClient, private messageService: MessageService, private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.http.get(`${environment.apiUrl}/product/GetAll`).subscribe(
      (response: any) => {
        if (response.isSuccess) {
          this.products = response.data;
        } else {
          this.messageService.add({ severity: 'error', summary: 'Hata', detail: response.message || 'Ürün verisi alınamadı', life: 5000 });
        }
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Ürün verisi alınamadı, lütfen tekrar deneyin', life: 5000 });
      }
    );
  }

  getCategories() {
    this.http.get(`${environment.apiUrl}/category/GetAll`).subscribe(
      (response: any) => {
        if (response.isSuccess) {
          this.categories = response.data;
        } else {
          this.messageService.add({ severity: 'error', summary: 'Hata', detail: response.message || 'Kategori verisi alınamadı', life: 5000 });
        }
      },
      error => {
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

  saveProduct() {
    const categoryData = {
      name: this.categoryName,
      description: this.categoryDescription
    };

    this.http.post(`${environment.apiUrl}/product`, categoryData).subscribe(
      (response: any) => {
        if (response.isSuccess) {
          this.visible = false;
          this.messageService.add({severity:'success', summary: 'Başarılı', detail: 'Ürün başarıyla eklendi', life: 5000});
          this.getProducts();
        }
      },
      error => {
        console.error('Ürün ekleme hatası', error);
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
          this.messageService.add({severity:'success', summary: 'Başarılı', detail: 'Ürün başarıyla güncellendi', life: 5000});
          this.getProducts();
        }
      },
      error => {
        console.error('Ürün güncelleme hatası', error);
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
          this.messageService.add({severity:'success', summary: 'Başarılı', detail: 'Ürün başarıyla silindi', life: 5000});
          this.getProducts();
        }
      },
      error => {
        console.error('Ürün silme hatası', error);
        this.messageService.add({severity:'error', summary: 'Hata', detail: error.error.message, life: 5000});
      }
    );
  }
}
  