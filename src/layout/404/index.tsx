import { AlertTriangle, Home } from "lucide-react";
import { Link } from "react-router-dom";

import Button from "../../components/Button/Button";
import styles from "./styles.module.css";

export function NotFoundPage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.icon}>
          <AlertTriangle size={48} />
        </div>

        <h1 className={styles.title}>404</h1>

        <p className={styles.text}>Oops! Page not found</p>

        <p className={styles.subText}>
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <Button to="/" as={Link}>
          <Home size={18} />
          Back to Home
        </Button>
      </div>
    </div>
  );
}
