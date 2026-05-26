import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

import Button from "../../../components/Button/Button";
import Container from "../../../components/Container/Container";
import styles from "./styles.module.css";

export default function EmptyCart() {
  return (
    <Container as="section" size="md" className={styles.empty}>
      <div className={styles.emptyCard}>
        <div className={styles.emptyIcon}>
          <ShoppingCart size={42} />
        </div>

        <h1>Your cart is empty</h1>

        <p>Looks like you haven&apos;t added any products yet.</p>

        <Button as={Link} to="/">
          Continue Shopping
        </Button>
      </div>
    </Container>
  );
}
