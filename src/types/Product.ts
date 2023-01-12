export type Category = "Entertainment" | "Jewelry";

export type Product = {
  id: number;
  name: string;
  price: number;
  category: Category;
};

export type CreateProduct = Omit<Product, "id">;
