// CartDropdownItem.tsx

import { Minus, Plus, Trash2 } from "lucide-react";

import { formatPrice } from "../../utils";
import styles from "./styles.module.css";

type CartDropdownItemProps = {
  item: {
    productId: string;
    productName: string;
    thumbnail: string;
    price: number;
    quantity: number;
  };

  onIncrease: (productId: string) => void;

  onDecrease: (productId: string) => void;

  onRemove: (productId: string) => void;
};

export default function CartDropdownItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartDropdownItemProps) {
  return (
    <div className={styles.item}>
      <img
        src={item.thumbnail}
        alt={item.productName}
        className={styles.image}
      />

      <div className={styles.info}>
        <h4>{item.productName}</h4>

        <p>{formatPrice(item.price)}</p>

        <div className={styles.actions}>
          <button onClick={() => onDecrease(item.productId)}>
            <Minus size={14} />
          </button>

          <span>{item.quantity}</span>

          <button onClick={() => onIncrease(item.productId)}>
            <Plus size={14} />
          </button>
        </div>
      </div>

      <button
        className={styles.remove}
        onClick={() => onRemove(item.productId)}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
