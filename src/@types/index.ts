type Picture = {
  id: number;
  url: string;
  productId: number;
};

type BaseProduct = {
  name: string;
  price: number;
  pictures: Picture[];
  stock: number;
}

type Category = {
  id: number;
  categoryName: string;
};

export interface Product extends BaseProduct {
  id: number;
  description: string;
  categoryId: number;
  category: Category;
}

export interface ProductCart extends BaseProduct {
  id:number;
  amount: number;
  count: number;
  category: string;
  picture: Picture
};

export type CreateProduct = BaseProduct