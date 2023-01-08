export type ProductType = {
  id: number;
  name: string;
  price: number;
  category: string | null;
};

export type AddProductType = Omit<ProductType, "id">;
