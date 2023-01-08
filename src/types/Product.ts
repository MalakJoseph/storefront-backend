export type Category = "Entertainment" | "Jewelry";

export type ProductType = {
  id: number;
  name: string;
  price: number;
  category: Category;
};

export type AddProductType = Omit<ProductType, "id">;
