import { Star } from "lucide-react";
import { Link } from "react-router-dom";

import Button from "../../../../components/Button/Button";
import MarqueeText from "../../../../components/MarqueeText/MarqueeText";
import { routes } from "../../../../constants/routes";
import { useCartStore } from "../../../cart/cart.store";
import type { Product } from "../../types";
import styles from "./style.module.css";
import { formatCurrency } from "@/utils/format";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const addCart = useCartStore((s) => s.add);

  const discount =
    product.discountPercent ||
    Math.round(
      ((product.originalPrice - product.price) / product.originalPrice) * 100,
    );



  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Link to={`${routes.products}/${product.id}`}>
          <img
            src={product.thumbnail}
            alt={product.name}
            className={styles.image}
          />
        </Link>

        {discount > 0 && <div className={styles.badge}>-{discount}%</div>}
      </div>

      <div className={styles.content}>
        <div>
          <p className={styles.brand}>{product.brandName}</p>
          <Link to={`${routes.products}/${product.id}`}>
            <MarqueeText
              text={product.name}
              className={styles.title}
              speed={10}
            />
          </Link>
        </div>

        <div className={styles.rating}>
          <Star className={styles.star} />

          <span className={styles.ratingValue}>{product.rating}</span>

          {product.reviewCount && (
            <span className={styles.review}>
              ({product.reviewCount} reviews)
            </span>
          )}
        </div>

        <div className={styles.priceGroup}>
          <span className={styles.price}>{formatCurrency(product.price, product.currency)}</span>

          {product.originalPrice > product.price && (
            <span className={styles.originalPrice}>
              {formatCurrency(product.originalPrice, product.currency)}
            </span>
          )}
        </div>

        <div className={styles.footer}>
          <span
            className={
              product.stock && product.stock > 0
                ? styles.inStock
                : styles.outStock
            }
          >
            {product.stock && product.stock > 0
              ? `${product.stock} in stock`
              : "Out of stock"}
          </span>

          <Button
            onClick={() => {
              addCart({
                productId: product.id,
                productName: product.name,
                productSlug: product.slug || "",
                brandName: product.brandName,
                thumbnail: product.thumbnail,
                quantity: 1,
                rating: product.rating,
                originalPrice: product.originalPrice,
                price: product.price,
                discountPercent: product.discountPercent,
                currency: product.currency,
              });
            }}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}
