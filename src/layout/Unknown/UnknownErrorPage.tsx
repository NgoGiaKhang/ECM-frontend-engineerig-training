import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";

import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import { routes } from "../../constants/routes";
import styles from "./styles.module.css";

export default function UnknownErrorPage() {
  return (
    <Container as="main" size="md" className={styles.container}>
      <div className={styles.card}>
        <div className={styles.icon}>
          <AlertTriangle size={42} />
        </div>

        <span className={styles.code}>500</span>

        <h1 className={styles.title}>Something went wrong</h1>

        <p className={styles.description}>
          An unexpected error occurred. Please try again later or go back to the
          homepage.
        </p>

        <div className={styles.actions}>
          <Button onClick={() => window.location.reload()}>
            <RefreshCw size={18} />
            Retry
          </Button>

          <Button as={Link} to={routes.home} variant="ghost">
            <ArrowLeft size={18} />
            Back Home
          </Button>
        </div>
      </div>
    </Container>
  );
}
