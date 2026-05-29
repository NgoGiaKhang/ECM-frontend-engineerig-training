import { LoaderCircle } from "lucide-react";

import styles from "./styles.module.css";

type Props = {
    text?: string;
};

export default function FormLoading({
    text = "Loading form...",
}: Props) {
    return (
        <div className={styles.root}>
            <div className={styles.card}>
                <LoaderCircle
                    size={42}
                    className={styles.icon}
                />

                <h2 className={styles.title}>
                    {text}
                </h2>

                <p className={styles.description}>
                    Please wait while we
                    prepare your data.
                </p>
            </div>
        </div>
    );
}