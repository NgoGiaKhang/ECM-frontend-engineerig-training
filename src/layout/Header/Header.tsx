// Header.tsx
import { LogIn, LogOut, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import Container from "../../components/Container/Container";
import IconButton from "../../components/IconButton/IconButton";
import { routes } from "../../constants/routes";
import { useAuthStore } from "../../features/auth/auth.store";
import { useCartStore } from "../../features/cart/cart.store";
import CartDropdown from "../../features/cart/components/CartDropdown/CartDropdown";
import styles from "./styles.module.css";

export default function Header() {
  const [openCart, setOpenCart] = useState(false);

  const { pathname } = useLocation();
  const isActive = (name: string) => {
    return pathname === name;
  };

  const totalItem = useCartStore((s) => s.totalItems());
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const logout = useAuthStore((s) => s.logout);

  return (
    <header className={styles.header}>
      <Container className={styles.headerInner}>
        <div className={styles.left}>
          <h1 className={styles.logo}>
            <span>Ja</span>Shop
          </h1>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li
              className={`${styles.navItem} ${isActive(routes.home) ? styles.active : ""}`}
            >
              <Link to={routes.home}>Home</Link>
            </li>
            {isAuthenticated && (
              <li
                className={`${styles.navItem} ${isActive(routes.createProduct) ? styles.active : ""}`}
              >
                <Link to={routes.createProduct}>Form</Link>
              </li>
            )}
          </ul>
        </nav>

        <div className={styles.actions}>
          <div
            style={{
              position: "relative",
            }}
          >
            <IconButton
              className={styles.iconButton}
              onClick={() => setOpenCart(!openCart)}
            >
              <ShoppingCart size={22} />
              <span className={styles.badge}>{totalItem}</span>
            </IconButton>
            {openCart && <CartDropdown onClose={() => setOpenCart(false)} />}
          </div>
          {user ? (
            <>
              <span>{user.name}</span>
              <IconButton onClick={() => logout()}>
                <LogOut size={22} />
              </IconButton>
            </>
          ) : (
            <IconButton to={routes.login} as={Link}>
              <LogIn size={22} />
            </IconButton>
          )}
        </div>
      </Container>
    </header>
  );
}
