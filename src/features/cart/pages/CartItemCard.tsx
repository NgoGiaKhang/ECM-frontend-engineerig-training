import { Minus, Plus, Trash2 } from "lucide-react";

import styles from "./styles.module.css";
import { formatCurrency } from "@/utils/format";
import type { CartItem } from "../types";

type CartItemCardProps = {
  item: CartItem

  onIncrease: (productId: string) => void;

  onDecrease: (productId: string) => void;

  onRemove: (productId: string) => void;
};

export default function CartItemCard({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemCardProps) {
  return (
    <div className={styles.card}>
      <img
        src={item.thumbnail}
        alt={item.productName}
        className={styles.image}
      />

      <div className={styles.content}>
        <div>
          <h2 className={styles.name}>{item.productName}</h2>

          <p className={styles.price}>{formatCurrency(item.price, item.currency)}</p>
        </div>

        <div className={styles.actions}>
          {/* quantity */}
          <div className={styles.quantity}>
            <button onClick={() => onDecrease(item.productId)}>
              <Minus size={16} />
            </button>

            <span>{item.quantity}</span>

            <button onClick={() => onIncrease(item.productId)}>
              <Plus size={16} />
            </button>
          </div>

          {/* subtotal */}
          <strong className={styles.subtotal}>
            {formatCurrency(item.price, item.currency)}
          </strong>

          {/* remove */}
          <button
            className={styles.remove}
            onClick={() => onRemove(item.productId)}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
