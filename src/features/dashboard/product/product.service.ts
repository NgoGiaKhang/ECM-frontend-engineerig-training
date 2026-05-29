import { api } from "@/api/api";
import type { ApiResponse, PageRequest, PaginatedResponse } from "@/api/types";
import type { Product } from "@/features/product/types";
import { type ProductFilterRequest, type ProductRequest } from "./types";
import { IDEMPOTENCY_HEADER } from "../../../api/constant";

class ProductService {
  async update(id: string, data: ProductRequest) {
    return api.put<Product>(`/products/${id}`, data);
  }
  async delete(id: string) {
    await api.delete<ApiResponse<Product>>(`/products/${id}`);
  }
  async findById(
    id: string | undefined,
    signal: AbortSignal,
  ): Promise<Product> {
    const res = await api.get<ApiResponse<Product>>(`/products/${id}`, {
      signal,
    });

    return res.data;
  }
  async findAll(
    pageRequest: PageRequest,
    filter: ProductFilterRequest,
    signal: AbortSignal,
  ) {
    return api.get<PaginatedResponse<Product>>("/products", {
      signal,
      params: {
        ...pageRequest,
        ...filter,
      },
    });
  }

  async create(request: ProductRequest, idempotencyKey: string) {
    return api.post<Product>("/products", request, {
      headers: {
        [IDEMPOTENCY_HEADER]: idempotencyKey,
      },
    });
  }
}

export const productService = new ProductService();
