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
  name: string = '';
  categoryId!: number;
  description: string = '';
  photoUrl: string = '';
  price!: number;
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
    this.name = '';
    this.categoryId = 0;
    this.description = '';
    this.photoUrl = '';
    this.price = 0;
  }

  editProduct(product: any) {
    this.selectedProduct = product;
    this.name = product.name;
    this.categoryId = product.categoryId;
    this.description = product.description;
    this.photoUrl = product.photoUrl;
    this.price = product.price;
    this.visible = true;
  }

  saveProduct() {
    const productData = {
      name: this.name,
      categoryId: this.categoryId,
      description: this.description,
      photoUrl: this.photoUrl,
      price: this.price
    };

    this.http.post(`${environment.apiUrl}/Product`, productData).subscribe(
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
      name: this.name,
      categoryId: this.categoryId,
      description: this.description,
      photoUrl: this.photoUrl,
      price: this.price
    };

    this.http.post(`${environment.apiUrl}/product/update`, updatedData).subscribe(
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
  