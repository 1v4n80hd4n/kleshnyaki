export type Category = "live" | "boiled" | "shrimp" | "fish" | "caviar" | "other";

export type Unit = "kg" | "pcs" | "cert";

export interface ProductVariant {
  id: string;
  label: string;
  price: number;
  perKg?: string;
  image?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  categoryLabel: string;
  shortDescription: string;
  description: string;
  image: string;
  gallery?: string[];
  basePrice: number;
  unit: Unit;
  variants?: ProductVariant[];
  isHit?: boolean;
  badges?: string[];
}

export interface CartItem {
  key: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  variantId?: string;
  variantLabel?: string;
  unit: Unit;
  price: number;
  quantity: number;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  landmark?: string;
  phones: string[];
  hours: string;
  lat: number;
  lng: number;
}

export type FulfillmentType = "delivery" | "pickup";
