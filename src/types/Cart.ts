export interface ProductCart {
  id: number,
  title: string,
  price: number,
  images: string,
  count: number
}

export interface CartView {
  products: ProductCart[],
  total: number
}