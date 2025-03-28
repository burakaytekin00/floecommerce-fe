export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    photoUrl: string;
    categoryId: number;
    categoryName?: string;
    image?: string; // Eğer image alanını kullanıyorsan ekleyelim.
  }
  