export type Product = {
  id: string;
  sku?: string;
  name: string;
  slug?: string;
  description?: string;
  originalPrice: number;
  price: number;
  discountPercent?: number;
  currency?: string;
  stock?: number;
  sold?: number;
  isAvailable?: boolean;
  rating: number;
  reviewCount?: number;
  categoryId?: string;
  categoryName?: string;
  brandId: string;
  brandName: string;
  thumbnail: string;
  images?: string[];
  tags?: string[];
  snapshot: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
};

export type ProductFilterRequest = {
  // Search
  query?: string;

  // Filter
  categoryId?: string;

  minPrice?: number;
  maxPrice?: number;
};

export type ProductRequest = {
  sku: string;
  slug: string;
  name: string;
  description: string;

  price: number;
  originalPrice?: number;
  discountPercent?: number;

  currency: "USD";

  isAvailable: boolean;

  thumbnail: string;
  images: string[];

  categoryId?: string;
  brandId: string;

  tags: string[];
};