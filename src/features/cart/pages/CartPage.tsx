import Button from "../../../components/Button/Button";
import Container from "../../../components/Container/Container";

import { useCartStore } from "../cart.store";

import CartItemCard from "./CartItemCard";
import CartSummary from "./CartSummary";
import EmptyCart from "./EmptyCart";

import styles from "./styles.module.css";
import ScrollToTop from '../../../components/ScrollToTop';

export default function CartPage() {
  const {
    items,
    totalItems,
    totalPrice,
    increase,
    decrease,
    remove,
    clear,
  } = useCartStore();

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <Container
      as="main"
      size="xl"
      className={styles.container}
    >
      <ScrollToTop/>
      {/* HEADER */}
      <div className={styles.header}>
        <div>
          <h1>Shopping Cart</h1>

          <p>
            {totalItems()} items in your
            cart
          </p>
        </div>

        <Button
          variant="ghost"
          onClick={clear}
        >
          Clear Cart
        </Button>
      </div>

      <div className={styles.layout}>
        {/* ITEMS */}
        <div className={styles.items}>
          {items.map((item) => (
            <CartItemCard
              key={item.productId}
              item={item}
              onIncrease={increase}
              onDecrease={decrease}
              onRemove={remove}
            />
          ))}
        </div>

        {/* SUMMARY */}
        <CartSummary
          totalItems={totalItems()}
          totalPrice={totalPrice()}
        />
      </div>
    </Container>
  );
}