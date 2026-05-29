import type { PageRequest, PaginatedResponse } from "@/api/types";
import type { Category } from "./types";
import { api } from "@/api/api";
export class CategoryService {
  async findAll(pageRequest: PageRequest, signal: AbortSignal) {
    return api.get<PaginatedResponse<Category>>("/categories", {
      signal,
      params: {
        ...pageRequest,
      },
    });
  }
}

export const categoryService = new CategoryService();
