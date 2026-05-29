// CartDropdownFooter.tsx

import { Link } from "react-router-dom";

import Button from "../../../../components/Button/Button";
import { routes } from "../../../../constants/routes";
import styles from "./styles.module.css";
import { formatCurrency } from "@/utils/format";

type CartDropdownFooterProps = {
  totalPrice: number;
  currency?: string
};

export default function CartDropdownFooter({
  totalPrice,
  currency
}: CartDropdownFooterProps) {
  return (
    <div className={styles.footer}>
      <div className={styles.total}>
        <span>Total</span>

        <strong>{formatCurrency(totalPrice, currency)}</strong>
      </div>

      <Button as={Link} to={routes.cart} className={styles.checkout}>
        View cart
      </Button>
    </div>
  );
}
