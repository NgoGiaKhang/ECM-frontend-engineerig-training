// CartDropdownFooter.tsx

import { Link } from "react-router-dom";

import Button from "../../../../components/Button/Button";
import { routes } from "../../../../constants/routes";
import { formatPrice } from "../../utils";
import styles from "./styles.module.css";

type CartDropdownFooterProps = {
  totalPrice: number;
};

export default function CartDropdownFooter({
  totalPrice,
}: CartDropdownFooterProps) {
  return (
    <div className={styles.footer}>
      <div className={styles.total}>
        <span>Total</span>

        <strong>{formatPrice(totalPrice)}</strong>
      </div>

      <Button as={Link} to={routes.cart} className={styles.checkout}>
        View cart
      </Button>
    </div>
  );
}
