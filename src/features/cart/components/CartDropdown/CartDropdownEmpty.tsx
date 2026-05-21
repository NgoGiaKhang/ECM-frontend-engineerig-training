import { ShoppingCart } from "lucide-react";

import styles from "./styles.module.css";

export default function CartDropdownEmpty() {
  return (
    <div className={styles.empty}>
      <ShoppingCart size={42} />

      <p>Your cart is empty</p>
    </div>
  );
}