// CartDropdown.tsx

import { X } from "lucide-react";

import { useCartStore } from "../../cart.store";
import CartDropdownEmpty from "./CartDropdownEmpty";
import CartDropdownFooter from "./CartDropdownFooter";
import CartDropdownItem from "./CartDropdownItem";
import styles from "./styles.module.css";

type Props = {
  onClose: () => void;
};

export default function CartDropdown({ onClose }: Props) {
  const items = useCartStore((s) => s.items);

  const decrease = useCartStore((s) => s.decrease);

  const increase = useCartStore((s) => s.increase);

  const remove = useCartStore((s) => s.remove);

  const totalPrice = useCartStore((s) => s.totalPrice());

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />

      <div className={styles.dropdown}>
        {/* HEADER */}
        <div className={styles.header}>
          <div>
            <h3>Shopping Cart</h3>

            <span>
              {items.length} item
              {items.length > 1 ? "s" : ""}
            </span>
          </div>

          <button className={styles.close} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* EMPTY */}
        {items.length === 0 ? (
          <CartDropdownEmpty />
        ) : (
          <>
            {/* LIST */}
            <div className={styles.list}>
              {items.map((item) => (
                <CartDropdownItem
                  key={item.productId}
                  item={item}
                  onIncrease={increase}
                  onDecrease={decrease}
                  onRemove={remove}
                />
              ))}
            </div>

            {/* FOOTER */}
            <CartDropdownFooter totalPrice={totalPrice} />
          </>
        )}
      </div>
    </>
  );
}
