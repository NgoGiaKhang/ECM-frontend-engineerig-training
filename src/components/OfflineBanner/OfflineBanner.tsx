import { WifiOff } from "lucide-react";

import {
  useNetwork,
} from "@/hooks/useNetwork";

import styles from "./styles.module.css";

export  function OfflineBanner() {
  const { offline } =
    useNetwork();

  if (!offline) {
    return null;
  }

  return (
    <div className={styles.root}>
      <WifiOff size={18} />

      <span>
        You are offline
      </span>
    </div>
  );
}