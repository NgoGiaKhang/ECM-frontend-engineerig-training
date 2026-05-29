import type { PageRequest, PaginatedResponse } from "@/api/types";
import { api } from "@/api/api";
import type { Brand } from './types';
export class BrandService {
  async findAll(pageRequest: PageRequest, signal: AbortSignal) {
    return api.get<PaginatedResponse<Brand>>("/brands", {
      signal,
      params: {
        ...pageRequest,
      },
    });
  }
}

export const brandService = new BrandService();