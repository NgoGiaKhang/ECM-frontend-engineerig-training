import { Link } from "react-router-dom";

import Button from "../../../components/Button/Button";
import { routes } from "../../../constants/routes";
import styles from "./styles.module.css";
import { formatCurrency } from "@/utils/format";

type CartSummaryProps = {
  totalItems: number;
  totalPrice: number;
};

export default function CartSummary({
  totalItems,
  totalPrice,
}: CartSummaryProps) {
  return (
    <aside className={styles.summary}>
      <h2>Order Summary</h2>

      <div className={styles.row}>
        <span>Items</span>

        <span>{totalItems}</span>
      </div>

      <div className={styles.row}>
        <span>Shipping</span>

        <span>Free</span>
      </div>

      <div className={`${styles.row} ${styles.total}`}>
        <span>Total</span>

        <strong>{formatCurrency(totalPrice)}</strong>
      </div>

      <Button width="full">Checkout</Button>

      <Button as={Link} to={routes.home} variant="ghost" width="full">
        Continue Shopping
      </Button>
    </aside>
  );
}
