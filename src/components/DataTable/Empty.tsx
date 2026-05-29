// components/EmptyState/EmptyState.tsx

import type {
    ReactNode,
} from "react";

import styles from "./styles.module.css";

export type EmptyProps = {
    icon?: ReactNode;

    title?: string;

    description?: string;

    action?: ReactNode;
};

export default function EmptyState({
    icon,
    title = "No data found",
    description,
    action,
}: EmptyProps) {
    return (
        <div className={styles.state}>
            {icon && (
                <div className={styles.icon}>
                    {icon}
                </div>
            )}

            <div className={styles.content}>
                <h3>{title}</h3>

                {description && (
                    <p>{description}</p>
                )}
            </div>

            {action}
        </div>
    );
}