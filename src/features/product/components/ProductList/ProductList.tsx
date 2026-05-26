import { useState } from "react";
import { Navigate } from "react-router-dom";

import { useFetch } from "../../../../api/useFetch";
import Pagination from "../../../../components/Pagination/Pagination";
import { routes } from "../../../../constants/routes";
import { productService } from "../../product.service";
import ProductCard from "../ProductCard/ProductCard";
import ProductCardSkeleton from "../ProductCardSkeleton/ProductCardSkeleton";
import ProductListEmpty from "../ProductListEmpty/ProductListEmpty";
import styles from "./style.module.css";

const skeletonItem = 8;
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 8;

export default function ProductList() {
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [limit] = useState(DEFAULT_LIMIT);

  const { loading, data, error } = useFetch(
    ["product", page, limit],
    (signal) => productService.findAll(page, limit, signal),
  );

  if (data && data.pagination.total == 0) {
    return <ProductListEmpty />;
  }

  if (error && !loading) return <Navigate to={routes.error} />;

  return (
    <div>
      <div className={styles.grid}>
        {loading ? (
          <>
            {Array.from({ length: skeletonItem }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </>
        ) : (
          <>
            {data?.data.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </>
        )}
      </div>
      <div className={styles.paginationContainer}>
        <Pagination
          onChange={(p) => {
            setPage(p);
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
          }}
          page={page}
          totalPages={data?.pagination.totalPages ?? 4}
        />
      </div>
    </div>
  );
}
